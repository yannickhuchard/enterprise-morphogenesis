(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const translations = {
    en: {
      pageTitle: "Your strategy is clear. What about execution? — Enterprise Morphogenesis",
      metaDescription: "Are your budgets, teams and AI agents executing the same strategy? Enterprise Morphogenesis proposes connecting your priorities to the decisions that shape the enterprise.",
      skip: "Skip to content", navLabel: "Main navigation", navIdea: "Your decisions", navPractice: "The business case", navPaper: "The white paper", menu: "Menu",
      edition: "Strategy, execution and governance in the age of AI",
      heroTitle: "Your strategy is clear. Why is execution drifting?",
      heroAnswer: "Execution follows the budgets, rules and decision rights already in place.",
      heroIntro: "Budgets, teams and AI agents can pull in different directions. Enterprise Morphogenesis proposes making architecture the system that connects their decisions to your strategy and enables course correction.",
      start: "See which decisions to change", readFull: "Read the executive summary", authorRole: "Enterprise architect",
      networkTitle: "What determines your decisions",
      networkDesc: "Decisions depend on strategic priorities, budgets, teams, systems and rules. Architecture connects these elements to make trade-offs explicit.",
      networkStrategy: "Strategy", networkPeople: "People & teams", networkSystems: "Data & systems", networkActivities: "Products & activities", networkResources: "Budgets & rules", networkOne: "Your decisions.", networkTogether: "Your trade-offs.",
      networkCaption: "Your strategy takes effect through what these decisions authorize and fund.",
      executiveQuestionsLabel: "Three leadership questions", questionBudget: "Do your budgets fund your priorities?", questionAI: "How far can you delegate to AI?", questionControl: "Which signals require you to take control?",
      ideaLabel: "The first test: resource allocation", readingTime: "What matters for your decisions",
      ideaTitle: "What are you really funding?", budgetAnswer: "Your budget reveals your actual priorities.",
      ideaText: "The target architecture calls for a shared platform, but each business unit funds its own solution. The gap starts with resource allocation, long before delivery.",
      ideaThesis: "Connect each investment to the shared services, skills and rules your strategy requires. A project that pays off for one team can still increase cost and risk across the enterprise.",
      definitionSource: "Strategy and resources, section 5.7", shiftLabel: "Leadership questions and decisions", shiftBefore: "The question to settle", shiftAfter: "The decision to make explicit",
      shift1Before: "What needs to be shared?", shift1After: "Fund the shared foundation and name its owner.",
      shift2Before: "Where should teams have autonomy?", shift2After: "Define the boundaries and permitted exceptions.",
      shift3Before: "When should you change course?", shift3After: "Set the signals that trigger a decision.",
      loopLabel: "Delegating decisions", loopTitle: "How do you delegate without losing control?", delegationAnswer: "Define who can decide what, and under which conditions.",
      loopIntro: "Rules must guide teams and AI agents at the point of action. Here are the four decisions to make.", stepsLabel: "Four decisions for controlled delegation",
      step0: "Set the boundaries", step1: "Provide the resources", step2: "Delegate action", step3: "Measure the gaps", forExample: "The insurer case",
      loopReturn: "Results must be able to challenge a rule, a budget or a priority.",
      practiceLabel: "The operational test", practiceTitle: "When do you need to take back control?", controlAnswer: "When the conditions that authorized a decision no longer hold.",
      practiceIntro: "A new law, a new market or rising error rates: take the case of an insurer and see what needs to change.",
      scenarioLabel: "Choose a business situation", scenarioRegulation: "Compliance", scenarioGrowth: "Growth", scenarioIncident: "Performance",
      responseIdentify: "Locate the impact", responseAdapt: "Change the decision", responseCheck: "Check the effect",
      scenarioNote: "Fictional case illustrating the mechanisms proposed in the paper. Their effects still require validation in practice.",
      scenarioSource: "Examine the full case, section 10",
      peopleLabel: "Organizational capacity", peopleTitle: "Can your teams absorb what you automate?", peopleAnswer: "Skills and accountability need to evolve with the work.",
      peopleIntro: "Automating a process moves tasks, exceptions and responsibilities. Prepare the people who will supervise, correct and take responsibility for the new decisions.",
      peopleSource: "Work and skills, section 7.9",
      people1Title: "Who sees the impact of their decision?", people1Text: "Make dependencies between products, teams, data and systems visible. Each owner needs to understand who depends on their choices.",
      people2Title: "Who can intervene when AI gets it wrong?", people2Text: "Name the accountable owners, train the experts and give them the authority to suspend or correct an action.",
      people3Title: "Who can challenge a trade-off?", people3Text: "Keep the reasoning, evidence and exceptions. A traceable decision also needs to be open to challenge.",
      questionsLabel: "Taking action", questionsTitle: "Where do you start on Monday morning?",
      faq1Q: "Do you need to transform the whole enterprise first?", faq1A: "Start with one domain, a committed owner and a specific obligation. Connect the relevant elements, make a few rules executable and observe their effects. Expand once decision, action and feedback work together.", faq1Source: "Start with a bounded scope, section 11.4",
      faq2Q: "What should you measure?", faq2A: "Measure the delay between a change and the enterprise’s response, the gaps from intended outcomes and the exceptions still open. Check that your rules are actually being applied. The paper proposes separate indicators rather than an overall score that could hide problems.", faq2Source: "Response latency, section 4.4",
      faq3Q: "What should Enterprise Architecture deliver?", faq3A: "Inputs people can use to decide and act: intended outcomes, shared rules, dependencies, transformation paths and warning signals. Existing models and frameworks remain useful when they support this work.", faq3Source: "The expected deliverables, section 7",
      faq4Q: "Which results have been demonstrated?", faq4A: "The white paper advances a theory to test. It draws on existing research, specifies the expected benefits and describes what could refute them. Its examples explain the mechanisms; they are not evidence of performance.", faq4Source: "The hypotheses to test, section 12",
      faq5Q: "Why call it “morphogenesis”?", faq5A: "Morphogenesis studies how form emerges from local interactions. The paper brings that question to the enterprise: how do its decisions produce an organization able to meet its objectives and adapt? The biological analogy helps design mechanisms without treating the enterprise as a living organism.", faq5Source: "The theory’s starting point, section 2.2",
      coverLabel: "Read Enterprise Morphogenesis in English", coverEdition: "White paper · Version 1.0 · August 2026",
      readingLabel: "Enterprise Morphogenesis, by Yannick Huchard", readingTitle: "What must architecture become to serve these decisions?",
      readingIntro: "That is the white paper’s central question. It develops the mechanisms connecting your strategy to how the enterprise actually operates, then sets out their limits and the hypotheses to test.",
      readPaper: "Start with the executive summary", downloadWord: "Download the white paper", paperLanguage: "Full text in English · Open access · CC BY 4.0 license",
      guideLabel: "Read according to your decision", guideSummary: "Connect budgets to strategy", guideExample: "Set the limits of autonomy", guideLimits: "Organize an initial scope for action",
      citeTitle: "Cite the white paper", markdown: "Markdown manuscript", copyCitation: "Copy citation", copied: "Citation copied.", copyFallback: "Select and copy the citation text above.",
      footerDescription: "Connect strategy to the decisions that shape the enterprise."
    }
  };

  // The French source remains readable when scripting is unavailable.
  const french = {};
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    french[element.dataset.i18n] = element.textContent;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    french[element.dataset.i18nAria] = element.getAttribute("aria-label");
  });
  Object.assign(french, {
    pageTitle: document.title,
    metaDescription: document.querySelector('meta[name="description"]').content,
    copied: "Citation copiée.",
    copyFallback: "Sélectionnez et copiez le texte de la citation ci-dessus."
  });
  translations.fr = french;

  const steps = {
    fr: [
      { question: "Quels résultats exigez-vous ? Quels risques refusez-vous ?", title: "Rendez les limites vérifiables.", description: "Précisez les résultats attendus, les obligations à respecter et les décisions qui exigent un arbitrage humain. Plusieurs solutions peuvent convenir ; les limites doivent rester explicites.", example: "Le groupe peut adapter ses offres à chaque pays. Il exige une identité client commune et un responsable identifié pour chaque décision réglementée.", source: "Les limites acceptables, section 5.3" },
      { question: "Vos équipes ont-elles les moyens de suivre vos priorités ?", title: "Financez ce que votre stratégie exige.", description: "Affectez les budgets, les compétences et les services partagés nécessaires. Reliez les produits, les équipes, les systèmes et leurs dépendances pour rendre les conséquences d’un choix visibles.", example: "Avant d’ouvrir un pays, financez le service d’identité commun, nommez son responsable et préparez les équipes qui vont l’utiliser.", source: "Les dépendances et les moyens, sections 5.4 à 5.7" },
      { question: "Quelles décisions pouvez-vous laisser prendre sans validation centrale ?", title: "Accordez une autonomie proportionnée au risque.", description: "Autorisez les équipes et les agents à agir dans des limites explicites. Conservez une validation humaine pour les choix irréversibles ou sensibles. Prévoyez comment suspendre les autorisations.", example: "Un agent traite un sinistre dans les limites autorisées. Si le montant, le risque ou la règle applicable change, il passe la main à un expert habilité.", source: "Les conditions de l’autonomie, section 8.4" },
      { question: "Quels signaux vous feront changer de décision ?", title: "Comparez les effets aux résultats attendus.", description: "Suivez les coûts, les délais, les risques et les exceptions. Identifiez qui doit intervenir lorsqu’un seuil est franchi. Révisez les règles ou les moyens si le résultat s’éloigne de l’objectif.", example: "Si les erreurs augmentent ou si les experts sont surchargés, réduisez l’autonomie concernée et corrigez les conditions de traitement avant d’étendre l’automatisation.", source: "Corriger les écarts, section 5.10" }
    ],
    en: [
      { question: "Which results do you require? Which risks will you refuse?", title: "Make the boundaries testable.", description: "Specify the intended outcomes, the obligations to respect and the decisions requiring human judgment. Several solutions may work; the boundaries need to remain explicit.", example: "The group can tailor its offers to each country. It requires shared customer identity and a named owner for every regulated decision.", source: "Acceptable boundaries, section 5.3" },
      { question: "Do your teams have the resources to follow your priorities?", title: "Fund what your strategy requires.", description: "Allocate the budgets, skills and shared services needed. Connect products, teams, systems and their dependencies to make the consequences of a choice visible.", example: "Before entering a country, fund shared identity, name its owner and prepare the teams that will use it.", source: "Dependencies and resources, sections 5.4 to 5.7" },
      { question: "Which decisions can you delegate without central approval?", title: "Grant autonomy in proportion to risk.", description: "Authorize teams and agents to act within explicit boundaries. Retain human approval for irreversible or sensitive choices. Specify how to suspend permissions.", example: "An agent handles a claim within its authorized limits. If the amount, risk or applicable rule changes, it hands the case to an authorized expert.", source: "The conditions for autonomy, section 8.4" },
      { question: "Which signals will make you change your decision?", title: "Compare actual effects with intended outcomes.", description: "Track cost, time, risk and exceptions. Identify who must act when a threshold is crossed. Revise rules or resources if results drift from the objective.", example: "If errors rise or experts become overloaded, reduce the relevant autonomy and correct the processing conditions before expanding automation.", source: "Correcting deviations, section 5.10" }
    ]
  };
  const stepAnchors = ["53-the-target-is-an-attractor-not-a-point", "54-the-enterprise-graph-is-the-substrate-capabilities-are-projections", "84-architectural-autonomy-must-be-earned", "510-homeostasis-maintains-fitness-after-transformation"];

  const scenarios = {
    fr: {
      regulation: { trigger: "La règle change : l’IA doit désormais passer la main à un expert. Quels dossiers faut-il bloquer ?", identify: "Reliez la nouvelle obligation aux produits, aux modèles et aux décisions concernés. Identifiez le responsable de chaque traitement.", adapt: "Suspendez les autorisations concernées, ajoutez la validation requise et prévoyez les experts nécessaires pour traiter les dossiers.", check: "Vérifiez que les dossiers passent effectivement par le bon responsable. Suivez aussi les exceptions et les délais créés par ce contrôle.", outcome: "Le test de réussite : l’obligation change effectivement les décisions prises." },
      growth: { trigger: "Vous ouvrez un nouveau pays. Faut-il financer un système de plus ?", identify: "Identifiez les services déjà disponibles dans le groupe et les différences réellement nécessaires : obligations locales, langue et produits.", adapt: "Réutilisez les services communs. Financez et isolez les adaptations locales avec des responsables et des moyens identifiés.", check: "Vérifiez le coût total, le délai d’ouverture et les nouvelles dépendances. Suivez les exceptions qui risquent de devenir permanentes.", outcome: "Le test de réussite : le nouveau marché réutilise le socle commun et ses différences sont justifiées." },
      incident: { trigger: "Vous automatisez davantage. Pourquoi les experts ont-ils de plus en plus de dossiers à reprendre ?", identify: "Reliez les erreurs et les délais aux modèles, aux données et aux équipes concernés. Identifiez où la charge de travail a augmenté.", adapt: "Réduisez l’autonomie concernée, corrigez les causes et redonnez aux experts la capacité de traiter les exceptions.", check: "Mesurez ensemble le temps de traitement, les erreurs et la charge des équipes. Vérifiez où les coûts et les risques ont été déplacés.", outcome: "Le test de réussite : un gain d’automatisation améliore aussi le résultat de bout en bout." }
    },
    en: {
      regulation: { trigger: "The rule changes: AI must now hand the decision to an expert. Which cases need to stop?", identify: "Connect the new obligation to affected products, models and decisions. Identify the owner of each process.", adapt: "Suspend the relevant permissions, add the required approval and plan enough expert capacity to handle the cases.", check: "Verify that cases actually reach the authorized owner. Track the exceptions and delays created by the control.", outcome: "The success test: the obligation actually changes the decisions being made." },
      growth: { trigger: "You are entering a new country. Do you need to fund another system?", identify: "Identify services already available across the group and the differences genuinely needed: local obligations, language and products.", adapt: "Reuse shared services. Fund and isolate local adaptations with named owners and allocated resources.", check: "Check total cost, launch time and new dependencies. Track exceptions at risk of becoming permanent.", outcome: "The success test: the new market reuses the shared foundation and its differences are justified." },
      incident: { trigger: "You are automating more. Why do your experts have more cases to rework?", identify: "Connect errors and delays to the relevant models, data and teams. Find where the workload increased.", adapt: "Reduce the affected autonomy, correct the causes and restore expert capacity to handle exceptions.", check: "Measure processing time, errors and team workload together. Check where cost and risk have moved.", outcome: "The success test: an automation gain also improves the end-to-end outcome." }
    }
  };

  let language = "fr";
  let activeStep = 0;
  let activeScenario = "regulation";
  const stepButtons = [...document.querySelectorAll("[data-step]")];
  const scenarioButtons = [...document.querySelectorAll("[data-scenario]")];
  const sourceLink = document.getElementById("step-source");
  const copyStatus = document.getElementById("copy-status");

  function updateStep() {
    const selected = steps[language][activeStep];
    for (const key of ["question", "title", "description", "example"]) {
      document.getElementById(`step-${key}`).textContent = selected[key];
    }
    sourceLink.textContent = selected.source;
    sourceLink.href = `../#${stepAnchors[activeStep]}`;
    document.getElementById("step-panel").setAttribute("aria-labelledby", `step-${activeStep}`);
    stepButtons.forEach((button, index) => {
      button.setAttribute("aria-selected", String(index === activeStep));
      button.tabIndex = index === activeStep ? 0 : -1;
    });
  }

  function updateScenario() {
    const selected = scenarios[language][activeScenario];
    for (const key of ["trigger", "outcome"]) {
      document.getElementById(`scenario-${key}`).textContent = selected[key];
    }
    for (const key of ["identify", "adapt", "check"]) {
      document.getElementById(`response-${key}`).textContent = selected[key];
    }
    document.getElementById("scenario-panel").setAttribute("aria-labelledby", `scenario-${activeScenario}`);
    scenarioButtons.forEach((button) => {
      const selected = button.dataset.scenario === activeScenario;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  }

  function applyLanguage(next, updateLocation = true) {
    language = next === "en" ? "en" : "fr";
    const content = translations[language];
    document.documentElement.lang = language;
    document.title = content.pageTitle;
    document.querySelector('meta[name="description"]').content = content.metaDescription;
    document.querySelector('meta[property="og:title"]').content = content.pageTitle;
    document.querySelector('meta[property="og:description"]').content = content.metaDescription;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const text = content[element.dataset.i18n];
      if (text !== undefined) element.textContent = text;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const text = content[element.dataset.i18nAria];
      if (text !== undefined) element.setAttribute("aria-label", text);
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    copyStatus.textContent = "";
    updateStep();
    updateScenario();
    if (updateLocation) {
      const url = new URL(window.location.href);
      if (language === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      window.history.replaceState(null, "", url);
      try { window.localStorage.setItem("em-language", language); } catch { /* The page also works without storage. */ }
    }
  }

  function wireTabs(buttons, select) {
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => select(button));
      button.addEventListener("keydown", (event) => {
        let target;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") target = (index + 1) % buttons.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = (index - 1 + buttons.length) % buttons.length;
        else if (event.key === "Home") target = 0;
        else if (event.key === "End") target = buttons.length - 1;
        if (target === undefined) return;
        event.preventDefault();
        select(buttons[target]);
        buttons[target].focus();
      });
    });
  }

  wireTabs(stepButtons, (button) => { activeStep = Number(button.dataset.step); updateStep(); });
  wireTabs(scenarioButtons, (button) => { activeScenario = button.dataset.scenario; updateScenario(); });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("navigation");
  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.getElementById("copy-citation").addEventListener("click", async () => {
    const citation = document.getElementById("citation-text");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(citation.textContent);
      copyStatus.textContent = translations[language].copied;
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(citation);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = translations[language].copyFallback;
    }
  });

  const requestedLanguage = new URL(window.location.href).searchParams.get("lang");
  let preferredLanguage = "fr";
  try { preferredLanguage = window.localStorage.getItem("em-language") || "fr"; } catch { /* Use French by default. */ }
  applyLanguage(requestedLanguage || preferredLanguage, false);
})();
