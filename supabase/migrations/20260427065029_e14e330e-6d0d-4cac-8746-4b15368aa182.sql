-- Question/answer status enum
CREATE TYPE public.qa_status AS ENUM ('pending', 'approved', 'rejected');

-- Product questions
CREATE TABLE public.product_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id INTEGER NOT NULL,
  user_id UUID NOT NULL,
  display_name TEXT,
  body TEXT NOT NULL,
  status public.qa_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.product_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved questions are public" ON public.product_questions
FOR SELECT USING (status = 'approved');
CREATE POLICY "Users see own questions" ON public.product_questions
FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins see all questions" ON public.product_questions
FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users submit questions" ON public.product_questions
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own pending questions" ON public.product_questions
FOR UPDATE TO authenticated USING (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Admins moderate questions" ON public.product_questions
FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users delete own pending questions" ON public.product_questions
FOR DELETE TO authenticated USING (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Admins delete questions" ON public.product_questions
FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE INDEX idx_product_questions_product_id ON public.product_questions(product_id);
CREATE INDEX idx_product_questions_status ON public.product_questions(status);

CREATE TRIGGER update_product_questions_updated_at
BEFORE UPDATE ON public.product_questions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Product answers
CREATE TABLE public.product_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.product_questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  display_name TEXT,
  body TEXT NOT NULL,
  is_admin_answer BOOLEAN NOT NULL DEFAULT false,
  status public.qa_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.product_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved answers are public" ON public.product_answers
FOR SELECT USING (status = 'approved');
CREATE POLICY "Users see own answers" ON public.product_answers
FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins see all answers" ON public.product_answers
FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users submit answers" ON public.product_answers
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own pending answers" ON public.product_answers
FOR UPDATE TO authenticated USING (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Admins moderate answers" ON public.product_answers
FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users delete own pending answers" ON public.product_answers
FOR DELETE TO authenticated USING (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Admins delete answers" ON public.product_answers
FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE INDEX idx_product_answers_question_id ON public.product_answers(question_id);

CREATE TRIGGER update_product_answers_updated_at
BEFORE UPDATE ON public.product_answers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Force pending status on insert for non-admins (similar to reviews)
CREATE OR REPLACE FUNCTION public.force_qa_pending_on_insert()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    NEW.status = 'pending';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER force_question_pending
BEFORE INSERT ON public.product_questions
FOR EACH ROW EXECUTE FUNCTION public.force_qa_pending_on_insert();

CREATE TRIGGER force_answer_pending
BEFORE INSERT ON public.product_answers
FOR EACH ROW EXECUTE FUNCTION public.force_qa_pending_on_insert();

-- Bundle deals (quantity-based discounts)
CREATE TABLE public.bundle_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  min_quantity INTEGER NOT NULL CHECK (min_quantity >= 2),
  discount_percent INTEGER NOT NULL CHECK (discount_percent BETWEEN 1 AND 90),
  product_id INTEGER, -- null = applies site-wide
  is_active BOOLEAN NOT NULL DEFAULT true,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bundle_deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active bundles are public" ON public.bundle_deals
FOR SELECT USING (
  is_active = true
  AND (starts_at IS NULL OR starts_at <= now())
  AND (ends_at IS NULL OR ends_at >= now())
);
CREATE POLICY "Admins see all bundles" ON public.bundle_deals
FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert bundles" ON public.bundle_deals
FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update bundles" ON public.bundle_deals
FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete bundles" ON public.bundle_deals
FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_bundle_deals_updated_at
BEFORE UPDATE ON public.bundle_deals
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Wishlist shares
CREATE TABLE public.wishlist_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  share_token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  title TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.wishlist_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active share by token" ON public.wishlist_shares
FOR SELECT USING (is_active = true);
CREATE POLICY "Users manage own shares" ON public.wishlist_shares
FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_wishlist_shares_token ON public.wishlist_shares(share_token);
CREATE INDEX idx_wishlist_shares_user ON public.wishlist_shares(user_id);

CREATE TRIGGER update_wishlist_shares_updated_at
BEFORE UPDATE ON public.wishlist_shares
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();