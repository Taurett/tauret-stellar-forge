
import { Button } from "@/components/ui/button";
import { Zap, Target, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import sportEliteLogo from "@/assets/sportelite-logo.jpg";


const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-600/10"></div>
      <div className="absolute top-20 left-10 text-blue-600/30 animate-pulse">
        <Trophy size={80} />
      </div>
      <div className="absolute bottom-32 right-16 text-blue-400/30 animate-pulse delay-1000">
        <Target size={60} />
      </div>
      <div className="absolute top-1/3 right-20 text-blue-700/20 animate-pulse delay-500">
        <Zap size={100} />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 flex items-center justify-center">
              <img 
                src={sportEliteLogo} 
                alt="SportElite Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-blue-600/20 blur-xl"></div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent">
          SPORTELITE
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-4 leading-relaxed font-semibold">
          {t('hero.tagline')}
        </p>
        
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/25 uppercase tracking-wider"
          >
            {t('hero.shopCollection')}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-none transition-all duration-300 hover:scale-105 uppercase tracking-wider"
          >
            {t('hero.viewCatalog')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
