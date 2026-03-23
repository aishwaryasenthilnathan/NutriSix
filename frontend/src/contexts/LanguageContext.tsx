import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Language = "en" | "ta";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (en: string, ta: string) => string;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [isTransitioning, setIsTransitioning] = useState(true); // true on first load

  const setLang = useCallback((newLang: Language) => {
    if (newLang === lang) return;
    setIsTransitioning(true);
    // Small delay so loader shows before re-render
    setTimeout(() => {
      setLangState(newLang);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 300);
  }, [lang]);

  // Clear initial loader after first mount
  useState(() => {
    setTimeout(() => setIsTransitioning(false), 1200);
  });

  const t = (en: string, ta: string) => (lang === "en" ? en : ta);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
