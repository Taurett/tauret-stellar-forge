
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
    'hero.tagline': 'UNLEASH YOUR INNER FIGHTER',
    'hero.description': 'Premium contact sports apparel for K1, kickboxing, and martial arts warriors.',
    'hero.shopCollection': 'Shop Collection',
    'hero.viewCatalog': 'View Catalog',
    
    // Features section
    'features.title': 'Built for Warriors',
    'features.subtitle': 'Every piece of Tauret gear is engineered for the demands of contact sports and combat training.',
    'features.combatProtection': 'Combat Protection',
    'features.combatProtectionDesc': 'Advanced materials and reinforced stitching designed to withstand the intensity of contact sports.',
    'features.lightningSpeed': 'Lightning Speed',
    'features.lightningSpeedDesc': 'Lightweight, flexible designs that move with you for maximum agility and speed in the ring.',
    'features.championQuality': 'Champion Quality',
    'features.championQualityDesc': 'Professional-grade gear trusted by K1 fighters and martial arts champions worldwide.',
    'features.precisionFit': 'Precision Fit',
    'features.precisionFitDesc': 'Anatomically designed cuts and sizing for optimal comfort and performance during training.',
    'features.warriorSpirit': 'Warrior Spirit',
    'features.warriorSpiritDesc': 'Bold designs that embody the fierce determination and fighting spirit of true warriors.',
    'features.elitePerformance': 'Elite Performance',
    'features.elitePerformanceDesc': 'Premium fabrics and technology for superior moisture management and durability.',
    
    // About section
    'about.title': 'The Tauret Legacy',
    'about.subtitle': 'Born from the passion for contact sports and the relentless pursuit of excellence. Tauret represents the fighting spirit that drives every warrior to push beyond their limits.',
    'about.mission': 'Our Mission',
    'about.missionDesc': 'To equip fighters with premium gear that enhances performance, provides protection, and embodies the warrior spirit of contact sports.',
    'about.fightingSpirit': 'Fighting Spirit',
    'about.fightingSpiritDesc': 'Every Tauret product is infused with the passion and dedication of fighters who never back down from a challenge.',
    'about.warriorCommunity': 'Warrior Community',
    'about.warriorCommunityDesc': 'Join thousands of K1 fighters, martial artists, and combat sports athletes who trust Tauret for their training and competition needs.',
    'about.quote': 'In the ring, every second counts. Every move matters. Tauret gear gives you the edge you need to dominate.',
    
    // Contact section
    'contact.title': 'Join the Fight',
    'contact.subtitle': 'Ready to gear up? Get in touch with the Tauret team and unleash your potential.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.namePlaceholder': 'Enter your name',
    'contact.emailPlaceholder': 'Enter your email',
    'contact.messagePlaceholder': 'Tell us about your training needs...',
    'contact.sendMessage': 'Send Message',
    'contact.emailLabel': 'Email',
    'contact.support': 'Support',
    'contact.supportDesc': '24/7 Fighter Support',
    'contact.trainingCenter': 'Training Center',
    'contact.trainingCenterDesc': 'Professional Gear Testing',
  },
  ro: {
    // Hero section
    'hero.tagline': 'DEZLĂNȚUIE LUPTĂTORUL DIN TINE',
    'hero.description': 'Îmbrăcăminte premium pentru sporturi de contact K1, kickboxing și arte marțiale.',
    'hero.shopCollection': 'Vezi Colecția',
    'hero.viewCatalog': 'Vezi Catalogul',
    
    // Features section
    'features.title': 'Construit pentru Războinici',
    'features.subtitle': 'Fiecare piesă Tauret este proiectată pentru cerințele sporturilor de contact și antrenamentului de luptă.',
    'features.combatProtection': 'Protecție de Luptă',
    'features.combatProtectionDesc': 'Materiale avansate și cusături întărite proiectate să reziste intensității sporturilor de contact.',
    'features.lightningSpeed': 'Viteză Fulger',
    'features.lightningSpeedDesc': 'Modele ușoare și flexibile care se mișcă odată cu tine pentru agilitate și viteză maximă în ring.',
    'features.championQuality': 'Calitate de Campion',
    'features.championQualityDesc': 'Echipament de calitate profesională în care au încredere luptătorii K1 și campionii de arte marțiale din întreaga lume.',
    'features.precisionFit': 'Ajustare Precisă',
    'features.precisionFitDesc': 'Tăieturi și dimensiuni proiectate anatomic pentru confort și performanță optimă în timpul antrenamentului.',
    'features.warriorSpirit': 'Spiritul Războinicului',
    'features.warriorSpiritDesc': 'Modele îndrăznețe care întruchipează determinarea fermă și spiritul de luptă al adevăraților războinici.',
    'features.elitePerformance': 'Performanță de Elită',
    'features.elitePerformanceDesc': 'Materiale premium și tehnologie pentru managementul superior al umidității și durabilitate.',
    
    // About section
    'about.title': 'Moștenirea Tauret',
    'about.subtitle': 'Născut din pasiunea pentru sporturile de contact și căutarea neîncetată a excelenței. Tauret reprezintă spiritul de luptă care îi determină pe fiecare războinic să își depășească limitele.',
    'about.mission': 'Misiunea Noastră',
    'about.missionDesc': 'Să echipăm luptătorii cu echipament premium care îmbunătățește performanța, oferă protecție și întruchipează spiritul războinic al sporturilor de contact.',
    'about.fightingSpirit': 'Spiritul de Luptă',
    'about.fightingSpiritDesc': 'Fiecare produs Tauret este impregnат cu pasiunea și dedicarea luptătorilor care nu se dau niciodată înapoi de la o provocare.',
    'about.warriorCommunity': 'Comunitatea Războinicilor',
    'about.warriorCommunityDesc': 'Alătură-te miilor de luptători K1, artiști marțiali și sportivi de combat care au încredere în Tauret pentru nevoile lor de antrenament și competiție.',
    'about.quote': 'În ring, fiecare secundă contează. Fiecare mișcare importă. Echipamentul Tauret îți oferă avantajul de care ai nevoie pentru a domina.',
    
    // Contact section
    'contact.title': 'Alătură-te Luptei',
    'contact.subtitle': 'Gata să te echipezi? Ia legătura cu echipa Tauret și dezlănțuie-ți potențialul.',
    'contact.name': 'Nume',
    'contact.email': 'Email',
    'contact.message': 'Mesaj',
    'contact.namePlaceholder': 'Introdu numele tău',
    'contact.emailPlaceholder': 'Introdu email-ul tău',
    'contact.messagePlaceholder': 'Spune-ne despre nevoile tale de antrenament...',
    'contact.sendMessage': 'Trimite Mesajul',
    'contact.emailLabel': 'Email',
    'contact.support': 'Suport',
    'contact.supportDesc': 'Suport pentru Luptători 24/7',
    'contact.trainingCenter': 'Centrul de Antrenament',
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
