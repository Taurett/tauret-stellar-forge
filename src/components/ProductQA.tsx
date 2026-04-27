/**
 * ProductQA — customer Q&A section on product detail.
 * Logged-in users can ask & answer; everything goes through admin moderation.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Send, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProductQA } from "@/hooks/useProductQA";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ProductQAProps {
  productId: number;
}

const ProductQA = ({ productId }: ProductQAProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { questions, loading, reload } = useProductQA(productId);
  const [newQuestion, setNewQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [answerDraft, setAnswerDraft] = useState<Record<string, string>>({});
  const [answeringFor, setAnsweringFor] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!user) return;
    const body = newQuestion.trim();
    if (body.length < 5) {
      toast({ title: t("qa.tooShort") || "Question too short", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const displayName = user.user_metadata?.display_name
      || user.user_metadata?.full_name
      || user.email?.split("@")[0]
      || null;
    const { error } = await supabase.from("product_questions").insert({
      product_id: productId,
      user_id: user.id,
      display_name: displayName,
      body,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: t("qa.submitError") || "Failed to submit", description: error.message, variant: "destructive" });
      return;
    }
    setNewQuestion("");
    toast({
      title: t("qa.submitted") || "Question submitted",
      description: t("qa.submittedDesc") || "It will appear once approved by our team.",
    });
    reload();
  };

  const handleAnswer = async (questionId: string) => {
    if (!user) return;
    const body = (answerDraft[questionId] || "").trim();
    if (body.length < 3) return;
    const displayName = user.user_metadata?.display_name
      || user.user_metadata?.full_name
      || user.email?.split("@")[0]
      || null;
    const { error } = await supabase.from("product_answers").insert({
      question_id: questionId,
      user_id: user.id,
      display_name: displayName,
      body,
    });
    if (error) {
      toast({ title: t("qa.submitError") || "Failed", description: error.message, variant: "destructive" });
      return;
    }
    setAnswerDraft((d) => ({ ...d, [questionId]: "" }));
    setAnsweringFor(null);
    toast({
      title: t("qa.answerSubmitted") || "Answer submitted",
      description: t("qa.submittedDesc") || "It will appear once approved by our team.",
    });
    reload();
  };

  return (
    <section className="mt-12">
      <header className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h2 className="font-display text-2xl md:text-3xl font-black uppercase">
          <span className="text-aurora">{t("qa.title") || "Questions & Answers"}</span>
        </h2>
        <span className="ml-auto font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {questions.length} {questions.length === 1 ? (t("qa.question") || "question") : (t("qa.questions") || "questions")}
        </span>
      </header>

      {/* Ask form */}
      {user ? (
        <div className="glass clip-angle-lg p-5 border border-primary/20 mb-8">
          <label className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
            {t("qa.askLabel") || "Ask a question about this product"}
          </label>
          <Textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder={t("qa.askPlaceholder") || "What do you want to know?"}
            rows={3}
            maxLength={500}
            className="bg-input/60 border-primary/20"
          />
          <div className="flex justify-end mt-3">
            <Button
              onClick={handleAsk}
              disabled={submitting || newQuestion.trim().length < 5}
              className="bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest text-xs clip-angle"
            >
              <Send className="w-3 h-3 mr-2" />
              {submitting ? (t("qa.submitting") || "Submitting…") : (t("qa.ask") || "Ask Question")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="glass clip-angle p-4 border border-primary/20 mb-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            {t("qa.signInToAsk") || "Sign in to ask a question."}
          </p>
          <Link to="/auth">
            <Button variant="outline" className="glass border-primary/30 font-tech uppercase tracking-widest text-xs clip-angle">
              {t("qa.signIn") || "Sign In"}
            </Button>
          </Link>
        </div>
      )}

      {/* Questions list */}
      {loading ? (
        <div className="text-center py-8 font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground">…</div>
      ) : questions.length === 0 ? (
        <div className="glass clip-angle-lg p-8 border border-primary/20 text-center">
          <p className="text-muted-foreground">
            {t("qa.noQuestions") || "No questions yet. Be the first to ask!"}
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {questions.map((q) => (
            <li key={q.id} className="glass clip-angle-lg p-5 border border-primary/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-tech text-xs font-bold uppercase tracking-wider">
                      {q.display_name || (t("qa.anon") || "Customer")}
                    </span>
                    <span className="font-tech text-[10px] text-muted-foreground">
                      · {new Date(q.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{q.body}</p>
                </div>
              </div>

              {/* Answers */}
              {q.answers.length > 0 && (
                <ul className="space-y-3 mt-4 pl-4 border-l-2 border-primary/20">
                  {q.answers.map((a) => (
                    <li key={a.id} className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full ${a.is_admin_answer ? "bg-gradient-neon" : "bg-primary/10 border border-primary/20"} flex items-center justify-center shrink-0`}>
                        {a.is_admin_answer
                          ? <Shield className="w-3.5 h-3.5 text-primary-foreground" />
                          : <User className="w-3.5 h-3.5 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-tech text-[11px] font-bold uppercase tracking-wider">
                            {a.is_admin_answer ? "TAURET" : (a.display_name || (t("qa.anon") || "Customer"))}
                          </span>
                          {a.is_admin_answer && (
                            <span className="font-tech text-[9px] uppercase tracking-widest text-primary">
                              {t("qa.official") || "Official"}
                            </span>
                          )}
                          <span className="font-tech text-[10px] text-muted-foreground">
                            · {new Date(a.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Reply form */}
              {user && (
                answeringFor === q.id ? (
                  <div className="mt-4">
                    <Textarea
                      value={answerDraft[q.id] || ""}
                      onChange={(e) => setAnswerDraft((d) => ({ ...d, [q.id]: e.target.value }))}
                      placeholder={t("qa.answerPlaceholder") || "Share what you know…"}
                      rows={2}
                      maxLength={500}
                      className="bg-input/60 border-primary/20"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAnsweringFor(null)}
                        className="font-tech text-[10px] uppercase tracking-widest"
                      >
                        {t("qa.cancel") || "Cancel"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAnswer(q.id)}
                        disabled={(answerDraft[q.id] || "").trim().length < 3}
                        className="bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest text-[10px] clip-angle"
                      >
                        {t("qa.submitAnswer") || "Submit Answer"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAnsweringFor(q.id)}
                    className="mt-3 font-tech text-[10px] uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors"
                  >
                    + {t("qa.reply") || "Reply"}
                  </button>
                )
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductQA;
