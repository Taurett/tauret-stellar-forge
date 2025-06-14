
import { Shield, Eye, Crown, Zap, Lock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Divine Protection",
      description: "Ancient guardian spirits shield your digital presence from harm with mystical barriers."
    },
    {
      icon: Eye,
      title: "Watchful Vision",
      description: "All-seeing awareness monitors threats before they manifest in your realm."
    },
    {
      icon: Crown,
      title: "Royal Authority",
      description: "Command respect and maintain sovereignty over your digital kingdom."
    },
    {
      icon: Zap,
      title: "Swift Response",
      description: "Lightning-fast reactions to neutralize dangers with divine efficiency."
    },
    {
      icon: Lock,
      title: "Sacred Encryption",
      description: "Mystical ciphers protect your secrets with ancient mathematical wisdom."
    },
    {
      icon: Star,
      title: "Celestial Guidance",
      description: "Navigate the digital cosmos with starlight illuminating your path."
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
            Powers of the Guardian
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Discover the ancient abilities that make Tauret the most trusted protector in the digital realm.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <feature.icon className="w-12 h-12 text-amber-400" />
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-amber-300">
                  {feature.title}
                </h3>
                <p className="text-blue-100 leading-relaxed">
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
