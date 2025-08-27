import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Percent } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PromotionalBanner = () => {
  const { t } = useLanguage();

  const promotions = [
    {
      id: 'sale',
      title: t('promotions.sale.title'),
      description: t('promotions.sale.description'),
      badge: 'UP TO 70% OFF',
      icon: Percent,
      bgGradient: 'bg-gradient-to-r from-red-500 to-red-600',
      ctaText: t('promotions.sale.cta'),
      link: '/shop?sale=true'
    },
    {
      id: 'new-arrivals',
      title: t('promotions.newArrivals.title'),
      description: t('promotions.newArrivals.description'),
      badge: 'NEW',
      icon: Zap,
      bgGradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
      ctaText: t('promotions.newArrivals.cta'),
      link: '/shop?new=true'
    },
    {
      id: 'limited-time',
      title: t('promotions.limitedTime.title'),
      description: t('promotions.limitedTime.description'),
      badge: 'LIMITED TIME',
      icon: Clock,
      bgGradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
      ctaText: t('promotions.limitedTime.cta'),
      link: '/shop?limited=true'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {promotions.map((promo, index) => {
            const IconComponent = promo.icon;
            return (
              <div
                key={promo.id}
                className={`relative ${promo.bgGradient} rounded-lg p-6 text-white overflow-hidden group cursor-pointer`}
                onClick={() => window.location.href = promo.link}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 transform rotate-12 translate-x-8 -translate-y-8">
                  <IconComponent size={128} />
                </div>
                
                <div className="relative z-10">
                  <Badge 
                    variant="secondary" 
                    className="mb-3 bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    {promo.badge}
                  </Badge>
                  
                  <h3 className="text-xl font-bold mb-2">
                    {promo.title}
                  </h3>
                  
                  <p className="text-white/90 mb-4 text-sm">
                    {promo.description}
                  </p>
                  
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-white/90 font-semibold"
                  >
                    {promo.ctaText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;