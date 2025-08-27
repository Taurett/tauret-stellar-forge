
import { Button } from "@/components/ui/button";
import { Zap, Target, Trophy, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import tauretLogo from "@/assets/tauret-logo-official.jpg";
import sportsHeroBg from "@/assets/sports-hero-bg.jpg";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${sportsHeroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 text-primary/20 animate-pulse">
        <Trophy size={80} className="animate-[fade-in_2s_ease-out]" />
      </div>
      <div className="absolute bottom-32 right-16 text-primary/20 animate-pulse delay-1000">
        <Target size={60} className="animate-[fade-in_2s_ease-out_1s]" />
      </div>
      <div className="absolute top-1/3 right-20 text-primary/15 animate-pulse delay-500">
        <Zap size={100} className="animate-[fade-in_2s_ease-out_0.5s]" />
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Main Title */}
        <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-primary via-cyan-300 to-primary bg-clip-text text-transparent animate-[fade-in_1s_ease-out_0.3s] animate-[scale-in_0.8s_ease-out_0.3s]">
          TAURET
        </h1>
        
        {/* Tagline */}
        <div className="animate-[fade-in_1s_ease-out_0.6s]">
          <p className="text-2xl md:text-4xl text-white mb-4 leading-relaxed font-bold tracking-wide">
            {t('hero.tagline')}
          </p>
        </div>
        
        {/* Description */}
        <div className="animate-[fade-in_1s_ease-out_0.9s]">
          <p className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-[fade-in_1s_ease-out_1.2s]">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-cyan-600 hover:from-cyan-600 hover:to-primary text-white font-bold px-12 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 uppercase tracking-wider group"
            onClick={() => window.location.href = '/shop'}
          >
            <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
            {t('hero.shopCollection')}
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 uppercase tracking-wider backdrop-blur-sm bg-white/10"
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Sports
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
