import {
  Dumbbell,
  Bike,
  CircleDot,
  Circle,
  Target,
  Activity,
  Trophy,
  Flame,
  Snowflake,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const SportCategories = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Avalanche theme swaps the Airsoft tile for a Winter Sports tile (label + icon),
  // while keeping the underlying category id so the rest of the catalog/route works.
  const isAvalanche = theme === 'avalanche';
  const lastTile = isAvalanche
    ? { id: 'airsoft', name: t('categories.winterSports'), icon: Snowflake }
    : { id: 'airsoft', name: t('categories.airsoft'),      icon: Target };

  const categories = [
    { id: 'tennis',     name: t('categories.tennis'),     icon: CircleDot },
    { id: 'padel',      name: t('categories.padel'),      icon: Activity },
    { id: 'football',   name: t('categories.football'),   icon: Circle },
    { id: 'basketball', name: t('categories.basketball'), icon: Trophy },
    { id: 'handball',   name: t('categories.handball'),   icon: Flame },
    { id: 'cycling',    name: t('categories.cycling'),    icon: Bike },
    { id: 'gym',        name: t('categories.gymFitness'), icon: Dumbbell },
    lastTile,
  ];

  return (
    <section id="categories" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block font-tech text-xs uppercase tracking-[0.4em] text-primary mb-4">
            {t('categories.kicker')}
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black mb-6">
            <span className="text-aurora">{t('categories.heading')}</span>
          </h2>
          <p className="font-tech text-lg text-muted-foreground max-w-2xl mx-auto tracking-wide">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => navigate(`/shop?category=${category.id}`)}
                className="group relative glass clip-angle-lg p-8 text-center transition-all duration-500 hover:shadow-neon-cyan hover:-translate-y-2 border border-primary/20 hover:border-primary/60"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-background/60 border border-primary/30 group-hover:border-primary group-hover:shadow-neon-cyan transition-all duration-500">
                    <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-foreground uppercase tracking-wider text-sm md:text-base group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2">
                    {t('categories.explore')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SportCategories;
