import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LoaderOverlay = () => {
  const { isTransitioning, lang } = useLanguage();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "hsl(var(--background))" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-5"
          >
            {/* Animated logo / spinner */}
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-primary/20"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary font-serif text-lg font-bold">E</span>
              </div>
            </div>

            <div className="text-center">
              <p className="font-serif text-lg font-semibold text-foreground">
                Long Life Nutrition
              </p>
              <motion.p
                key={lang}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-muted-foreground mt-1"
              >
                {lang === "en" ? "Loading goodness..." : "நன்மைகளை ஏற்றுகிறது..."}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderOverlay;
