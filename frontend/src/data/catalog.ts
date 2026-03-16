export interface Product {
  id: string;
  name: string;
  nameTa: string;
  description: string;
  descriptionTa: string;
  brief: string;
  briefTa: string;
  bestTime: string;
  bestTimeTa: string;
  price: number;
  originalPrice?: number;
  category: string;
  categoryTa: string;
  image: string;
  images: string[];
  ingredients: string;
  ingredientsTa: string;
  nutrition: string;
  nutritionTa: string;
  rating: number;
  reviews: number;
  badge?: string;
  badgeTa?: string;
  inStock: boolean;
  size?: string;
  hasBulkPricing: boolean;
}

export const categories = [
  { en: "All", ta: "அனைத்தும்" },
  { en: "Sample Set", ta: "மாதிரி தொகுப்பு" },
  { en: "Muesli & Granola", ta: "மியூஸ்லி & கிரானோலா" },
  { en: "Pan Cake", ta: "பான் கேக்" },
  { en: "Ready to Cook", ta: "சமைக்க தயார்" },
  { en: "Sweeteners", ta: "இனிப்புகள்" },
  { en: "Flakes", ta: "அவல்" },
  { en: "Millet Rava", ta: "சிறுதானிய ரவை" },
  { en: "Millet Parboiled Rice", ta: "புழுங்கல் அரிசி" },
  { en: "Millet Rice", ta: "சிறுதானிய அரிசி" },
  { en: "Millet Flour", ta: "சிறுதானிய மாவு" },
  { en: "Instant Puttu", ta: "உடனடி புட்டு" },
  { en: "Malt & Health Mix", ta: "மால்ட் & சத்து மாவு" },
  { en: "Porridge Mix", ta: "கஞ்சி மாவு" },
  { en: "Chappati Mix", ta: "சப்பாத்தி மாவு" },
  { en: "Traditional Rice", ta: "பாரம்பரிய அரிசி" },
];

interface CategoryMeta {
  categoryTa: string;
  brief: string;
  briefTa: string;
  bestTime: string;
  bestTimeTa: string;
  ingredients: string;
  ingredientsTa: string;
  nutrition: string;
  nutritionTa: string;
}

const catMeta: Record<string, CategoryMeta> = {
  "Sample Set": {
    categoryTa: "மாதிரி தொகுப்பு",
    brief: "Try before you buy! Sample packs to explore our wide range of millet products.",
    briefTa: "வாங்கும் முன் சுவையுங்கள்! எங்கள் பல்வேறு சிறுதானிய தயாரிப்புகளை ஆராய மாதிரி பொட்டலங்கள்.",
    bestTime: "☀️ Anytime",
    bestTimeTa: "☀️ எப்போதும்",
    ingredients: "Varies by product",
    ingredientsTa: "பொருளைப் பொறுத்து மாறுபடும்",
    nutrition: "Varies by product",
    nutritionTa: "பொருளைப் பொறுத்து மாறுபடும்",
  },
  "Muesli & Granola": {
    categoryTa: "மியூஸ்லி & கிரானோலா",
    brief: "Rich in fiber & whole grains. A nutritious, crunchy start to your day with natural ingredients.",
    briefTa: "நார்ச்சத்து & முழு தானியங்கள் நிறைந்தது. இயற்கை பொருட்களுடன் ஊட்டச்சத்து மிக்க காலை உணவு.",
    bestTime: "☀️ Breakfast",
    bestTimeTa: "☀️ காலை உணவு",
    ingredients: "Rolled Oats, Millets, Nuts, Dried Fruits, Honey/Jaggery",
    ingredientsTa: "ஓட்ஸ், சிறுதானியங்கள், கொட்டைகள், உலர் பழங்கள், தேன்/வெல்லம்",
    nutrition: "Per 100g: Calories 380kcal, Protein 10g, Fiber 8g",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 380, புரதம் 10 கி, நார்ச்சத்து 8 கி",
  },
  "Pan Cake": {
    categoryTa: "பான் கேக்",
    brief: "Quick & easy millet pancake mix. Nutritious, fruity, and perfect for kids & adults alike.",
    briefTa: "எளிய சிறுதானிய பான் கேக் மிக்ஸ். ஊட்டச்சத்து மிகுந்த, குழந்தைகளுக்கும் பெரியவர்களுக்கும் ஏற்றது.",
    bestTime: "☀️ Breakfast / 🌅 Snack",
    bestTimeTa: "☀️ காலை உணவு / 🌅 ஸ்நாக்",
    ingredients: "Millet Flour, Wheat Flour, Fruit Extracts, Baking Powder",
    ingredientsTa: "சிறுதானிய மாவு, கோதுமை மாவு, பழ சாறு, பேக்கிங் பவுடர்",
    nutrition: "Per 100g: Calories 340kcal, Protein 8g, Fiber 5g",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 340, புரதம் 8 கி, நார்ச்சத்து 5 கி",
  },
  "Ready to Cook": {
    categoryTa: "சமைக்க தயார்",
    brief: "Instant millet meals ready in minutes. Healthy, convenient, and packed with traditional flavors.",
    briefTa: "நிமிடங்களில் தயாராகும் சிறுதானிய உணவுகள். ஆரோக்கியமான, வசதியான, பாரம்பரிய சுவை.",
    bestTime: "🍽️ Lunch / 🌙 Dinner",
    bestTimeTa: "🍽️ மதிய உணவு / 🌙 இரவு உணவு",
    ingredients: "Millets, Lentils, Spices, Dehydrated Vegetables",
    ingredientsTa: "சிறுதானியங்கள், பருப்பு வகைகள், மசாலா, உலர் காய்கறிகள்",
    nutrition: "Per 100g: Calories 350kcal, Protein 12g, Fiber 6g",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 350, புரதம் 12 கி, நார்ச்சத்து 6 கி",
  },
  "Sweeteners": {
    categoryTa: "இனிப்புகள்",
    brief: "Natural unrefined sweeteners rich in minerals. A wholesome, healthy alternative to refined sugar.",
    briefTa: "தாதுக்கள் நிறைந்த இயற்கை இனிப்பு. சர்க்கரைக்கு ஆரோக்கியமான மாற்று.",
    bestTime: "☀️ Anytime",
    bestTimeTa: "☀️ எப்போதும்",
    ingredients: "100% Natural Jaggery, No Additives",
    ingredientsTa: "100% இயற்கை வெல்லம், கலப்படம் இல்லை",
    nutrition: "Per 100g: Calories 383kcal, Iron 11mg, Calcium 85mg",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 383, இரும்பு 11 மி.கி, கால்சியம் 85 மி.கி",
  },
  "Flakes": {
    categoryTa: "அவல்",
    brief: "Light, easy-to-digest millet & grain flakes. Perfect for poha, upma, or quick nutritious meals.",
    briefTa: "லேசான, எளிதில் ஜீரணமாகும் அவல். போஹா, உப்மா அல்லது விரைவான ஊட்டச்சத்து உணவுக்கு ஏற்றது.",
    bestTime: "☀️ Breakfast / 🌅 Snack",
    bestTimeTa: "☀️ காலை உணவு / 🌅 ஸ்நாக்",
    ingredients: "100% Natural Millet/Grain Flakes",
    ingredientsTa: "100% இயற்கை சிறுதானிய/தானிய அவல்",
    nutrition: "Per 100g: Calories 340kcal, Protein 8g, Fiber 6g",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 340, புரதம் 8 கி, நார்ச்சத்து 6 கி",
  },
  "Millet Rava": {
    categoryTa: "சிறுதானிய ரவை",
    brief: "Versatile millet rava for upma, kesari, pongal & more. High in fiber, gluten-free option.",
    briefTa: "உப்மா, கேசரி, பொங்கல் & மேலும் பலவற்றிற்கான சிறுதானிய ரவை. நார்ச்சத்து அதிகம்.",
    bestTime: "☀️ Breakfast / 🍽️ Lunch",
    bestTimeTa: "☀️ காலை உணவு / 🍽️ மதிய உணவு",
    ingredients: "100% Stone-ground Millet Rava",
    ingredientsTa: "100% கல்லில் அரைத்த சிறுதானிய ரவை",
    nutrition: "Per 100g: Calories 350kcal, Protein 10g, Fiber 7g",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 350, புரதம் 10 கி, நார்ச்சத்து 7 கி",
  },
  "Millet Parboiled Rice": {
    categoryTa: "புழுங்கல் அரிசி",
    brief: "Parboiled millet rice — easy to cook, retains more nutrients. A superior alternative to white rice.",
    briefTa: "புழுங்கல் சிறுதானிய அரிசி — சமைக்க எளிதானது, அதிக ஊட்டச்சத்துகளை தக்கவைக்கும்.",
    bestTime: "🍽️ Lunch / 🌙 Dinner",
    bestTimeTa: "🍽️ மதிய உணவு / 🌙 இரவு உணவு",
    ingredients: "100% Parboiled Millet Rice",
    ingredientsTa: "100% புழுங்கல் சிறுதானிய அரிசி",
    nutrition: "Per 100g: Calories 345kcal, Protein 11g, Fiber 8g",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 345, புரதம் 11 கி, நார்ச்சத்து 8 கி",
  },
  "Millet Rice": {
    categoryTa: "சிறுதானிய அரிசி",
    brief: "Whole grain millet rice rich in fiber, iron & minerals. The perfect healthy rice substitute.",
    briefTa: "நார்ச்சத்து, இரும்பு & தாதுக்கள் நிறைந்த முழு தானிய சிறுதானிய அரிசி.",
    bestTime: "🍽️ Lunch / 🌙 Dinner",
    bestTimeTa: "🍽️ மதிய உணவு / 🌙 இரவு உணவு",
    ingredients: "100% Natural Millet Rice",
    ingredientsTa: "100% இயற்கை சிறுதானிய அரிசி",
    nutrition: "Per 100g: Calories 351kcal, Protein 12g, Fiber 8g, Iron 2.8mg",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 351, புரதம் 12 கி, நார்ச்சத்து 8 கி",
  },
  "Millet Flour": {
    categoryTa: "சிறுதானிய மாவு",
    brief: "Stone-ground millet flour for rotis, dosa, and baking. Naturally gluten-free & nutrient-rich.",
    briefTa: "ரொட்டி, தோசை மற்றும் பேக்கிங்கிற்கான கல்லில் அரைத்த மாவு. இயற்கையாக குளூட்டன் இல்லாதது.",
    bestTime: "☀️ Morning / Anytime",
    bestTimeTa: "☀️ காலை / எப்போதும்",
    ingredients: "100% Stone-ground Millet Flour",
    ingredientsTa: "100% கல்லில் அரைத்த சிறுதானிய மாவு",
    nutrition: "Per 100g: Calories 340kcal, Protein 10g, Fiber 10g",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 340, புரதம் 10 கி, நார்ச்சத்து 10 கி",
  },
  "Instant Puttu": {
    categoryTa: "உடனடி புட்டு",
    brief: "Instant millet puttu mix — just add water and steam. Traditional breakfast in minutes.",
    briefTa: "உடனடி சிறுதானிய புட்டு — தண்ணீர் சேர்த்து ஆவியில் வேகவைக்கவும். நிமிடங்களில் பாரம்பரிய காலை உணவு.",
    bestTime: "☀️ Breakfast",
    bestTimeTa: "☀️ காலை உணவு",
    ingredients: "Millet Flour, Rice Flour, Salt",
    ingredientsTa: "சிறுதானிய மாவு, அரிசி மாவு, உப்பு",
    nutrition: "Per 100g: Calories 330kcal, Protein 8g, Fiber 5g",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 330, புரதம் 8 கி, நார்ச்சத்து 5 கி",
  },
  "Malt & Health Mix": {
    categoryTa: "மால்ட் & சத்து மாவு",
    brief: "Nutrient-rich health drink mix. Perfect for growing kids, elders, and health-conscious adults.",
    briefTa: "ஊட்டச்சத்து நிறைந்த சத்து பானம். வளரும் குழந்தைகள் மற்றும் பெரியவர்களுக்கு ஏற்றது.",
    bestTime: "☀️ Morning / 🌅 Evening",
    bestTimeTa: "☀️ காலை / 🌅 மாலை",
    ingredients: "Ragi, Nuts, Jaggery, Cardamom, Natural Flavors",
    ingredientsTa: "ராகி, கொட்டைகள், வெல்லம், ஏலக்காய், இயற்கை சுவையூட்டிகள்",
    nutrition: "Per 100g: Calories 370kcal, Protein 12g, Calcium 344mg",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 370, புரதம் 12 கி, கால்சியம் 344 மி.கி",
  },
  "Porridge Mix": {
    categoryTa: "கஞ்சி மாவு",
    brief: "Traditional porridge mix for a warm, nourishing meal. Easy to prepare, rich in antioxidants.",
    briefTa: "சூடான, ஊட்டமான உணவுக்கான பாரம்பரிய கஞ்சி மாவு. தயாரிக்க எளிதானது.",
    bestTime: "☀️ Breakfast / 🌅 Evening",
    bestTimeTa: "☀️ காலை உணவு / 🌅 மாலை",
    ingredients: "Heritage Rice, Millets, Spices",
    ingredientsTa: "பாரம்பரிய அரிசி, சிறுதானியங்கள், மசாலா",
    nutrition: "Per 100g: Calories 350kcal, Protein 9g, Iron 5mg",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 350, புரதம் 9 கி, இரும்பு 5 மி.கி",
  },
  "Chappati Mix": {
    categoryTa: "சப்பாத்தி மாவு",
    brief: "Ready-to-make chappati flour blend with heritage grains. Soft rotis with extra nutrition.",
    briefTa: "பாரம்பரிய தானியங்களுடன் சப்பாத்தி மாவு. கூடுதல் ஊட்டச்சத்துடன் மென்மையான ரொட்டிகள்.",
    bestTime: "🍽️ Lunch / 🌙 Dinner",
    bestTimeTa: "🍽️ மதிய உணவு / 🌙 இரவு உணவு",
    ingredients: "Heritage Rice Flour, Wheat Flour",
    ingredientsTa: "பாரம்பரிய அரிசி மாவு, கோதுமை மாவு",
    nutrition: "Per 100g: Calories 340kcal, Protein 10g, Fiber 6g",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 340, புரதம் 10 கி, நார்ச்சத்து 6 கி",
  },
  "Traditional Rice": {
    categoryTa: "பாரம்பரிய அரிசி",
    brief: "Heritage rice varieties known for unique flavors, aroma, and exceptional health benefits.",
    briefTa: "தனித்துவமான சுவை, மணம் மற்றும் சிறந்த ஆரோக்கிய நன்மைகளுக்கு பெயர்பெற்ற பாரம்பரிய அரிசி.",
    bestTime: "🍽️ Lunch / 🌙 Dinner",
    bestTimeTa: "🍽️ மதிய உணவு / 🌙 இரவு உணவு",
    ingredients: "100% Traditional Heritage Rice",
    ingredientsTa: "100% பாரம்பரிய அரிசி",
    nutrition: "Per 100g: Calories 350kcal, Protein 8g, Fiber 4g, Iron 3mg",
    nutritionTa: "100 கிராமுக்கு: கலோரிகள் 350, புரதம் 8 கி, நார்ச்சத்து 4 கி",
  },
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

let reviewCounter = 42;
function pseudoRating(): { rating: number; reviews: number } {
  reviewCounter = (reviewCounter * 17 + 31) % 300;
  return {
    rating: 4.3 + (reviewCounter % 7) * 0.1,
    reviews: 15 + (reviewCounter % 200),
  };
}

type RawProduct = [
  string,   // name
  string,   // nameTa
  number,   // price
  boolean,  // inStock
  string?,  // size
  boolean?, // hasBulkPricing
  string?,  // badge
  string?,  // badgeTa
];

function makeProducts(category: string, items: RawProduct[]): Product[] {
  const meta = catMeta[category];
  return items.map(([name, nameTa, price, inStock, size, hasBulkPricing, badge, badgeTa]) => {
    const { rating, reviews } = pseudoRating();
    const idBase = slugify(name + (size ? `-${size}` : ""));
    return {
      id: idBase,
      name,
      nameTa,
      description: meta.brief,
      descriptionTa: meta.briefTa,
      brief: meta.brief,
      briefTa: meta.briefTa,
      bestTime: meta.bestTime,
      bestTimeTa: meta.bestTimeTa,
      price,
      category,
      categoryTa: meta.categoryTa,
      image: "",
      images: [],
      ingredients: meta.ingredients,
      ingredientsTa: meta.ingredientsTa,
      nutrition: meta.nutrition,
      nutritionTa: meta.nutritionTa,
      rating: Math.round(rating * 10) / 10,
      reviews,
      badge,
      badgeTa,
      inStock,
      size,
      hasBulkPricing: hasBulkPricing ?? false,
    };
  });
}

// ═══════════════════════════════════════════
// ALL PRODUCTS
// ═══════════════════════════════════════════

export const products: Product[] = [

  // ─── SAMPLE SET ────────────────────────────
  ...makeProducts("Sample Set", [
    ["Sample Millet Rice (8-12 Variety, 200g each)", "மாதிரி சிறுதானிய அரிசி (8-12 வகை, 200 கி)", 240, true, "Per Set", false],
    ["Sample Flakes (17-20 Variety, 100g each)", "மாதிரி அவல் (17-20 வகை, 100 கி)", 390, true, "Per Set", false],
    ["Honey Muesli - Sample", "தேன் மியூஸ்லி - மாதிரி", 56, true, "150g", false],
    ["Chocolate Muesli - Sample", "சாக்லேட் மியூஸ்லி - மாதிரி", 62, true, "150g", false],
    ["Strawberry Muesli - Sample", "ஸ்ட்ராபெர்ரி மியூஸ்லி - மாதிரி", 64, true, "150g", false],
    ["Fruits Granola - Sample", "பழ கிரானோலா - மாதிரி", 57, true, "150g", false],
    ["Strawberry Pan Cake - Sample", "ஸ்ட்ராபெர்ரி பான் கேக் - மாதிரி", 44, true, "150g", false],
    ["Chocolate Pan Cake - Sample", "சாக்லேட் பான் கேக் - மாதிரி", 41, true, "150g", false],
    ["Mixed Fruit Pan Cake - Sample", "கலப்பு பழ பான் கேக் - மாதிரி", 45, true, "150g", false],
    ["Millet Poha - Sample", "சிறுதானிய போஹா - மாதிரி", 44, true, "150g", false],
    ["Millet Rava Upma - Sample", "சிறுதானிய ரவா உப்மா - மாதிரி", 49, true, "150g", false],
    ["Millet Ven Pongal Mix - Sample", "சிறுதானிய வெண் பொங்கல் - மாதிரி", 56, true, "150g", false],
    ["Millet Kesari Mix - Sample", "சிறுதானிய கேசரி - மாதிரி", 45, true, "150g", false],
    ["Millet Dosa (Beetroot) - Sample", "சிறுதானிய தோசை (பீட்ரூட்) - மாதிரி", 46, true, "150g", false],
    ["Ragi Malt Beetroot - Sample", "ராகி மால்ட் பீட்ரூட் - மாதிரி", 47, true, "150g", false],
    ["Ragi Malt Carrot - Sample", "ராகி மால்ட் கேரட் - மாதிரி", 48, true, "150g", false],
    ["Mixed Fruit & Nuts Muesli - Sample", "கலப்பு பழம் & கொட்டை மியூஸ்லி - மாதிரி", 56, true, "150g", false],
    ["Sugar Free Muesli - Sample", "சர்க்கரை இல்லா மியூஸ்லி - மாதிரி", 53, true, "150g", false],
    ["Sugar Free Stevia Muesli - Sample", "ஸ்டீவியா மியூஸ்லி - மாதிரி", 59, true, "150g", false],
    ["Millet Dosa (Spinach) - Sample", "சிறுதானிய தோசை (கீரை) - மாதிரி", 44, true, "150g", false],
    ["Millet Dosa (Moringa) - Sample", "சிறுதானிய தோசை (முருங்கை) - மாதிரி", 43, true, "150g", false],
  ]),

  // ─── MUESLI & GRANOLA (Bulk) ───────────────
  ...makeProducts("Muesli & Granola", [
    ["Honey Muesli", "தேன் மியூஸ்லி", 265, true, "Bulk (per kg)", true, "Popular", "பிரபலமான"],
    ["Chocolate Muesli", "சாக்லேட் மியூஸ்லி", 298, true, "Bulk (per kg)", true],
    ["Strawberry Muesli", "ஸ்ட்ராபெர்ரி மியூஸ்லி", 305, false, "Bulk (per kg)", true],
    ["Fruits Granola", "பழ கிரானோலா", 270, true, "Bulk (per kg)", true],
    ["Mixed Fruit & Nuts Muesli", "கலப்பு பழம் & கொட்டை மியூஸ்லி", 264, true, "Bulk (per kg)", true],
    ["Sugar Free Muesli", "சர்க்கரை இல்லா மியூஸ்லி", 246, false, "Bulk (per kg)", true],
    ["Sugar Free Stevia Muesli", "ஸ்டீவியா மியூஸ்லி", 282, true, "Bulk (per kg)", true],
  ]),

  // Muesli 1kg
  ...makeProducts("Muesli & Granola", [
    ["Honey Muesli", "தேன் மியூஸ்லி", 271, true, "1kg"],
    ["Chocolate Muesli", "சாக்லேட் மியூஸ்லி", 308, true, "1kg"],
    ["Strawberry Muesli", "ஸ்ட்ராபெர்ரி மியூஸ்லி", 313, false, "1kg"],
    ["Fruits Granola", "பழ கிரானோலா", 278, true, "1kg"],
    ["Mixed Fruit & Nuts Muesli", "கலப்பு பழம் & கொட்டை மியூஸ்லி", 273, true, "1kg"],
    ["Sugar Free Muesli", "சர்க்கரை இல்லா மியூஸ்லி", 254, false, "1kg"],
    ["Sugar Free Stevia Muesli", "ஸ்டீவியா மியூஸ்லி", 290, true, "1kg"],
  ]),

  // Muesli 500g
  ...makeProducts("Muesli & Granola", [
    ["Honey Muesli", "தேன் மியூஸ்லி", 151, true, "500g"],
    ["Chocolate Muesli", "சாக்லேட் மியூஸ்லி", 168, true, "500g"],
    ["Strawberry Muesli", "ஸ்ட்ராபெர்ரி மியூஸ்லி", 171, false, "500g"],
    ["Fruits Granola", "பழ கிரானோலா", 152, true, "500g"],
    ["Mixed Fruit & Nuts Muesli", "கலப்பு பழம் & கொட்டை மியூஸ்லி", 151, true, "500g"],
    ["Sugar Free Muesli", "சர்க்கரை இல்லா மியூஸ்லி", 141, false, "500g"],
    ["Sugar Free Stevia Muesli", "ஸ்டீவியா மியூஸ்லி", 160, true, "500g"],
  ]),

  // ─── PAN CAKE (Bulk) ──────────────────────
  ...makeProducts("Pan Cake", [
    ["Strawberry Pan Cake", "ஸ்ட்ராபெர்ரி பான் கேக்", 185, true, "Bulk (per kg)", true],
    ["Chocolate Pan Cake", "சாக்லேட் பான் கேக்", 166, true, "Bulk (per kg)", true],
    ["Mixed Fruit Pan Cake", "கலப்பு பழ பான் கேக்", 188, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Pan Cake", [
    ["Strawberry Pan Cake", "ஸ்ட்ராபெர்ரி பான் கேக்", 197, true, "1kg"],
    ["Chocolate Pan Cake", "சாக்லேட் பான் கேக்", 178, true, "1kg"],
    ["Mixed Fruit Pan Cake", "கலப்பு பழ பான் கேக்", 199, true, "1kg"],
  ]),
  ...makeProducts("Pan Cake", [
    ["Strawberry Pan Cake", "ஸ்ட்ராபெர்ரி பான் கேக்", 107, true, "500g"],
    ["Chocolate Pan Cake", "சாக்லேட் பான் கேக்", 98, true, "500g"],
    ["Mixed Fruit Pan Cake", "கலப்பு பழ பான் கேக்", 109, true, "500g"],
  ]),

  // ─── READY TO COOK (Bulk) ─────────────────
  ...makeProducts("Ready to Cook", [
    ["Millet Ven Pongal", "சிறுதானிய வெண் பொங்கல்", 261, true, "Bulk (per kg)", true],
    ["Millet Rava Upma", "சிறுதானிய ரவா உப்மா", 215, true, "Bulk (per kg)", true],
    ["Millet Poha", "சிறுதானிய போஹா", 179, true, "Bulk (per kg)", true],
    ["Millet Kesari", "சிறுதானிய கேசரி", 187, true, "Bulk (per kg)", true],
    ["Foxtail Sweet Pongal", "தினை சர்க்கரை பொங்கல்", 193, true, "Bulk (per kg)", true],
    ["Millet Dosa (Beetroot)", "சிறுதானிய தோசை (பீட்ரூட்)", 199, true, "Bulk (per kg)", true],
    ["Millet Dosa (Spinach)", "சிறுதானிய தோசை (கீரை)", 188, false, "Bulk (per kg)", true],
    ["Millet Dosa (Moringa)", "சிறுதானிய தோசை (முருங்கை)", 184, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Ready to Cook", [
    ["Millet Ven Pongal", "சிறுதானிய வெண் பொங்கல்", 269, true, "1kg"],
    ["Millet Rava Upma", "சிறுதானிய ரவா உப்மா", 224, true, "1kg"],
    ["Millet Poha", "சிறுதானிய போஹா", 192, true, "1kg"],
    ["Millet Kesari", "சிறுதானிய கேசரி", 194, true, "1kg"],
    ["Foxtail Sweet Pongal", "தினை சர்க்கரை பொங்கல்", 201, true, "1kg"],
    ["Millet Dosa (Beetroot)", "சிறுதானிய தோசை (பீட்ரூட்)", 207, true, "1kg"],
    ["Millet Dosa (Spinach)", "சிறுதானிய தோசை (கீரை)", 196, false, "1kg"],
    ["Millet Dosa (Moringa)", "சிறுதானிய தோசை (முருங்கை)", 192, true, "1kg"],
  ]),
  ...makeProducts("Ready to Cook", [
    ["Millet Ven Pongal", "சிறுதானிய வெண் பொங்கல்", 145, true, "500g"],
    ["Millet Rava Upma", "சிறுதானிய ரவா உப்மா", 122, true, "500g"],
    ["Millet Poha", "சிறுதானிய போஹா", 104, true, "500g"],
    ["Millet Kesari", "சிறுதானிய கேசரி", 107, true, "500g"],
    ["Foxtail Sweet Pongal", "தினை சர்க்கரை பொங்கல்", 111, true, "500g"],
    ["Millet Dosa (Beetroot)", "சிறுதானிய தோசை (பீட்ரூட்)", 113, true, "500g"],
    ["Millet Dosa (Spinach)", "சிறுதானிய தோசை (கீரை)", 107, true, "500g"],
    ["Millet Dosa (Moringa)", "சிறுதானிய தோசை (முருங்கை)", 105, true, "500g"],
  ]),

  // ─── SWEETENERS ────────────────────────────
  ...makeProducts("Sweeteners", [
    ["Sugarcane Jaggery Powder", "நாட்டு சர்க்கரை", 61, true, "Bulk (per kg)", true],
    ["Palm Jaggery Powder", "பனை சர்க்கரை", 326, true, "Bulk (per kg)", true],
    ["Coconut Jaggery Powder", "தென்னை சர்க்கரை", 318, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Sweeteners", [
    ["Sugarcane Jaggery Powder", "நாட்டு சர்க்கரை", 65, true, "1kg"],
    ["Palm Jaggery Powder", "பனை சர்க்கரை", 336, true, "1kg"],
    ["Coconut Jaggery Powder", "தென்னை சர்க்கரை", 325, true, "1kg"],
  ]),

  // ─── FLAKES (Bulk) ────────────────────────
  ...makeProducts("Flakes", [
    ["Foxtail Flakes", "தினை அவல்", 103, true, "Bulk (per kg)", true],
    ["Little Flakes", "சாமை அவல்", 129, true, "Bulk (per kg)", true],
    ["Kodo Flakes", "வரகு அவல்", 116, true, "Bulk (per kg)", true],
    ["Barnyard Flakes", "குதிரைவாலி அவல்", 135, true, "Bulk (per kg)", true],
    ["Ragi Flakes", "ராகி அவல்", 80, true, "Bulk (per kg)", true],
    ["Pearl Flakes", "கம்பு அவல்", 78, true, "Bulk (per kg)", true],
    ["White Sorghum Flakes", "வெள்ளை சோள அவல்", 79, true, "Bulk (per kg)", true],
    ["Red Sorghum Flakes", "சிவப்பு சோள அவல்", 86, true, "Bulk (per kg)", true],
    ["Wheat Flakes", "கோதுமை அவல்", 83, false, "Bulk (per kg)", true],
    ["Barley Flakes", "பார்லி அவல்", 90, true, "Bulk (per kg)", true],
    ["Mapillai Samba Flakes", "மாப்பிள்ளை சாம்பா அவல்", 95, true, "Bulk (per kg)", true],
    ["Karupukavuni Flakes", "கறுப்புக் கவுணி அவல்", 188, true, "Bulk (per kg)", true, "Premium", "பிரீமியம்"],
    ["Poongar Flakes", "பூங்கார் அவல்", 101, true, "Bulk (per kg)", true],
    ["Kattuyanam Flakes", "காட்டுயானம் அவல்", 102, true, "Bulk (per kg)", true],
    ["Karunguruvai Flakes", "கருங்குறுவை அவல்", 100, true, "Bulk (per kg)", true],
    ["Thanga Samba Flakes", "தங்கச் சம்பா அவல்", 97, true, "Bulk (per kg)", true],
    ["Green Gram Flakes", "பச்சைப்பயறு அவல்", 144, true, "Bulk (per kg)", true],
    ["Horsegram Flakes", "கொள்ளு அவல்", 91, true, "Bulk (per kg)", true],
    ["Moth Beans Flakes", "நரிப்பயறு அவல்", 121, false, "Bulk (per kg)", true],
    ["Red Matta Rice Flakes", "சிவப்பு மட்டை அரிசி அவல்", 87, true, "Bulk (per kg)", true],
    ["Red Rice Flakes", "சிவப்பு அரிசி அவல்", 93, true, "Bulk (per kg)", true],
  ]),

  // Flakes 1kg
  ...makeProducts("Flakes", [
    ["Foxtail Flakes", "தினை அவல்", 109, true, "1kg"],
    ["Little Flakes", "சாமை அவல்", 136, true, "1kg"],
    ["Kodo Flakes", "வரகு அவல்", 122, true, "1kg"],
    ["Barnyard Flakes", "குதிரைவாலி அவல்", 141, true, "1kg"],
    ["Ragi Flakes", "ராகி அவல்", 87, true, "1kg"],
    ["Pearl Flakes", "கம்பு அவல்", 84, true, "1kg"],
    ["White Sorghum Flakes", "வெள்ளை சோள அவல்", 85, true, "1kg"],
    ["Red Sorghum Flakes", "சிவப்பு சோள அவல்", 93, true, "1kg"],
    ["Wheat Flakes", "கோதுமை அவல்", 90, false, "1kg"],
    ["Barley Flakes", "பார்லி அவல்", 96, true, "1kg"],
    ["Mapillai Samba Flakes", "மாப்பிள்ளை சாம்பா அவல்", 101, true, "1kg"],
    ["Karupukavuni Flakes", "கறுப்புக் கவுணி அவல்", 193, true, "1kg"],
    ["Poongar Flakes", "பூங்கார் அவல்", 107, true, "1kg"],
    ["Kattuyanam Flakes", "காட்டுயானம் அவல்", 108, true, "1kg"],
    ["Karunguruvai Flakes", "கருங்குறுவை அவல்", 106, true, "1kg"],
    ["Thanga Samba Flakes", "தங்கச் சம்பா அவல்", 104, true, "1kg"],
    ["Green Gram Flakes", "பச்சைப்பயறு அவல்", 150, true, "1kg"],
    ["Horsegram Flakes", "கொள்ளு அவல்", 97, true, "1kg"],
    ["Moth Beans Flakes", "நரிப்பயறு அவல்", 128, false, "1kg"],
    ["Red Matta Rice Flakes", "சிவப்பு மட்டை அரிசி அவல்", 93, true, "1kg"],
    ["Red Rice Flakes", "சிவப்பு அரிசி அவல்", 98, true, "1kg"],
  ]),

  // Flakes 200g
  ...makeProducts("Flakes", [
    ["Foxtail Flakes", "தினை அவல்", 30, true, "200g"],
    ["Little Flakes", "சாமை அவல்", 36, true, "200g"],
    ["Kodo Flakes", "வரகு அவல்", 33, true, "200g"],
    ["Barnyard Flakes", "குதிரைவாலி அவல்", 37, true, "200g"],
    ["Ragi Flakes", "ராகி அவல்", 26, true, "200g"],
    ["Pearl Flakes", "கம்பு அவல்", 25, true, "200g"],
    ["White Sorghum Flakes", "வெள்ளை சோள அவல்", 26, true, "200g"],
    ["Red Sorghum Flakes", "சிவப்பு சோள அவல்", 27, true, "200g"],
    ["Wheat Flakes", "கோதுமை அவல்", 26, false, "200g"],
    ["Barley Flakes", "பார்லி அவல்", 28, true, "200g"],
    ["Mapillai Samba Flakes", "மாப்பிள்ளை சாம்பா அவல்", 29, true, "200g"],
    ["Karupukavuni Flakes", "கறுப்புக் கவுணி அவல்", 47, true, "200g"],
    ["Poongar Flakes", "பூங்கார் அவல்", 30, true, "200g"],
    ["Kattuyanam Flakes", "காட்டுயானம் அவல்", 30, true, "200g"],
    ["Karunguruvai Flakes", "கருங்குறுவை அவல்", 29, true, "200g"],
    ["Thanga Samba Flakes", "தங்கச் சம்பா அவல்", 29, true, "200g"],
    ["Green Gram Flakes", "பச்சைப்பயறு அவல்", 39, true, "200g"],
    ["Horsegram Flakes", "கொள்ளு அவல்", 28, true, "200g"],
    ["Moth Beans Flakes", "நரிப்பயறு அவல்", 34, false, "200g"],
    ["Red Matta Rice Flakes", "சிவப்பு மட்டை அரிசி அவல்", 27, true, "200g"],
    ["Red Rice Flakes", "சிவப்பு அரிசி அவல்", 28, true, "200g"],
  ]),

  // ─── MILLET RAVA ──────────────────────────
  ...makeProducts("Millet Rava", [
    ["Foxtail Rava", "தினை ரவை", 102, true, "Bulk (per kg)", true],
    ["Little Rava", "சாமை ரவை", 138, true, "Bulk (per kg)", true],
    ["Barnyard Rava", "குதிரைவாலி ரவை", 154, true, "Bulk (per kg)", true],
    ["Ragi Rava", "ராகி ரவை", 79, true, "Bulk (per kg)", true],
    ["Pearl Rava", "கம்பு ரவை", 68, true, "Bulk (per kg)", true],
    ["White Sorghum Rava", "வெள்ளை சோள ரவை", 70, true, "Bulk (per kg)", true],
    ["Mapillai Samba Rava", "மாப்பிள்ளை ரவை", 108, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Millet Rava", [
    ["Foxtail Rava", "தினை ரவை", 109, true, "1kg"],
    ["Little Rava", "சாமை ரவை", 145, true, "1kg"],
    ["Barnyard Rava", "குதிரைவாலி ரவை", 159, true, "1kg"],
    ["Ragi Rava", "ராகி ரவை", 86, true, "1kg"],
    ["Pearl Rava", "கம்பு ரவை", 75, true, "1kg"],
    ["White Sorghum Rava", "வெள்ளை சோள ரவை", 77, true, "1kg"],
    ["Mapillai Samba Rava", "மாப்பிள்ளை ரவை", 113, true, "1kg"],
  ]),
  ...makeProducts("Millet Rava", [
    ["Foxtail Rava", "தினை ரவை", 60, true, "500g"],
    ["Little Rava", "சாமை ரவை", 77, true, "500g"],
    ["Barnyard Rava", "குதிரைவாலி ரவை", 85, true, "500g"],
    ["Ragi Rava", "ராகி ரவை", 48, true, "500g"],
    ["Pearl Rava", "கம்பு ரவை", 42, true, "500g"],
    ["White Sorghum Rava", "வெள்ளை சோள ரவை", 43, true, "500g"],
    ["Mapillai Samba Rava", "மாப்பிள்ளை ரவை", 61, true, "500g"],
  ]),

  // ─── MILLET PARBOILED RICE ────────────────
  ...makeProducts("Millet Parboiled Rice", [
    ["Foxtail Rice Boiled", "தினை அரிசி புழுங்கல்", 92, true, "Bulk (per kg)", true],
    ["Little Rice Boiled", "சாமை அரிசி புழுங்கல்", 116, true, "Bulk (per kg)", true],
    ["Kodo Rice Boiled", "வரகு அரிசி புழுங்கல்", 114, true, "Bulk (per kg)", true],
    ["Barnyard Rice Boiled", "குதிரைவாலி புழுங்கல்", 127, true, "Bulk (per kg)", true],
    ["Ragi Boiled", "கேழ்வரகு புழுங்கல்", 78, true, "Bulk (per kg)", true],
    ["Pearl Boiled", "கம்பு புழுங்கல்", 68, true, "Bulk (per kg)", true],
    ["White Sorghum Boiled", "வெள்ளை சோளம் புழுங்கல்", 69, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Millet Parboiled Rice", [
    ["Foxtail Rice Boiled", "தினை அரிசி புழுங்கல்", 96, true, "1kg"],
    ["Little Rice Boiled", "சாமை அரிசி புழுங்கல்", 120, true, "1kg"],
    ["Kodo Rice Boiled", "வரகு அரிசி புழுங்கல்", 118, true, "1kg"],
    ["Barnyard Rice Boiled", "குதிரைவாலி புழுங்கல்", 131, true, "1kg"],
    ["Ragi Boiled", "கேழ்வரகு புழுங்கல்", 81, true, "1kg"],
    ["Pearl Boiled", "கம்பு புழுங்கல்", 71, true, "1kg"],
    ["White Sorghum Boiled", "வெள்ளை சோளம் புழுங்கல்", 72, true, "1kg"],
  ]),

  // ─── MILLET RICE ──────────────────────────
  ...makeProducts("Millet Rice", [
    ["Foxtail Rice", "தினை அரிசி", 66, false, "Bulk (per kg)", true],
    ["Little Rice", "சாமை அரிசி", 88, false, "Bulk (per kg)", true],
    ["Kodo Rice", "வரகு அரிசி", 84, true, "Bulk (per kg)", true],
    ["Barnyard Rice", "குதிரைவாலி அரிசி", 100, true, "Bulk (per kg)", true],
    ["Ragi", "கேழ்வரகு", 53, true, "Bulk (per kg)", true],
    ["Pearl Millet (Native)", "நாட்டு கம்பு", 82, false, "Bulk (per kg)", true],
    ["Pearl Millet (Imported)", "குண்டு கம்பு", 45, true, "Bulk (per kg)", true],
    ["White Sorghum", "வெள்ளை சோளம்", 48, true, "Bulk (per kg)", true],
    ["Red Sorghum", "சிவப்பு சோளம்", 51, false, "Bulk (per kg)", true],
    ["Proso Rice", "பனிவரகு அரிசி", 109, false, "Bulk (per kg)", true],
    ["Browntop Rice", "பிரவுண்டாப்", 125, true, "Bulk (per kg)", true],
    ["Sprouted Ragi", "முளைகட்டிய ராகி", 78, true, "Bulk (per kg)", true],
    ["Barley Rice", "பார்லி அரிசி", 62, true, "Bulk (per kg)", true],
    ["Wheat", "கோதுமை", 45, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Millet Rice", [
    ["Foxtail Rice", "தினை அரிசி", 73, false, "1kg"],
    ["Little Rice", "சாமை அரிசி", 94, false, "1kg"],
    ["Kodo Rice", "வரகு அரிசி", 86, true, "1kg"],
    ["Barnyard Rice", "குதிரைவாலி அரிசி", 103, true, "1kg"],
    ["Ragi", "கேழ்வரகு அரிசி", 57, true, "1kg"],
    ["Pearl Millet (Native)", "நாட்டு கம்பு", 86, false, "1kg"],
    ["Pearl Millet (Imported)", "குண்டு கம்பு", 48, true, "1kg"],
    ["White Sorghum", "வெள்ளை சோளம்", 50, true, "1kg"],
    ["Red Sorghum", "சிவப்பு சோளம்", 54, false, "1kg"],
    ["Proso Rice", "பனிவரகு அரிசி", 115, false, "1kg"],
    ["Browntop Rice", "பிரவுண்டாப்", 126, true, "1kg"],
    ["Sprouted Ragi", "முளைகட்டிய ராகி", 86, true, "1kg"],
    ["Barley Rice", "பார்லி அரிசி", 68, true, "1kg"],
    ["Wheat", "கோதுமை", 51, true, "1kg"],
  ]),

  // ─── MILLET FLOUR ─────────────────────────
  ...makeProducts("Millet Flour", [
    ["Foxtail Flour", "தினை மாவு", 79, true, "Bulk (per kg)", true],
    ["Little Flour", "சாமை மாவு", 101, true, "Bulk (per kg)", true],
    ["Barnyard Flour", "குதிரைவாலி மாவு", 112, true, "Bulk (per kg)", true],
    ["Ragi Flour", "ராகி மாவு", 57, true, "Bulk (per kg)", true],
    ["Pearl Flour", "குண்டு கம்பு மாவு", 48, true, "Bulk (per kg)", true],
    ["White Sorghum Flour", "வெள்ளை சோள மாவு", 50, true, "Bulk (per kg)", true],
    ["Sprouted Ragi Flour", "முளைகட்டிய ராகி மாவு", 79, true, "Bulk (per kg)", true],
    ["Whole Wheat Flour", "கோதுமை மாவு", 51, true, "Bulk (per kg)", true],
    ["Mapillai Samba Flour", "மாப்பிள்ளை மாவு", 77, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Millet Flour", [
    ["Foxtail Flour", "தினை மாவு", 83, true, "1kg"],
    ["Little Flour", "சாமை மாவு", 106, true, "1kg"],
    ["Barnyard Flour", "குதிரைவாலி மாவு", 118, true, "1kg"],
    ["Ragi Flour", "ராகி மாவு", 60, true, "1kg"],
    ["Pearl Flour", "குண்டு கம்பு மாவு", 54, true, "1kg"],
    ["White Sorghum Flour", "வெள்ளை சோள மாவு", 55, true, "1kg"],
    ["Sprouted Ragi Flour", "முளைகட்டிய ராகி மாவு", 84, true, "1kg"],
    ["Whole Wheat Flour", "கோதுமை மாவு", 55, true, "1kg"],
    ["Mapillai Samba Flour", "மாப்பிள்ளை மாவு", 82, true, "1kg"],
  ]),

  // ─── INSTANT PUTTU ────────────────────────
  ...makeProducts("Instant Puttu", [
    ["White Sorghum Puttu", "வெள்ளை சோள புட்டு", 75, true, "Bulk (per kg)", true],
    ["Pearl Puttu", "கம்பு புட்டு", 74, true, "Bulk (per kg)", true],
    ["Corn Puttu", "மக்காச்சோள புட்டு", 73, true, "Bulk (per kg)", true],
    ["Instant Ragi Puttu", "உடனடி கேழ்வரகு புட்டு", 75, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Instant Puttu", [
    ["White Sorghum Puttu", "வெள்ளை சோள புட்டு", 80, true, "1kg"],
    ["Pearl Puttu", "கம்பு புட்டு", 79, true, "1kg"],
    ["Corn Puttu", "மக்காச்சோள புட்டு", 78, true, "1kg"],
    ["Instant Ragi Puttu", "உடனடி கேழ்வரகு புட்டு", 79, true, "1kg"],
  ]),

  // ─── MALT & HEALTH MIX ───────────────────
  ...makeProducts("Malt & Health Mix", [
    ["Health Mix (Sathu Maavu)", "சத்து மாவு", 170, true, "Bulk (per kg)", true, "Best Seller", "அதிகம் விற்பனை"],
    ["Ragi Malt (Carrot)", "ராகி மால்ட் (கேரட்)", 214, true, "Bulk (per kg)", true],
    ["Ragi Malt (Beetroot)", "ராகி மால்ட் (பீட்ரூட்)", 207, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Malt & Health Mix", [
    ["Health Mix (Sathu Maavu)", "சத்து மாவு", 100, true, "500g"],
    ["Ragi Malt (Carrot)", "ராகி மால்ட் (கேரட்)", 120, true, "500g"],
    ["Ragi Malt (Beetroot)", "ராகி மால்ட் (பீட்ரூட்)", 118, true, "500g"],
  ]),

  // ─── PORRIDGE MIX ─────────────────────────
  ...makeProducts("Porridge Mix", [
    ["Karupukavuni Porridge Mix", "கறுப்புக்கவுணி கஞ்சி மாவு", 263, true, "Bulk (per kg)", true],
    ["Mapillai Samba Porridge Mix", "மாப்பிள்ளை சம்பா கஞ்சி மாவு", 190, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Porridge Mix", [
    ["Karupukavuni Porridge Mix", "கறுப்புக்கவுணி கஞ்சி மாவு", 146, true, "500g"],
    ["Mapillai Samba Porridge Mix", "மாப்பிள்ளை சம்பா கஞ்சி மாவு", 109, true, "500g"],
  ]),

  // ─── CHAPPATI MIX ─────────────────────────
  ...makeProducts("Chappati Mix", [
    ["Karupukavuni Chappati Mix", "கறுப்புக்கவுணி சப்பாத்தி மாவு", 120, true, "Bulk (per kg)", true],
    ["Mapillai Samba Chappati Mix", "மாப்பிள்ளை சம்பா சப்பாத்தி மாவு", 99, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Chappati Mix", [
    ["Karupukavuni Chappati Mix", "கறுப்புக்கவுணி சப்பாத்தி மாவு", 74, true, "500g"],
    ["Mapillai Samba Chappati Mix", "மாப்பிள்ளை சம்பா சப்பாத்தி மாவு", 62, true, "500g"],
  ]),

  // ─── TRADITIONAL RICE ─────────────────────
  ...makeProducts("Traditional Rice", [
    ["Mapillai Samba Rice", "மாப்பிள்ளை சாம்பா அரிசி", 68, true, "Bulk (per kg)", true],
    ["Karupu Kavuni Rice", "கறுப்புக் கவுணி அரிசி", 140, true, "Bulk (per kg)", true, "Premium", "பிரீமியம்"],
    ["Poongar Rice", "பூங்கார் அரிசி", 73, true, "Bulk (per kg)", true],
  ]),
  ...makeProducts("Traditional Rice", [
    ["Mapillai Samba Rice", "மாப்பிள்ளை சம்பா அரிசி", 75, true, "1kg"],
    ["Karupu Kavuni Rice", "கறுப்புக் கவுணி அரிசி", 146, true, "1kg"],
    ["Poongar Rice", "பூங்கார் அரிசி", 75, true, "1kg"],
  ]),
];

export const testimonials = [
  {
    name: "Priya Krishnan",
    nameTa: "ப்ரியா கிருஷ்ணன்",
    text: "The quality of these traditional foods is unmatched. It reminds me of my grandmother's kitchen.",
    textTa: "இந்த பாரம்பரிய உணவுகளின் தரம் நிகரற்றது. என் பாட்டியின் சமையலறையை நினைவூட்டுகிறது.",
    location: "Chennai",
    locationTa: "சென்னை",
    rating: 5,
  },
  {
    name: "Ramesh Sundaram",
    nameTa: "ரமேஷ் சுந்தரம்",
    text: "Finally found authentic cold-pressed oils that taste exactly like what we used to get in our village.",
    textTa: "நாங்கள் கிராமத்தில் பெறும் சுவையுடன் உண்மையான செக்கு எண்ணெய்களை கண்டுபிடித்தேன்.",
    location: "Coimbatore",
    locationTa: "கோவை",
    rating: 5,
  },
  {
    name: "Lakshmi Venkat",
    nameTa: "லக்ஷ்மி வெங்கட்",
    text: "My kids love the ragi cookies. Healthy snacking has never been this delicious!",
    textTa: "என் குழந்தைகள் ராகி குக்கீஸை மிகவும் விரும்புகிறார்கள். ஆரோக்கியமான ஸ்நாக் இவ்வளவு சுவையாக இருந்ததில்லை!",
    location: "Madurai",
    locationTa: "மதுரை",
    rating: 5,
  },
  {
    name: "Karthik Raja",
    nameTa: "கார்த்திக் ராஜா",
    text: "The millet flakes and rava are of exceptional quality. We use them daily in our household.",
    textTa: "சிறுதானிய அவல் மற்றும் ரவை தரம் சிறப்பானது. தினமும் எங்கள் வீட்டில் பயன்படுத்துகிறோம்.",
    location: "Trichy",
    locationTa: "திருச்சி",
    rating: 5,
  },
];
