import { Button } from "@/components/ui/button";
import { Zap, Clock, Percent, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PromotionalBanner = () => {
  const { t } = useLanguage();

  const promotions = [
    {
      id: 'sale',
      title: t('promotions.sale.title'),
      description: t('promotions.sale.description'),
      badge: 'UP TO 70% OFF',
      icon: Percent,
      accent: 'from-secondary/30 to-secondary/5',
      glow: 'shadow-neon-magenta',
      iconColor: 'text-secondary',
      ctaText: t('promotions.sale.cta'),
      link: '/shop?sale=true'
    },
    {
      id: 'new-arrivals',
      title: t('promotions.newArrivals.title'),
      description: t('promotions.newArrivals.description'),
      badge: 'JUST DROPPED',
      icon: Zap,
      accent: 'from-primary/30 to-primary/5',
      glow: 'shadow-neon-cyan',
      iconColor: 'text-primary',
      ctaText: t('promotions.newArrivals.cta'),
      link: '/shop?new=true'
    },
    {
      id: 'limited-time',
      title: t('promotions.limitedTime.title'),
      description: t('promotions.limitedTime.description'),
      badge: 'LIMITED',
      icon: Clock,
      accent: 'from-accent/30 to-accent/5',
      glow: 'shadow-[0_0_30px_hsl(var(--accent)/0.5)]',
      iconColor: 'text-accent',
      ctaText: t('promotions.limitedTime.cta'),
      link: '/shop?limited=true'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {promotions.map((promo) => {
            const Icon = promo.icon;
            return (
              <button
                key={promo.id}
                onClick={() => window.location.href = promo.link}
                className={`group relative overflow-hidden text-left glass clip-angle-lg p-8 border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 hover:${promo.glow}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${promo.accent} opacity-50`} />
                <Icon className={`absolute -bottom-4 -right-4 w-32 h-32 ${promo.iconColor} opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700`} strokeWidth={1} />

                <div className="relative">
                  <div className={`inline-block px-3 py-1 mb-4 font-tech text-[10px] uppercase tracking-[0.25em] border border-current ${promo.iconColor}`}>
                    {promo.badge}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3 uppercase tracking-wide">
                    {promo.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {promo.description}
                  </p>
                  <div className={`inline-flex items-center font-tech text-sm uppercase tracking-widest font-bold ${promo.iconColor} group-hover:gap-3 gap-2 transition-all`}>
                    {promo.ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
