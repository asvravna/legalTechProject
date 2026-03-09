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
  const [theme, setThemeState] = useState<Theme>("dark");

  // Optional: persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedLang = window.localStorage.getItem("lang") as Lang | null;
    const savedTheme = window.localStorage.getItem("theme") as Theme | null;
    if (savedLang === "no" || savedLang === "en") setLangState(savedLang);
    if (savedTheme === "light" || savedTheme === "dark")
      setThemeState(savedTheme);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", theme);
    const root = document.documentElement;
    root.style.backgroundColor = theme === "dark" ? "#020617" : "#f9fafb";
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
  }, [theme]);

  const setLang = (l: Lang) => setLangState(l);
  const setTheme = (t: Theme) => setThemeState(t);

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
