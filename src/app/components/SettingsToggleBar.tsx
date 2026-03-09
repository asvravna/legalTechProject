"use client";

import { useSettings } from "../SettingsContext";

export default function SettingsToggleBar() {
  const { lang, setLang, theme, setTheme } = useSettings();

  const bg =
    theme === "dark"
      ? "rgba(15,23,42,0.8)"
      : "rgba(255,255,255,0.9)";
  const border =
    theme === "dark" ? "rgba(148,163,184,0.4)" : "rgba(148,163,184,0.6)";
  const text = theme === "dark" ? "#e5e7eb" : "#111827";

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 40,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 999,
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Language */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 11,
          color: text,
          fontFamily: "monospace",
        }}
      >
        {/* <span>Lang</span> */}
        <button
          onClick={() => setLang("no")}
          style={{
            padding: "3px 8px",
            borderRadius: 999,
            border: "none",
            fontSize: 11,
            cursor: "pointer",
            background: lang === "no" ? "#16a34a" : "transparent",
            color: lang === "no" ? "#f9fafb" : text,
          }}
        >
          NO
        </button>
        <button
          onClick={() => setLang("en")}
          style={{
            padding: "3px 8px",
            borderRadius: 999,
            border: "none",
            fontSize: 11,
            cursor: "pointer",
            background: lang === "en" ? "#16a34a" : "transparent",
            color: lang === "en" ? "#f9fafb" : text,
          }}
        >
          EN
        </button>
      </div>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: 18,
          background: border,
        }}
      />

     
    </div>
  );
}
