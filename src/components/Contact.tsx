import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 px-4">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="font-tech text-xs uppercase tracking-[0.4em] text-primary mb-3">// Contact</div>
          <h2 className="font-display text-5xl md:text-7xl font-black mb-6">
            <span className="text-aurora">{t('contact.title')}</span>
          </h2>
          <p className="font-tech text-lg text-muted-foreground tracking-wide">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="glass clip-angle-lg p-8 md:p-12 border border-primary/20">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-tech text-xs uppercase tracking-[0.25em] text-primary mb-3">
                  {t('contact.name')}
                </label>
                <Input
                  className="bg-input/60 border-primary/20 text-foreground focus-visible:border-primary focus-visible:ring-primary/30 h-12"
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>
              <div>
                <label className="block font-tech text-xs uppercase tracking-[0.25em] text-primary mb-3">
                  {t('contact.email')}
                </label>
                <Input
                  type="email"
                  className="bg-input/60 border-primary/20 text-foreground focus-visible:border-primary focus-visible:ring-primary/30 h-12"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label className="block font-tech text-xs uppercase tracking-[0.25em] text-primary mb-3">
                {t('contact.message')}
              </label>
              <Textarea
                className="bg-input/60 border-primary/20 text-foreground focus-visible:border-primary focus-visible:ring-primary/30 min-h-32"
                placeholder={t('contact.messagePlaceholder')}
              />
            </div>

            <div className="text-center pt-4">
              <Button
                size="lg"
                className="bg-gradient-neon text-primary-foreground font-tech font-bold uppercase tracking-widest px-12 py-6 clip-angle hover:shadow-neon-cyan transition-all duration-500"
              >
                <Send className="w-4 h-4 mr-2" />
                {t('contact.sendMessage')}
              </Button>
            </div>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Mail,          title: t('contact.emailLabel'),    value: 'info@tauret.com' },
            { icon: MessageCircle, title: t('contact.support'),       value: t('contact.supportDesc') },
            { icon: MapPin,        title: t('contact.trainingCenter'), value: t('contact.trainingCenterDesc') },
          ].map(({ icon: Icon, title, value }, idx) => (
            <div key={idx} className="glass clip-angle p-6 text-center border border-primary/20">
              <Icon className="w-7 h-7 text-primary mx-auto mb-3" strokeWidth={1.5} />
              <h4 className="font-tech text-xs uppercase tracking-[0.25em] text-primary mb-2">{title}</h4>
              <p className="text-foreground text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
