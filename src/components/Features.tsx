import { Activity, Zap, Trophy, Target, Heart, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Activity, title: t('features.combatProtection'), description: t('features.combatProtectionDesc') },
    { icon: Zap,      title: t('features.lightningSpeed'),   description: t('features.lightningSpeedDesc') },
    { icon: Trophy,   title: t('features.championQuality'),  description: t('features.championQualityDesc') },
    { icon: Target,   title: t('features.precisionFit'),     description: t('features.precisionFitDesc') },
    { icon: Heart,    title: t('features.warriorSpirit'),    description: t('features.warriorSpiritDesc') },
    { icon: Star,     title: t('features.elitePerformance'), description: t('features.elitePerformanceDesc') },
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">{t('features.kicker')}</div>
          <h2 className="font-display text-5xl md:text-7xl font-black mb-6">
            <span className="text-aurora">{t('features.title')}</span>
          </h2>
          <p className="font-tech text-lg text-muted-foreground max-w-2xl mx-auto tracking-wide">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative glass clip-angle-lg p-8 border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-neon-cyan"
              >
                <div className="absolute top-0 right-0 font-display font-black text-7xl text-primary/5 group-hover:text-primary/10 transition-colors p-4">
                  0{idx + 1}
                </div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-full bg-background/60 border border-primary/30 group-hover:border-primary group-hover:shadow-neon-cyan transition-all duration-500">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-foreground uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
