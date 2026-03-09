"use client";

import { useState } from "react";
import { useSettings } from "../SettingsContext";
import { TREE_NO } from "@/data/tree_no";
import { TREE_EN } from "@/data/tree_en";

import type { Option, Node, ResultColor } from "@/data/decisionTreeTypes";

// RESULT_STYLES, uiText, STEP_WIDTH_CLASS defined here or imported
// const RESULT_STYLES: Record<ResultColor, ...> = { ... }
// const uiText = { ... }
// const STEP_WIDTH_CLASS: Record<number, string> = { ... }

const RESULT_STYLES: Record<
  ResultColor,
  {
    card: string;
    iconWrapper: string;
    iconText: string;
    divider: string;
    lawPill: string;
  }
> = {
  green: {
    card: "bg-emerald-50 border-emerald-500",
    iconWrapper: "bg-emerald-100 border-emerald-500 text-emerald-700",
    iconText: "text-emerald-700",
    divider: "border-emerald-100",
    lawPill: "bg-emerald-100 text-emerald-700",
  },
  blue: {
    card: "bg-blue-50 border-blue-500",
    iconWrapper: "bg-blue-100 border-blue-500 text-blue-700",
    iconText: "text-blue-700",
    divider: "border-blue-100",
    lawPill: "bg-blue-100 text-blue-700",
  },
  orange: {
    card: "bg-amber-50 border-amber-500",
    iconWrapper: "bg-amber-100 border-amber-500 text-amber-700",
    iconText: "text-amber-700",
    divider: "border-amber-100",
    lawPill: "bg-amber-100 text-amber-700",
  },
  red: {
    card: "bg-red-50 border-red-500",
    iconWrapper: "bg-red-100 border-red-500 text-red-700",
    iconText: "text-red-700",
    divider: "border-red-100",
    lawPill: "bg-red-100 text-red-700",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. UI TEXT (NO / EN)
// ─────────────────────────────────────────────────────────────────────────────

const uiText = {
  // badge: {
  //   no: "Juridisk veiviser",
  //   en: "Legal navigator",
  // },
  title: {
    no: "Forhåndstiltredelse ved ekspropriasjon",
    en: "Advance possession in expropriation",
  },
  subtitle: {
    no: "Dine rettigheter som grunneier, naturverner eller urfolksrepresentant",
    en: "Your rights as landowner, environmental defender or indigenous representative",
  },
  stepLabel: {
    no: "Steg",
    en: "Step",
  },
  back: {
    no: "← Tilbake",
    en: "← Back",
  },
  restart: {
    no: "Start på nytt",
    en: "Start over",
  },
  legalBasisLabel: {
    no: "Juridisk grunnlag:",
    en: "Legal basis:",
  },
  disclaimer: {
    no: "Dette verktøyet gir informasjon, ikke juridisk rådgivning. Kontakt advokat for din konkrete sak.",
    en: "This tool provides information, not legal advice. Contact a lawyer for your specific case.",
  },
  longSource: {
    no: "Basert på Ravna & Holm, «Forhåndstiltredelse ved ekspropriasjon i lys av urfolks rett til kulturutøvelse og retten til frisk natur», Lov og Rett vol. 65 (2026), s. 6–24.",
    en: "Based on Ravna & Holm, “Advance possession in expropriation in light of indigenous cultural rights and the right to a healthy environment”, Lov og Rett vol. 65 (2026), pp. 6–24.",
  },
  footer: {
    no: "Oreigningslova (1959) · SP artikkel 27 · Grunnloven § 112 · Naturmangfoldloven · Fosen-dommen (2021)",
    en: "Expropriation Act (1959) · ICCPR Article 27 · Constitution § 112 · Nature Diversity Act · Fosen judgment (2021)",
  },
};

// helper for progress width without inline styles
const STEP_WIDTH_CLASS: Record<number, string> = {
  0: "w-0",
  1: "w-1/5",
  2: "w-2/5",
  3: "w-3/5",
  4: "w-4/5",
  5: "w-full",
};

export default function Veiviser() {
  const { lang } = useSettings();
  const [history, setHistory] = useState<string[]>(["start"]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [fading, setFading] = useState<boolean>(false);

  // choose tree based on language
  const TREE: Record<string, Node> = lang === "no" ? TREE_NO : TREE_EN;

  const currentId = history[history.length - 1];
  const current = TREE[currentId];
  const isResult = !!current?.result;

  const result = current?.result ?? null;
  const resultStyles =
    result && RESULT_STYLES[result.color]
      ? RESULT_STYLES[result.color]
      : null;

  const step = history.length - 1;
  const stepWidthClass = STEP_WIDTH_CLASS[Math.min(step, 5)];

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
    <div className="min-h-screen bg-slate-50 font-serif px-4 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-2xl mb-9">
        <div className="flex items-center gap-2.5 mb-2">
          {/* badge icon can go here if you want */}
          <span className="text-[11px] tracking-[0.25em] uppercase font-mono text-emerald-500">
            {/* {uiText.badge[lang]} */}
          </span>
        </div>

        <h1 className="text-[28px] font-normal tracking-tight leading-snug text-slate-900 mb-1">
          {uiText.title[lang]}
        </h1>
        <p className="text-xs sm:text-sm text-emerald-700 italic mb-5">
          {uiText.subtitle[lang]}
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 rounded-full bg-emerald-100 overflow-hidden">
            <div
              className={[
                "h-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-300",
                stepWidthClass,
              ].join(" ")}
            />
          </div>
          <span className="text-[11px] font-mono text-emerald-600">
            {uiText.stepLabel[lang]} {step}
          </span>
        </div>
      </div>

      {/* Card */}
      <div
        className={[
          "w-full max-w-2xl rounded-2xl border shadow-xl overflow-hidden bg-white transition-all duration-200",
          isResult && resultStyles ? resultStyles.card : "border-emerald-100",
          fading ? "opacity-0 translate-y-1 scale-[0.99]" : "opacity-100",
        ].join(" ")}
      >
        {/* Breadcrumb history */}
        {answers.length > 0 && (
          <div className="px-7 py-3 border-b border-emerald-100 bg-emerald-50/60">
            {answers.map((a, i) => (
              <div
                key={i}
                className="flex gap-2 items-start mb-[3px] last:mb-0"
              >
                <span className="text-[10px] font-mono text-emerald-500 pt-[3px]">
                  ▸
                </span>
                <span className="text-[12px] text-slate-700 leading-snug">
                  {a}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="px-7 py-8">
          {/* Question mode */}
          {!isResult || !current ? (
            <>
              <h2 className="text-[18px] sm:text-[19px] font-normal text-slate-900 mb-1 leading-snug">
                {current?.question}
              </h2>
              {current?.hint && (
                <p className="text-xs sm:text-[13px] text-slate-500 italic mb-6 border-l-2 border-emerald-100 pl-3 leading-relaxed">
                  {current.hint}
                </p>
              )}

              <div className="flex flex-col gap-2.5">
                {current?.options?.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => choose(opt)}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl border border-emerald-100 bg-lime-50/50 text-left text-[14px] text-slate-900 leading-snug hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    <span className="w-5 h-5 mt-[2px] rounded-full flex items-center justify-center text-[11px] font-mono text-emerald-700 border border-emerald-200 bg-emerald-50 flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            result &&
            resultStyles && (
              <>
                {/* Result header */}
                <div className="flex items-start gap-3.5 mb-5">
                  <div
                    className={[
                      "w-10 h-10 rounded-full flex items-center justify-center border text-lg flex-shrink-0",
                      resultStyles.iconWrapper,
                    ].join(" ")}
                  >
                    {result.color === "green"
                      ? "✓"
                      : result.color === "blue"
                      ? "ℹ"
                      : result.color === "orange"
                      ? "⚠"
                      : "!"}
                  </div>
                  <h2 className="text-[18px] font-semibold text-slate-900 leading-snug pt-0.5">
                    {result.title}
                  </h2>
                </div>

                {/* Rights list */}
                <ul className="list-none m-0 p-0 mb-4">
                  {result.rights.map((r, i) => (
                    <li
                      key={i}
                      className={[
                        "flex gap-2.5 py-2 items-start text-[13px] leading-relaxed text-slate-700",
                        i < result.rights.length - 1
                          ? resultStyles.divider + " border-b"
                          : "",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "text-[13px] mt-[3px] flex-shrink-0",
                          resultStyles.iconText,
                        ].join(" ")}
                      >
                        →
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                {/* Law reference */}
                <div
                  className={[
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono tracking-[0.04em] mb-3",
                    resultStyles.lawPill,
                  ].join(" ")}
                >
                  <span>§</span>
                  <span>{result.law}</span>
                </div>

                {/* Warning */}
                {result.warning && (
                  <div className="mb-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="m-0 text-[12px] text-amber-800 leading-relaxed">
                      <strong className="mr-1">⚠</strong>
                      {result.warning}
                    </p>
                  </div>
                )}

                {/* Source / disclaimer */}
                <div className="rounded-md border border-slate-200 bg-slate-50 px-3.5 py-3">
                  <p className="m-0 text-[11px] text-slate-500 leading-relaxed">
                    <strong className="text-slate-600">
                      {uiText.legalBasisLabel[lang]}{" "}
                    </strong>
                    {uiText.longSource[lang]} {uiText.disclaimer[lang]}
                  </p>
                </div>
              </>
            )
          )}
        </div>

        {/* Bottom buttons */}
        <div className="px-7 py-3.5 border-t border-emerald-100 bg-emerald-50/60 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={history.length <= 1}
            className={[
              "px-4 py-1.5 rounded-md border text-[12px] transition-colors",
              history.length <= 1
                ? "border-emerald-50 text-emerald-200 cursor-default"
                : "border-emerald-100 text-slate-700 hover:border-emerald-400 hover:text-slate-900",
            ].join(" ")}
          >
            {uiText.back[lang]}
          </button>

          {isResult && (
            <button
              type="button"
              onClick={restart}
              className="px-5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] tracking-[0.08em] uppercase transition-colors"
            >
              {uiText.restart[lang]}
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-7 text-[11px] text-slate-500 text-center font-mono tracking-[0.06em]">
        {uiText.footer[lang]}
      </p>
    </div>
  );
}
