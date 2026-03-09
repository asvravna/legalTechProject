"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "../SettingsContext";
import SettingsToggleBar from "./SettingsToggleBar";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, theme } = useSettings();

  const isDark = theme === "dark";

  const links = [
    { href: "/", key: "info", label: { no: "Informasjon", en: "Information" } },
    { href: "/veileder", key: "guide", label: { no: "Temaoversikt", en: "Topics" } },
    { href: "/veiviser", key: "wizard", label: { no: "Veiviser", en: "Decision tool" } },
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md ${
        isDark
          ? "bg-gray-950/90 border-gray-800"
          : "bg-white/90 border-gray-200"
      }`}
    >
      <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Links */}
        <div className="flex items-center gap-1 flex-1 justify-center">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.key}
                href={l.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? isDark
                      ? "bg-gray-700 text-white"
                      : "bg-gray-900 text-white"
                    : isDark
                    ? "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {l.label[lang]}
              </Link>
            );
          })}
        </div>

        {/* Settings */}
        <div className="flex items-center">
          <SettingsToggleBar />
        </div>

      </nav>
    </header>
  );
}