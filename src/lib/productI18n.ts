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
};

const dict: Record<Lang, ProductDict> = { en, ro };

export const getProductCopy = (id: number, lang: Lang): ProductCopy => {
  return dict[lang][id] ?? dict.en[id] ?? {
    name: `Product #${id}`,
    description: '',
    fabric: '',
    features: [],
  };
};
