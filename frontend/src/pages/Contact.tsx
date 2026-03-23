import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Instagram, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("Message sent successfully!", "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!"));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("Get in Touch", "தொடர்பு கொள்ளுங்கள்")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t(
              "We'd love to hear from you. Drop us a message and we'll get back to you soon.",
              "உங்களிடமிருந்து கேட்க விரும்புகிறோம். எங்களுக்கு ஒரு செய்தி அனுப்புங்கள்."
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              { icon: MapPin, label: t("Address", "முகவரி"), value: "1/228, Moolakadu, Tho. Pachudayampalayam,\nNamakkal, Tamil Nadu 637406" },
              { icon: Phone, label: t("Phone", "தொலைபேசி"), value: "+91 99624 00092" },
              { icon: Mail, label: t("Email", "மின்னஞ்சல்"), value: "info@Long Life Nutrition.com" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm text-foreground whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {t("Follow Us", "எங்களை பின்தொடருங்கள்")}
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="p-2.5 rounded-xl bg-accent hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                {t("Name", "பெயர்")}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                {t("Email", "மின்னஞ்சல்")}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                {t("Message", "செய்தி")}
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              {t("Send Message", "செய்தி அனுப்பு")}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
