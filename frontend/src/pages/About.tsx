import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import brandStoryImage from "@/assets/brand-story.jpg";
import { Leaf, Heart, Users, Award } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Leaf,
      title: t("100% Organic", "100% இயற்கை"),
      desc: t("All our products are sourced from certified organic farms.", "எங்கள் அனைத்து பொருட்களும் சான்றளிக்கப்பட்ட இயற்கை பண்ணைகளிலிருந்து பெறப்படுகின்றன."),
    },
    {
      icon: Heart,
      title: t("Made with Love", "அன்புடன் தயாரிக்கப்பட்டது"),
      desc: t("Every product is handcrafted using traditional methods passed down through generations.", "ஒவ்வொரு பொருளும் தலைமுறைகளாக கடத்தப்பட்ட பாரம்பரிய முறைகளைப் பயன்படுத்தி கைவினையாக தயாரிக்கப்படுகிறது."),
    },
    {
      icon: Users,
      title: t("Community First", "சமூகம் முதலில்"),
      desc: t("We support local farmers and artisans, ensuring fair wages and sustainable practices.", "உள்ளூர் விவசாயிகள் மற்றும் கைவினைஞர்களை ஆதரிக்கிறோம்."),
    },
    {
      icon: Award,
      title: t("Quality Promise", "தர உறுதிமொழி"),
      desc: t("Every batch is tested for quality and purity before reaching your hands.", "ஒவ்வொரு தொகுப்பும் உங்கள் கைகளை அடைவதற்கு முன் தரம் மற்றும் தூய்மைக்காக பரிசோதிக்கப்படுகிறது."),
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("Our Story", "எங்கள் கதை")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t(
              "A journey of passion, tradition, and authentic flavors.",
              "ஆர்வம், பாரம்பரியம் மற்றும் உண்மையான சுவைகளின் பயணம்."
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
          >
            <img src={brandStoryImage} alt="Our story" className="w-full h-[400px] md:h-[500px] object-cover" loading="lazy" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              {t("From Our Family to Yours", "எங்கள் குடும்பத்திலிருந்து உங்களுக்கு")}
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed text-sm">
              <p>
                {t(
                  "EvenMore Foods was born from a simple desire — to bring the authentic taste of our grandmother's kitchen to families everywhere. Growing up in the heart of Tamil Nadu, we were surrounded by the rich aromas of freshly ground spices, cold-pressed oils, and traditional sweets.",
                  "EvenMore Foods ஒரு எளிய ஆசையிலிருந்து பிறந்தது — எங்கள் பாட்டியின் சமையலறையின் உண்மையான சுவையை எல்லா இடங்களிலும் உள்ள குடும்பங்களுக்கு கொண்டு வருவது."
                )}
              </p>
              <p>
                {t(
                  "Today, we work with over 200 local farmers across Namakkal, sourcing the finest organic ingredients. Our commitment is unwavering: no artificial additives, no shortcuts, just pure, honest food made the way it's been made for centuries.",
                  "இன்று, நாமக்கல் முழுவதும் 200 க்கும் மேற்பட்ட உள்ளூர் விவசாயிகளுடன் இணைந்து, சிறந்த இயற்கை பொருட்களைப் பெறுகிறோம்."
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
