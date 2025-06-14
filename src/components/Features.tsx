
import { Shield, Zap, Trophy, Target, Flame, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('features.combatProtection'),
      description: t('features.combatProtectionDesc')
    },
    {
      icon: Zap,
      title: t('features.lightningSpeed'),
      description: t('features.lightningSpeedDesc')
    },
    {
      icon: Trophy,
      title: t('features.championQuality'),
      description: t('features.championQualityDesc')
    },
    {
      icon: Target,
      title: t('features.precisionFit'),
      description: t('features.precisionFitDesc')
    },
    {
      icon: Flame,
      title: t('features.warriorSpirit'),
      description: t('features.warriorSpiritDesc')
    },
    {
      icon: Star,
      title: t('features.elitePerformance'),
      description: t('features.elitePerformanceDesc')
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent uppercase">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-black border-red-600/30 hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <feature.icon className="w-12 h-12 text-red-500" />
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-red-500 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
