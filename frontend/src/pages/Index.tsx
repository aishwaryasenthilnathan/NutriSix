import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import BrandStory from "@/components/BrandStory";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { products } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Truck, Shield } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const bestSellers = products.filter((p) => p.badge === "Best Seller" || p.badge === "Popular").slice(0, 4);
  const featured = products.filter((p) => p.inStock && p.size === "1kg").slice(0, 4);

  return (
    <>
      <Hero />

      {/* Trust Bar */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Leaf, label: t("100% Organic", "100% இயற்கை"), sub: t("Farm to table", "விவசாயம் to மேஜை") },
              { icon: Truck, label: t("Free Shipping", "இலவச டெலிவரி"), sub: t("Orders above ₹500", "₹500 க்கு மேல்") },
              { icon: Shield, label: t("Quality Assured", "தரம் உறுதி"), sub: t("Lab tested products", "ஆய்வகப் பரிசோதனை") },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center py-2">
                <item.icon className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground hidden sm:block">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 inline-block">
                {t("Curated Selection", "தேர்ந்தெடுக்கப்பட்ட தொகுப்பு")}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                {t("Featured Products", "சிறப்பு பொருட்கள்")}
              </h2>
            </motion.div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
            >
              {t("View All", "அனைத்தும்")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <BrandStory />

      {/* Best Sellers */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 inline-block">
              {t("Most Loved", "அதிகம் விரும்பப்பட்டவை")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t("Best Sellers", "சிறந்த விற்பனையாளர்கள்")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Index;
