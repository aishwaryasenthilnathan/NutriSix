import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-4">
              EvenMore<span className="opacity-70">Foods</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
              {t(
                "Bringing the authentic taste of traditional South Indian foods to your doorstep. Handcrafted with love, rooted in heritage.",
                "பாரம்பரிய தென்னிந்திய உணவுகளின் உண்மையான சுவையை உங்கள் வீட்டு வாசலில் கொண்டு வருகிறோம்."
              )}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">
              {t("Quick Links", "விரைவு இணைப்புகள்")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: "/products", label: t("All Products", "அனைத்து பொருட்கள்") },
                { to: "/about", label: t("Our Story", "எங்கள் கதை") },
                { to: "/contact", label: t("Contact Us", "எங்களை தொடர்பு கொள்ள") },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">
              {t("Contact", "தொடர்பு")}
            </h4>
            <div className="space-y-2.5 text-sm text-primary-foreground/60">
              <p>Namakkal, Tamil Nadu 637406</p>
              <p>+91 99624 00092</p>
              <p>info@evenmorefoods.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} EvenMore Foods. {t("All rights reserved.", "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
