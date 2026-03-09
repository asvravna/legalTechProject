"use client";

import { useSettings } from "../SettingsContext";
import { useState } from "react";

type Section = {
  id: string;
  title: { no: string; en: string };
  short: { no: string; en: string };
  content: { no: string; en: string };
  fact: { no: string; en: string };
};

type TimelineStep = {
  step: string;
  label: { no: string; en: string };
  desc: { no: string; en: string };
  colorClass: string;
};

const sections: Section[] = [
  {
    id: "hva",
    title: { no: "Hva er ekspropriasjon?", en: "What is expropriation?" },
    short: { no: "Staten kan tvangskjøpe eiendommen din", en: "The state can forcibly take your property" },
    content: {
      no: `Ekspropriasjon betyr at staten, kommunen eller et stort utbyggingsselskap kan ta eiendommen din – selv om du ikke vil selge.\n\nDette kan skje når det skal bygges veier, jernbaner, vindkraftanlegg, kraftlinjer eller annen infrastruktur som anses å være til samfunnets beste.\n\nHovedregelen i Norge er at du har krav på full erstatning for det du mister. Staten kan ikke bare ta eiendommen uten å betale.`,
      en: `Expropriation means that the state, municipality or a major developer can take your property – even if you do not want to sell.\n\nThis can happen when roads, railways, wind farms, power lines or other infrastructure considered to be in the public interest are built.\n\nThe main rule in Norway is that you are entitled to full compensation for what you lose. The state cannot simply take your property without paying.`,
    },
    fact: {
      no: "Retten til erstatning er nedfelt i Grunnloven § 105, som har stått uendret siden 1814.",
      en: "The right to compensation is laid down in Constitution § 105, which has remained unchanged since 1814.",
    },
  },
  {
    id: "forhånd",
    title: { no: "Hva er forhåndstiltredelse?", en: "What is advance possession?" },
    short: { no: "De kan flytte inn FØR erstatningen er bestemt", en: "They can move in BEFORE compensation is decided" },
    content: {
      no: `Normalt skal erstatningens størrelse fastsettes i retten (kalt «skjønn») FØR utbygger får lov til å ta eiendommen i bruk.\n\nMen det finnes et unntak som heter forhåndstiltredelse. Det betyr at utbygger kan begynne å bruke – eller bygge på – eiendommen din før dere er enige om erstatning, og til og med før en domstol har bestemt hva du skal ha.\n\nUtbygger må da betale et forskudd og stille en garanti. Men selve byggearbeidet kan starte umiddelbart.`,
      en: `Normally the amount of compensation must be set by the court (called "skjønn") BEFORE the developer is allowed to start using your property.\n\nBut there is an exception called advance possession. It means that the developer can start using – or building on – your property before you agree on compensation, and even before a court has decided what you are entitled to.\n\nThe developer must pay an advance and provide security. But the construction work itself can start immediately.`,
    },
    fact: {
      no: "Regelen om forhåndstiltredelse er hjemlet i oreigningslova § 25, og har vært nesten uendret siden 1973.",
      en: "The rule on advance possession is found in the Expropriation Act § 25 and has been almost unchanged since 1973.",
    },
  },
  {
    id: "problem",
    title: { no: "Hva er problemet?", en: "What is the problem?" },
    short: { no: "Inngrepet kan skje før noen har sjekket om det er lovlig", en: "The intervention can happen before anyone checks if it is lawful" },
    content: {
      no: `Her er kjerneproblemet: Forhåndstiltredelse betyr at utbygger kan starte – og noen ganger fullføre – et irreversibelt inngrep FØR en domstol har avgjort om inngrepet i det hele tatt er lovlig.\n\nFosen-saken er det tydeligste eksemplet: Vindkraftanlegg ble bygget på samiske reinbeiter med hjemmel i forhåndstiltredelse. Først åtte år etter at ekspropriasjonen ble vedtatt slo Høyesterett fast at hele inngrepet var i strid med samenes menneskerettigheter.\n\nDa var møllene allerede i drift. Skaden var irreversibel.`,
      en: `Here is the core problem: Advance possession means that the developer can start – and sometimes complete – an irreversible intervention BEFORE a court has decided whether the intervention is lawful at all.\n\nThe Fosen case is the clearest example: a wind farm was built on Sami reindeer grazing areas based on advance possession. Only eight years after the expropriation decision did the Supreme Court conclude that the entire intervention violated the human rights of the Sami.\n\nBy then the turbines were already in operation. The damage was irreversible.`,
    },
    fact: {
      no: "I Fosen-saken (HR-2021-1975-S) konkluderte Høyesterett med at vindkraftanlegget krenket SP artikkel 27 – retten til kulturutøvelse for urfolk.",
      en: "In the Fosen case (HR-2021-1975-S) the Supreme Court concluded that the wind farm violated ICCPR Article 27 – the right of indigenous peoples to practice their culture.",
    },
  },
  {
    id: "rettigheter",
    title: { no: "Hvilke rettigheter har du?", en: "What rights do you have?" },
    short: { no: "Du har flere muligheter til å protestere", en: "You have several options to protest" },
    content: {
      no: `Som grunneier eller berørt part har du rettigheter selv om du er i en svak posisjon mot staten eller store utbyggere:\n\nDu kan klage på vedtaket til overordnet forvaltningsorgan innen 3 uker. Klagen er gratis og uten risiko for sakskostnader.\n\nDu kan be om utsatt iverksetting mens klagen behandles.\n\nDu kan be retten om midlertidig forføyning – det vil si at domstolen beordrer stans i arbeidene mens saken vurderes.\n\nDu har alltid krav på full erstatning, fastsatt av en uavhengig skjønnsrett.`,
      en: `As a landowner or affected party you have rights even if you are in a weak position vis-à-vis the state or large developers:\n\nYou can appeal the decision to the higher administrative body within 3 weeks. The appeal is free and without risk of paying the other side's legal costs.\n\nYou can ask for postponement of implementation while the appeal is being processed.\n\nYou can ask the court for an interim injunction – meaning the court orders a stop to the work while the case is assessed.\n\nYou are always entitled to full compensation, determined by an independent expropriation court (skjønnsrett).`,
    },
    fact: {
      no: "Sakskostnader ved skjønn (erstatningsfastsettelse) dekkes av utbygger, ikke deg – jf. skjønnsprosessloven § 54.",
      en: "Costs in the expropriation compensation case (skjønn) are covered by the developer, not by you – see the Expropriation Procedure Act § 54.",
    },
  },
  {
    id: "natur",
    title: { no: "Hva med naturen og miljøet?", en: "What about nature and the environment?" },
    short: { no: "Grunnloven gir alle rett til frisk natur", en: "The Constitution gives everyone a right to a healthy environment" },
    content: {
      no: `Siden 1992 har Grunnloven § 112 slått fast at alle har rett til et miljø som sikrer helsen og naturens produksjonsevne og mangfold.\n\nHøyesterett har bekreftet at dette ikke bare er en vakker formulering – det er en rettslig forpliktelse for staten.\n\nNaturmangfoldloven bygger på «føre-var»-prinsippet: Hvis vi ikke vet nok om konsekvensene av et inngrep, skal tvilen komme naturen til gode.\n\nProblemet er at forhåndstiltredelse kan tillate irreversible naturinngrep FØR disse spørsmålene er skikkelig vurdert.`,
      en: `Since 1992 Constitution § 112 has stated that everyone has the right to an environment that safeguards health and the productive capacity and diversity of nature.\n\nThe Supreme Court has confirmed that this is not just beautiful wording – it is a legally binding obligation for the state.\n\nThe Nature Diversity Act is built on the precautionary principle: if we do not know enough about the consequences of an intervention, doubt shall benefit nature.\n\nThe problem is that advance possession can allow irreversible interventions in nature BEFORE these questions are properly assessed.`,
    },
    fact: {
      no: "Norge har forpliktet seg til FNs naturavtale (2022) om å verne 30 % av all natur på land innen 2030.",
      en: "Norway has committed to the UN Global Biodiversity Framework (2022) to protect 30% of all nature on land by 2030.",
    },
  },
  {
    id: "endring",
    title: { no: "Hva bør endres?", en: "What should change?" },
    short: { no: "Loven er utdatert og trenger revisjon", en: "The law is outdated and needs revision" },
    content: {
      no: `Oreigningslova § 25 ble sist endret i 1973 – lenge før Norge ratifiserte FN-konvensjoner om urfolks rettigheter og vedtok Grunnlovens miljøparagraf.\n\nJusprofessor Øyvind Ravna og jurist Inger Marie Holm argumenterer i en artikkel i Lov og Rett (2026) for at loven slik den er i dag sannsynligvis bryter med Norges folkerettslige forpliktelser.\n\nDe foreslår at det ikke skal være tillatt å gi samtykke til forhåndstiltredelse dersom det er reell risiko for brudd på menneskerettigheter eller miljøvern – med mindre en domstol først har fastslått at inngrepet er lovlig.\n\nRegjeringen nedsatte et utvalg i juni 2025 for å utrede endringer, men det er uklart om de materielle spørsmålene vil bli adressert.`,
      en: `Expropriation Act § 25 was last amended in 1973 – long before Norway ratified UN conventions on indigenous rights and adopted the environmental provision of the Constitution.\n\nProfessor Øyvind Ravna and lawyer Inger Marie Holm argue in an article in Lov og Rett (2026) that the law as it stands today likely conflicts with Norway's international obligations.\n\nThey propose that it should not be allowed to grant consent to advance possession where there is a real risk of human rights or environmental violations – unless a court has first decided that the intervention is lawful.\n\nThe government appointed a committee in June 2025 to consider changes, but it is unclear whether the substantive issues will be addressed.`,
    },
    fact: {
      no: "Sametingets reindriftslovutvalg, Sannhets- og forsoningskommisjonen og Sametinget i plenum har alle krevd endring av oreigningslova § 25.",
      en: "The Sami Parliament's reindeer husbandry law committee, the Truth and Reconciliation Commission and the Sami Parliament in plenary have all called for an amendment of Expropriation Act § 25.",
    },
  },
];

const timeline: TimelineStep[] = [
  {
    step: "1",
    label: { no: "Vedtak om ekspropriasjon", en: "Decision on expropriation" },
    desc: { no: "Forvaltningsorgan (f.eks. NVE) gir tillatelse til ekspropriasjon.", en: "An authority (e.g. NVE) grants permission for expropriation." },
    colorClass: "bg-blue-500",
  },
  {
    step: "2",
    label: { no: "Samtykke til forhåndstiltredelse", en: "Consent to advance possession" },
    desc: { no: "Utbygger søker om å starte arbeidene FØR erstatning er fastsatt.", en: "The developer applies to start work BEFORE compensation is set." },
    colorClass: "bg-amber-500",
  },
  {
    step: "3",
    label: { no: "Bygging starter", en: "Construction starts" },
    desc: { no: "Irreversible arbeider kan begynne. Naturen og eiendommen endres.", en: "Irreversible work can begin. Nature and the property are altered." },
    colorClass: "bg-red-500",
  },
  {
    step: "4",
    label: { no: "Skjønn (erstatning fastsettes)", en: "Expropriation court (compensation is set)" },
    desc: { no: "Domstolen fastsetter erstatningens størrelse. Kan ta år.", en: "The court determines the amount of compensation. This can take years." },
    colorClass: "bg-violet-500",
  },
  {
    step: "5",
    label: { no: "Ev. ugyldighet avgjøres", en: "Any invalidity is decided" },
    desc: { no: "Først nå kan en domstol avgjøre om hele inngrepet var lovlig. I Fosen: 8 år etter vedtaket.", en: "Only now can a court decide whether the entire intervention was lawful. In Fosen: 8 years after the decision." },
    colorClass: "bg-red-700",
  },
];

const glossary = [
  {
    term: { no: "Ekspropriasjon", en: "Expropriation" },
    def: { no: "Tvangsovertakelse av eiendom mot erstatning. Staten eller utbygger overtar eiendommen selv om eieren ikke vil selge.", en: "Forced transfer of property against compensation. The state or developer takes over the property even if the owner does not want to sell." },
  },
  {
    term: { no: "Forhåndstiltredelse", en: "Advance possession" },
    def: { no: "Rett til å ta eiendommen i bruk FØR erstatning er fastsatt og FØR en domstol har avgjort om inngrepet er lovlig.", en: "Right to start using the property BEFORE compensation is set and BEFORE a court has decided whether the intervention is lawful." },
  },
  {
    term: { no: "Skjønn", en: "Expropriation court (skjønn)" },
    def: { no: "Rettssak hvor domstolen fastsetter erstatningens størrelse. Du trenger ikke betale egne sakskostnader.", en: "Court procedure where the court sets the amount of compensation. You do not pay your own legal costs." },
  },
  {
    term: { no: "Midlertidig forføyning", en: "Interim injunction" },
    def: { no: "Domstolens beslutning om å stanse byggearbeider midlertidig mens saken vurderes. Krever rask handling.", en: "Court decision to temporarily stop construction while the case is assessed. Requires quick action." },
  },
  {
    term: { no: "SP artikkel 27", en: "ICCPR Article 27" },
    def: { no: "FN-konvensjon som beskytter urfolks rett til kulturutøvelse. Innebærer at inngrep i samiske reinbeiter kan være ulovlig uavhengig av erstatning.", en: "UN convention provision protecting the right of minorities and indigenous peoples to practice their culture. Means that interventions in Sami reindeer grazing areas can be unlawful regardless of compensation." },
  },
  {
    term: { no: "Grunnloven § 112", en: "Constitution § 112" },
    def: { no: "Alle har rett til frisk natur. Staten plikter å verne naturmangfold for fremtidige generasjoner. Juridisk bindende.", en: "Everyone has the right to a healthy environment. The state must protect biodiversity for future generations. Legally binding." },
  },
  {
    term: { no: "Føre-var-prinsippet", en: "Precautionary principle" },
    def: { no: "Dersom vi ikke vet nok om konsekvensene av et naturinngrep, skal tvilen komme naturen til gode. Lovfestet i naturmangfoldloven § 9.", en: "If we do not know enough about the consequences of an intervention in nature, doubt shall benefit nature. Enshrined in the Nature Diversity Act § 9." },
  },
  {
    term: { no: "Oreigningslova § 25", en: "Expropriation Act § 25" },
    def: { no: "Lovparagrafen som gir adgang til forhåndstiltredelse. Kritisert for å ikke være oppdatert siden 1973 i tråd med moderne menneskerettigheter.", en: "The provision that allows advance possession. Criticised for not being updated since 1973 in line with modern human rights law." },
  },
];

const ctaLinks = [
  { label: { no: "Advokatforeningen", en: "Norwegian Bar Association" }, url: "https://www.advokatforeningen.no" },
  { label: { no: "Sivilombudet", en: "Parliamentary Ombud" }, url: "https://www.sivilombudet.no" },
  { label: { no: "Naturvernforbundet", en: "Norwegian Society for the Conservation of Nature" }, url: "https://naturvernforbundet.no" },
  { label: { no: "Sametinget", en: "Sami Parliament" }, url: "https://www.sametinget.no" },
];

const t = {
  heroTitle: { no: "Forhåndstiltredelse ved ekspropriasjon", en: "Advance Possession in Expropriation" },
  heroSubtitle: { no: "Hva skjer når utbygger tar eiendommen din før loven er sjekket?", en: "What happens when a developer takes your land before legality is checked?" },
  heroTagline: { no: "En guide for grunneiere, naturvernere og berørte", en: "A guide for landowners, environmental defenders and others affected" },
  intro1: {
    no: "Hvert år blir norske grunneiere, samer og naturvernere berørt av ekspropriasjon – tvangsovertakelse av eiendom til offentlige formål. De fleste vet ikke hva de har krav på, og enda færre vet at utbygger i mange tilfeller kan begynne å ødelegge land og natur før en domstol har avgjort om det i det hele tatt er lovlig.",
    en: "Every year Norwegian landowners, Sami and environmental organisations are affected by expropriation – forced transfer of property for public purposes. Most people do not know what they are entitled to, and even fewer know that in many cases the developer can start destroying land and nature before a court has decided whether it is lawful at all.",
  },
  intro2: {
    no: "Denne siden forklarer hvordan systemet fungerer, hva som er problematisk, og hva du kan gjøre.",
    en: "This page explains how the system works, what is problematic, and what you can do.",
  },
  timelineTitle: { no: "Slik foregår en ekspropriasjonssak", en: "How an expropriation case progresses" },
  timelineProblem: { no: "Problemet:", en: "The problem:" },
  timelineProblemText: {
    no: "Steg 3 og 4–5 er byttet om i tid. Byggearbeidet skjer FØR lovligheten er avklart. I Fosen-saken ble møllene bygget, og deretter slo Høyesterett fast at det var ulovlig.",
    en: "Steps 3 and 4–5 are reversed in time. Construction happens BEFORE legality is clarified. In the Fosen case the turbines were built, and only afterwards did the Supreme Court conclude that it was unlawful.",
  },
  sectionsTitle: { no: "Les mer om hvert tema", en: "Read more about each topic" },
  glossaryTitle: { no: "Ordbok – juridiske begreper forklart enkelt", en: "Glossary – legal concepts explained simply" },
  didYouKnow: { no: "§ Visste du?", en: "§ Did you know?" },
  ctaTitle: { no: "Berørt av ekspropriasjon?", en: "Affected by expropriation?" },
  ctaText: { no: "Bruk den juridiske veiviseren for å finne ut hvilke rettigheter som gjelder i din situasjon.", en: "Use the legal navigator to find out which rights apply in your situation." },
  ctaLinksTitle: { no: "Trenger du hjelp eller rådgivning?", en: "Need help or legal advice?" },
  footer: { no: "Basert på Ravna & Holm, Lov og Rett vol. 65 (2026) · Informasjon, ikke juridisk rådgivning", en: "Based on Ravna & Holm, Lov og Rett vol. 65 (2026) · Information, not legal advice" },
};

export default function InfoPage() {
  const [open, setOpen] = useState<string | null>(null);
  const { lang, theme } = useSettings();
  const isDark = theme === "dark";

  return (
    <div className={isDark ? "min-h-screen bg-gray-950" : "min-h-screen bg-stone-50"}>

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-950 via-gray-900 to-gray-800 px-6 py-16 text-center">
        <h1 className="text-3xl font-normal tracking-tight text-gray-100 mb-3">
          {t.heroTitle[lang]}
        </h1>
        <p className="text-green-300 text-base italic mb-2">{t.heroSubtitle[lang]}</p>
        <p className="text-green-400 text-xs uppercase tracking-widest font-mono">{t.heroTagline[lang]}</p>
      </div>

      <div className="max-w-3xl mx-auto px-5 pb-20">

        {/* Intro */}
        <div className={`mt-10 mb-12 p-7 rounded-xl border-l-4 border-green-600 border ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} shadow-sm`}>
          <p className={`text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {t.intro1[lang]}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed mt-4 italic">{t.intro2[lang]}</p>
        </div>

        {/* Timeline */}
        <div className="mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
            {t.timelineTitle[lang]}
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-green-500 to-red-500 rounded" />
            <div className="flex flex-col gap-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white font-mono z-10 ${item.colorClass} ${isDark ? "ring-4 ring-gray-950" : "ring-4 ring-stone-50"}`}>
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <div className={`font-semibold text-sm mb-0.5 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                      {item.label[lang]}
                    </div>
                    <div className="text-gray-500 text-sm leading-relaxed">{item.desc[lang]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 leading-relaxed">
              <strong>{t.timelineProblem[lang]} </strong>
              {t.timelineProblemText[lang]}
            </p>
          </div>
        </div>

        {/* Accordion sections */}
        <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-5">
          {t.sectionsTitle[lang]}
        </h2>
        <div className="flex flex-col gap-3 mb-14">
          {sections.map((s) => {
            const isOpen = open === s.id;
            return (
              <div
                key={s.id}
                className={`rounded-xl border overflow-hidden transition-all ${
                  isOpen
                    ? "border-green-600 shadow-md"
                    : isDark ? "border-gray-800" : "border-gray-200"
                } ${isDark ? "bg-gray-900" : "bg-white"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  className={`w-full px-5 py-4 flex items-center gap-4 text-left transition-colors ${
                    isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex-1">
                    <div className={`font-semibold text-base ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                      {s.title[lang]}
                    </div>
                    <div className="text-gray-500 text-sm mt-0.5">{s.short[lang]}</div>
                  </div>
                  <span
                    className="text-green-600 text-lg flex-shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className={`px-5 pb-5 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                    <div className="pt-4 space-y-3">
                      {s.content[lang].split("\n\n").map((para, i) => (
                        <p key={i} className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          {para}
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-green-50 border-l-3 border-green-600 rounded-md border-l-4">
                      <p className="text-sm text-green-800 leading-relaxed">
                        <strong>{t.didYouKnow[lang]} </strong>
                        {s.fact[lang]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Glossary */}
        <div className="mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-5">
            {t.glossaryTitle[lang]}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {glossary.map((g, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
              >
                <div className="text-green-600 font-mono font-semibold text-sm mb-1">{g.term[lang]}</div>
                <div className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>{g.def[lang]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-950 to-gray-900 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-normal text-gray-100 mb-2">{t.ctaTitle[lang]}</h3>
          <p className="text-green-300 text-sm leading-relaxed mb-6">{t.ctaText[lang]}</p>
          <p className="text-green-400 text-xs font-mono uppercase tracking-widest mb-4">{t.ctaLinksTitle[lang]}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {ctaLinks.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-green-800 bg-white/5 text-green-300 text-sm hover:bg-white/10 transition-colors no-underline"
              >
                {l.label[lang]} →
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs font-mono tracking-wider mt-10">
          {t.footer[lang]}
        </p>
      </div>
    </div>
  );
}