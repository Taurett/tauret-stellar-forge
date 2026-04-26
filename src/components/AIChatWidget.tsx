/**
 * AIChatWidget — floating chat button + panel powered by the ai-chat edge function.
 * Streams responses via SSE, persists conversation history in localStorage, and
 * supports markdown-style bold/lists in assistant replies.
 */
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client-config";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "tauret.aichat.v1";

const readHistory = (): ChatMessage[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
};

const writeHistory = (msgs: ChatMessage[]) => {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-30))); } catch { /* noop */ }
};

// Lightweight markdown renderer — bolds **text** and bullets `- item`.
const renderMarkdown = (text: string): string => {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "• $1")
    .replace(/\n/g, "<br/>");
};

const AIChatWidget = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(readHistory);
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => { writeHistory(messages); }, [messages]);

  // Auto-scroll on new content.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  // Cleanup any stream on unmount.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/ai-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!resp.ok || !resp.body) {
        const errText = await resp.text().catch(() => "");
        let errMsg = t("chat.error") || "Sorry — I couldn't reach the assistant. Please try again.";
        try { const j = JSON.parse(errText); if (j.error) errMsg = j.error; } catch { /* noop */ }
        setMessages((curr) => {
          const copy = [...curr];
          copy[copy.length - 1] = { role: "assistant", content: errMsg };
          return copy;
        });
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // SSE frames separated by double newline.
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              assistantText += delta;
              setMessages((curr) => {
                const copy = [...curr];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch { /* skip malformed frame */ }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      console.error("ai-chat stream error", err);
      setMessages((curr) => {
        const copy = [...curr];
        copy[copy.length - 1] = { role: "assistant", content: t("chat.error") || "Sorry — something went wrong." };
        return copy;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    writeHistory([]);
  };

  return (
    <>
      {/* Floating launcher — sits above mobile bottom nav. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        className={cn(
          "fixed z-50 right-4 bottom-20 md:bottom-6 w-14 h-14 rounded-full",
          "bg-gradient-neon text-primary-foreground shadow-neon-cyan",
          "flex items-center justify-center transition-transform hover:scale-110",
          "border-2 border-primary/40",
        )}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="AI Chat Assistant"
          className={cn(
            "fixed z-50 right-2 left-2 md:left-auto md:right-6 bottom-36 md:bottom-24",
            "md:w-96 max-h-[70vh] flex flex-col",
            "glass clip-angle-lg border border-primary/30 bg-background/95 backdrop-blur-xl",
            "shadow-2xl shadow-primary/20",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-tech text-xs uppercase tracking-[0.25em] text-primary">
                {t("chat.title") || "AI Assistant"}
              </span>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearChat}
                className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary"
              >
                {t("chat.clear") || "Clear"}
              </button>
            )}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-3" viewportRef={scrollRef}>
            {messages.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <Sparkles className="w-10 h-10 text-primary mx-auto" />
                <p className="font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t("chat.welcome") || "Ask me about products, sizing, shipping or returns."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "max-w-[85%] px-3 py-2 rounded-md text-sm leading-relaxed",
                      m.role === "user"
                        ? "ml-auto bg-primary/15 border border-primary/30 text-foreground"
                        : "mr-auto bg-muted/40 border border-primary/10 text-foreground",
                    )}
                  >
                    {m.role === "assistant" && !m.content && streaming ? (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 p-3 border-t border-primary/20"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder") || "Type your question..."}
              disabled={streaming}
              className="bg-input/60 border-primary/20 h-10 font-tech text-sm"
              aria-label="Chat message"
            />
            <Button
              type="submit"
              size="icon"
              disabled={streaming || !input.trim()}
              className="bg-gradient-neon text-primary-foreground hover:shadow-neon-cyan h-10 w-10 shrink-0"
            >
              {streaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
