
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ro';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero section
    'hero.tagline': 'ELEVATE YOUR GAME',
    'hero.description': 'Premium sports apparel and equipment for athletes across all disciplines.',
    'hero.shopCollection': 'Shop Collection',
    'hero.viewCatalog': 'View Catalog',
    
    // Features section
    'features.title': 'Built for Athletes',
    'features.subtitle': 'Every piece of SportElite gear is engineered for peak performance across all sports disciplines.',
    'features.combatProtection': 'Advanced Protection',
    'features.combatProtectionDesc': 'Cutting-edge materials and ergonomic design to protect you during intense training and competition.',
    'features.lightningSpeed': 'Enhanced Mobility',
    'features.lightningSpeedDesc': 'Lightweight, flexible designs that optimize your movement and performance in any sport.',
    'features.championQuality': 'Champion Quality',
    'features.championQualityDesc': 'Professional-grade gear trusted by elite athletes and champions across all sports.',
    'features.precisionFit': 'Precision Fit',
    'features.precisionFitDesc': 'Anatomically designed cuts and sizing for optimal comfort and performance during training.',
    'features.warriorSpirit': 'Athletic Excellence',
    'features.warriorSpiritDesc': 'Bold designs that embody the dedication and competitive spirit of true athletes.',
    'features.elitePerformance': 'Elite Performance',
    'features.elitePerformanceDesc': 'Premium fabrics and technology for superior moisture management and durability.',
    
    // About section
    'about.title': 'The SportElite Story',
    'about.subtitle': 'Born from the passion for sports and the relentless pursuit of excellence. SportElite represents the dedication that drives every athlete to achieve greatness.',
    'about.mission': 'Our Mission',
    'about.missionDesc': 'To equip athletes with premium gear that enhances performance, provides protection, and embodies the spirit of sporting excellence.',
    'about.fightingSpirit': 'Competitive Spirit',
    'about.fightingSpiritDesc': 'Every SportElite product is infused with the passion and dedication of athletes who strive for excellence.',
    'about.warriorCommunity': 'Athlete Community',
    'about.warriorCommunityDesc': 'Join thousands of athletes across football, basketball, running, tennis, and more who trust SportElite for their training and competition needs.',
    'about.quote': 'In competition, every second counts. Every move matters. SportElite gear gives you the edge you need to excel.',
    
    // Contact section
    'contact.title': 'Join the Team',
    'contact.subtitle': 'Ready to elevate your performance? Get in touch with the SportElite team and unlock your potential.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.namePlaceholder': 'Enter your name',
    'contact.emailPlaceholder': 'Enter your email',
    'contact.messagePlaceholder': 'Tell us about your athletic goals...',
    'contact.sendMessage': 'Send Message',
    'contact.emailLabel': 'Email',
    'contact.support': 'Support',
    'contact.supportDesc': '24/7 Athlete Support',
    'contact.trainingCenter': 'Performance Center',
    'contact.trainingCenterDesc': 'Professional Gear Testing',
  },
  ro: {
    // Hero section
    'hero.tagline': 'RIDICĂ-ȚI JOCUL LA NIVEL SUPERIOR',
    'hero.description': 'Îmbrăcăminte și echipament sportiv premium pentru atleți din toate disciplinele.',
    'hero.shopCollection': 'Vezi Colecția',
    'hero.viewCatalog': 'Vezi Catalogul',
    
    // Features section
    'features.title': 'Construit pentru Atleți',
    'features.subtitle': 'Fiecare piesă SportElite este proiectată pentru performanță maximă în toate disciplinele sportive.',
    'features.combatProtection': 'Protecție Avansată',
    'features.combatProtectionDesc': 'Materiale de ultimă generație și design ergonomic pentru a te proteja în timpul antrenamentelor intense și competițiilor.',
    'features.lightningSpeed': 'Mobilitate Îmbunătățită',
    'features.lightningSpeedDesc': 'Modele ușoare și flexibile care îți optimizează mișcarea și performanța în orice sport.',
    'features.championQuality': 'Calitate de Campion',
    'features.championQualityDesc': 'Echipament de calitate profesională în care au încredere atleții de elită și campionii din toate sporturile.',
    'features.precisionFit': 'Ajustare Precisă',
    'features.precisionFitDesc': 'Tăieturi și dimensiuni proiectate anatomic pentru confort și performanță optimă în timpul antrenamentului.',
    'features.warriorSpirit': 'Excelență Atletică',
    'features.warriorSpiritDesc': 'Modele îndrăznețe care întruchipează dedicarea și spiritul competitiv al adevăraților atleți.',
    'features.elitePerformance': 'Performanță de Elită',
    'features.elitePerformanceDesc': 'Materiale premium și tehnologie pentru managementul superior al umidității și durabilitate.',
    
    // About section
    'about.title': 'Povestea SportElite',
    'about.subtitle': 'Născut din pasiunea pentru sport și căutarea neîncetată a excelenței. SportElite reprezintă dedicarea care îi determină pe fiecare atlet să atingă măreția.',
    'about.mission': 'Misiunea Noastră',
    'about.missionDesc': 'Să echipăm atleții cu echipament premium care îmbunătățește performanța, oferă protecție și întruchipează spiritul excelenței sportive.',
    'about.fightingSpirit': 'Spiritul Competitiv',
    'about.fightingSpiritDesc': 'Fiecare produs SportElite este impregnат cu pasiunea și dedicarea atleților care se străduiesc pentru excelență.',
    'about.warriorCommunity': 'Comunitatea Atleților',
    'about.warriorCommunityDesc': 'Alătură-te miilor de atleți din fotbal, baschet, alergare, tenis și multe altele care au încredere în SportElite pentru nevoile lor de antrenament și competiție.',
    'about.quote': 'În competiție, fiecare secundă contează. Fiecare mișcare importă. Echipamentul SportElite îți oferă avantajul de care ai nevoie pentru a excela.',
    
    // Contact section
    'contact.title': 'Alătură-te Echipei',
    'contact.subtitle': 'Gata să îți ridici performanța? Ia legătura cu echipa SportElite și dezlănțuie-ți potențialul.',
    'contact.name': 'Nume',
    'contact.email': 'Email',
    'contact.message': 'Mesaj',
    'contact.namePlaceholder': 'Introdu numele tău',
    'contact.emailPlaceholder': 'Introdu email-ul tău',
    'contact.messagePlaceholder': 'Spune-ne despre obiectivele tale atletice...',
    'contact.sendMessage': 'Trimite Mesajul',
    'contact.emailLabel': 'Email',
    'contact.support': 'Suport',
    'contact.supportDesc': 'Suport pentru Atleți 24/7',
    'contact.trainingCenter': 'Centrul de Performanță',
    'contact.trainingCenterDesc': 'Testare Profesională a Echipamentului',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
