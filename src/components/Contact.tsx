
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent uppercase">
            Join the Fight
          </h2>
          <p className="text-xl text-gray-300">
            Ready to gear up? Get in touch with the Tauret team and unleash your potential.
          </p>
        </div>
        
        <Card className="bg-black border-red-600/30">
          <CardContent className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-red-500 font-bold mb-2 uppercase tracking-wide">Name</label>
                  <Input 
                    className="bg-gray-800 border-red-600/50 text-white focus:border-red-500 focus:ring-red-500/20 rounded-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-red-500 font-bold mb-2 uppercase tracking-wide">Email</label>
                  <Input 
                    type="email"
                    className="bg-gray-800 border-red-600/50 text-white focus:border-red-500 focus:ring-red-500/20 rounded-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-red-500 font-bold mb-2 uppercase tracking-wide">Message</label>
                <Textarea 
                  className="bg-gray-800 border-red-600/50 text-white focus:border-red-500 focus:ring-red-500/20 min-h-32 rounded-none"
                  placeholder="Tell us about your training needs..."
                />
              </div>
              
              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/25 uppercase tracking-wider"
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
            <Mail className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-red-500 mb-2 uppercase">Email</h4>
            <p className="text-gray-300">info@tauret.com</p>
          </div>
          <div className="text-center">
            <MessageCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-red-500 mb-2 uppercase">Support</h4>
            <p className="text-gray-300">24/7 Fighter Support</p>
          </div>
          <div className="text-center">
            <MapPin className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-red-500 mb-2 uppercase">Training Center</h4>
            <p className="text-gray-300">Professional Gear Testing</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
