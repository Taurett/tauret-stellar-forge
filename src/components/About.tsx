import { Target, Heart, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const cards = [
    { icon: Target, title: t('about.mission'),         desc: t('about.missionDesc') },
    { icon: Heart,  title: t('about.fightingSpirit'),  desc: t('about.fightingSpiritDesc') },
    { icon: Users,  title: t('about.warriorCommunity'), desc: t('about.warriorCommunityDesc') },
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">// About</div>
          <h2 className="font-display text-5xl md:text-7xl font-black mb-6">
            <span className="text-aurora">{t('about.title')}</span>
          </h2>
          <p className="font-tech text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed tracking-wide">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {cards.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="group glass clip-angle-lg p-8 border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-full bg-gradient-neon shadow-neon-cyan">
                <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={2} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground uppercase tracking-wide">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <blockquote className="text-center max-w-4xl mx-auto">
          <div className="font-display text-6xl text-primary/30 leading-none mb-4">"</div>
          <p className="font-display text-2xl md:text-3xl text-foreground italic leading-relaxed">
            {t('about.quote')}
          </p>
          <div className="mt-6 mx-auto w-20 h-0.5 bg-gradient-neon" />
        </blockquote>
      </div>
    </section>
  );
};

export default About;
