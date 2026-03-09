import type { Node } from "./decisionTreeTypes";

export const TREE_NO: Record<string, Node> = {
  start: {
    question: "Hvem er du i denne saken?",
    hint: "Veiviseren er tilpasset ulike roller. Velg den som passer best.",
    options: [
      {
        label:
          "Grunneier – jeg er varslet om ekspropriasjon eller forhåndstiltredelse",
        next: "grunneier_status",
      },
      {
        label:
          "Naturverner / ideell organisasjon – vi vil protestere mot et naturinngrep",
        next: "naturvern_status",
      },
      {
        label: "Representant for samisk reindrift eller urfolksinteresser",
        next: "urfolk_status",
      },
    ],
  },

  // ── GRUNNEIER-GREN ────────────────────────────────────────────────────────
  grunneier_status: {
    question: "Hva er situasjonen akkurat nå?",
    hint: "Dette avgjør hvilke rettsmidler som fortsatt er tilgjengelige.",
    options: [
      {
        label:
          "Jeg har mottatt varsel om ekspropriasjon, men ingen tiltredelse ennå",
        next: "grunneier_varsel",
      },
      {
        label: "Jeg har mottatt samtykkevedtak om forhåndstiltredelse",
        next: "grunneier_samtykke",
      },
      {
        label: "Tiltakshaver har allerede tiltrådt eiendommen",
        next: "grunneier_tiltraadt",
      },
    ],
  },
  grunneier_varsel: {
    question:
      "Mener du inngrepet er ulovlig – f.eks. i strid med natur- eller kulturvern?",
    hint: "Oreigningslova § 2 krever at inngrepet 'tvillaust er til meir gagn enn skade'. Motstrid med menneskerettigheter kan gjøre vedtaket ugyldig.",
    options: [
      {
        label: "Ja – inngrepet kan krenke samisk kulturutøvelse (SP artikkel 27)",
        next: "result_innsigelse_sp27",
      },
      {
        label: "Ja – inngrepet kan krenke naturmangfold / Grunnloven § 112",
        next: "result_innsigelse_natur",
      },
      {
        label:
          "Nei – jeg aksepterer at inngrepet er lovlig, men vil ha riktig erstatning",
        next: "result_erstatning_grunneier",
      },
    ],
  },
  grunneier_samtykke: {
    question: "Har du allerede klaget på samtykkevedtaket?",
    hint: "Samtykke til forhåndstiltredelse er et forvaltningsvedtak som kan påklages etter forvaltningsloven § 28. Klagefristen er normalt 3 uker.",
    options: [
      { label: "Nei – jeg har ikke klaget ennå", next: "grunneier_klagefrist" },
      {
        label: "Ja – klagen ble avvist eller ikke tatt til følge",
        next: "grunneier_etter_klage",
      },
    ],
  },
  grunneier_klagefrist: {
    question:
      "Er det mer enn 3 uker siden du mottok samtykkevedtaket?",
    hint: "Klagefristen er 3 uker fra vedtaket ble mottatt, jf. forvaltningsloven § 29. Oversittelse kan gi rett til oppreisning hvis det forelå gyldig grunn.",
    options: [
      {
        label: "Nei – jeg er innenfor fristen",
        next: "result_klage_samtykke",
      },
      {
        label: "Ja – fristen er oversittet",
        next: "result_klage_for_sent",
      },
    ],
  },
  grunneier_etter_klage: {
    question:
      "Er tiltaket reversibelt hvis det viser seg å være ulovlig?",
    hint: "Dette er kjernespørsmålet fra Fosen-dommen. Irreversible inngrep kan ikke repareres med erstatning alene – noe som styrker grunnlaget for midlertidig forføyning.",
    options: [
      {
        label:
          "Nei – inngrepet er irreversibelt (vindkraft, mineraler, vei, jernbane o.l.)",
        next: "result_forvoyning_irreversibel",
      },
      {
        label: "Ja – inngrepet kan i prinsippet tilbakeføres",
        next: "result_forvoyning_reversibel",
      },
    ],
  },
  grunneier_tiltraadt: {
    question:
      "Er inngrepet fullstendig gjennomført, eller pågår det fortsatt?",
    options: [
      {
        label: "Det pågår fortsatt – anleggsarbeider er i gang",
        next: "result_stans_pagaar",
      },
      {
        label: "Det er allerede fullstendig gjennomført",
        next: "result_ugyldighetssoksmaal",
      },
    ],
  },

  // ── NATURVERN-GREN ────────────────────────────────────────────────────────
  naturvern_status: {
    question: "Hva slags inngrep gjelder det?",
    hint: "Type inngrep er avgjørende for hvilke rettsgrunnlag som er relevante.",
    options: [
      {
        label: "Vindkraft, kraftlinje eller annen energiinfrastruktur",
        next: "naturvern_type_energi",
      },
      {
        label: "Vei, jernbane eller annen samferdselsinfrastruktur",
        next: "naturvern_prosess",
      },
      {
        label: "Mineralutvinning eller gruvedrift",
        next: "naturvern_type_mineral",
      },
    ],
  },
  naturvern_type_energi: {
    question:
      "Berører inngrepet områder med særlig naturverdi eller vernestatus?",
    hint: "Naturmangfoldloven §§ 8-12 (kunnskapsgrunnlag, føre-var, økosystemtilnærming) gjelder ved alle offentlige vedtak som berører naturmangfold.",
    options: [
      {
        label: "Ja – verneområde, viktig naturtype eller truet art",
        next: "result_naturvern_sterkt",
      },
      {
        label: "Usikkert – ikke kartlagt tilstrekkelig",
        next: "result_naturvern_forevaar",
      },
      {
        label: "Nei – men vi mener konsekvensutredningen er mangelfull",
        next: "result_naturvern_ku",
      },
    ],
  },
  naturvern_type_mineral: {
    question:
      "Er det gjennomført konsekvensutredning for biologisk mangfold?",
    options: [
      { label: "Nei eller mangelfull", next: "result_naturvern_ku" },
      {
        label: "Ja, men vi mener den undervurderer konsekvensene",
        next: "result_naturvern_forevaar",
      },
    ],
  },
  naturvern_prosess: {
    question: "Er det gitt samtykke til forhåndstiltredelse i saken?",
    options: [
      { label: "Ja", next: "result_naturvern_forhånd" },
      {
        label: "Ikke ennå – vi vil forhindre at det gis",
        next: "result_naturvern_prevent",
      },
    ],
  },

  // ── URFOLK-GREN ───────────────────────────────────────────────────────────
  urfolk_status: {
    question: "Hva slags inngrep er det snakk om?",
    hint: "SP artikkel 27 beskytter mot inngrep med 'vesentlige negative konsekvenser' for samisk kulturutøvelse. Fosen-dommen (HR-2021-1975-S) slo fast at vindkraftutbygging kan krenke denne bestemmelsen.",
    options: [
      {
        label: "Inngrep i beiteområder brukt til samisk reindrift",
        next: "urfolk_reindrift",
      },
      {
        label: "Inngrep i andre samiske kulturutøvelsesområder",
        next: "urfolk_annen_kultur",
      },
    ],
  },
  urfolk_reindrift: {
    question:
      "Er inngrepet iverksatt med forhåndstiltredelse – dvs. før skjønn er avholdt?",
    options: [
      {
        label:
          "Ja – tiltakshaver har tiltrådt med hjemmel i oreigningslova § 25",
        next: "result_urfolk_fosen",
      },
      {
        label: "Nei – saken er ennå i planleggingsfasen",
        next: "result_urfolk_tidlig",
      },
    ],
  },
  urfolk_annen_kultur: {
    result: {
      title: "SP artikkel 27 – vern om samisk kulturutøvelse",
      color: "green",
      rights: [
        "SP artikkel 27 beskytter alle former for samisk kulturutøvelse, ikke bare reindrift.",
        "Staten plikter å konsultere berørte samiske interesser i god tid (sameloven kapittel 4).",
        "Manglende konsultasjon kan i seg selv gjøre vedtaket ugyldig.",
        "ILO-konvensjon 169 artikkel 14(3) krever 'adequate procedures' for å løse landrettstvister.",
        "Kontakt Sametinget eller Norske Samers Riksforbund for rettslig bistand.",
      ],
      law: "SP art. 27 · ILO-169 art. 14 · Sameloven kap. 4",
      warning: null,
    },
  },

  // ── RESULTATER ────────────────────────────────────────────────────────────
  result_innsigelse_sp27: {
    result: {
      title: "Du kan fremme innsigelse basert på SP artikkel 27",
      color: "green",
      rights: [
        "SP artikkel 27 er inkorporert i norsk rett med forrang, jf. menneskerettsloven § 2 og § 3.",
        "Fosen-dommen (HR-2021-1975-S) slår fast at vindkraftinngrep i reinbeiter kan krenke SP art. 27.",
        "Krev at forvaltningsorganet vurderer SP art. 27 eksplisitt før samtykke til forhåndstiltredelse gis.",
        "Forvaltningsorganet har ikke adgang til å foreta interesseavveining dersom inngrepet krenker art. 27 – skjønnsrommet er snevert.",
        "Fremme innsigelse skriftlig og krev svar. Forvaltningsvedtak uten begrunnelse kan angripes.",
        "Vurder å be om utsatt iverksetting etter forvaltningsloven § 42 mens innsigelsen behandles.",
      ],
      law: "SP art. 27 · Oreigningslova § 25 · Fvl. § 42",
      warning:
        "Oreigningslova § 25 er ikke endret siden 1973 og er etter artikkelforfatternes vurdering ikke i samsvar med Norges folkerettslige forpliktelser.",
    },
  },
  result_innsigelse_natur: {
    result: {
      title:
        "Du kan fremme innsigelse basert på Grunnloven § 112 og naturmangfoldloven",
      color: "green",
      rights: [
        "Grunnloven § 112 gir alle rett til et miljø som sikrer helsen og naturens produksjonsevne og mangfold.",
        "HR-2020-2472-P (Klimasøksmålet) slo fast at § 112 har 'eit visst rettsleg innhald' – den er ikke bare en prinsipperklæring.",
        "Naturmangfoldloven § 9 lovfester føre-var-prinsippet: ved risiko for alvorlig eller irreversibel skade skal tvil komme naturen til gode.",
        "Krev at konsekvensutredning for biologisk mangfold er gjennomført før samtykke gis.",
        "FNs naturavtale (Kunming-Montreal) forplikter Norge til å verne 30 % av all natur innen 2030.",
        "Fremme innsigelse til ansvarlig forvaltningsorgan (NVE, OED, statsforvalter) og be om utsatt iverksetting.",
      ],
      law: "Grl. § 112 · Naturmangfoldloven § 9 · Oreigningslova § 25",
      warning:
        "Irreversible naturinngrep kan ikke repareres med erstatning alene. Vedtak gitt uten tilstrekkelig naturvurdering kan være ugyldig.",
    },
  },
  result_erstatning_grunneier: {
    result: {
      title: "Dine rettigheter ved erstatningsutmåling",
      color: "blue",
      rights: [
        "Du har krav på full erstatning, jf. Grunnloven § 105.",
        "Erstatningen fastsettes ved skjønn (tingretten som skjønnsrett), jf. skjønnsprosessloven § 46.",
        "Du kan kreve erstatning for: salgsverdi/bruksverdi, ulemper på resteiendommen, flytteutgifter og annet tap.",
        "Ved forhåndstiltredelse: tiltakshaver må betale forskudd og stille sikkerhet, jf. oreigningslova § 25 andre og tredje ledd.",
        "Sakskostnader ved skjønn dekkes av eksproprianten, jf. skjønnsprosessloven § 54.",
        "Vurder å engasjere takstmann og advokat – du trenger ikke akseptere første tilbud.",
      ],
      law: "Grl. § 105 · Ekspropriasjonserstatningslova §§ 4–8 · Skjønnsprosessloven § 54",
      warning: null,
    },
  },
  result_klage_samtykke: {
    result: {
      title: "Klag på samtykkevedtaket – du er innenfor fristen",
      color: "green",
      rights: [
        "Vedtak om samtykke til forhåndstiltredelse kan påklages etter forvaltningsloven § 28.",
        "Send klagen skriftlig til det forvaltningsorganet som ga samtykket (NVE, OED, statsforvalter o.l.).",
        "Angi tydelig hvorfor du mener vedtaket er ugyldig – f.eks. motstrid med SP art. 27 eller Grl. § 112.",
        "Klagen gis normalt ikke oppsettende virkning automatisk – be eksplisitt om utsatt iverksetting etter fvl. § 42.",
        "Klagebehandling er gebyrfri og uten kostnadsrisiko – bruk denne muligheten fullt ut.",
        "Parallelt kan du begjære midlertidig forføyning i tingretten dersom klagen ikke stopper iverksettingen.",
      ],
      law: "Fvl. §§ 28–34 · Fvl. § 42 · Tvisteloven kap. 34",
      warning:
        "Vær oppmerksom på at klagen ikke automatisk stanser tiltredelsen. Be eksplisitt om utsatt iverksetting.",
    },
  },
  result_klage_for_sent: {
    result: {
      title: "Fristen er sannsynligvis oversittet – men det finnes alternativer",
      color: "orange",
      rights: [
        "Du kan søke om oppreisning for oversittelse av klagefristen hvis det forelå gyldig grunn, jf. fvl. § 31.",
        "Alternativt kan du fremme ugyldighetsanførsel under tvangsfullbyrdelsen, jf. tvangsfullbyrdelsesloven § 4-2 tredje ledd.",
        "Du kan reise ugyldighetssøksmål for domstolene – dette er ikke fristbundet på samme måte.",
        "Midlertidig forføyning (tvisteloven kap. 34) kan begjæres dersom inngrepet ikke er gjennomført.",
        "Vær forberedt på kostnadsrisiko ved domstolsbehandling – dette er en reell barriere (jf. Øyfjellet-saken: 1,7 mill. i sakskostnader mot reinbeitedistriktet).",
      ],
      law: "Fvl. § 31 · Tvangsfullbyrdelsesloven § 4-2 · Tvisteloven kap. 34",
      warning:
        "Domstolsveien innebærer betydelig kostnadsrisiko. Søk juridisk bistand og vurder om organisasjoner kan støtte saken.",
    },
  },
  result_forvoyning_irreversibel: {
    result: {
      title:
        "Begjær midlertidig forføyning – irreversibelt inngrep styrker saken",
      color: "green",
      rights: [
        "Midlertidig forføyning kan begjæres til tingretten for å stanse iverksettingen, jf. tvisteloven kap. 34.",
        "Irreversibilitet er et sentralt moment: Fosen-dommen viser at inngrep i reinbeiter 'vanskelig kan repareres' med erstatning.",
        "Du må sannsynliggjøre (1) at hovedkravet (ugyldighet) er sannsynlig, og (2) at det foreligger sikringsgrunn.",
        "Krev at retten vurderer forholdet til SP art. 27 og/eller Grl. § 112 eksplisitt.",
        "Parallelt: Klag til forvaltningsorganet og be om utsatt iverksetting etter fvl. § 42.",
        "Søk bistand fra Advokatforeningen, NJFF, Naturvernforbundet eller Sametinget.",
      ],
      law: "Tvisteloven §§ 34-1 ff. · Fvl. § 42 · SP art. 27 · Grl. § 112",
      warning:
        "Øyfjellet-saken: reinbeitedistriktet ble idømt kr 1,77 mill. i sakskostnader etter tapt forføyningssak. Kostnadsrisiko er en reell rettsikkerhetsbarriere.",
    },
  },
  result_forvoyning_reversibel: {
    result: {
      title:
        "Midlertidig forføyning er mulig, men vanskeligere ved reversible inngrep",
      color: "blue",
      rights: [
        "Midlertidig forføyning krever at sikringsgrunn foreligger – reversibilitet svekker dette momentet.",
        "Vurder likevel ugyldighetssøksmål dersom du mener samtykkevedtaket er i strid med lov.",
        "Krev at forvaltningsorganet gir utvidet begrunnelse for vedtaket (fvl. § 25).",
        "Be om innsyn i sakens dokumenter etter fvl. §§ 18–19 for å vurdere om saksbehandlingen var forsvarlig.",
        "Vurder klage til Sivilombudet dersom forvaltningen ikke har overholdt sine plikter.",
      ],
      law: "Tvisteloven kap. 34 · Fvl. §§ 18–19, 25",
      warning: null,
    },
  },
  result_stans_pagaar: {
    result: {
      title: "Anlegget er i gang – handle raskt",
      color: "red",
      rights: [
        "Begjær midlertidig forføyning for å stanse pågående anleggsarbeider, jf. tvisteloven §§ 34-1 ff.",
        "Krev stans direkte hos ansvarlig forvaltningsorgan og påberop deg SP art. 27 / Grl. § 112.",
        "Fremme ugyldighetsanførsel mot tvangsgrunnlaget (samtykkevedtaket) etter tvangsfullbyrdelsesloven § 4-2.",
        "Dokumentér inngrepets omfang løpende – bilder, drone, vitner – til bruk i ev. erstatningssak.",
        "Jo lenger du venter, jo nærmere irreversibelt punkt. Kontakt advokat umiddelbart.",
      ],
      law: "Tvisteloven §§ 34-1 ff. · Tvangsfullbyrdelsesloven § 4-2 · Oreigningslova § 25",
      warning:
        "Tidsmomentet er kritisk. Irreversible inngrep som fullføres kan ikke repareres med erstatning alene – jf. Fosen-dommen.",
    },
  },
  result_ugyldighetssoksmaal: {
    result: {
      title: "Inngrepet er fullført – ugyldighetssøksmål og erstatning",
      color: "orange",
      rights: [
        "Du kan reise ugyldighetssøksmål mot ekspropriasjonsvedtaket dersom du mener det var i strid med lov.",
        "Selv om inngrepet er fysisk gjennomført, kan en dom på ugyldighet ha betydning for erstatningsutmålingen.",
        "I Fosen-saken ble ekspropriasjonsvedtaket kjent ugyldig åtte år etter forhåndstiltredelse.",
        "Krev erstatning for alle tap – inkludert ulemper, verdifall og ideelle tap ved irreversibelt inngrep.",
        "Kontakt Advokatforeningen eller Sametinget (ved samiske rettigheter) for bistand.",
      ],
      law: "Oreigningslova § 2 · Ekspropriasjonserstatningslova · SP art. 27",
      warning:
        "Ugyldighetssøksmål mot fullførte tiltak er prosessuelt krevende og kostbart. Søk juridisk bistand.",
    },
  },
  result_urfolk_fosen: {
    result: {
      title: "Fosen-dommen: rettsgrunnlag for din sak",
      color: "green",
      rights: [
        "HR-2021-1975-S (Fosen) slo enstemmig fast at forhåndstiltredelse i samiske reinbeiter krenket SP artikkel 27.",
        "Høyesterett: SP art. 27 gir ikke adgang til interesseavveining – verneforpliktelsen er absolutt ved vesentlige negative konsekvenser.",
        "Inngrepet ble kjent ugyldig selv om det var fullstendig gjennomført og reversering var svært kostbart.",
        "Sametingsoppnevnt reindriftslovutvalg (2022) foreslo å forby forhåndstiltredelse i samiske reindriftsrettigheter før rettskraftig lovlighetsavgjørelse.",
        "Krev konsultasjon etter sameloven kapittel 4 hvis dette ikke er gjennomført.",
        "Begjær midlertidig forføyning for å stanse pågående arbeider – Fosen-dommen styrker sannsynliggjøringskravet.",
        "Ravna & Holm (2026): oreigningslova § 25 er etter all sannsynlighet ikke i samsvar med Norges folkerettslige forpliktelser.",
      ],
      law: "SP art. 27 · HR-2021-1975-S (Fosen) · Sameloven kap. 4 · Oreigningslova § 25",
      warning:
        "Øyfjellet-saken viser at kostnadsrisikoen ved domstolsprøving er reell og stor. Koordiner med Sametinget og NRL om felles rettshjelp.",
    },
  },
  result_urfolk_tidlig: {
    result: {
      title:
        "Handle tidlig – før samtykke til forhåndstiltredelse gis",
      color: "blue",
      rights: [
        "Krev skriftlig konsultasjon etter sameloven kapittel 4 – dette er en lovpålagt plikt for forvaltningen.",
        "Manglende konsultasjon kan i seg selv gjøre ekspropriasjonsvedtaket ugyldig.",
        "Fremme skriftlig innsigelse til ansvarlig forvaltningsorgan og påberop SP art. 27 eksplisitt.",
        "Krev at konsekvensene for reindriften utredes grundig FØR samtykke gis.",
        "Regjeringen nedsatte juni 2025 et utvalg for å utrede endringer i ekspropriasjonsreglene – gi innspill til dette.",
        "Dokumentér reinflytting, beitebruk og tapte arealer grundig – det styrker saken ved ev. skjønn.",
      ],
      law: "SP art. 27 · Sameloven kap. 4 · ILO-169 art. 14 · Oreigningslova § 25",
      warning: null,
    },
  },
  result_naturvern_sterkt: {
    result: {
      title: "Sterkt rettslig grunnlag – verneområde eller truet natur",
      color: "green",
      rights: [
        "Naturmangfoldloven § 48 og naturvernloven gir særlig vern til verneområder – inngrep krever sterk hjemmel.",
        "Grunnloven § 112 gir alle rett til naturens produksjonsevne og mangfold – staten har plikt til å iverksette tiltak.",
        "HR-2020-2472-P (Klimasøksmålet): § 112 er ikke bare prinsipperklæring, men har 'eit visst rettsleg innhald'.",
        "Naturmangfoldloven § 9 (føre-var): ved risiko for alvorlig eller irreversibel skade på natur skal tvil komme naturen til gode.",
        "Krev at konsekvensutredning er gjennomført etter naturmangfoldloven §§ 8-12 og plan- og bygningsloven.",
        "Ideelle organisasjoner har 'rettslig klageinteresse' etter fvl. § 28 – klageretten er ikke begrenset til grunneier.",
      ],
      law: "Grl. § 112 · Naturmangfoldloven §§ 8–12, 48 · Fvl. § 28",
      warning:
        "Merk: Som ideell organisasjon er dere avskåret fra ugyldighetsanførsel under tvangsfullbyrdelsen (tvfbl. § 5-11). Bruk forvaltningsklage og domstolsveien.",
    },
  },
  result_naturvern_forevaar: {
    result: {
      title: "Mangelfull kartlegging – krev føre-var-vurdering",
      color: "blue",
      rights: [
        "Naturmangfoldloven § 8: offentlige vedtak skal bygge på vitenskapelig kunnskap om naturmangfold.",
        "§ 9 (føre-var): mangler kunnskap om konsekvensene, skal tvilen komme naturen til gode.",
        "Krev at forvaltningsorganet dokumenterer kunnskapsgrunnlaget for vedtaket.",
        "Vedtak truffet uten tilstrekkelig naturkartlegging kan lide av ugyldige mangler i saksbehandlingen.",
        "FNs naturavtale (2022) forplikter Norge til ikke å godkjenne inngrep som kan true 30 %-målet.",
        "Krev konsekvensutredning etter plan- og bygningsloven §§ 14-1 ff. dersom dette ikke er gjort.",
      ],
      law: "Naturmangfoldloven §§ 8–10 · Plan- og bygningsloven §§ 14-1 ff. · Grl. § 112",
      warning: null,
    },
  },
  result_naturvern_ku: {
    result: {
      title: "Mangelfull konsekvensutredning – grunnlag for klage",
      color: "orange",
      rights: [
        "Konsekvensutredning er obligatorisk for tiltak med vesentlig virkning på miljø, jf. plan- og bygningsloven § 14-2.",
        "Manglende eller mangelfull KU er en saksbehandlingsfeil som kan medføre ugyldighet.",
        "Klag på vedtaket til overordnet forvaltningsorgan og påpek manglene i KU konkret og skriftlig.",
        "EØS-avtalens miljøregler (vanndirektivet) kan også være relevante – jf. Førdefjord-saken (LB-2024-36660).",
        "Ideelle organisasjoner har klagerett etter fvl. § 28 på vedtak som berører miljøet.",
        "Kontakt Naturvernforbundet, WWF eller Sabima for samordning og mulig felles søksmål.",
      ],
      law: "Plan- og bygningsloven § 14-2 · Naturmangfoldloven § 7 · Fvl. § 28",
      warning: null,
    },
  },
  result_naturvern_forhånd: {
    result: {
      title:
        "Samtykke til forhåndstiltredelse er gitt – naturverneres rettsmidler",
      color: "orange",
      rights: [
        "Som ideell organisasjon har dere klagerett etter fvl. § 28 på samtykkevedtaket dersom dere har 'rettslig klageinteresse'.",
        "Advarsel: Under tvangsfullbyrdelsen (tvangsfullbyrdelsesloven § 5-11) kan kun saksøkte (grunneier) fremme ugyldighetsanførsel – ikke ideelle organisasjoner.",
        "Midlertidig forføyning (tvisteloven kap. 34) er tilgjengelig for parter med rettslig interesse.",
        "Ravna & Holm (2026): De prosessuelle rettsmidlene er 'ikke innrettet mot å sikre at menneskerettsbrudd ikke finner sted'.",
        "Koordiner med berørte grunneiere og urfolksorganisasjoner for bredere rettshjelp.",
        "Klag til Sivilombudet dersom forvaltningen ikke har oppfylt utrednings- og begrunnelsesplikten.",
      ],
      law: "Fvl. § 28 · Tvangsfullbyrdelsesloven § 5-11 · Tvisteloven kap. 34",
      warning:
        "Ideelle organisasjoner har svakere prosessuelle rettsmidler enn grunneiere ved forhåndstiltredelse. Dette er en av de strukturelle svakhetene artikkelen peker på.",
    },
  },
  result_naturvern_prevent: {
    result: {
      title: "Handle nå – før samtykke gis",
      color: "green",
      rights: [
        "Fremme skriftlig innsigelse til ansvarlig forvaltningsorgan FØR samtykke til forhåndstiltredelse gis.",
        "Påberop Grl. § 112, naturmangfoldloven §§ 8-12 og relevante internasjonale forpliktelser.",
        "Krev at det ikke gis samtykke til forhåndstiltredelse før lovligheten av inngrepet er rettskraftig avgjort – i tråd med Ravna & Holms forslag de lege ferenda.",
        "Gi innspill til regjeringens ekspropriasjonsutvalg (nedsatt juni 2025) om behovet for materiell føre-var-terskel i oreigningslova § 25.",
        "Bruk høringsprosesser, Stortinget og media aktivt – regelendring er nødvendig ifølge artikkelen.",
      ],
      law: "Oreigningslova § 25 · Grl. § 112 · Naturmangfoldloven §§ 8–12",
      warning: null,
    },
  },
};