
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent uppercase">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-900 border-red-600/30 hover:border-red-500/60 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Target className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-500 uppercase">{t('about.mission')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('about.missionDesc')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-red-600/30 hover:border-red-500/60 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-500 uppercase">{t('about.fightingSpirit')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('about.fightingSpiritDesc')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-red-600/30 hover:border-red-500/60 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-red-500 uppercase">{t('about.warriorCommunity')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('about.warriorCommunityDesc')}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <blockquote className="text-2xl md:text-3xl italic text-red-400 max-w-4xl mx-auto leading-relaxed font-bold">
            "{t('about.quote')}"
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default About;
