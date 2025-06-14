
import { Button } from "@/components/ui/button";
import { Zap, Target, Trophy } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-600/10"></div>
      <div className="absolute top-20 left-10 text-red-600/30 animate-pulse">
        <Trophy size={80} />
      </div>
      <div className="absolute bottom-32 right-16 text-red-400/30 animate-pulse delay-1000">
        <Target size={60} />
      </div>
      <div className="absolute top-1/3 right-20 text-red-700/20 animate-pulse delay-500">
        <Zap size={100} />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Bull logo placeholder - replace with actual logo */}
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-3xl">🐂</span>
            </div>
            <div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
          TAURET
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-4 leading-relaxed font-semibold">
          UNLEASH YOUR INNER FIGHTER
        </p>
        
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Premium contact sports apparel for K1, kickboxing, and martial arts warriors.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/25 uppercase tracking-wider"
          >
            Shop Collection
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-none transition-all duration-300 hover:scale-105 uppercase tracking-wider"
          >
            View Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
