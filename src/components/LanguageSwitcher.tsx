
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`${
          language === 'en' 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
        } rounded-none uppercase font-bold tracking-wider`}
      >
        EN
      </Button>
      <Button
        variant={language === 'ro' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('ro')}
        className={`${
          language === 'ro' 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
        } rounded-none uppercase font-bold tracking-wider`}
      >
        RO
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
