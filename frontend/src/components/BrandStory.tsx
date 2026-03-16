import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import brandStoryImage from "@/assets/brand-story.jpg";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BrandStory = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={brandStoryImage}
                alt="Our traditional kitchen"
                loading="lazy"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 inline-block">
              {t("Our Story", "எங்கள் கதை")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t(
                "Rooted in Tradition, Crafted for Today",
                "பாரம்பரியத்தில் வேரூன்றிய, இன்றைக்காக வடிவமைக்கப்பட்டது"
              )}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t(
                "For generations, our family has been dedicated to preserving the authentic flavors of South Indian cuisine. Every product is made using time-honored methods — from stone-grinding millets to wood-pressing oils.",
                "தலைமுறைகளாக, எங்கள் குடும்பம் தென்னிந்திய சமையலின் உண்மையான சுவைகளைப் பாதுகாப்பதில் அர்ப்பணிப்புடன் செயல்படுகிறது."
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t(
                "We work directly with local farmers who practice organic farming, ensuring every ingredient is pure, natural, and full of goodness.",
                "நாங்கள் இயற்கை விவசாயம் செய்யும் உள்ளூர் விவசாயிகளுடன் நேரடியாக வேலை செய்கிறோம்."
              )}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              {t("Learn More About Us", "எங்களைப் பற்றி மேலும் அறிய")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
