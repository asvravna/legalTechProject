"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Lang = "no" | "en";
type Theme = "light" | "dark";

type SettingsContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: Theme;       
  setTheme: (theme: Theme) => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("no");

  // Theme is fixed to light
  const theme: Theme = "light";

  // Persist language only
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedLang = window.localStorage.getItem("lang") as Lang | null;
    if (savedLang === "no" || savedLang === "en") {
      setLangState(savedLang);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  // Always enforce light appearance on <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.backgroundColor = "#f9fafb"; // same as your light value
    root.style.colorScheme = "light";
  }, []);

  const setLang = (l: Lang) => setLangState(l);

  // Ignore attempts to set "dark"; keep theme as "light"
  const setTheme = (_t: Theme) => {
    // no-op on purpose
  };

  return (
    <SettingsContext.Provider value={{ lang, setLang, theme, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettings must be used inside a SettingsProvider");
  return ctx;
}
