
-- ============= Back-in-stock notifications =============
CREATE TABLE public.stock_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id INTEGER NOT NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  user_id UUID,
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX stock_notif_unique
  ON public.stock_notifications (product_id, COALESCE(variant_id::text, ''), lower(email))
  WHERE notified_at IS NULL;

CREATE INDEX stock_notif_variant ON public.stock_notifications (variant_id) WHERE notified_at IS NULL;
CREATE INDEX stock_notif_product ON public.stock_notifications (product_id) WHERE notified_at IS NULL;

ALTER TABLE public.stock_notifications ENABLE ROW LEVEL SECURITY;

-- Anyone (including guests) can subscribe themselves
CREATE POLICY "Anyone can create stock notification"
  ON public.stock_notifications FOR INSERT
  WITH CHECK (true);

-- Users can view their own subscriptions (by user_id or email match)
CREATE POLICY "Users can view their own subscriptions"
  ON public.stock_notifications FOR SELECT
  USING (
    auth.uid() = user_id
    OR (auth.jwt() ->> 'email') = email
  );

-- Admins can view + manage all
CREATE POLICY "Admins can view all stock notifications"
  ON public.stock_notifications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update stock notifications"
  ON public.stock_notifications FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete stock notifications"
  ON public.stock_notifications FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Users can delete their own
CREATE POLICY "Users can delete their own subscriptions"
  ON public.stock_notifications FOR DELETE
  USING (
    auth.uid() = user_id
    OR (auth.jwt() ->> 'email') = email
  );

-- ============= AI Chat conversations (optional persistence) =============
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX chat_conv_session ON public.chat_conversations (session_id);
CREATE INDEX chat_conv_user ON public.chat_conversations (user_id);

CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX chat_msg_conv ON public.chat_messages (conversation_id, created_at);

ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Conversations: anyone can create with their session_id, owners can view by user_id (when logged in)
CREATE POLICY "Anyone can create chat conversation"
  ON public.chat_conversations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users view their own conversations"
  ON public.chat_conversations FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins view all conversations"
  ON public.chat_conversations FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can update own conversation"
  ON public.chat_conversations FOR UPDATE
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Messages: linked via conversation
CREATE POLICY "Anyone can insert chat message"
  ON public.chat_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "View messages in own conversation"
  ON public.chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_conversations c
      WHERE c.id = conversation_id
        AND (c.user_id = auth.uid() OR c.user_id IS NULL)
    )
  );

CREATE POLICY "Admins view all messages"
  ON public.chat_messages FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
