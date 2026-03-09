import type { Node } from "./decisionTreeTypes";// src/data/tree_en.ts

export const TREE_EN: Record<string, Node> = {
  start: {
    question: "Who are you in this case?",
    hint: "The navigator is tailored to different roles. Choose the one that fits best.",
    options: [
      {
        label:
          "Landowner – I have been notified of expropriation or advance possession",
        next: "grunneier_status",
      },
      {
        label:
          "Environmental defender / NGO – we want to object to an intervention in nature",
        next: "naturvern_status",
      },
      {
        label:
          "Representative of Sami reindeer husbandry or indigenous interests",
        next: "urfolk_status",
      },
    ],
  },

  // ── LANDOWNER BRANCH ──────────────────────────────────────────────────────
  grunneier_status: {
    question: "What is the situation right now?",
    hint: "This determines which remedies are still available.",
    options: [
      {
        label:
          "I have received a notice of expropriation, but no advance possession yet",
        next: "grunneier_varsel",
      },
      {
        label: "I have received a consent decision for advance possession",
        next: "grunneier_samtykke",
      },
      {
        label: "The developer has already taken possession of the property",
        next: "grunneier_tiltraadt",
      },
    ],
  },
  grunneier_varsel: {
    question:
      "Do you believe the intervention is unlawful – e.g. contrary to nature or cultural protection?",
    hint: "Expropriation Act § 2 requires that the intervention is ‘undoubtedly more beneficial than harmful’. Conflict with human rights can render the decision invalid.",
    options: [
      {
        label: "Yes – the intervention may interfere with Sami cultural practice (ICCPR Article 27)",
        next: "result_innsigelse_sp27",
      },
      {
        label: "Yes – the intervention may harm biodiversity / Constitution § 112",
        next: "result_innsigelse_natur",
      },
      {
        label:
          "No – I accept that the intervention is lawful, but I want proper compensation",
        next: "result_erstatning_grunneier",
      },
    ],
  },
  grunneier_samtykke: {
    question: "Have you already appealed the consent decision?",
    hint: "Consent to advance possession is an administrative decision that can be appealed under the Public Administration Act § 28. The appeal deadline is normally 3 weeks.",
    options: [
      { label: "No – I have not appealed yet", next: "grunneier_klagefrist" },
      {
        label: "Yes – the appeal was rejected or not upheld",
        next: "grunneier_etter_klage",
      },
    ],
  },
  grunneier_klagefrist: {
    question:
      "Has more than 3 weeks passed since you received the consent decision?",
    hint: "The appeal deadline is 3 weeks from when you received the decision, cf. Public Administration Act § 29. Exceeding the deadline may still give a right to reinstatement if there was a valid excuse.",
    options: [
      {
        label: "No – I am within the deadline",
        next: "result_klage_samtykke",
      },
      {
        label: "Yes – the deadline has been exceeded",
        next: "result_klage_for_sent",
      },
    ],
  },
  grunneier_etter_klage: {
    question:
      "Is the intervention reversible if it turns out to be unlawful?",
    hint: "This is the core question from the Fosen judgment. Irreversible interventions cannot be repaired by compensation alone – which strengthens the basis for an interim injunction.",
    options: [
      {
        label:
          "No – the intervention is irreversible (wind power, minerals, road, railway, etc.)",
        next: "result_forvoyning_irreversibel",
      },
      {
        label: "Yes – in principle, the intervention can be reversed",
        next: "result_forvoyning_reversibel",
      },
    ],
  },
  grunneier_tiltraadt: {
    question:
      "Is the intervention fully completed, or is it still ongoing?",
    options: [
      {
        label: "It is still ongoing – construction work is underway",
        next: "result_stans_pagaar",
      },
      {
        label: "It has already been fully completed",
        next: "result_ugyldighetssoksmaal",
      },
    ],
  },

  // ── ENVIRONMENTAL / NATURE BRANCH ─────────────────────────────────────────
  naturvern_status: {
    question: "What type of intervention is it?",
    hint: "The type of intervention determines which legal bases are relevant.",
    options: [
      {
        label: "Wind power, power lines or other energy infrastructure",
        next: "naturvern_type_energi",
      },
      {
        label: "Road, railway or other transport infrastructure",
        next: "naturvern_prosess",
      },
      {
        label: "Mineral extraction or mining",
        next: "naturvern_type_mineral",
      },
    ],
  },
  naturvern_type_energi: {
    question:
      "Does the intervention affect areas with particular nature value or protection status?",
    hint: "The Nature Diversity Act §§ 8–12 (knowledge base, precaution, ecosystem approach) applies to all public decisions that affect biodiversity.",
    options: [
      {
        label: "Yes – protected area, important habitat type or threatened species",
        next: "result_naturvern_sterkt",
      },
      {
        label: "Uncertain – not sufficiently mapped",
        next: "result_naturvern_forevaar",
      },
      {
        label: "No – but we believe the environmental impact assessment is inadequate",
        next: "result_naturvern_ku",
      },
    ],
  },
  naturvern_type_mineral: {
    question:
      "Has there been an environmental impact assessment for biodiversity?",
    options: [
      { label: "No, or clearly inadequate", next: "result_naturvern_ku" },
      {
        label: "Yes, but we believe it underestimates the impacts",
        next: "result_naturvern_forevaar",
      },
    ],
  },
  naturvern_prosess: {
    question: "Has consent to advance possession been granted in the case?",
    options: [
      { label: "Yes", next: "result_naturvern_forhånd" },
      {
        label: "Not yet – we want to prevent it from being granted",
        next: "result_naturvern_prevent",
      },
    ],
  },

  // ── INDIGENOUS / SAMI BRANCH ──────────────────────────────────────────────
  urfolk_status: {
    question: "What kind of intervention are we talking about?",
    hint: "ICCPR Article 27 protects against interventions with ‘substantial negative consequences’ for Sami cultural practice. The Fosen judgment (HR-2021-1975-S) held that wind power development can violate this provision.",
    options: [
      {
        label: "Intervention in grazing areas used for Sami reindeer husbandry",
        next: "urfolk_reindrift",
      },
      {
        label: "Intervention in other areas of Sami cultural practice",
        next: "urfolk_annen_kultur",
      },
    ],
  },
  urfolk_reindrift: {
    question:
      "Has the intervention been implemented with advance possession – i.e. before the compensation case (skjønn) was held?",
    options: [
      {
        label:
          "Yes – the developer has taken possession based on Expropriation Act § 25",
        next: "result_urfolk_fosen",
      },
      {
        label: "No – the case is still at the planning stage",
        next: "result_urfolk_tidlig",
      },
    ],
  },
  urfolk_annen_kultur: {
    result: {
      title: "ICCPR Article 27 – protection of Sami cultural practice",
      color: "green",
      rights: [
        "ICCPR Article 27 protects all forms of Sami cultural practice, not only reindeer husbandry.",
        "The state is obliged to consult affected Sami interests in due time (Sami Act chapter 4).",
        "Lack of consultation can in itself render the decision invalid.",
        "ILO Convention 169 Article 14(3) requires ‘adequate procedures’ to resolve land rights disputes.",
        "Contact the Sami Parliament or Sami organisations for legal assistance.",
      ],
      law: "ICCPR Art. 27 · ILO-169 Art. 14 · Sami Act ch. 4",
      warning: null,
    },
  },

  // ── RESULTS ───────────────────────────────────────────────────────────────
  result_innsigelse_sp27: {
    result: {
      title: "You can raise an objection based on ICCPR Article 27",
      color: "green",
      rights: [
        "ICCPR Article 27 is incorporated into Norwegian law with precedence, cf. Human Rights Act §§ 2 and 3.",
        "The Fosen judgment (HR-2021-1975-S) establishes that wind power interventions in reindeer pastures can violate Article 27.",
        "Demand that the authority explicitly assesses Article 27 before granting consent to advance possession.",
        "The authority has no discretion to balance interests if the intervention violates Article 27 – the margin of appreciation is very narrow.",
        "Submit a written objection and demand a reasoned response. Unreasoned administrative decisions can be challenged.",
        "Consider requesting suspension of implementation while the objection is processed, under the Public Administration Act § 42.",
      ],
      law: "ICCPR Art. 27 · Expropriation Act § 25 · Public Administration Act § 42",
      warning:
        "Expropriation Act § 25 has not been amended since 1973 and, according to the authors, is not compatible with Norway’s international obligations.",
    },
  },
  result_innsigelse_natur: {
    result: {
      title:
        "You can raise an objection based on Constitution § 112 and the Nature Diversity Act",
      color: "green",
      rights: [
        "Constitution § 112 grants everyone the right to an environment that safeguards health and the productivity and diversity of nature.",
        "HR-2020-2472-P (the climate case) held that § 112 has ‘a certain legal content’ – it is not just a policy statement.",
        "Nature Diversity Act § 9 codifies the precautionary principle: where there is a risk of serious or irreversible damage, doubt shall benefit nature.",
        "Demand that an environmental impact assessment for biodiversity is carried out before consent is given.",
        "The UN Global Biodiversity Framework (Kunming–Montreal) commits Norway to protecting 30% of all nature by 2030.",
        "Submit an objection to the competent authority (e.g. NVE, MPE, County Governor) and request suspension of implementation.",
      ],
      law: "Constitution § 112 · Nature Diversity Act § 9 · Expropriation Act § 25",
      warning:
        "Irreversible interventions in nature cannot be repaired by compensation alone. Decisions made without sufficient environmental assessment may be invalid.",
    },
  },
  result_erstatning_grunneier: {
    result: {
      title: "Your rights regarding compensation",
      color: "blue",
      rights: [
        "You are entitled to full compensation, cf. Constitution § 105.",
        "Compensation is determined by a court in a special expropriation procedure (skjønn), cf. Expropriation Procedure Act § 46.",
        "You can claim compensation for: sales value/use value, disadvantages to the remaining property, relocation costs and other losses.",
        "With advance possession: the developer must pay an advance and provide security, cf. Expropriation Act § 25 second and third paragraphs.",
        "Legal costs in the expropriation compensation case are borne by the expropriating party, cf. Expropriation Procedure Act § 54.",
        "Consider engaging a valuer and a lawyer – you do not have to accept the first offer.",
      ],
      law: "Constitution § 105 · Expropriation Compensation Act §§ 4–8 · Expropriation Procedure Act § 54",
      warning: null,
    },
  },
  result_klage_samtykke: {
    result: {
      title: "Appeal the consent decision – you are within the deadline",
      color: "green",
      rights: [
        "A decision to grant consent to advance possession can be appealed under the Public Administration Act § 28.",
        "Send your appeal in writing to the authority that granted the consent (NVE, MPE, County Governor, etc.).",
        "Clearly explain why you believe the decision is invalid – e.g. conflict with ICCPR Article 27 or Constitution § 112.",
        "An appeal does not normally have suspensive effect – explicitly request suspension of implementation under § 42.",
        "Appeals are free of charge and without risk of paying the other side’s costs – make full use of this remedy.",
        "In parallel, you may request an interim injunction in the district court if the appeal does not stop implementation.",
      ],
      law: "Public Administration Act §§ 28–34 · Public Administration Act § 42 · Dispute Act ch. 34",
      warning:
        "Be aware that an appeal does not automatically stop the possession. Explicitly request suspension of implementation.",
    },
  },
  result_klage_for_sent: {
    result: {
      title: "The deadline has probably expired – but you still have options",
      color: "orange",
      rights: [
        "You may request reinstatement for failure to meet the appeal deadline if there was a valid excuse, cf. Public Administration Act § 31.",
        "Alternatively, you can raise invalidity objections during enforcement, cf. Enforcement Act § 4-2 third paragraph.",
        "You can bring an action for invalidity before the courts – this is not subject to the same strict deadlines.",
        "An interim injunction (Dispute Act ch. 34) may be requested if the intervention is not yet completed.",
        "Be prepared for cost risk in court – this is a real barrier (e.g. Øyfjellet case: NOK 1.7 million in costs against the reindeer district).",
      ],
      law: "Public Administration Act § 31 · Enforcement Act § 4-2 · Dispute Act ch. 34",
      warning:
        "Litigation involves significant cost risk. Seek legal assistance and consider whether organisations can support the case.",
    },
  },
  result_forvoyning_irreversibel: {
    result: {
      title:
        "Request an interim injunction – the irreversibility strengthens your case",
      color: "green",
      rights: [
        "You can request an interim injunction in the district court to stop implementation, cf. Dispute Act ch. 34.",
        "Irreversibility is a central factor: the Fosen case shows that interventions in reindeer pastures ‘can hardly be repaired’ by compensation.",
        "You must make it probable that (1) the main claim (invalidity) is well-founded, and (2) there is a need for protection.",
        "Demand that the court explicitly assesses ICCPR Article 27 and/or Constitution § 112.",
        "In parallel: appeal to the authority and request suspension of implementation under Public Administration Act § 42.",
        "Seek assistance from the Norwegian Bar Association, hunting/fishing associations, environmental NGOs or the Sami Parliament.",
      ],
      law: "Dispute Act §§ 34-1 ff. · Public Administration Act § 42 · ICCPR Art. 27 · Constitution § 112",
      warning:
        "Øyfjellet: the reindeer district was ordered to pay approx. NOK 1.77 million in costs after losing the interim injunction case. Cost risk is a real rule-of-law barrier.",
    },
  },
  result_forvoyning_reversibel: {
    result: {
      title:
        "An interim injunction is possible, but harder to obtain for reversible interventions",
      color: "blue",
      rights: [
        "An interim injunction requires a need for protection – reversibility weakens this factor.",
        "Still consider an action for invalidity if you believe the consent decision is unlawful.",
        "Demand that the authority provides an expanded reasoning for the decision (Public Administration Act § 25).",
        "Request access to the case documents under §§ 18–19 to assess whether the procedure was adequate.",
        "Consider complaining to the Parliamentary Ombud if the administration has not fulfilled its duties.",
      ],
      law: "Dispute Act ch. 34 · Public Administration Act §§ 18–19, 25",
      warning: null,
    },
  },
  result_stans_pagaar: {
    result: {
      title: "Construction is underway – act quickly",
      color: "red",
      rights: [
        "Request an interim injunction to stop ongoing works, cf. Dispute Act §§ 34-1 ff.",
        "Demand a halt directly from the competent authority and invoke ICCPR Article 27 / Constitution § 112.",
        "Raise invalidity objections against the enforcement basis (the consent decision) under Enforcement Act § 4-2.",
        "Continuously document the scope of the intervention – photos, drone footage, witnesses – for use in any compensation case.",
        "The longer you wait, the closer you get to an irreversible point. Contact a lawyer immediately.",
      ],
      law: "Dispute Act §§ 34-1 ff. · Enforcement Act § 4-2 · Expropriation Act § 25",
      warning:
        "Time is critical. Completed irreversible interventions cannot be repaired by compensation alone – cf. the Fosen judgment.",
    },
  },
  result_ugyldighetssoksmaal: {
    result: {
      title: "The intervention is completed – invalidity action and compensation",
      color: "orange",
      rights: [
        "You can bring an action for invalidity of the expropriation decision if you believe it was unlawful.",
        "Even if the intervention is physically completed, a judgment of invalidity can affect the amount of compensation.",
        "In the Fosen case, the expropriation decision was declared invalid eight years after advance possession.",
        "Claim compensation for all losses – including disadvantages, devaluation and non-pecuniary loss from irreversible interventions.",
        "Contact the Norwegian Bar Association or the Sami Parliament (for Sami rights) for assistance.",
      ],
      law: "Expropriation Act § 2 · Expropriation Compensation Act · ICCPR Art. 27",
      warning:
        "Invalidity actions against completed projects are procedurally demanding and expensive. Seek legal assistance.",
    },
  },
  result_urfolk_fosen: {
    result: {
      title: "The Fosen judgment: legal basis for your case",
      color: "green",
      rights: [
        "HR-2021-1975-S (Fosen) unanimously held that advance possession in Sami reindeer pastures violated ICCPR Article 27.",
        "The Supreme Court: Article 27 does not allow balancing of interests – the duty to protect is absolute where there are substantial negative effects.",
        "The intervention was declared invalid even though it was fully completed and reversal was very costly.",
        "The Sami reindeer husbandry law committee (2022) proposed banning advance possession in Sami reindeer rights before a final judgment on lawfulness.",
        "Demand consultation under Sami Act chapter 4 if this has not been carried out.",
        "Request an interim injunction to stop ongoing works – the Fosen judgment strengthens the likelihood requirement.",
        "Ravna & Holm (2026): Expropriation Act § 25 is, in all probability, not compatible with Norway’s international obligations.",
      ],
      law: "ICCPR Art. 27 · HR-2021-1975-S (Fosen) · Sami Act ch. 4 · Expropriation Act § 25",
      warning:
        "The Øyfjellet case shows that cost risk in court is real and substantial. Coordinate with the Sami Parliament and reindeer organisations regarding legal aid.",
    },
  },
  result_urfolk_tidlig: {
    result: {
      title:
        "Act early – before consent to advance possession is granted",
      color: "blue",
      rights: [
        "Demand written consultation under Sami Act chapter 4 – this is a statutory duty for the authorities.",
        "Lack of consultation can in itself render the expropriation decision invalid.",
        "Submit a written objection to the competent authority and explicitly invoke ICCPR Article 27.",
        "Demand that the consequences for reindeer husbandry are thoroughly assessed BEFORE consent is given.",
        "In June 2025 the government appointed a committee to review expropriation rules – submit input to this process.",
        "Thoroughly document reindeer migration, grazing use and lost areas – this strengthens the case in any compensation procedure.",
      ],
      law: "ICCPR Art. 27 · Sami Act ch. 4 · ILO-169 Art. 14 · Expropriation Act § 25",
      warning: null,
    },
  },
  result_naturvern_sterkt: {
    result: {
      title: "Strong legal basis – protected area or threatened nature",
      color: "green",
      rights: [
        "Nature Diversity Act § 48 and the Nature Conservation Act provide special protection to protected areas – interventions require strong legal authority.",
        "Constitution § 112 obliges the state to safeguard nature’s productivity and diversity for future generations.",
        "HR-2020-2472-P (the climate case): § 112 is not just a policy statement but has ‘a certain legal content’.",
        "Nature Diversity Act § 9 (precautionary principle): where there is a risk of serious or irreversible damage to nature, doubt shall benefit nature.",
        "Demand that environmental impact assessment is carried out under Nature Diversity Act §§ 8–12 and the Planning and Building Act.",
        "NGOs generally have ‘legal standing to appeal’ under Public Administration Act § 28 – appeal rights are not limited to landowners.",
      ],
      law: "Constitution § 112 · Nature Diversity Act §§ 8–12, 48 · Public Administration Act § 28",
      warning:
        "Note: as an NGO, you cannot raise invalidity objections during enforcement (Enforcement Act § 5-11). Use administrative appeals and, where possible, court review.",
    },
  },
  result_naturvern_forevaar: {
    result: {
      title: "Insufficient mapping – demand a precautionary assessment",
      color: "blue",
      rights: [
        "Nature Diversity Act § 8: public decisions must be based on scientific knowledge about biodiversity.",
        "§ 9 (precaution): where knowledge of consequences is lacking, doubt shall benefit nature.",
        "Demand that the authority documents the knowledge base for its decision.",
        "Decisions taken without sufficient nature mapping may suffer from procedural errors and be invalid.",
        "The UN Global Biodiversity Framework (2022) commits Norway not to approve interventions that may jeopardise the 30% protection target.",
        "Demand environmental impact assessment under the Planning and Building Act §§ 14-1 ff. if it has not been done.",
      ],
      law: "Nature Diversity Act §§ 8–10 · Planning and Building Act §§ 14-1 ff. · Constitution § 112",
      warning: null,
    },
  },
  result_naturvern_ku: {
    result: {
      title: "Defective environmental impact assessment – ground for appeal",
      color: "orange",
      rights: [
        "Environmental impact assessment (EIA) is mandatory for projects with significant effects on the environment, cf. Planning and Building Act § 14-2.",
        "Missing or inadequate EIA is a procedural error that may lead to invalidity.",
        "Appeal the decision to the superior authority and point out the specific deficiencies in the EIA.",
        "EEA environmental rules (e.g. the Water Framework Directive) may also be relevant – cf. the Førdefjord case (LB-2024-36660).",
        "NGOs have appeal rights under Public Administration Act § 28 in decisions that affect the environment.",
        "Contact national nature NGOs for coordination and possible joint litigation.",
      ],
      law: "Planning and Building Act § 14-2 · Nature Diversity Act § 7 · Public Administration Act § 28",
      warning: null,
    },
  },
  result_naturvern_forhånd: {
    result: {
      title:
        "Consent to advance possession has been granted – remedies for NGOs",
      color: "orange",
      rights: [
        "As an NGO, you may have appeal rights under Public Administration Act § 28 on the consent decision if you have ‘legal interest’.",
        "Warning: during enforcement (Enforcement Act § 5-11) only the debtor (landowner) can raise invalidity objections – NGOs cannot.",
        "Interim injunction (Dispute Act ch. 34) is available to parties with a sufficient legal interest.",
        "Ravna & Holm (2026): the procedural remedies are ‘not designed to ensure that human rights violations do not occur’.",
        "Coordinate with affected landowners and indigenous organisations for broader legal support.",
        "Complain to the Parliamentary Ombud if the administration has not fulfilled its duty to investigate and provide reasons.",
      ],
      law: "Public Administration Act § 28 · Enforcement Act § 5-11 · Dispute Act ch. 34",
      warning:
        "NGOs have weaker procedural remedies than landowners when it comes to advance possession. This is one of the structural weaknesses highlighted in the article.",
    },
  },
  result_naturvern_prevent: {
    result: {
      title: "Act now – before consent is granted",
      color: "green",
      rights: [
        "Submit a written objection to the competent authority BEFORE consent to advance possession is granted.",
        "Invoke Constitution § 112, Nature Diversity Act §§ 8–12 and relevant international obligations.",
        "Demand that no consent to advance possession is granted where there is a real risk of human rights or environmental violations – unless a court has first decided that the intervention is lawful (Ravna & Holm’s de lege ferenda proposal).",
        "Provide input to the government’s expropriation committee (appointed June 2025) on the need for a substantive precautionary threshold in Expropriation Act § 25.",
        "Use consultation processes, Parliament and media actively – legal reform is necessary according to the article.",
      ],
      law: "Expropriation Act § 25 · Constitution § 112 · Nature Diversity Act §§ 8–12",
      warning: null,
    },
  },
};
