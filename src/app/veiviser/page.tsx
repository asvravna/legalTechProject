"use client";

import { useState } from "react";
import { useSettings } from "../SettingsContext";
import { TREE_NO } from "@/data/tree_no";
import { TREE_EN } from "@/data/tree_en";
import type { Option, Node, ResultColor } from "@/data/decisionTreeTypes";
import SettingsToggleBar from "../components/SettingsToggleBar";


// ─── RESULT STYLES ────────────────────────────────────────────────────────────
// All color choices verified against WCAG AA (4.5:1 text, 3:1 UI)
const RESULT_STYLES: Record<
  ResultColor,
  {
    card: string;
    iconWrapper: string;
    iconText: string;
    divider: string;
    lawPill: string;
    arrow: string;
  }
> = {
  green: {
    card: "bg-white border-green-700",
    iconWrapper: "bg-green-700 border-green-700 text-white",
    iconText: "text-green-800",
    divider: "border-gray-200",
    lawPill: "bg-green-800 text-white",
    arrow: "text-green-800",
  },
  blue: {
    card: "bg-white border-blue-700",
    iconWrapper: "bg-blue-700 border-blue-700 text-white",
    iconText: "text-blue-800",
    divider: "border-gray-200",
    lawPill: "bg-blue-800 text-white",
    arrow: "text-blue-800",
  },
  orange: {
    card: "bg-white border-amber-700",
    iconWrapper: "bg-amber-700 border-amber-700 text-white",
    iconText: "text-amber-800",
    divider: "border-gray-200",
    lawPill: "bg-amber-800 text-white",
    arrow: "text-amber-800",
  },
  red: {
    card: "bg-white border-red-700",
    iconWrapper: "bg-red-700 border-red-700 text-white",
    iconText: "text-red-800",
    divider: "border-gray-200",
    lawPill: "bg-red-800 text-white",
    arrow: "text-red-800",
  },
};

// ─── UI TEXT ──────────────────────────────────────────────────────────────────
const uiText = {
  title: {
    no: "Forhåndstiltredelse ved ekspropriasjon",
    en: "Advance possession in expropriation",
  },
  subtitle: {
    no: "Dine rettigheter som grunneier, naturverner eller urfolksrepresentant",
    en: "Your rights as landowner, environmental defender or indigenous representative",
  },
  stepLabel: { no: "Steg", en: "Step" },
  back: { no: "← Tilbake", en: "← Back" },
  restart: { no: "Start på nytt", en: "Start over" },
  legalBasisLabel: { no: "Juridisk grunnlag:", en: "Legal basis:" },
  disclaimer: {
    no: "Dette verktøyet gir informasjon, ikke juridisk rådgivning. Kontakt advokat for din konkrete sak.",
    en: "This tool provides information, not legal advice. Contact a lawyer for your specific case.",
  },
  longSource: {
    no: "Basert på Ravna & Holm, «Forhåndstiltredelse ved ekspropriasjon i lys av urfolks rett til kulturutøvelse og retten til frisk natur», Lov og Rett vol. 65 (2026), s. 6–24.",
    en: "Based on Ravna & Holm, «Advance possession in expropriation in light of indigenous cultural rights and the right to a healthy environment», Lov og Rett vol. 65 (2026), pp. 6–24.",
  },
  footer: {
    no: "Oreigningslova (1959) · SP artikkel 27 · Grunnloven § 112 · Naturmangfoldloven · Fosen-dommen (2021)",
    en: "Expropriation Act (1959) · ICCPR Article 27 · Constitution § 112 · Nature Diversity Act · Fosen judgment (2021)",
  },
  warningPrefix: { no: "Merk:", en: "Note:" },
};

// ─── PROGRESS WIDTH ───────────────────────────────────────────────────────────
const STEP_WIDTH_CLASS: Record<number, string> = {
  0: "w-0",
  1: "w-1/5",
  2: "w-2/5",
  3: "w-3/5",
  4: "w-4/5",
  5: "w-full",
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Veiviser() {
  const { lang, theme } = useSettings();
  const isDark = theme === "dark";

  const [history, setHistory] = useState<string[]>(["start"]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [fading, setFading] = useState<boolean>(false);

  const TREE: Record<string, Node> = lang === "no" ? TREE_NO : TREE_EN;

  const currentId = history[history.length - 1];
  const current = TREE[currentId];
  const isResult = !!current?.result;
  const result = current?.result ?? null;
  const resultStyles = result ? RESULT_STYLES[result.color] : null;

  const step = history.length - 1;
  const clampedStep = Math.min(step, 5);
  const stepWidthClass = isResult ? "w-full" : STEP_WIDTH_CLASS[clampedStep];

  function choose(option: Option) {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setAnswers((prev) => [...prev, option.label]);
      setHistory((prev) => [...prev, option.next]);
      setFading(false);
    }, 200);
  }

  function back() {
    if (history.length <= 1) return;
    setFading(true);
    setTimeout(() => {
      setHistory((prev) => prev.slice(0, -1));
      setAnswers((prev) => prev.slice(0, -1));
      setFading(false);
    }, 150);
  }

  function restart() {
    setFading(true);
    setTimeout(() => {
      setHistory(["start"]);
      setAnswers([]);
      setFading(false);
    }, 150);
  }

  return (
    <div className={`min-h-screen px-4 py-10 flex flex-col items-center font-serif ${isDark ? "bg-gray-950" : "bg-gray-100"}`}>

      {/* Header */}
      <div className="w-full max-w-2xl mb-8">
        <h1 className={`text-2xl font-normal tracking-tight leading-snug mb-1 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          {uiText.title[lang]}
        </h1>
        <p className={`text-sm mb-5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {uiText.subtitle[lang]}
        </p>

        {/* Progress bar — gray track, dark fill */}
        <div className="flex items-center gap-3">
          <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-300"}`}>
            <div
              className={`h-full transition-all duration-300 ${isDark ? "bg-gray-200" : "bg-gray-800"} ${stepWidthClass}`}
            />
          </div>
          <span className={`text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {uiText.stepLabel[lang]} {step}
          </span>
        </div>
      </div>

      {/* Card */}
      <div
        className={[
          "w-full max-w-2xl rounded-xl border shadow-sm overflow-hidden transition-all duration-200",
          isResult && resultStyles
            ? resultStyles.card + " border-2"
            : isDark
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-300",
          fading ? "opacity-0 translate-y-1 scale-[0.99]" : "opacity-100",
        ].join(" ")}
      >

        {/* Breadcrumb */}
        {answers.length > 0 && (
          <div className={`px-6 py-3 border-b ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
            {answers.map((a, i) => (
              <div key={i} className="flex gap-2 items-start mb-0.5 last:mb-0">
                <span className={`text-[10px] font-mono pt-[3px] flex-shrink-0 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  ▸
                </span>
                <span className={`text-xs leading-snug ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {a}
                </span>
              </div>
            ))}
          </div>
        )}


        {/* Main content */}
        <div className="px-6 py-7">
          {!isResult || !current ? (
            // ── QUESTION MODE ──
            <>
              <h2 className={`text-lg font-normal leading-snug mb-1 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                {current?.question}
              </h2>
              {current?.hint && (
                <p className={`text-sm italic mb-6 border-l-2 pl-3 leading-relaxed ${isDark ? "text-gray-400 border-gray-600" : "text-gray-600 border-gray-300"}`}>
                  {current.hint}
                </p>
              )}
              <div className="flex flex-col gap-2">
                {current?.options?.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => choose(opt)}
                    className={[
                      "flex items-start gap-3 px-4 py-3 rounded-lg border text-left text-sm leading-snug transition-colors",
                      isDark
                        ? "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-400"
                        : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-500",
                    ].join(" ")}
                  >
                    <span className={`w-5 h-5 mt-[2px] rounded-full flex items-center justify-center text-[11px] font-mono border flex-shrink-0 ${isDark ? "bg-gray-700 border-gray-500 text-gray-300" : "bg-gray-100 border-gray-400 text-gray-700"}`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            // ── RESULT MODE ──
            result && resultStyles && (
              <>
                <div className="flex items-start gap-3 mb-5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-base flex-shrink-0 font-bold ${resultStyles.iconWrapper}`}>
                    {result.color === "green" ? "✓" : result.color === "blue" ? "i" : result.color === "orange" ? "!" : "!"}
                  </div>
                  <h2 className={`text-lg font-semibold leading-snug pt-0.5 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                    {result.title}
                  </h2>
                </div>

                {/* Rights */}
                <ul className="list-none m-0 p-0 mb-4">
                  {result.rights.map((r, i) => (
                    <li
                      key={i}
                      className={[
                        "flex gap-2.5 py-2.5 items-start text-sm leading-relaxed",
                        isDark ? "text-gray-300" : "text-gray-800",
                        i < result.rights.length - 1
                          ? `border-b ${isDark ? "border-gray-700" : "border-gray-200"}`
                          : "",
                      ].join(" ")}
                    >
                      <span className={`font-bold flex-shrink-0 mt-[2px] ${resultStyles.arrow}`}>→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                {/* Law pill */}
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-mono tracking-wide mb-3 ${resultStyles.lawPill}`}>
                  § {result.law}
                </div>


                {/* Warning */}
                {result.warning && (
                  <div className="mb-3 rounded border border-amber-600 bg-amber-50 px-4 py-3">
                    <p className="m-0 text-xs text-amber-900 leading-relaxed">
                      <strong>{uiText.warningPrefix[lang]} </strong>
                      {result.warning}
                    </p>
                  </div>
                )}
             

                {/* Source */}
                <div className={`rounded border px-3.5 py-3 ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                  <p className={`m-0 text-xs leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    <strong className={isDark ? "text-gray-300" : "text-gray-700"}>
                      {uiText.legalBasisLabel[lang]}{" "}
                    </strong>
                    {uiText.longSource[lang]} {uiText.disclaimer[lang]}
                  </p>
                </div>
              </>
            )
          )}
        </div>


        {/* Footer bar */}
        <div className={`px-6 py-3 border-t flex items-center justify-between ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
          <button
            type="button"
            onClick={back}
            disabled={history.length <= 1}
            className={[
              "px-4 py-1.5 rounded border text-xs transition-colors",
              history.length <= 1
                ? isDark
                  ? "border-gray-700 text-gray-600 cursor-default"
                  : "border-gray-200 text-gray-300 cursor-default"
                : isDark
                ? "border-gray-600 text-gray-300 hover:border-gray-400 hover:text-gray-100"
                : "border-gray-400 text-gray-700 hover:border-gray-700 hover:text-gray-900",
            ].join(" ")}
          >
            {uiText.back[lang]}
          </button>

          {isResult && (
            <button
              type="button"
              onClick={restart}
              className={`px-5 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-colors ${isDark ? "bg-gray-200 text-gray-900 hover:bg-white" : "bg-gray-900 text-white hover:bg-gray-700"}`}
            >
              {uiText.restart[lang]}
            </button>
          )}
        </div>
      </div>


      {/* Page footer */}
      <p className={`mt-7 text-[11px] text-center font-mono tracking-wide ${isDark ? "text-gray-600" : "text-gray-500"}`}>
        {uiText.footer[lang]}
      </p>
       {/* Settings */}
        <div className="flex items-center">
          <SettingsToggleBar />
        </div>

    </div>
    
  );
}