-- =========================================================
-- Orders + Order Items
-- =========================================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  stripe_session_id TEXT NOT NULL UNIQUE,
  customer_email TEXT,
  amount_total INTEGER NOT NULL DEFAULT 0,        -- cents
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'completed',
  environment TEXT NOT NULL DEFAULT 'sandbox',
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_session ON public.orders(stripe_session_id);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id INTEGER,
  product_name TEXT NOT NULL,
  stripe_price_id TEXT,
  unit_amount INTEGER NOT NULL DEFAULT 0,         -- cents
  quantity INTEGER NOT NULL DEFAULT 1,
  subtotal INTEGER NOT NULL DEFAULT 0,            -- cents
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);

-- Trigger: keep updated_at fresh on orders
CREATE TRIGGER trg_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- RLS
-- =========================================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Users see their own orders
CREATE POLICY "Users view own orders"
ON public.orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins see all orders
CREATE POLICY "Admins view all orders"
ON public.orders FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users see items belonging to their orders
CREATE POLICY "Users view own order items"
ON public.order_items FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND o.user_id = auth.uid()
  )
);

-- Admins see all order items
CREATE POLICY "Admins view all order items"
ON public.order_items FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- Promote current user to admin
-- =========================================================
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'victor.ro.botan@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;