-- =====================================================================
-- WISHLISTS
-- =====================================================================
CREATE TABLE public.wishlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

CREATE INDEX idx_wishlists_user ON public.wishlists(user_id);

ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own wishlist"
  ON public.wishlists FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users add to own wishlist"
  ON public.wishlists FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users remove own wishlist items"
  ON public.wishlists FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================================
-- PRODUCT REVIEWS (with photo URLs)
-- =====================================================================
CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id INTEGER NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT NOT NULL,
  photo_urls TEXT[] NOT NULL DEFAULT '{}',
  status public.review_status NOT NULL DEFAULT 'pending',
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_product ON public.product_reviews(product_id, status);
CREATE INDEX idx_reviews_user ON public.product_reviews(user_id);

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone (including guests) can read approved reviews
CREATE POLICY "Approved reviews are public"
  ON public.product_reviews FOR SELECT TO anon, authenticated
  USING (status = 'approved');

-- Users can read their own (any status, so they can see pending state)
CREATE POLICY "Users see own reviews"
  ON public.product_reviews FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Admins can read every review (for moderation queue)
CREATE POLICY "Admins see all reviews"
  ON public.product_reviews FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Users can submit reviews (always start as pending — enforced by default + trigger)
CREATE POLICY "Users submit reviews"
  ON public.product_reviews FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can edit their own pending reviews; admins can edit anything
CREATE POLICY "Users update own pending reviews"
  ON public.product_reviews FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admins moderate reviews"
  ON public.product_reviews FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users delete own pending reviews"
  ON public.product_reviews FOR DELETE TO authenticated
  USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admins delete any review"
  ON public.product_reviews FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Force user-submitted inserts to start as pending, regardless of payload
CREATE OR REPLACE FUNCTION public.force_review_pending_on_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    NEW.status = 'pending';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_force_review_pending
BEFORE INSERT ON public.product_reviews
FOR EACH ROW EXECUTE FUNCTION public.force_review_pending_on_insert();

CREATE TRIGGER trg_review_updated_at
BEFORE UPDATE ON public.product_reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================================
-- REVIEW PHOTOS STORAGE BUCKET
-- =====================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-photos', 'review-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Review photos are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'review-photos');

CREATE POLICY "Users upload review photos to own folder"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'review-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users delete own review photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'review-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- =====================================================================
-- ORDERS — shipment tracking fields
-- =====================================================================
ALTER TABLE public.orders
  ADD COLUMN shipment_status TEXT NOT NULL DEFAULT 'processing',
  ADD COLUMN carrier TEXT,
  ADD COLUMN tracking_number TEXT,
  ADD COLUMN tracking_url TEXT,
  ADD COLUMN shipped_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN delivered_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN admin_notes TEXT;

-- Admins can update orders (set shipment status, tracking)
CREATE POLICY "Admins update orders"
  ON public.orders FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto-stamp shipped_at / delivered_at when status transitions
CREATE OR REPLACE FUNCTION public.stamp_shipment_timestamps()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.shipment_status = 'shipped' AND OLD.shipment_status IS DISTINCT FROM 'shipped' AND NEW.shipped_at IS NULL THEN
    NEW.shipped_at = now();
  END IF;
  IF NEW.shipment_status = 'delivered' AND OLD.shipment_status IS DISTINCT FROM 'delivered' AND NEW.delivered_at IS NULL THEN
    NEW.delivered_at = now();
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_stamp_shipment_timestamps
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.stamp_shipment_timestamps();

-- =====================================================================
-- GUEST ORDER AUTO-LINKING
-- =====================================================================
-- Allow users with a verified email to claim guest orders that match their email.
CREATE POLICY "Users claim guest orders by email"
  ON public.orders FOR SELECT TO authenticated
  USING (
    user_id IS NULL
    AND customer_email IS NOT NULL
    AND lower(customer_email) = lower((auth.jwt() ->> 'email'))
  );

-- When a new user signs up, attach any past guest orders sharing their email.
CREATE OR REPLACE FUNCTION public.link_guest_orders_to_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IS NOT NULL THEN
    UPDATE public.orders
       SET user_id = NEW.id, updated_at = now()
     WHERE user_id IS NULL
       AND lower(customer_email) = lower(NEW.email);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_link_guest_orders_on_signup
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.link_guest_orders_to_new_user();