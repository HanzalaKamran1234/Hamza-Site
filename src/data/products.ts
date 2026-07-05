export interface ProductSizeChart {
  size: string;
  chest: number;
  waist: number;
  hip: number;
  length: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  collection: 'pret' | 'festive' | 'coords' | 'unstitched';
  collectionLabel: string;
  pricePKR: number;
  priceUSD: number;
  description: string;
  fabric: string;
  embroidery: string;
  care: string[];
  features: string[];
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  sizeChart: ProductSizeChart[];
  isBestSeller?: boolean;
  isTrending?: boolean;
  modelInfo?: string;
}

export const products: Product[] = [
  {
    id: "zariyah-ivory-raw-silk",
    slug: "zariyah-ivory-raw-silk-pret",
    name: "Zariyah Ivory Hand-Embroidered Raw Silk Pret",
    collection: "pret",
    collectionLabel: "Luxury Pret",
    pricePKR: 28500,
    priceUSD: 129,
    description: "An signature piece from ZARIYAH. This luxury shirt is crafted from 100% pure raw silk, featuring an elegant A-line silhouette with delicate hand-embroidery. The neck and sleeves are adorned with intricate gold zari, dabka, and pearl work, reflecting the finest Pakistani heritage and craftsmanship.",
    fabric: "100% Premium Pure Raw Silk (80g)",
    embroidery: "Intricate hand-embellished zari work, dabka, and semi-precious pearls. Over 48 hours of artisanal handwork on the neckline and sleeve cuffs.",
    care: [
      "Dry clean only at a heritage specialist.",
      "Do not iron directly on the embroidery; steam iron on reverse side.",
      "Store in a cotton garment bag away from direct sunlight."
    ],
    features: [
      "Includes pure raw silk shirt",
      "Features delicate side-slits with gold piping",
      "Handmade silk loop buttons at the back neck",
      "Comes with matching straight trousers (optional)"
    ],
    images: [
      "/images/hero_model_ivory.png",
      "/images/craft_artisans.png"
    ],
    colors: [
      { name: "Ivory White", hex: "#FCFBF7" },
      { name: "Champagne Gold", hex: "#EADCC9" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeChart: [
      { size: "XS", chest: 34, waist: 30, hip: 37, length: 44 },
      { size: "S", chest: 36, waist: 32, hip: 39, length: 44 },
      { size: "M", chest: 40, waist: 36, hip: 43, length: 45 },
      { size: "L", chest: 44, waist: 40, hip: 47, length: 46 },
      { size: "XL", chest: 48, waist: 44, hip: 51, length: 46 }
    ],
    isBestSeller: true,
    isTrending: true,
    modelInfo: "Model is 5'8\" wearing size Small. True to size."
  },
  {
    id: "mehrunissa-festive-silk",
    slug: "mehrunissa-festive-silk-gown",
    name: "Mehrunissa Crimson Festive Silk Ensemble",
    collection: "festive",
    collectionLabel: "Festive Couture",
    pricePKR: 48500,
    priceUSD: 219,
    description: "A breathtaking festive ensemble cut from luxurious raw silk in deep crimson. The shirt showcases heavy traditional hand-embellishments including classic tilla, gota, and hand-cut mirrors. Complemented by an organza dupatta with gold block-printed details and matching borders.",
    fabric: "Premium Silk shirt with pure organza dupatta.",
    embroidery: "Traditional hand-crafted tilla, gota, mirror-work, and zardozi detailing.",
    care: [
      "Strictly dry clean only.",
      "Protect from moisture and perfume sprays.",
      "Fold inside out when storing to avoid snagging the gota work."
    ],
    features: [
      "Includes heavily embroidered silk shirt",
      "Contrasting gold block-printed organza dupatta",
      "Silk inner slip included",
      "Heavy embellishments on the daman and sleeves"
    ],
    images: [
      "/images/category_festive.png",
      "/images/craft_artisans.png"
    ],
    colors: [
      { name: "Crimson Red", hex: "#6C242C" },
      { name: "Emerald Green", hex: "#1C2E24" }
    ],
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: 36, waist: 31, hip: 40, length: 48 },
      { size: "M", chest: 40, waist: 35, hip: 44, length: 48 },
      { size: "L", chest: 44, waist: 39, hip: 48, length: 49 }
    ],
    isBestSeller: false,
    isTrending: true,
    modelInfo: "Model is 5'7\" wearing size Small. Loose-fit silhouette."
  },
  {
    id: "sorrel-sage-coords",
    slug: "sorrel-sage-coords-set",
    name: "Sorrel Sage Minimalist Irish Linen Co-Ord",
    collection: "coords",
    collectionLabel: "Co-Ord Sets",
    pricePKR: 19500,
    priceUSD: 89,
    description: "Redefining modern comfort and elegance. This minimalist co-ord set features a clean structured band collar, dropped shoulders, and subtle side slit detailing on the shirt, paired with perfectly tailored straight-leg pants. Crafted from premium breathable Irish linen.",
    fabric: "100% Breathable Irish Linen",
    embroidery: "Minimalist self-tonal fine thread-work along the collar and cuffs.",
    care: [
      "Hand wash cold or dry clean.",
      "Iron at medium heat while slightly damp.",
      "Do not bleach."
    ],
    features: [
      "Includes structured linen tunic",
      "Includes matching straight-leg trousers",
      "Side pockets in trousers",
      "Concealed front button placket"
    ],
    images: [
      "/images/category_coords.png",
      "/images/hero_model_ivory.png"
    ],
    colors: [
      { name: "Sage Green", hex: "#7C8D7C" },
      { name: "Sand Beige", hex: "#D8D2C4" }
    ],
    sizes: ["XS", "S", "M", "L"],
    sizeChart: [
      { size: "XS", chest: 35, waist: 32, hip: 38, length: 32 },
      { size: "S", chest: 37, waist: 34, hip: 40, length: 32 },
      { size: "M", chest: 41, waist: 38, hip: 44, length: 33 },
      { size: "L", chest: 45, waist: 42, hip: 48, length: 34 }
    ],
    isBestSeller: true,
    isTrending: false,
    modelInfo: "Model is 5'9\" wearing size Extra Small for a tailored fit."
  },
  {
    id: "shehnai-unstitched-silk",
    slug: "shehnai-unstitched-silk-festive",
    name: "Shehnai 3-Piece Unstitched Festive Silk",
    collection: "unstitched",
    collectionLabel: "Unstitched",
    pricePKR: 32500,
    priceUSD: 149,
    description: "Unleash your creativity with this luxurious unstitched fabric kit. Features fully embroidered front and sleeve panels on silk, raw silk for trousers, and a digitally printed pure silk dupatta. Includes separate embroidered borders and motifs to allow custom styling.",
    fabric: "Pure Raw Silk panels, silk dupatta, silk trousers fabric.",
    embroidery: "Intricate floral machine-embroidered panels with tilla and sequence work overlays.",
    care: [
      "Dry clean recommended.",
      "Steam iron on the reverse side."
    ],
    features: [
      "Embroidered raw silk front panel (1.25m)",
      "Embroidered raw silk sleeves (0.7m)",
      "Plain raw silk back panel & trouser fabric (4m)",
      "Digitally printed pure medium silk dupatta (2.5m)",
      "Additional embroidered borders for daman and sleeves (2m)"
    ],
    images: [
      "/images/craft_artisans.png",
      "/images/category_festive.png"
    ],
    colors: [
      { name: "Antique Gold", hex: "#B8976C" },
      { name: "Emerald Green", hex: "#1C2E24" }
    ],
    sizes: ["Unstitched"],
    sizeChart: [],
    isBestSeller: false,
    isTrending: true,
    modelInfo: "Fabric package. Custom measurements depend on your tailor."
  },
  {
    id: "roshane-raw-silk-tunic",
    slug: "roshane-raw-silk-tunic",
    name: "Roshane Jade Embroidered Silk Tunic",
    collection: "pret",
    collectionLabel: "Luxury Pret",
    pricePKR: 26000,
    priceUSD: 119,
    description: "An artistic modern take on traditional pret. Made from mid-weight raw silk in a soothing jade hue, this tunic features clean asymmetrical embroidery running down the left front. Cut in a contemporary relaxed kurta style with soft bishop sleeves.",
    fabric: "Premium Silk (Mid-weight)",
    embroidery: "Fine thread work, resham and gold tilla, hand-sewn beads.",
    care: [
      "Dry clean only.",
      "Iron on low-medium setting with a protective fabric sheet."
    ],
    features: [
      "Includes raw silk tunic shirt",
      "Asymmetrical front embroidery",
      "Elaborate bishop sleeves with button cuffs",
      "Perfect for semi-formal gatherings"
    ],
    images: [
      "/images/hero_model_ivory.png",
      "/images/category_coords.png"
    ],
    colors: [
      { name: "Jade Green", hex: "#4C6B5F" },
      { name: "Ivory White", hex: "#FCFBF7" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeChart: [
      { size: "XS", chest: 35, waist: 31, hip: 38, length: 42 },
      { size: "S", chest: 37, waist: 33, hip: 40, length: 42 },
      { size: "M", chest: 41, waist: 37, hip: 44, length: 43 },
      { size: "L", chest: 45, waist: 41, hip: 48, length: 44 },
      { size: "XL", chest: 49, waist: 45, hip: 52, length: 44 }
    ],
    isBestSeller: true,
    isTrending: true,
    modelInfo: "Model is 5'8\" wearing size Medium."
  },
  {
    id: "nilofer-chiffon-festive",
    slug: "nilofer-chiffon-festive-kalidaar",
    name: "Nilofer Sage Handcrafted Chiffon Kalidaar",
    collection: "festive",
    collectionLabel: "Festive Couture",
    pricePKR: 52000,
    priceUSD: 239,
    description: "The epitome of graceful flow. A magnificent 12-panel Kalidaar gown made from lightweight crinkle chiffon, hand-embellished with tiny pearls, glass beads, and silver tilla work. Complemented by a matching chiffon dupatta and silk cigarette pants.",
    fabric: "Premium Crinkle Chiffon with soft silk inner slip and trousers.",
    embroidery: "Handcrafted intricate resham, silver tilla, pearls, and micro-glass beads.",
    care: [
      "Dry clean only.",
      "Store flat rather than hanging to prevent stretching the chiffon panels.",
      "Keep away from direct heat."
    ],
    features: [
      "12-Panel flared Kalidaar dress (fully lined)",
      "Includes matching crinkle chiffon dupatta with border finish",
      "Silk inner slip and slim pants included",
      "Hidden side zipper entry"
    ],
    images: [
      "/images/category_festive.png",
      "/images/hero_model_ivory.png"
    ],
    colors: [
      { name: "Sage Green", hex: "#9CAF9C" },
      { name: "Dusty Rose", hex: "#C5A3A6" }
    ],
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: 36, waist: 30, hip: 40, length: 50 },
      { size: "M", chest: 40, waist: 34, hip: 44, length: 50 },
      { size: "L", chest: 44, waist: 38, hip: 48, length: 51 }
    ],
    isBestSeller: false,
    isTrending: true,
    modelInfo: "Model is 5'7\" wearing size Small."
  }
];
