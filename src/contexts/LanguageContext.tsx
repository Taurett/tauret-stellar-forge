import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ro';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  /** Format a base EUR price into the active currency (EUR for en, RON for ro). */
  formatPrice: (priceEur: number) => string;
  /** Currency code currently active. */
  currency: 'EUR' | 'RON';
}

// Approximate fixed exchange rate. Adjust here if needed.
const EUR_TO_RON = 4.98;

const translations = {
  en: {
    // Hero section
    'hero.tagline': 'ELEVATE YOUR GAME',
    'hero.description': 'Premium sportswear for athletes across every discipline.',
    'hero.shopCollection': 'Shop Collection',
    'hero.viewCatalog': 'View Catalog',

    // Categories section
    'categories.title': 'Shop by Sport',
    'categories.subtitle': 'Find the perfect gear for your favorite activities',
    'categories.tennis': 'Tennis',
    'categories.padel': 'Padel',
    'categories.football': 'Football',
    'categories.basketball': 'Basketball',
    'categories.handball': 'Handball',
    'categories.cycling': 'Cycling',
    'categories.running': 'Running',
    'categories.gymFitness': 'Gym & Fitness',
    'categories.airsoft': 'Airsoft',
    'categories.winterSports': 'Winter Sports',
    'categories.all': 'All Sports',

    // Promotions section
    'promotions.sale.title': 'Flash Sale',
    'promotions.sale.description': 'Limited time offers on premium sports equipment',
    'promotions.sale.cta': 'Shop Sale',
    'promotions.newArrivals.title': 'New Arrivals',
    'promotions.newArrivals.description': 'Latest gear from top brands',
    'promotions.newArrivals.cta': 'Explore New',
    'promotions.limitedTime.title': 'Limited Edition',
    'promotions.limitedTime.description': 'Exclusive collections while stocks last',
    'promotions.limitedTime.cta': 'Shop Now',

    // Search section
    'search.placeholder': 'Search for products, brands, sports...',

    // Featured section
    'featured.title': 'Featured Products',
    'featured.subtitle': 'Handpicked essentials for every athlete',
    'featured.addToCart': 'Add to Cart',
    'featured.viewAll': 'View All Products',

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

    // Shop page
    'shop.backHome': 'Back to Home',
    'shop.kicker': '// Catalog',
    'shop.title': 'SHOP',
    'shop.subtitle': 'Premium clothing for elite athletes',
    'shop.searchPlaceholder': 'Search products...',
    'shop.filterPlaceholder': 'Filter by sport',
    'shop.noResults': 'No products found.',
    'shop.addToCart': 'Add to Cart',

    // Product detail
    'product.backShop': 'Back to Shop',
    'product.notFound': 'Product not found',
    'product.selectSize': '// Select Size',
    'product.reviews': 'reviews',
    'product.freeShipping': 'Free Shipping',
    'product.returns': '30-Day Returns',
    'product.tabs.details': 'Details',
    'product.tabs.specs': 'Specifications',
    'product.material': '// Material & Fabric',
    'product.keyFeatures': '// Key Features',
    'product.specs.category': 'Category',
    'product.specs.material': 'Material',
    'product.specs.sizes': 'Available Sizes',
    'product.specs.rating': 'Rating',
    'product.addToCart': 'Add to Cart',
    'product.pleaseSelectSize': 'Please select a size',
    'product.pleaseSelectSizeDesc': 'Choose a size before adding to cart.',

    // Cart page
    'cart.kicker': '// Cart',
    'cart.empty': 'EMPTY',
    'cart.emptyTitle': 'Your cart awaits',
    'cart.emptyDesc': 'Start shopping and fill it with elite gear.',
    'cart.browse': 'Browse Catalog',
    'cart.title': 'CART',
    'cart.summary': '// Summary',
    'cart.orderTotal': 'Order Total',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.free': 'Free',
    'cart.tax': 'Tax',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.keepShopping': 'Keep Shopping',

    // Toasts
    'toast.added': 'Added to cart',
    'toast.addedDesc': 'has been added to your cart.',

    // Hero extras
    'hero.chip': 'Next-Gen Sportswear',
    'hero.chip.cyber': 'Next-Gen Sportswear',
    'hero.chip.wimbledon': 'Centre Court Heritage',
    'hero.chip.arid': 'Built for the Wild',
    'hero.chip.military': 'Mission-Ready Gear',
    'hero.chip.retro': 'Sport for Everyone',
    'hero.exploreSports': 'Explore Sports',
    'hero.stats.sports': 'Sports',
    'hero.stats.products': 'Products',
    'hero.stats.support': 'Support',

    // Categories extras
    'categories.kicker': '// Categories',
    'categories.heading': 'SHOP BY SPORT',
    'categories.explore': 'Explore →',

    // Promotions badges
    'promotions.sale.badge': 'UP TO 70% OFF',
    'promotions.newArrivals.badge': 'JUST DROPPED',
    'promotions.limitedTime.badge': 'LIMITED',

    // Features kicker
    'features.kicker': '// Engineered',

    // Featured extras
    'featured.kicker': '// Curated',
    'featured.heading': 'FEATURED PIECES',
    'featured.badge.bestseller': 'BESTSELLER',
    'featured.badge.new': 'NEW',
    'featured.badge.sale': 'SALE',
    'featured.badge.limited': 'LIMITED',

    // About / Contact kickers
    'about.kicker': '// About',
    'contact.kicker': '// Contact',

    // Welcome intro modal (shown on first visit)
    'intro.kicker': '// Welcome to Tauret',
    'intro.title': 'Wear it more. Live it louder.',
    'intro.story': 'Tauret was born from a simple idea: the clothes you love are the clothes you actually wear. We design premium sportswear in distinct visual worlds — pick the one that feels like you, and we will dress your whole experience in it.',
    'intro.pickPrompt': 'Choose your style',
    'intro.pickHint': 'You can change it any time from the theme switcher.',
    'intro.continue': 'Enter Tauret',
    'intro.skip': 'Skip',
    'intro.theme.cyber.label': 'Cyber',
    'intro.theme.cyber.desc': 'Deep space neon — bold, electric, after-dark.',
    'intro.theme.wimbledon.label': 'Wimbledon',
    'intro.theme.wimbledon.desc': 'Crisp greens and whites — timeless court energy.',
    'intro.theme.arid.label': 'Arid',
    'intro.theme.arid.desc': 'Warm desert tones — earthy, grounded, bright.',
    'intro.theme.military.label': 'Military',
    'intro.theme.military.desc': 'Tactical olive — disciplined and strong.',
    'intro.theme.retro.label': 'Retro',
    'intro.theme.retro.desc': 'Sun-faded 70s palette — playful and nostalgic.',
    'intro.theme.avalanche.label': 'Avalanche',
    'intro.theme.avalanche.desc': 'Glacier whites and ice blue — alpine, crisp, fresh.',
  },
  ro: {
    // Hero section
    'hero.tagline': 'RIDICĂ-ȚI JOCUL LA NIVEL SUPERIOR',
    'hero.description': 'Îmbrăcăminte sport premium pentru atleți din toate disciplinele.',
    'hero.shopCollection': 'Vezi Colecția',
    'hero.viewCatalog': 'Vezi Catalogul',

    // Categories section
    'categories.title': 'Cumpără după Sport',
    'categories.subtitle': 'Găsește echipamentul perfect pentru activitățile tale favorite',
    'categories.tennis': 'Tenis',
    'categories.padel': 'Padel',
    'categories.football': 'Fotbal',
    'categories.basketball': 'Baschet',
    'categories.handball': 'Handbal',
    'categories.cycling': 'Ciclism',
    'categories.running': 'Alergare',
    'categories.gymFitness': 'Sală & Fitness',
    'categories.airsoft': 'Airsoft',
    'categories.winterSports': 'Sporturi de Iarnă',
    'categories.all': 'Toate Sporturile',

    // Promotions section
    'promotions.sale.title': 'Ofertă Flash',
    'promotions.sale.description': 'Oferte pe timp limitat pentru echipament sportiv premium',
    'promotions.sale.cta': 'Vezi Ofertele',
    'promotions.newArrivals.title': 'Noutăți',
    'promotions.newArrivals.description': 'Cel mai nou echipament de la brandurile de top',
    'promotions.newArrivals.cta': 'Explorează Noutățile',
    'promotions.limitedTime.title': 'Ediție Limitată',
    'promotions.limitedTime.description': 'Colecții exclusive cât timp există în stoc',
    'promotions.limitedTime.cta': 'Cumpără Acum',

    // Search section
    'search.placeholder': 'Caută produse, branduri, sporturi...',

    // Featured section
    'featured.title': 'Produse Recomandate',
    'featured.subtitle': 'Esențiale alese cu grijă pentru fiecare atlet',
    'featured.addToCart': 'Adaugă în Coș',
    'featured.viewAll': 'Vezi Toate Produsele',

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

    // Shop page
    'shop.backHome': 'Înapoi Acasă',
    'shop.kicker': '// Catalog',
    'shop.title': 'MAGAZIN',
    'shop.subtitle': 'Îmbrăcăminte premium pentru atleți de elită',
    'shop.searchPlaceholder': 'Caută produse...',
    'shop.filterPlaceholder': 'Filtrează după sport',
    'shop.noResults': 'Nu s-au găsit produse.',
    'shop.addToCart': 'Adaugă în Coș',

    // Product detail
    'product.backShop': 'Înapoi la Magazin',
    'product.notFound': 'Produs negăsit',
    'product.selectSize': '// Alege Mărimea',
    'product.reviews': 'recenzii',
    'product.freeShipping': 'Livrare Gratuită',
    'product.returns': 'Retur 30 de Zile',
    'product.tabs.details': 'Detalii',
    'product.tabs.specs': 'Specificații',
    'product.material': '// Material & Țesătură',
    'product.keyFeatures': '// Caracteristici Cheie',
    'product.specs.category': 'Categorie',
    'product.specs.material': 'Material',
    'product.specs.sizes': 'Mărimi Disponibile',
    'product.specs.rating': 'Rating',
    'product.addToCart': 'Adaugă în Coș',
    'product.pleaseSelectSize': 'Te rugăm să alegi o mărime',
    'product.pleaseSelectSizeDesc': 'Alege o mărime înainte de a adăuga în coș.',

    // Cart page
    'cart.kicker': '// Coș',
    'cart.empty': 'GOL',
    'cart.emptyTitle': 'Coșul tău te așteaptă',
    'cart.emptyDesc': 'Începe să cumperi și umple-l cu echipament de elită.',
    'cart.browse': 'Vezi Catalogul',
    'cart.title': 'COȘ',
    'cart.summary': '// Sumar',
    'cart.orderTotal': 'Total Comandă',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Livrare',
    'cart.free': 'Gratuită',
    'cart.tax': 'TVA',
    'cart.total': 'Total',
    'cart.checkout': 'Finalizează Comanda',
    'cart.keepShopping': 'Continuă Cumpărăturile',

    // Toasts
    'toast.added': 'Adăugat în coș',
    'toast.addedDesc': 'a fost adăugat în coșul tău.',

    // Hero extras
    'hero.chip': 'Echipament Sportiv de Nouă Generație',
    'hero.chip.cyber': 'Echipament Sportiv de Nouă Generație',
    'hero.chip.wimbledon': 'Tradiție pe Centre Court',
    'hero.chip.arid': 'Făcut pentru Sălbăticie',
    'hero.chip.military': 'Echipament Tactic de Misiune',
    'hero.chip.retro': 'Sport pentru toți',
    'hero.exploreSports': 'Explorează Sporturile',
    'hero.stats.sports': 'Sporturi',
    'hero.stats.products': 'Produse',
    'hero.stats.support': 'Suport',

    // Categories extras
    'categories.kicker': '// Categorii',
    'categories.heading': 'CUMPĂRĂ DUPĂ SPORT',
    'categories.explore': 'Explorează →',

    // Promotions badges
    'promotions.sale.badge': 'PÂNĂ LA 70% REDUCERE',
    'promotions.newArrivals.badge': 'TOCMAI SOSITE',
    'promotions.limitedTime.badge': 'LIMITAT',

    // Features kicker
    'features.kicker': '// Inginerie',

    // Featured extras
    'featured.kicker': '// Selectate',
    'featured.heading': 'PIESE RECOMANDATE',
    'featured.badge.bestseller': 'BESTSELLER',
    'featured.badge.new': 'NOU',
    'featured.badge.sale': 'REDUCERE',
    'featured.badge.limited': 'LIMITAT',

    // About / Contact kickers
    'about.kicker': '// Despre',
    'contact.kicker': '// Contact',

    // Welcome intro modal (afișat la prima vizită)
    'intro.kicker': '// Bun venit la Tauret',
    'intro.title': 'Poartă-le mai des. Trăiește-le mai intens.',
    'intro.story': 'Tauret s-a născut dintr-o idee simplă: hainele pe care le iubești sunt cele pe care le porți cu adevărat. Creăm îmbrăcăminte sport premium în mai multe lumi vizuale — alege-o pe cea care te reprezintă, iar noi îți îmbrăcăm întreaga experiență în ea.',
    'intro.pickPrompt': 'Alege-ți stilul',
    'intro.pickHint': 'Îl poți schimba oricând din selectorul de teme.',
    'intro.continue': 'Intră în Tauret',
    'intro.skip': 'Omite',
    'intro.theme.cyber.label': 'Cyber',
    'intro.theme.cyber.desc': 'Neon spațial — îndrăzneț, electric, nocturn.',
    'intro.theme.wimbledon.label': 'Wimbledon',
    'intro.theme.wimbledon.desc': 'Verde și alb crocant — energie de teren atemporală.',
    'intro.theme.arid.label': 'Arid',
    'intro.theme.arid.desc': 'Tonuri calde de deșert — pământii, luminoase.',
    'intro.theme.military.label': 'Military',
    'intro.theme.military.desc': 'Verde tactic — disciplinat și puternic.',
    'intro.theme.retro.label': 'Retro',
    'intro.theme.retro.desc': 'Paletă anii ’70 — jucăuș și nostalgic.',
    'intro.theme.avalanche.label': 'Avalanche',
    'intro.theme.avalanche.desc': 'Alb glaciar și albastru de gheață — alpin, curat, proaspăt.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const currency: 'EUR' | 'RON' = language === 'ro' ? 'RON' : 'EUR';

  const formatPrice = (priceEur: number): string => {
    if (language === 'ro') {
      const ron = priceEur * EUR_TO_RON;
      // Romanian convention: "199,99 lei"
      const formatted = ron.toLocaleString('ro-RO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return `${formatted} lei`;
    }
    const formatted = priceEur.toLocaleString('en-IE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `€${formatted}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatPrice, currency }}>
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
