-- =========================================================
-- PRODUCT VARIANTS (per-variant: color/material + size + image + stock)
-- =========================================================
CREATE TABLE public.product_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id INTEGER NOT NULL,
  color TEXT,
  color_hex TEXT,
  material TEXT,
  size TEXT,
  sku TEXT UNIQUE,
  image_url TEXT,
  price_override INTEGER, -- cents; null = use product base price
  stock_count INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_product_variants_product ON public.product_variants(product_id);
CREATE INDEX idx_product_variants_active ON public.product_variants(is_active);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Variants are public"
  ON public.product_variants FOR SELECT
  USING (true);

CREATE POLICY "Admins insert variants"
  ON public.product_variants FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update variants"
  ON public.product_variants FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete variants"
  ON public.product_variants FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_product_variants_updated
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- SHIPPING ZONES (flat rate per zone)
-- =========================================================
CREATE TABLE public.shipping_zones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  country_codes TEXT[] NOT NULL DEFAULT '{}', -- ISO codes; empty = catch-all
  flat_rate_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'usd',
  estimated_days TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active zones are public"
  ON public.shipping_zones FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert zones"
  ON public.shipping_zones FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update zones"
  ON public.shipping_zones FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete zones"
  ON public.shipping_zones FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_shipping_zones_updated
  BEFORE UPDATE ON public.shipping_zones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed a couple of default zones
INSERT INTO public.shipping_zones (name, description, country_codes, flat_rate_cents, currency, estimated_days, sort_order)
VALUES
  ('Romania', 'Standard shipping within Romania', ARRAY['RO'], 1500, 'usd', '2-4 business days', 0),
  ('Europe', 'Standard shipping within EU', ARRAY['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','SK','SI','ES','SE'], 2500, 'usd', '4-7 business days', 1),
  ('Worldwide', 'International shipping', ARRAY[]::text[], 4500, 'usd', '7-14 business days', 2);

-- =========================================================
-- ORDERS: shipping + zone snapshot
-- =========================================================
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS shipping_zone_id UUID,
  ADD COLUMN IF NOT EXISTS shipping_zone_name TEXT,
  ADD COLUMN IF NOT EXISTS shipping_amount INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS shipping_address JSONB;

-- =========================================================
-- ORDER ITEMS: link to variant
-- =========================================================
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS variant_id UUID,
  ADD COLUMN IF NOT EXISTS variant_label TEXT;

-- =========================================================
-- RETURN REQUESTS
-- =========================================================
CREATE TYPE public.return_status AS ENUM ('requested','approved','rejected','refunded','cancelled');

CREATE TABLE public.return_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL,
  user_id UUID,
  customer_email TEXT,
  reason TEXT NOT NULL,
  details TEXT,
  photo_urls TEXT[] NOT NULL DEFAULT '{}',
  status public.return_status NOT NULL DEFAULT 'requested',
  refund_amount_cents INTEGER,
  refund_reference TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

CREATE INDEX idx_return_requests_order ON public.return_requests(order_id);
CREATE INDEX idx_return_requests_user ON public.return_requests(user_id);
CREATE INDEX idx_return_requests_status ON public.return_requests(status);

ALTER TABLE public.return_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own returns"
  ON public.return_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all returns"
  ON public.return_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users create own returns"
  ON public.return_requests FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id AND o.user_id = auth.uid()
    )
  );

CREATE POLICY "Users update own pending returns"
  ON public.return_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'requested');

CREATE POLICY "Admins update returns"
  ON public.return_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_return_requests_updated
  BEFORE UPDATE ON public.return_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Stamp resolved_at when status moves to a terminal state
CREATE OR REPLACE FUNCTION public.stamp_return_resolved()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.status IN ('refunded','rejected','cancelled')
     AND OLD.status IS DISTINCT FROM NEW.status
     AND NEW.resolved_at IS NULL THEN
    NEW.resolved_at = now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_return_requests_resolved
  BEFORE UPDATE ON public.return_requests
  FOR EACH ROW EXECUTE FUNCTION public.stamp_return_resolved();

-- =========================================================
-- STORAGE: return-photos bucket (public read)
-- =========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('return-photos', 'return-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Return photos public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'return-photos');

CREATE POLICY "Auth users upload return photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'return-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users delete own return photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'return-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
