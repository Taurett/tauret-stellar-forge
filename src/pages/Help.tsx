import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ChevronDown, HelpCircle, Truck, RotateCcw, CreditCard, Ruler, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TKey } from "@/contexts/LanguageContext";
import { useSeo } from "@/hooks/useSeo";
import TrustBadges from "@/components/TrustBadges";

interface FaqItem { q: TKey; a: TKey; }
interface FaqCategory { id: string; titleKey: TKey; icon: typeof HelpCircle; items: FaqItem[]; }

const categories: FaqCategory[] = [
  {
    id: "shipping",
    titleKey: "help.cat.shipping",
    icon: Truck,
    items: [
      { q: "help.q.shipTime",   a: "help.a.shipTime" },
      { q: "help.q.shipCost",   a: "help.a.shipCost" },
      { q: "help.q.shipWhere",  a: "help.a.shipWhere" },
      { q: "help.q.shipTrack",  a: "help.a.shipTrack" },
    ],
  },
  {
    id: "returns",
    titleKey: "help.cat.returns",
    icon: RotateCcw,
    items: [
      { q: "help.q.returnWindow", a: "help.a.returnWindow" },
      { q: "help.q.returnHow",    a: "help.a.returnHow" },
      { q: "help.q.refundTime",   a: "help.a.refundTime" },
      { q: "help.q.exchange",     a: "help.a.exchange" },
    ],
  },
  {
    id: "orders",
    titleKey: "help.cat.orders",
    icon: Package,
    items: [
      { q: "help.q.guest",      a: "help.a.guest" },
      { q: "help.q.orderEdit",  a: "help.a.orderEdit" },
      { q: "help.q.orderCancel",a: "help.a.orderCancel" },
    ],
  },
  {
    id: "payments",
    titleKey: "help.cat.payments",
    icon: CreditCard,
    items: [
      { q: "help.q.payMethods", a: "help.a.payMethods" },
      { q: "help.q.paySecure",  a: "help.a.paySecure" },
      { q: "help.q.currency",   a: "help.a.currency" },
    ],
  },
  {
    id: "sizing",
    titleKey: "help.cat.sizing",
    icon: Ruler,
    items: [
      { q: "help.q.sizeGuide", a: "help.a.sizeGuide" },
      { q: "help.q.fit",       a: "help.a.fit" },
    ],
  },
];

const Help = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState<string | null>(null);

  useSeo({
    title: "Help Center & FAQ — TAURET",
    description:
      "Find answers about shipping, returns, sizing, payments, and orders. TAURET customer help center.",
    canonical: "/help",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: categories.flatMap((c) =>
          c.items.map((i) => ({
            "@type": "Question",
            name: t(i.q),
            acceptedAnswer: { "@type": "Answer", text: t(i.a) },
          })),
        ),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t("shop.backHome")}
        </Link>

        <div className="text-center mb-12">
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">
            {t("help.kicker")}
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">
            <span className="text-aurora">{t("help.title")}</span>
          </h1>
          <p className="font-tech text-sm text-muted-foreground tracking-wide max-w-2xl mx-auto">
            {t("help.subtitle")}
          </p>
        </div>

        <TrustBadges variant="grid" className="mb-12" />

        <div className="space-y-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  <h2
                    id={`cat-${cat.id}`}
                    className="font-display text-xl font-bold uppercase tracking-wider text-foreground"
                  >
                    {t(cat.titleKey)}
                  </h2>
                </div>
                <div className="space-y-2">
                  {cat.items.map((it) => {
                    const key = `${cat.id}-${it.q}`;
                    const isOpen = open === key;
                    return (
                      <div
                        key={key}
                        className="glass border border-primary/15 clip-angle overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-primary/5 transition-colors"
                        >
                          <span className="font-tech text-sm text-foreground">
                            {t(it.q)}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-primary shrink-0 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-0 font-tech text-sm text-muted-foreground leading-relaxed border-t border-primary/10">
                            <p className="pt-3 whitespace-pre-line">{t(it.a)}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 glass clip-angle-lg border border-primary/20 p-8 text-center">
          <h3 className="font-display text-2xl font-bold uppercase mb-2">
            {t("help.stillNeed.title")}
          </h3>
          <p className="font-tech text-sm text-muted-foreground mb-6">
            {t("help.stillNeed.desc")}
          </p>
          <a
            href="mailto:info@tauret.com"
            className="inline-block bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest px-8 py-3 clip-angle hover:shadow-neon-cyan transition-all"
          >
            info@tauret.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;
