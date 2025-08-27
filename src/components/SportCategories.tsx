import { Card, CardContent } from "@/components/ui/card";
import { 
  Dumbbell, 
  Bike, 
  TreePine, 
  CircleDot, 
  Waves, 
  Trophy,
  Target,
  Shirt,
  Footprints,
  Users
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SportCategories = () => {
  const { t } = useLanguage();

  const categories = [
    { 
      id: 'gym-fitness', 
      name: t('categories.gymFitness'), 
      icon: Dumbbell, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30'
    },
    { 
      id: 'cycling', 
      name: t('categories.cycling'), 
      icon: Bike, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/30'
    },
    { 
      id: 'hiking', 
      name: t('categories.hiking'), 
      icon: TreePine, 
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30'
    },
    { 
      id: 'football', 
      name: t('categories.football'), 
      icon: CircleDot, 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30'
    },
    { 
      id: 'swimming', 
      name: t('categories.swimming'), 
      icon: Waves, 
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/30'
    },
    { 
      id: 'activewear', 
      name: t('categories.activewear'), 
      icon: Shirt, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30'
    },
    { 
      id: 'shoes', 
      name: t('categories.shoes'), 
      icon: Footprints, 
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/30'
    },
    { 
      id: 'team-sports', 
      name: t('categories.teamSports'), 
      icon: Users, 
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30'
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