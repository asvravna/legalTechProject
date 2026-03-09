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
      <nav className="max-w-4xl mx-auto px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">

        {/* Nav links — wrap on mobile, row on sm+ */}
        <div className="flex items-center justify-center flex-wrap gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.key}
                href={l.href}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
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

    

      </nav>
    </header>
  );
}