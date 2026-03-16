import { Link } from "react-router-dom";
import { ShoppingBag, Star, Clock, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { lang, t } = useLanguage();
  const { addItem } = useCart();
  const image = getProductImage(product.id, product.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group ${!product.inStock ? "opacity-70" : ""}`}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-card aspect-square mb-4">
          <img
            src={image}
            alt={lang === "en" ? product.name : product.nameTa}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Badges row */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                {lang === "en" ? product.badge : product.badgeTa}
              </span>
            )}
            {!product.inStock && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground rounded-full">
                {t("Out of Stock", "கையிருப்பு இல்லை")}
              </span>
            )}
            {product.size && (
              <span className="px-2.5 py-1 text-[10px] font-semibold bg-accent text-accent-foreground rounded-full">
                {product.size}
              </span>
            )}
          </div>

          {product.hasBulkPricing && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold bg-secondary text-secondary-foreground rounded-full flex items-center gap-1">
              <Package className="w-3 h-3" />
              {t("Bulk", "மொத்தம்")}
            </span>
          )}

          {/* Hover Brief Overlay */}
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-primary-foreground text-xs leading-relaxed mb-3 line-clamp-3">
              {lang === "en" ? product.brief : product.briefTa}
            </p>
            {product.inStock ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem({
                    id: product.id,
                    name: product.name,
                    nameTa: product.nameTa,
                    price: product.price,
                    image,
                  });
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary-foreground text-foreground rounded-xl text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                {t("Add to Cart", "கூடையில் சேர்")}
              </button>
            ) : (
              <div className="w-full text-center py-2.5 bg-muted text-muted-foreground rounded-xl text-sm font-medium">
                {t("Out of Stock", "கையிருப்பு இல்லை")}
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="px-1">
        <div className="flex items-center gap-1 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}`}
            />
          ))}
          <span className="text-[11px] text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <h3 className="font-medium text-sm text-foreground leading-snug">
          {lang === "en" ? product.name : product.nameTa}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 font-tamil">
          {lang === "en" ? product.nameTa : product.name}
        </p>

        {/* Best Time to Eat */}
        <div className="flex items-center gap-1.5 mt-2">
          <Clock className="w-3 h-3 text-primary shrink-0" />
          <span className="text-[11px] font-medium text-primary">
            {lang === "en" ? product.bestTime : product.bestTimeTa}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-semibold text-foreground">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          )}
          {product.size && (
            <span className="text-[10px] text-muted-foreground">/ {product.size}</span>
          )}
        </div>

        {product.hasBulkPricing && (
          <p className="text-[10px] text-primary mt-1 font-medium">
            {t("📦 Bulk pricing available", "📦 மொத்த விலை உள்ளது")}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
