import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-food.jpg";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden min-h-[520px] md:min-h-[600px] lg:min-h-[680px]">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Traditional South Indian foods" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      <div className="container relative z-10 py-24 md:py-36 lg:py-44">
        <div className="max-w-xl min-h-[320px] md:min-h-[280px]">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80 mb-4 h-5"
          >
            {t("Handcrafted with Heritage", "பாரம்பரியத்துடன் கைவினையாக")}
          </motion.span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6 min-h-[96px] md:min-h-[120px] lg:min-h-[144px]">
            {t(
              "Pure Traditional Foods, Made with Love",
              "தூய பாரம்பரிய உணவுகள், அன்புடன் தயாரிக்கப்பட்டவை"
            )}
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-md min-h-[48px] md:min-h-[56px]">
            {t(
              "Discover the authentic taste of South India. From organic millets to cold-pressed oils, every product tells a story of tradition.",
              "தென்னிந்தியாவின் உண்மையான சுவையைக் கண்டறியுங்கள். இயற்கை கேழ்வரகிலிருந்து செக்கு எண்ணெய் வரை."
            )}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all hover:gap-3"
            >
              {t("Shop Now", "இப்போது வாங்கு")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-xl font-medium text-sm backdrop-blur-sm hover:bg-primary-foreground/20 transition-colors"
            >
              {t("Our Story", "எங்கள் கதை")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
