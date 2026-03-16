import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const Newsletter = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("Thank you for subscribing!", "பதிவு செய்ததற்கு நன்றி!"));
    setEmail("");
  };

  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t("Stay Connected", "தொடர்பில் இருங்கள்")}
          </h2>
          <p className="text-primary-foreground/70 mb-8">
            {t(
              "Subscribe to get updates on new products, special offers, and traditional recipes.",
              "புதிய பொருட்கள், சிறப்பு சலுகைகள் மற்றும் பாரம்பரிய சமையல் குறிப்புகள் பற்றிய புதுப்பிப்புகளைப் பெற பதிவு செய்யுங்கள்."
            )}
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("Enter your email", "உங்கள் மின்னஞ்சல்")}
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-primary-foreground text-primary rounded-xl font-medium text-sm hover:bg-primary-foreground/90 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Subscribe", "பதிவு")}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
