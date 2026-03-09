"use client";

import { useSettings } from "../SettingsContext";

export default function SettingsToggleBar() {
  const { lang, setLang, theme } = useSettings();

  const isDark = theme === "dark";

  const containerClasses = [
    "z-40 flex items-center gap-2 rounded-full border px-2 py-1 backdrop-blur",
    isDark
      ? "bg-slate-900/80 border-slate-500/60 text-slate-100"
      : "bg-white/90 border-slate-400/60 text-slate-900",
  ].join(" ");

  const dividerClasses = isDark ? "bg-slate-500/60" : "bg-slate-400/60";

  const baseButtonClasses =
    "px-2 py-0.5 rounded-full text-[11px] font-mono cursor-pointer border border-transparent transition-colors";

  const activeLight = "bg-emerald-600 text-slate-50";
  const activeDark = "bg-emerald-500 text-slate-900";

  const inactiveLight = "bg-transparent text-slate-900 hover:bg-slate-100";
  const inactiveDark = "bg-transparent text-slate-100 hover:bg-slate-800";

  const activeClasses = isDark ? activeDark : activeLight;
  const inactiveClasses = isDark ? inactiveDark : inactiveLight;

  return (
    <div className={containerClasses}>
      {/* Language */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setLang("no")}
          className={`${baseButtonClasses} ${
            lang === "no" ? activeClasses : inactiveClasses
          }`}
          type="button"
        >
          NO
        </button>

      {/* Divider */}
      <div className={`h-[18px] w-px ${dividerClasses}`} />
    </div>
           <button
          onClick={() => setLang("en")}
          className={`${baseButtonClasses} ${
            lang === "en" ? activeClasses : inactiveClasses
          }`}
          type="button"
        >
          EN
        </button>
      </div>
  );
}
