
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Shield } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
            Seek Audience with Tauret
          </h2>
          <p className="text-xl text-blue-200">
            The guardian awaits your call. Share your quest and receive divine guidance.
          </p>
        </div>
        
        <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border-amber-500/20 backdrop-blur-sm">
          <CardContent className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-300 font-medium mb-2">Your Name</label>
                  <Input 
                    className="bg-slate-700/50 border-amber-500/30 text-blue-100 focus:border-amber-400 focus:ring-amber-400/20"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-amber-300 font-medium mb-2">Your Email</label>
                  <Input 
                    type="email"
                    className="bg-slate-700/50 border-amber-500/30 text-blue-100 focus:border-amber-400 focus:ring-amber-400/20"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-amber-300 font-medium mb-2">Your Message</label>
                <Textarea 
                  className="bg-slate-700/50 border-amber-500/30 text-blue-100 focus:border-amber-400 focus:ring-amber-400/20 min-h-32"
                  placeholder="Share your quest or inquiry..."
                />
              </div>
              
              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <Mail className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-amber-300 mb-2">Direct Contact</h4>
            <p className="text-blue-200">guardian@tauret.com</p>
          </div>
          <div className="text-center">
            <MessageCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-amber-300 mb-2">Live Support</h4>
            <p className="text-blue-200">24/7 Guardian Assistance</p>
          </div>
          <div className="text-center">
            <Shield className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-amber-300 mb-2">Sacred Promise</h4>
            <p className="text-blue-200">Your privacy is protected</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
