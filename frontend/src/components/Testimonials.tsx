import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { testimonials } from "@/data/products";

const Testimonials = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 inline-block">
            {t("Testimonials", "வாடிக்கையாளர் கருத்துக்கள்")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {t("What Our Customers Say", "எங்கள் வாடிக்கையாளர்கள் என்ன சொல்கிறார்கள்")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-foreground/80 leading-relaxed mb-6 text-sm">
                "{lang === "en" ? item.text : item.textTa}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-semibold text-sm">{lang === "en" ? item.name : item.nameTa}</p>
              <p className="text-xs text-muted-foreground">{lang === "en" ? item.location : item.locationTa}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
