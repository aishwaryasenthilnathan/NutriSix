import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, ArrowLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { getProductImage } from "@/data/productImages";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "nutrition">("description");

  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">{t("Product not found.", "பொருள் கிடைக்கவில்லை.")}</p>
        <Link to="/products" className="text-primary mt-4 inline-block">{t("Back to products", "பொருட்களுக்குத் திரும்பு")}</Link>
      </div>
    );
  }

  const image = getProductImage(product.id, product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const tabs = [
    { key: "description" as const, label: t("Description", "விவரம்") },
    { key: "ingredients" as const, label: t("Ingredients", "பொருட்கள்") },
    { key: "nutrition" as const, label: t("Nutrition", "ஊட்டச்சத்து") },
  ];

  const tabContent = {
    description: lang === "en" ? product.description : product.descriptionTa,
    ingredients: lang === "en" ? product.ingredients : product.ingredientsTa,
    nutrition: lang === "en" ? product.nutrition : product.nutritionTa,
  };

  return (
    <div className="py-8 md:py-16">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">{t("Home", "முகப்பு")}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-foreground transition-colors">{t("Products", "பொருட்கள்")}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">{lang === "en" ? product.name : product.nameTa}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl overflow-hidden bg-card aspect-square"
          >
            <img src={image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            {product.badge && (
              <span className="inline-block w-fit px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full mb-4">
                {lang === "en" ? product.badge : product.badgeTa}
              </span>
            )}

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1">
              {lang === "en" ? product.name : product.nameTa}
            </h1>
            <p className="text-muted-foreground font-tamil mb-4">
              {lang === "en" ? product.nameTa : product.name}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} {t("reviews", "மதிப்புரைகள்")})
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-foreground/80 text-sm leading-relaxed mb-8 min-h-[80px]">
              {tabContent[activeTab]}
            </p>

            <div className="mt-auto flex gap-3">
              <button
                onClick={() => addItem({ id: product.id, name: product.name, nameTa: product.nameTa, price: product.price, image })}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                {t("Add to Cart", "கூடையில் சேர்")}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20 md:mt-28">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              {t("You May Also Like", "நீங்கள் விரும்பக்கூடியவை")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
