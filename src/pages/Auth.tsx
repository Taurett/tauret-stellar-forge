import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

const emailSchema = z.string().trim().email({ message: "Invalid email" }).max(255);
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" }).max(72);
const nameSchema = z.string().trim().min(1, { message: "Name required" }).max(100);

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [user, loading, navigate]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const emailRaw = String(fd.get("email") ?? "");
    const passwordRaw = String(fd.get("password") ?? "");

    const emailRes = emailSchema.safeParse(emailRaw);
    const passwordRes = passwordSchema.safeParse(passwordRaw);
    if (!emailRes.success || !passwordRes.success) {
      toast({ title: t("auth.invalidInput"), description: emailRes.success ? passwordRes.error?.issues[0].message : emailRes.error.issues[0].message, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email: emailRes.data, password: passwordRes.data });
    setSubmitting(false);

    if (error) {
      toast({ title: t("auth.signInFailed"), description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: t("auth.welcomeBack") });
    navigate("/", { replace: true });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nameRaw = String(fd.get("name") ?? "");
    const emailRaw = String(fd.get("email") ?? "");
    const passwordRaw = String(fd.get("password") ?? "");

    const nameRes = nameSchema.safeParse(nameRaw);
    const emailRes = emailSchema.safeParse(emailRaw);
    const passwordRes = passwordSchema.safeParse(passwordRaw);
    if (!nameRes.success || !emailRes.success || !passwordRes.success) {
      const msg = !nameRes.success ? nameRes.error.issues[0].message : !emailRes.success ? emailRes.error.issues[0].message : passwordRes.error?.issues[0].message;
      toast({ title: t("auth.invalidInput"), description: msg, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: emailRes.data,
      password: passwordRes.data,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { display_name: nameRes.data },
      },
    });
    setSubmitting(false);

    if (error) {
      toast({ title: t("auth.signUpFailed"), description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: t("auth.accountCreated") });
    navigate("/", { replace: true });
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      setSubmitting(false);
      toast({ title: t("auth.signInFailed"), description: result.error.message, variant: "destructive" });
      return;
    }
    if (result.redirected) return;
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          {t("auth.backHome")}
        </Link>

        <div className="glass clip-angle-lg border border-primary/20 p-8">
          <div className="mb-6 text-center">
            <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-2">TAURET</div>
            <h1 className="font-display text-3xl font-black text-aurora">{t("auth.heading")}</h1>
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">{t("auth.signIn")}</TabsTrigger>
              <TabsTrigger value="signup">{t("auth.signUp")}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">{t("auth.email")}</Label>
                  <Input id="signin-email" name="email" type="email" autoComplete="email" required maxLength={255} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">{t("auth.password")}</Label>
                  <Input id="signin-password" name="password" type="password" autoComplete="current-password" required maxLength={72} />
                </div>
                <Button type="submit" disabled={submitting} className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-xs clip-angle">
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {t("auth.signIn")}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t("auth.name")}</Label>
                  <Input id="signup-name" name="name" type="text" autoComplete="name" required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t("auth.email")}</Label>
                  <Input id="signup-email" name="email" type="email" autoComplete="email" required maxLength={255} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t("auth.password")}</Label>
                  <Input id="signup-password" name="password" type="password" autoComplete="new-password" required minLength={6} maxLength={72} />
                </div>
                <Button type="submit" disabled={submitting} className="w-full bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest text-xs clip-angle">
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {t("auth.createAccount")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 font-tech tracking-[0.25em] text-muted-foreground">{t("auth.or")}</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogle}
            disabled={submitting}
            className="w-full font-tech font-bold uppercase tracking-widest text-xs border-primary/40 hover:border-primary"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t("auth.continueGoogle")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
