/**
 * /admin/qa — moderate product Q&A submissions.
 */
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Check, MessageCircle, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/useSeo";

type Status = "pending" | "approved" | "rejected";

interface QRow {
  id: string;
  product_id: number;
  display_name: string | null;
  body: string;
  status: Status;
  created_at: string;
}
interface ARow {
  id: string;
  question_id: string;
  display_name: string | null;
  body: string;
  is_admin_answer: boolean;
  status: Status;
  created_at: string;
}

const AdminQA = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [tab, setTab] = useState<Status>("pending");
  const [questions, setQuestions] = useState<QRow[]>([]);
  const [answers, setAnswers] = useState<ARow[]>([]);
  const [reply, setReply] = useState<Record<string, string>>({});

  useSeo({ title: "Admin · Q&A · TAURET", noindex: true, canonical: "/admin/qa" });

  const load = async () => {
    const [qs, as] = await Promise.all([
      supabase.from("product_questions").select("*").eq("status", tab).order("created_at", { ascending: false }),
      supabase.from("product_answers").select("*").eq("status", tab).order("created_at", { ascending: false }),
    ]);
    setQuestions((qs.data ?? []) as QRow[]);
    setAnswers((as.data ?? []) as ARow[]);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, tab]);

  if (!authLoading && !user) return <Navigate to="/auth" replace />;
  if (!authLoading && !roleLoading && !isAdmin) return <Navigate to="/" replace />;

  const moderateQuestion = async (id: string, status: Status) => {
    await supabase.from("product_questions").update({ status }).eq("id", id);
    toast({ title: `Question ${status}` });
    load();
  };
  const moderateAnswer = async (id: string, status: Status) => {
    await supabase.from("product_answers").update({ status }).eq("id", id);
    toast({ title: `Answer ${status}` });
    load();
  };
  const deleteQuestion = async (id: string) => {
    if (!confirm("Delete this question and all answers?")) return;
    await supabase.from("product_questions").delete().eq("id", id);
    load();
  };
  const adminReply = async (questionId: string) => {
    if (!user) return;
    const body = (reply[questionId] || "").trim();
    if (body.length < 3) return;
    await supabase.from("product_answers").insert({
      question_id: questionId,
      user_id: user.id,
      display_name: "TAURET",
      body,
      is_admin_answer: true,
      status: "approved",
    });
    setReply((r) => ({ ...r, [questionId]: "" }));
    toast({ title: "Official answer posted" });
    load();
  };

  return (
    <div className="min-h-screen bg-background">
      <SearchBar />
      <LanguageSwitcher />
      <ThemeToggle />

      <main className="max-w-5xl mx-auto px-4 pt-32 pb-16">
        <Link to="/admin/orders" className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors mb-6">
          <ArrowLeft className="w-3 h-3" />
          Admin
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="w-6 h-6 text-primary" />
          <h1 className="font-display text-4xl font-black">
            <span className="text-aurora">Q&A Moderation</span>
          </h1>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as Status)} className="w-full">
          <TabsList className="glass border border-primary/20 p-1">
            <TabsTrigger value="pending" className="font-tech uppercase tracking-wider data-[state=active]:bg-gradient-neon data-[state=active]:text-primary-foreground">Pending</TabsTrigger>
            <TabsTrigger value="approved" className="font-tech uppercase tracking-wider data-[state=active]:bg-gradient-neon data-[state=active]:text-primary-foreground">Approved</TabsTrigger>
            <TabsTrigger value="rejected" className="font-tech uppercase tracking-wider data-[state=active]:bg-gradient-neon data-[state=active]:text-primary-foreground">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-6 space-y-6">
            <section>
              <h2 className="font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Questions ({questions.length})
              </h2>
              {questions.length === 0 ? (
                <div className="glass clip-angle p-6 border border-primary/20 text-center text-sm text-muted-foreground">No questions.</div>
              ) : (
                <ul className="space-y-3">
                  {questions.map((q) => (
                    <li key={q.id} className="glass clip-angle-lg p-5 border border-primary/20">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="font-tech text-[10px] uppercase tracking-widest text-primary">Product #{q.product_id}</span>
                          <span className="font-tech text-[10px] text-muted-foreground ml-2">{q.display_name || "anon"} · {new Date(q.created_at).toLocaleString()}</span>
                        </div>
                        <div className="flex gap-1">
                          {q.status !== "approved" && (
                            <Button onClick={() => moderateQuestion(q.id, "approved")} size="sm" variant="outline" className="glass border-primary/30 h-8">
                              <Check className="w-3 h-3" />
                            </Button>
                          )}
                          {q.status !== "rejected" && (
                            <Button onClick={() => moderateQuestion(q.id, "rejected")} size="sm" variant="outline" className="glass border-destructive/30 h-8">
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                          <Button onClick={() => deleteQuestion(q.id)} size="sm" variant="ghost" className="h-8 text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-foreground">{q.body}</p>
                      <div className="mt-3 flex gap-2">
                        <Textarea
                          placeholder="Post official answer…"
                          rows={2}
                          value={reply[q.id] || ""}
                          onChange={(e) => setReply((r) => ({ ...r, [q.id]: e.target.value }))}
                          className="bg-input/60 border-primary/20 text-sm"
                        />
                        <Button onClick={() => adminReply(q.id)} className="bg-gradient-neon text-primary-foreground font-tech uppercase tracking-widest text-[10px] clip-angle shrink-0">Reply</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Answers ({answers.length})
              </h2>
              {answers.length === 0 ? (
                <div className="glass clip-angle p-6 border border-primary/20 text-center text-sm text-muted-foreground">No answers.</div>
              ) : (
                <ul className="space-y-3">
                  {answers.map((a) => (
                    <li key={a.id} className="glass clip-angle p-4 border border-primary/20">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span className="font-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                          {a.is_admin_answer ? "Official" : (a.display_name || "anon")} · {new Date(a.created_at).toLocaleString()}
                        </span>
                        <div className="flex gap-1">
                          {a.status !== "approved" && (
                            <Button onClick={() => moderateAnswer(a.id, "approved")} size="sm" variant="outline" className="glass border-primary/30 h-7">
                              <Check className="w-3 h-3" />
                            </Button>
                          )}
                          {a.status !== "rejected" && (
                            <Button onClick={() => moderateAnswer(a.id, "rejected")} size="sm" variant="outline" className="glass border-destructive/30 h-7">
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-foreground">{a.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminQA;
