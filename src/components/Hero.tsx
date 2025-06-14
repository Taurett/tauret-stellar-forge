
import { Button } from "@/components/ui/button";
import { Shield, Star, Crown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-amber-900/20"></div>
      <div className="absolute top-20 left-10 text-amber-400/30 animate-pulse">
        <Crown size={80} />
      </div>
      <div className="absolute bottom-32 right-16 text-blue-400/30 animate-pulse delay-1000">
        <Star size={60} />
      </div>
      <div className="absolute top-1/3 right-20 text-amber-500/20 animate-pulse delay-500">
        <Shield size={100} />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Shield className="w-24 h-24 text-amber-400 animate-pulse" />
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent animate-fade-in">
          Tauret
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed animate-fade-in delay-300">
          Ancient wisdom meets modern protection. Experience the guardian spirit that watches over your digital realm.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
          >
            Begin Your Journey
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
