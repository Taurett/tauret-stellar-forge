/**
 * BackInStockSubscribe — email opt-in form shown when a product/variant is OOS.
 * Stores a row in `stock_notifications` (RLS allows anyone to insert).
 * Pre-fills the email when the user is logged in.
 */
import { useState } from "react";
import { Mail, BellRing, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Props {
  productId: number;
  variantId?: string | null;
}

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

const BackInStockSubscribe = ({ productId, variantId }: Props) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState(user?.email ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      toast({ title: t("restock.invalidEmail"), variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("stock_notifications").insert({
      product_id: productId,
      variant_id: variantId ?? null,
      email: trimmed,
      user_id: user?.id ?? null,
    });
    setSubmitting(false);

    if (error) {
      // Unique-violation ⇒ already subscribed.
      if (error.code === "23505") {
        toast({ title: t("restock.already") });
        setDone(true);
        return;
      }
      console.error("stock_notifications insert error", error);
      toast({ title: t("restock.error"), variant: "destructive" });
      return;
    }
    toast({ title: t("restock.success") });
    setDone(true);
  };

  return (
    <div className="glass clip-angle-lg p-5 border border-primary/20 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
          <BellRing className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-display font-bold text-foreground uppercase tracking-wide text-sm">
            {t("restock.title")}
          </h4>
          <p className="font-tech text-xs text-muted-foreground mt-1">
            {t("restock.desc")}
          </p>
        </div>
      </div>

      {done ? (
        <div className="flex items-center gap-2 text-emerald-500 font-tech text-xs uppercase tracking-wider px-1">
          <Check className="w-4 h-4" />
          {t("restock.success")}
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70" />
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("restock.placeholder")}
              className="pl-10 bg-input/60 border-primary/20 h-10 font-tech text-sm"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-xs hover:shadow-neon-cyan clip-angle"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : t("restock.cta")}
          </Button>
        </form>
      )}
    </div>
  );
};

export default BackInStockSubscribe;
