
import { Card, CardContent } from "@/components/ui/card";
import { Scroll, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
            The Legend of Tauret
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Born from ancient wisdom and forged in digital fire, Tauret stands as the eternal guardian between worlds, 
            protecting those who seek shelter in the vast expanse of cyberspace.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Scroll className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-amber-300">Ancient Origins</h3>
              <p className="text-blue-100 leading-relaxed">
                Rooted in millennia of protective wisdom, Tauret draws power from the sacred knowledge of guardian spirits who have watched over humanity since time immemorial.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Heart className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-amber-300">Sacred Mission</h3>
              <p className="text-blue-100 leading-relaxed">
                To serve as the bridge between ancient protective wisdom and modern digital needs, ensuring safe passage through the ever-evolving landscape of technology.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-amber-300">Trusted Guardian</h3>
              <p className="text-blue-100 leading-relaxed">
                Chosen by thousands who seek not just protection, but a companion spirit that understands the delicate balance between power and wisdom.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <blockquote className="text-2xl md:text-3xl italic text-amber-200 max-w-4xl mx-auto leading-relaxed">
            "In the realm where code meets consciousness, where algorithms dance with ancient wisdom, 
            there stands Tauret—eternal, vigilant, and forever devoted to those under her protection."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default About;
