import { Card, CardContent } from "@/components/ui/card";
import { 
  Dumbbell, 
  Bike, 
  CircleDot, 
  Circle, 
  Target, 
  Zap,
  Activity
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SportCategories = () => {
  const { t } = useLanguage();

  const categories = [
    { 
      id: 'tennis', 
      name: t('categories.tennis'), 
      icon: CircleDot, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/30'
    },
    { 
      id: 'padel', 
      name: t('categories.padel'), 
      icon: Activity, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30'
    },
    { 
      id: 'football', 
      name: t('categories.football'), 
      icon: Circle, 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30'
    },
    { 
      id: 'basketball', 
      name: t('categories.basketball'), 
      icon: CircleDot, 
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/30'
    },
    { 
      id: 'handball', 
      name: t('categories.handball'), 
      icon: Circle, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30'
    },
    { 
      id: 'cycling', 
      name: t('categories.cycling'), 
      icon: Bike, 
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/30'
    },
    { 
      id: 'gym-fitness', 
      name: t('categories.gymFitness'), 
      icon: Dumbbell, 
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30'
    },
    { 
      id: 'airsoft', 
      name: t('categories.airsoft'), 
      icon: Target, 
      color: 'from-gray-600 to-gray-700',
      bgColor: 'bg-gray-50 dark:bg-gray-950/30'
    }
  ];

  return (
    <section id="categories" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('categories.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('categories.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className={`${category.bgColor} hover:shadow-lg transition-all duration-300 cursor-pointer group border-none`}
                onClick={() => window.location.href = `/shop?category=${category.id}`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SportCategories;