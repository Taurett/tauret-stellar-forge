
import { Button } from "@/components/ui/button";
import { Zap, Target, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import tauretLogo from "@/assets/tauret-logo-official.jpg";


const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-sky-600/10"></div>
      <div className="absolute top-20 left-10 text-cyan-500/30 animate-pulse">
        <Trophy size={80} />
      </div>
      <div className="absolute bottom-32 right-16 text-sky-400/30 animate-pulse delay-1000">
        <Target size={60} />
      </div>
      <div className="absolute top-1/3 right-20 text-cyan-600/20 animate-pulse delay-500">
        <Zap size={100} />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 flex items-center justify-center">
              <img 
                src={tauretLogo} 
                alt="Tauret Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl"></div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 bg-clip-text text-transparent">
          TAURET
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-4 leading-relaxed font-semibold">
          {t('hero.tagline')}
        </p>
        
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          {t('hero.description')}
        </p>
        
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 uppercase tracking-wider"
            onClick={() => window.location.href = '/shop'}
          >
            {t('hero.shopCollection')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
