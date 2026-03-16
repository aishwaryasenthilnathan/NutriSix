import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

const Products = () => {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameTa.includes(searchQuery) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-12 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("Our Products", "எங்கள் பொருட்கள்")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            {t(
              "Discover our complete range of traditional, organic millet-based foods.",
              "எங்களின் முழுமையான பாரம்பரிய, இயற்கை சிறுதானிய உணவுகளைக் கண்டறியுங்கள்."
            )}
          </p>

          {/* Search */}
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "en" ? "Search products..." : "தயாரிப்புகளைத் தேடு..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.en}
              onClick={() => setActiveCategory(cat.en)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.en
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
            >
              {lang === "en" ? cat.en : cat.ta}
            </button>
          ))}
        </div>

        {/* Product count */}
        <p className="text-sm text-muted-foreground mb-6">
          {t(
            `Showing ${filtered.length} products`,
            `${filtered.length} பொருட்கள் காட்டப்படுகின்றன`
          )}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">
            {t("No products found.", "பொருட்கள் இல்லை.")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
