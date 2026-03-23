import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Trash2, ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductImage } from "@/data/productImages";
import { products } from "@/data/products";

const Checkout = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState<"cart" | "shipping" | "confirmation">("cart");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", state: "Tamil Nadu", pincode: "", notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message
    const itemLines = items.map(
      (item) => `• ${item.name} x${item.quantity} — ₹${item.price * item.quantity}`
    ).join("\n");
    const msg = `🛒 *New Order from Long Life Nutrition*\n\n${itemLines}\n\n💰 Total: ₹${totalPrice}\n\n📦 *Shipping To:*\n${form.name}\n${form.phone}\n${form.address}, ${form.city}\n${form.state} - ${form.pincode}\n\n📝 Notes: ${form.notes || "None"}`;
    
    // Open WhatsApp with message
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
    setStep("confirmation");
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground text-lg mb-4">{t("Your cart is empty", "உங்கள் கூடை காலியாக உள்ளது")}</p>
        <Link to="/products" className="text-primary font-medium hover:underline">
          {t("Continue Shopping", "தொடர்ந்து ஷாப்பிங் செய்")}
        </Link>
      </div>
    );
  }

  if (step === "confirmation") {
    return (
      <div className="container py-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            {t("Order Sent!", "ஆர்டர் அனுப்பப்பட்டது!")}
          </h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {t(
              "Your order details have been sent via WhatsApp. We'll confirm your order shortly!",
              "உங்கள் ஆர்டர் விவரங்கள் WhatsApp வழியாக அனுப்பப்பட்டுள்ளன. விரைவில் உறுதிப்படுத்துவோம்!"
            )}
          </p>
          <button
            onClick={() => { clearCart(); navigate("/"); }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            {t("Back to Home", "முகப்பிற்குச் செல்")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-16">
      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">{t("Home", "முகப்பு")}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">{t("Checkout", "செக்அவுட்")}</span>
        </nav>

        {/* Steps indicator */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => setStep("cart")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              step === "cart" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center text-xs">1</span>
            {t("Cart", "கூடை")}
          </button>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              step === "shipping" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center text-xs">2</span>
            {t("Shipping & Order", "ஷிப்பிங் & ஆர்டர்")}
          </div>
        </div>

        {step === "cart" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-8">
              {t("Your Cart", "உங்கள் கூடை")}
            </h1>

            <div className="space-y-4 mb-8">
              {items.map((item) => {
                const prod = products.find((p) => p.id === item.id);
                const img = prod ? getProductImage(prod.id, prod.category) : item.image;
                return (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                    <img src={img} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm">
                        {lang === "en" ? item.name : item.nameTa}
                      </h3>
                      <p className="text-xs text-muted-foreground font-tamil">
                        {lang === "en" ? item.nameTa : item.name}
                      </p>
                      <p className="text-sm font-semibold text-foreground mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-sm text-foreground hover:bg-accent rounded-l-lg"
                        >−</button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-sm text-foreground hover:bg-accent rounded-r-lg"
                        >+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="border-t border-border pt-6">
              <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                <span>{t("Total", "மொத்தம்")}</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/products"
                  className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("Continue Shopping", "தொடர்ந்து ஷாப்பிங் செய்")}
                </Link>
                <button
                  onClick={() => setStep("shipping")}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  {t("Proceed to Shipping", "ஷிப்பிங்கிற்கு செல்")}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "shipping" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <button onClick={() => setStep("cart")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> {t("Back to Cart", "கூடைக்குத் திரும்பு")}
            </button>

            <h1 className="font-serif text-3xl font-bold text-foreground mb-8">
              {t("Shipping Details", "ஷிப்பிங் விவரங்கள்")}
            </h1>

            <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t("Full Name *", "முழு பெயர் *")}</label>
                <input required name="name" value={form.name} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t("Phone *", "தொலைபேசி *")}</label>
                <input required name="phone" type="tel" value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-foreground">{t("Email", "மின்னஞ்சல்")}</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-foreground">{t("Address *", "முகவரி *")}</label>
                <textarea required name="address" rows={2} value={form.address} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t("City *", "நகரம் *")}</label>
                <input required name="city" value={form.city} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t("Pincode *", "அஞ்சல் குறியீடு *")}</label>
                <input required name="pincode" value={form.pincode} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-foreground">{t("Order Notes", "ஆர்டர் குறிப்புகள்")}</label>
                <textarea name="notes" rows={2} value={form.notes} onChange={handleChange}
                  placeholder={lang === "en" ? "Any special instructions..." : "ஏதேனும் சிறப்பு அறிவுறுத்தல்கள்..."}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>

              {/* Order Summary */}
              <div className="md:col-span-2 bg-accent/50 rounded-xl p-5 mt-2">
                <h3 className="font-medium text-foreground mb-3">{t("Order Summary", "ஆர்டர் சுருக்கம்")}</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1.5">
                    <span className="text-foreground/80">{lang === "en" ? item.name : item.nameTa} ×{item.quantity}</span>
                    <span className="font-medium text-foreground">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-border mt-3 pt-3 flex justify-between text-lg font-bold text-foreground">
                  <span>{t("Total", "மொத்தம்")}</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  {t("Place Order via WhatsApp", "WhatsApp வழியாக ஆர்டர் செய்")}
                </button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  {t(
                    "Your order will be sent via WhatsApp for confirmation. Payment details will be shared after confirmation.",
                    "உங்கள் ஆர்டர் WhatsApp வழியாக உறுதிப்படுத்தப்படும். கட்டண விவரங்கள் உறுதிப்படுத்திய பிறகு பகிரப்படும்."
                  )}
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
