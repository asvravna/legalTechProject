"use client";

import Link from "next/link";
import { useSettings } from "../app/SettingsContext";

const text = {
  title: {
    no: "Forhåndstiltredelse ved ekspropriasjon",
    en: "Advance Possession in Expropriation",
  },
  subtitle: {
    no: "Velg om du vil lese mer om temaet eller bruke den juridiske veiviseren for å finne ut hvilke rettigheter som gjelder i din situasjon.",
    en: "Choose whether you want to read more about the topic or use the legal navigator to find out which rights apply in your situation.",
  },
  cardInfo: {
    label: { no: "Forklaringsside", en: "Information" },
    desc: {
      no: "Les om ekspropriasjon og dine rettigheter",
      en: "Read about expropriation and your rights",
    },
    href: "/veileder",
  },
  cardWizard: {
    label: { no: "Juridisk veiviser", en: "Legal navigator" },
    desc: {
      no: "Finn ut hva som gjelder i din sak",
      en: "Find out what applies in your case",
    },
    href: "/veiviser",
  },
  disclaimer: {
    no: "Informasjon, ikke juridisk rådgivning",
    en: "Information, not legal advice",
  },
};

export default function HomePage() {
  const { lang } = useSettings();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-100">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 shadow-xl p-8 bg-white">
        {/* Title */}
        <h1 className="text-2xl font-normal tracking-tight mb-3 text-gray-900">
          {text.title[lang]}
        </h1>

        {/* Subtitle */}
        <p className="text-sm leading-relaxed mb-8 text-gray-500">
          {text.subtitle[lang]}
        </p>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link
            href={text.cardInfo.href}
            className="flex-1 group rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 p-5 no-underline transition-colors"
          >
            <div className="text-sm font-semibold mb-1 text-gray-900">
              {text.cardInfo.label[lang]}
            </div>
            <div className="text-xs leading-relaxed text-gray-500">
              {text.cardInfo.desc[lang]}
            </div>
            <div className="mt-3 text-xs font-medium text-gray-700">
              {lang === "no" ? "Les mer" : "Read more"} →
            </div>
          </Link>

          <Link
            href={text.cardWizard.href}
            className="flex-1 group rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 p-5 no-underline transition-colors"
          >
            <div className="text-sm font-semibold mb-1 text-gray-900">
              {text.cardWizard.label[lang]}
            </div>
            <div className="text-xs leading-relaxed text-gray-500">
              {text.cardWizard.desc[lang]}
            </div>
            <div className="mt-3 text-xs font-medium text-gray-700">
              {lang === "no" ? "Åpne veiviser" : "Open navigator"} →
            </div>
          </Link>
        </div>

        {/* Disclaimer (optional) */}
        {/* <p className="text-xs uppercase tracking-widest text-gray-400">
          {text.disclaimer[lang]}
        </p> */}
      </div>
    </main>
  );
}
