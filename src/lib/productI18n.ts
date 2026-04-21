// Centralised product copy keyed by id, kept out of the LanguageContext file
// so the dictionary stays scannable. Both English and Romanian are required.

export type Lang = 'en' | 'ro';

export interface ProductCopy {
  name: string;
  description: string;
  fabric: string;
  features: string[];
}

type ProductDict = Record<number, ProductCopy>;

const en: ProductDict = {
  3: {
    name: 'Tennis Athletic Dress',
    description: 'Lightweight and breathable tennis dress with moisture-wicking technology. Perfect for intense matches and training sessions.',
    fabric: '88% Polyester, 12% Spandex — Moisture-wicking mesh fabric',
    features: ['Built-in shorts', 'UV Protection 50+', 'Anti-odor technology', '4-way stretch'],
  },
  7: {
    name: 'Pro Football Jersey',
    description: 'Professional-grade football jersey with advanced moisture management. Designed for peak performance on the field.',
    fabric: '100% Recycled Polyester with Dri-FIT technology',
    features: ['Moisture-wicking', 'Breathable mesh panels', 'Athletic fit', 'Machine washable'],
  },
  9: {
    name: 'Football Training Shorts',
    description: 'Lightweight training shorts with elastic waistband and quick-dry fabric. Essential for any football player.',
    fabric: '100% Polyester with moisture-wicking finish',
    features: ['Elastic waistband', 'Side pockets', 'Quick-dry', 'Lightweight construction'],
  },
  11: {
    name: 'Basketball Pro Jersey',
    description: 'Authentic basketball jersey with breathable mesh construction. Perfect for game day or casual wear.',
    fabric: '100% Polyester double-knit mesh',
    features: ['Breathable mesh', 'Tackle twill graphics', 'Straight hem', 'Official team styling'],
  },
  12: {
    name: 'Handball Team Jersey',
    description: 'High-performance handball jersey with excellent ventilation and comfort for intense matches.',
    fabric: 'Polyester blend with ClimaCool technology',
    features: ['Moisture management', 'Ventilated design', 'Ergonomic fit', 'Durable construction'],
  },
  14: {
    name: 'Aerodynamic Cycling Jersey',
    description: 'Aerodynamic cycling jersey with race-fit design. Features advanced fabric technology for optimal performance.',
    fabric: 'Italian Lycra with compression zones',
    features: ['Race fit', '3 rear pockets', 'Full-length zipper', 'Silicone gripper'],
  },
  16: {
    name: 'Cycling Bib Shorts',
    description: 'Premium cycling bib shorts with Italian chamois pad. Designed for long-distance comfort and performance.',
    fabric: 'Compression Lycra with 4-way stretch',
    features: ['Italian chamois pad', 'Mesh bib straps', 'Flat-lock seams', 'Leg grippers'],
  },
  18: {
    name: 'Compression Training Shirt',
    description: 'Compression training shirt that supports muscles and enhances performance. Perfect for any workout.',
    fabric: '80% Nylon, 20% Spandex compression fabric',
    features: ['Muscle support', 'Quick-dry', '4-way stretch', 'Flatlock seams'],
  },
  20: {
    name: 'Tennis Performance Polo',
    description: 'Classic-cut tennis polo with futuristic neon trims. Engineered for fast play with breathable, moisture-wicking fabric.',
    fabric: '92% Polyester, 8% Elastane — Smooth-touch piqué knit',
    features: ['Reflective neon piping', 'UV Protection 50+', 'Athletic fit', 'Anti-odor finish'],
  },
  21: {
    name: 'Goalkeeper Long-Sleeve Jersey',
    description: 'Long-sleeve goalkeeper jersey with padded forearms and high-grip torso panels. Built for the keepers who own the box.',
    fabric: 'Recycled Polyester with foam-padded elbows',
    features: ['Elbow padding', 'Grip torso print', 'Ergonomic sleeves', 'Breathable mesh back'],
  },
  22: {
    name: 'Basketball Court Shorts',
    description: 'Lightweight basketball shorts with above-the-knee cut and elastic waistband. Designed for explosive movement on the court.',
    fabric: '100% Polyester woven dazzle fabric',
    features: ['Elastic drawcord waist', 'Side pockets', 'Above-knee length', 'Quick-dry'],
  },
  23: {
    name: 'Cycling Windbreaker Jacket',
    description: 'Ultra-light packable cycling windbreaker with reflective panels for low-light visibility. Your shield against wind and chill.',
    fabric: 'Ripstop nylon with DWR water-repellent coating',
    features: ['Packable design', 'Reflective accents', 'Rear vent', 'Drop tail hem'],
  },
  24: {
    name: 'Aero Running Tank',
    description: 'Featherweight running tank with laser-cut ventilation. Engineered for hot days and fast splits.',
    fabric: 'Recycled Polyester mesh with mineral cooling yarn',
    features: ['Laser-cut vents', 'Reflective logo', 'Anti-chafe seams', 'Lightweight feel'],
  },
  25: {
    name: 'Compression Running Leggings',
    description: 'High-rise compression leggings with sculpting seams and a hidden waistband pocket. Built for distance.',
    fabric: '78% Nylon, 22% Spandex — 4-way compression',
    features: ['Hidden waist pocket', 'Sculpting seams', 'Squat-proof', 'Reflective accents'],
  },
  26: {
    name: 'Tech Fleece Gym Hoodie',
    description: 'Tech fleece hoodie with brushed interior, kangaroo pocket and full-zip front. Pre and post-session warmth, refined.',
    fabric: 'Tech fleece — 65% Cotton, 35% Polyester',
    features: ['Full-zip front', 'Brushed interior', 'Kangaroo pocket', 'Ribbed cuffs and hem'],
  },
  27: {
    name: 'High-Support Sports Bra',
    description: 'High-support sports bra with crossback straps and removable cups. Engineered for high-impact training and yoga flow alike.',
    fabric: '82% Recycled Polyester, 18% Elastane',
    features: ['Removable cups', 'Crossback straps', 'High support', 'Sweat-wicking'],
  },
  28: {
    name: 'Tennis Pro Skirt',
    description: 'Competition-ready tennis skirt with built-in shorts and lightweight stretch fabric for quick changes of direction.',
    fabric: '86% Recycled Polyester, 14% Elastane performance weave',
    features: ['Built-in inner shorts', 'Ball pocket', '4-way stretch', 'Quick-dry finish'],
  },
  29: {
    name: 'Padel Performance Shirt',
    description: 'Breathable padel shirt designed for fast rallies, hot courts and all-day comfort during match play.',
    fabric: 'Lightweight polyester mesh with sweat-wicking treatment',
    features: ['Mesh ventilation panels', 'Quick-dry fabric', 'Athletic fit', 'Soft flat seams'],
  },
  30: {
    name: 'Padel Skirt',
    description: 'Light, flexible padel skirt with supportive inner shorts built for speed, coverage and confident movement.',
    fabric: 'Performance stretch knit with moisture control',
    features: ['Integrated shorts', 'Wide waistband', 'Side slit mobility', 'Breathable construction'],
  },
  31: {
    name: 'Padel Tech Jacket',
    description: 'Lightweight zip jacket for pre-match warmups and late-evening court sessions.',
    fabric: 'Technical double-knit polyester with brushed inner face',
    features: ['Full zip front', 'Zip pockets', 'Raglan sleeves', 'Light thermal comfort'],
  },
  32: {
    name: 'Basketball Shooting Shirt',
    description: 'Loose athletic top tuned for warmups, shooting drills and off-court wear.',
    fabric: 'Breathable performance mesh polyester',
    features: ['Sleeveless cut', 'Mesh side panels', 'Lightweight feel', 'Freedom of movement'],
  },
  33: {
    name: 'Handball Training Shorts',
    description: 'Durable handball shorts designed for hard sessions, fast breaks and repeated lateral movement.',
    fabric: 'Abrasion-resistant polyester with stretch side inserts',
    features: ['Elastic waist', 'Reinforced seams', 'Quick-dry build', 'Court-ready mobility'],
  },
  34: {
    name: 'Handball Warmup Jacket',
    description: 'Structured warmup jacket built to keep muscles ready before intense handball play.',
    fabric: 'Performance tricot with soft brushed lining',
    features: ['Full zip', 'Stand collar', 'Warmup comfort', 'Durable knit cuffs'],
  },
  35: {
    name: 'Long-Sleeve Running Top',
    description: 'Technical long-sleeve running layer for cool mornings, tempo work and transitional weather.',
    fabric: 'Featherweight recycled polyester with elastane stretch',
    features: ['Thumbhole cuffs', 'Breathable knit', 'Reflective details', 'Slim performance fit'],
  },
  36: {
    name: 'Tactical Combat Shirt',
    description: 'Airsoft-ready combat shirt with flexible body fabric and durable utility paneling.',
    fabric: 'Cotton-poly ripstop panels with stretch performance torso',
    features: ['Reinforced shoulders', 'Patch panels', 'Breathable body fabric', 'Utility sleeve pockets'],
  },
  37: {
    name: 'Tactical Combat Pants',
    description: 'Hard-wearing tactical pants built for movement, crawling and long field sessions.',
    fabric: 'Ripstop utility weave with articulated knee panels',
    features: ['Cargo pockets', 'Reinforced knees', 'Adjustable waist', 'Field-ready durability'],
  },
  38: {
    name: 'Tactical Field Jacket',
    description: 'Protective field jacket with utility storage and weather-ready coverage for outdoor airsoft play.',
    fabric: 'Structured canvas shell with durable lining',
    features: ['Multiple flap pockets', 'Protective collar', 'Storm placket', 'Utility fit'],
  },
};

const ro: ProductDict = {
  3: {
    name: 'Rochie Atletică de Tenis',
    description: 'Rochie de tenis ușoară și respirabilă, cu tehnologie de evacuare a transpirației. Perfectă pentru meciuri intense și antrenamente.',
    fabric: '88% Poliester, 12% Spandex — Material mesh care evacuează transpirația',
    features: ['Pantaloni scurți integrați', 'Protecție UV 50+', 'Tehnologie anti-miros', 'Elasticitate în 4 direcții'],
  },
  7: {
    name: 'Tricou Profesional de Fotbal',
    description: 'Tricou de fotbal profesional cu management avansat al umidității. Conceput pentru performanță maximă pe teren.',
    fabric: '100% Poliester reciclat cu tehnologie Dri-FIT',
    features: ['Evacuează transpirația', 'Panouri mesh respirabile', 'Croială atletică', 'Spălabil în mașină'],
  },
  9: {
    name: 'Pantaloni Scurți de Antrenament Fotbal',
    description: 'Pantaloni scurți ușori de antrenament, cu talie elastică și material cu uscare rapidă. Esențiali pentru orice fotbalist.',
    fabric: '100% Poliester cu finisaj de evacuare a transpirației',
    features: ['Talie elastică', 'Buzunare laterale', 'Uscare rapidă', 'Construcție ușoară'],
  },
  11: {
    name: 'Tricou Profesional de Baschet',
    description: 'Tricou autentic de baschet cu construcție mesh respirabilă. Perfect pentru ziua meciului sau purtare casuală.',
    fabric: '100% Poliester double-knit mesh',
    features: ['Mesh respirabil', 'Imprimeu tackle twill', 'Tiv drept', 'Stilistică oficială de echipă'],
  },
  12: {
    name: 'Tricou de Echipă pentru Handbal',
    description: 'Tricou de handbal de înaltă performanță, cu ventilație excelentă și confort pentru meciuri intense.',
    fabric: 'Amestec de poliester cu tehnologie ClimaCool',
    features: ['Management al umidității', 'Design ventilat', 'Croială ergonomică', 'Construcție durabilă'],
  },
  14: {
    name: 'Tricou de Ciclism Aerodinamic',
    description: 'Tricou de ciclism aerodinamic cu croială de cursă. Tehnologie textilă avansată pentru performanță optimă.',
    fabric: 'Lycra italiană cu zone de compresie',
    features: ['Croială de cursă', '3 buzunare la spate', 'Fermoar pe toată lungimea', 'Bandă siliconată'],
  },
  16: {
    name: 'Pantaloni cu Bretele pentru Ciclism',
    description: 'Pantaloni premium de ciclism cu bretele și pernă chamois italiană. Pentru confort și performanță pe distanțe lungi.',
    fabric: 'Lycra cu compresie și elasticitate în 4 direcții',
    features: ['Pernă chamois italiană', 'Bretele mesh', 'Cusături flat-lock', 'Manșete pentru picior'],
  },
  18: {
    name: 'Tricou de Antrenament cu Compresie',
    description: 'Tricou de antrenament cu compresie care susține mușchii și îmbunătățește performanța. Perfect pentru orice antrenament.',
    fabric: 'Material cu compresie 80% Nailon, 20% Spandex',
    features: ['Suport muscular', 'Uscare rapidă', 'Elasticitate în 4 direcții', 'Cusături flatlock'],
  },
  20: {
    name: 'Polo de Performanță pentru Tenis',
    description: 'Polo de tenis cu croială clasică și accente neon futuriste. Conceput pentru joc rapid, cu material respirabil.',
    fabric: '92% Poliester, 8% Elastan — Tricot piqué moale la atingere',
    features: ['Vipușcă neon reflectorizantă', 'Protecție UV 50+', 'Croială atletică', 'Finisaj anti-miros'],
  },
  21: {
    name: 'Tricou de Portar cu Mâneci Lungi',
    description: 'Tricou de portar cu mâneci lungi, cu antebrațe căptușite și torso cu prindere superioară. Pentru portarii care domină careul.',
    fabric: 'Poliester reciclat cu coate căptușite cu spumă',
    features: ['Căptușeală la coate', 'Imprimeu cu prindere pe torso', 'Mâneci ergonomice', 'Spate mesh respirabil'],
  },
  22: {
    name: 'Pantaloni Scurți pentru Baschet',
    description: 'Pantaloni scurți ușori de baschet, cu lungime peste genunchi și talie elastică. Concepuți pentru mișcare explozivă pe teren.',
    fabric: '100% Poliester țesut dazzle',
    features: ['Talie elastică cu șnur', 'Buzunare laterale', 'Lungime peste genunchi', 'Uscare rapidă'],
  },
  23: {
    name: 'Jachetă Windbreaker pentru Ciclism',
    description: 'Windbreaker ultra-ușor și pliabil pentru ciclism, cu panouri reflectorizante pentru vizibilitate la lumină slabă.',
    fabric: 'Nailon ripstop cu acoperire DWR hidrofobă',
    features: ['Design pliabil', 'Accente reflectorizante', 'Aerisire la spate', 'Tiv prelungit la spate'],
  },
  24: {
    name: 'Maiou Aerodinamic pentru Alergare',
    description: 'Maiou de alergare ultra-ușor, cu ventilație tăiată cu laser. Conceput pentru zile călduroase și ritm rapid.',
    fabric: 'Mesh din poliester reciclat cu fir mineral cooling',
    features: ['Ventilație tăiată cu laser', 'Logo reflectorizant', 'Cusături anti-iritație', 'Senzație ușoară'],
  },
  25: {
    name: 'Colanți cu Compresie pentru Alergare',
    description: 'Colanți cu compresie și talie înaltă, cusături modelatoare și buzunar ascuns. Construiți pentru distanță.',
    fabric: '78% Nailon, 22% Spandex — Compresie în 4 direcții',
    features: ['Buzunar ascuns la talie', 'Cusături modelatoare', 'Anti-transparență', 'Accente reflectorizante'],
  },
  26: {
    name: 'Hanorac Tech Fleece pentru Sală',
    description: 'Hanorac din tech fleece cu interior periat, buzunar tip cangur și fermoar integral. Căldură rafinată înainte și după antrenament.',
    fabric: 'Tech fleece — 65% Bumbac, 35% Poliester',
    features: ['Fermoar integral', 'Interior periat', 'Buzunar cangur', 'Manșete și tiv striate'],
  },
  27: {
    name: 'Sutien Sport cu Susținere Înaltă',
    description: 'Sutien sport cu susținere înaltă, bretele crossback și cupe detașabile. Conceput pentru antrenamente intense și yoga deopotrivă.',
    fabric: '82% Poliester reciclat, 18% Elastan',
    features: ['Cupe detașabile', 'Bretele crossback', 'Susținere înaltă', 'Evacuează transpirația'],
  },
  28: {
    name: 'Fustă Pro de Tenis',
    description: 'Fustă de competiție pentru tenis, cu pantaloni scurți integrați și material elastic ușor pentru schimbări rapide de direcție.',
    fabric: '86% Poliester reciclat, 14% Elastan — țesătură performantă',
    features: ['Pantaloni scurți interiori', 'Buzunar pentru minge', 'Elasticitate în 4 direcții', 'Uscare rapidă'],
  },
  29: {
    name: 'Tricou de Performanță pentru Padel',
    description: 'Tricou respirabil pentru padel, conceput pentru schimburi rapide, terenuri fierbinți și confort pe tot parcursul meciului.',
    fabric: 'Mesh ușor din poliester cu tratament de evacuare a transpirației',
    features: ['Panouri mesh de ventilație', 'Material cu uscare rapidă', 'Croială atletică', 'Cusături plate moi'],
  },
  30: {
    name: 'Fustă pentru Padel',
    description: 'Fustă ușoară și flexibilă pentru padel, cu pantaloni scurți interiori pentru susținere și libertate de mișcare.',
    fabric: 'Tricot elastic performant cu control al umidității',
    features: ['Pantaloni scurți integrați', 'Talie lată', 'Fantă laterală pentru mobilitate', 'Construcție respirabilă'],
  },
  31: {
    name: 'Jachetă Tech pentru Padel',
    description: 'Jachetă ușoară cu fermoar pentru încălzire înainte de meci și sesiuni de seară pe teren.',
    fabric: 'Poliester tehnic double-knit cu interior ușor periat',
    features: ['Fermoar integral', 'Buzunare cu fermoar', 'Mâneci raglan', 'Confort termic ușor'],
  },
  32: {
    name: 'Tricou pentru Aruncări la Baschet',
    description: 'Top atletic lejer pentru încălzire, exerciții de aruncare și purtare casual în afara terenului.',
    fabric: 'Mesh respirabil din poliester performant',
    features: ['Croială fără mâneci', 'Panouri laterale mesh', 'Senzație ușoară', 'Libertate de mișcare'],
  },
  33: {
    name: 'Pantaloni Scurți de Antrenament pentru Handbal',
    description: 'Pantaloni scurți rezistenți pentru handbal, construiți pentru sesiuni intense, contraatacuri rapide și mișcare laterală repetată.',
    fabric: 'Poliester rezistent la abraziune cu inserții laterale elastice',
    features: ['Talie elastică', 'Cusături întărite', 'Construcție cu uscare rapidă', 'Mobilitate pentru teren'],
  },
  34: {
    name: 'Jachetă de Încălzire pentru Handbal',
    description: 'Jachetă structurată de încălzire, concepută pentru a menține musculatura pregătită înaintea jocului intens de handbal.',
    fabric: 'Tricot performant cu căptușeală moale periată',
    features: ['Fermoar integral', 'Guler înalt', 'Confort la încălzire', 'Manșete tricotate rezistente'],
  },
  35: {
    name: 'Bluză cu Mâneci Lungi pentru Alergare',
    description: 'Strat tehnic pentru alergare în dimineți răcoroase, antrenamente tempo și vreme de tranziție.',
    fabric: 'Poliester reciclat foarte ușor cu elastan',
    features: ['Manșete cu orificiu pentru deget', 'Tricot respirabil', 'Detalii reflectorizante', 'Croială slim performantă'],
  },
  36: {
    name: 'Cămașă Tactică de Luptă',
    description: 'Cămașă tactică pregătită pentru airsoft, cu corp flexibil și panouri utilitare rezistente.',
    fabric: 'Panouri ripstop din bumbac-poliester cu tors stretch performant',
    features: ['Umeri întăriți', 'Panouri pentru patch-uri', 'Corp respirabil', 'Buzunare utilitare pe mâneci'],
  },
  37: {
    name: 'Pantaloni Tactici de Luptă',
    description: 'Pantaloni tactici rezistenți, construiți pentru mișcare, târâre și sesiuni lungi pe teren.',
    fabric: 'Țesătură utilitară ripstop cu panouri articulate la genunchi',
    features: ['Buzunare cargo', 'Genunchi întăriți', 'Talie ajustabilă', 'Durabilitate pentru teren'],
  },
  38: {
    name: 'Jachetă Tactică de Teren',
    description: 'Jachetă de teren protectoare, cu buzunare utilitare și acoperire potrivită pentru joc outdoor de airsoft.',
    fabric: 'Canvas structurat cu căptușeală durabilă',
    features: ['Buzunare multiple cu clapetă', 'Guler protector', 'Pată contra vântului', 'Croială utilitară'],
  },
};

const dict: Record<Lang, ProductDict> = { en, ro };

// Theme-specific overrides. Right now only Avalanche relabels the airsoft trio
// as Winter Sports gear; other themes fall back to the base dictionary.
type ThemeKey = 'avalanche';
const themeOverrides: Record<ThemeKey, Record<Lang, Partial<ProductDict>>> = {
  avalanche: {
    en: {
      36: {
        name: 'Thermal Base Layer Top',
        description: 'Snow-day base layer that traps body heat and wicks sweat on the slopes.',
        fabric: 'Brushed merino-blend knit with flatlock seams',
        features: ['Thermal insulation', 'Moisture-wicking', 'Flatlock seams', 'Slim layering fit'],
      },
      37: {
        name: 'Insulated Snow Pants',
        description: 'Waterproof, insulated pants engineered for skiing, snowboarding and winter hikes.',
        fabric: 'Waterproof shell with synthetic down insulation',
        features: ['Waterproof 20K', 'Synthetic down fill', 'Reinforced cuffs', 'Articulated knees'],
      },
      38: {
        name: 'Alpine Snow Jacket',
        description: 'Insulated alpine shell with sealed seams and a helmet-compatible hood for deep winter days.',
        fabric: 'Recycled ripstop shell with PrimaLoft® insulation',
        features: ['Helmet hood', 'Sealed seams', 'Powder skirt', 'PrimaLoft® fill'],
      },
    },
    ro: {
      36: {
        name: 'Bluză Termică First Layer',
        description: 'Strat de bază pentru zilele de zăpadă, păstrează căldura și evacuează transpirația pe pârtie.',
        fabric: 'Tricot mixt cu lână merinos periată și cusături flatlock',
        features: ['Izolație termică', 'Evacuează transpirația', 'Cusături flatlock', 'Croială slim de stratificare'],
      },
      37: {
        name: 'Pantaloni de Schi Izolați',
        description: 'Pantaloni impermeabili și izolați, gândiți pentru schi, snowboard și ture de iarnă.',
        fabric: 'Material exterior impermeabil cu izolație sintetică tip puf',
        features: ['Impermeabili 20K', 'Umplutură puf sintetic', 'Manșete ranforsate', 'Genunchi articulați'],
      },
      38: {
        name: 'Geacă Alpină de Schi',
        description: 'Geacă alpină izolată, cu cusături sigilate și glugă compatibilă cu casca, pentru zile reci.',
        fabric: 'Material reciclat ripstop cu izolație PrimaLoft®',
        features: ['Glugă pentru cască', 'Cusături sigilate', 'Apărătoare de zăpadă', 'Umplutură PrimaLoft®'],
      },
    },
  },
};

export const getProductCopy = (id: number, lang: Lang, theme?: string): ProductCopy => {
  if (theme && theme in themeOverrides) {
    const override = themeOverrides[theme as ThemeKey][lang]?.[id];
    if (override) return override;
  }
  return dict[lang][id] ?? dict.en[id] ?? {
    name: `Product #${id}`,
    description: '',
    fabric: '',
    features: [],
  };
};

/** Returns the i18n key for a category label, swapping airsoft → winterSports on Avalanche. */
export const getCategoryLabelKey = (
  category: string,
  theme?: string,
): import("@/contexts/LanguageContext").TKey => {
  if (theme === 'avalanche' && category === 'airsoft') return 'categories.winterSports';
  const map: Record<string, import("@/contexts/LanguageContext").TKey> = {
    tennis: 'categories.tennis',
    padel: 'categories.padel',
    football: 'categories.football',
    basketball: 'categories.basketball',
    handball: 'categories.handball',
    cycling: 'categories.cycling',
    running: 'categories.running',
    gym: 'categories.gymFitness',
    airsoft: 'categories.airsoft',
    all: 'categories.all',
  };
  // Unknown categories are coerced — caller still sees the raw key as fallback.
  return (map[category] ?? `categories.${category}`) as import("@/contexts/LanguageContext").TKey;
};
