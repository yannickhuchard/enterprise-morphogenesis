/* Runtime for docs/landing: renders the design template without dependencies.
   Generated into docs/assets/js/landing.js by scripts/build_landing.py. */
(function () {
  'use strict';

  var pending = false;
  var handlers = [];

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; render(); });
  }

  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(patch) {
      var next = typeof patch === 'function' ? patch(this.state) : patch;
      this.state = Object.assign({}, this.state, next);
      schedule();
    }
    forceUpdate() { schedule(); }
  }

  class Component extends DCLogic {
  constructor(props) {
    super(props);
    let lang = props.startLang === "en" ? "en" : "fr";
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      const saved = window.localStorage.getItem("em-lang");
      if (q === "en" || q === "fr") lang = q; else if (saved === "en" || saved === "fr") lang = saved;
    } catch (e) {}
    this.state = { t: 0, lang, layer: 0, layerAuto: true, ex: 1, exAuto: true, exRun: 0, role: 0, deck: 0, slide: 0, deckAuto: true, uc: 0, sector: 0, ucRun: 0, copied: false, q: 0, qAuto: true, qRun: 0 };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      if (!(this.props.motion ?? true)) return;
      const t = this.state.t + 1;
      const next = { t };
      if (this.state.layerAuto && t % 4 === 0) next.layer = (this.state.layer + 1) % 3;
      if (this.state.exAuto && t % 4 === 2) { next.ex = (this.state.ex + 1) % 4; next.exRun = this.state.exRun + 1; }
      if (this.state.deckAuto && t % 4 === 1) next.slide = (this.state.slide + 1) % 8;
      if (this.state.qAuto && t % 8 === 0) { next.q = (this.state.q + 1) % 6; next.qRun = this.state.qRun + 1; }
      this.setState(next);
    }, 1000);
  }
  componentWillUnmount() { clearInterval(this.timer); }
  setLang(lang) {
    try { window.localStorage.setItem("em-lang", lang); } catch (e) {}
    this.setState({ lang });
  }

  renderVals() {
    const s = this.state;
    const motion = this.props.motion ?? true;
    const en = s.lang === "en";
    const T = en ? {
      navLabel: "Sections", navProblem: "The problem", navIdea: "The idea", navAgents: "AI agents", navYou: "For you", navRead: "Read the white paper",
      heroKicker: "White paper · Version 1.0 · Published 31 August 2026 · Yannick Huchard",
      h1a: "When AI", h1b: "speeds everything up,", h1c: "who keeps your company", h1d: "on course?",
      heroA: "Not a frozen plan. Not an overloaded committee. This white paper proposes ", heroB: "a system that keeps the company coherent while it changes", heroC: ", and shows what everyone can do on Monday.",
      hooksLabel: "Your question", navDecks: "Presentations",
      deckLabel: "08 · Presentations", navSkill: "The skill",
      skLabel: "07 · Take action", skTitle: "Turn the white paper into action, with your AI agent.",
      skLead: "The Enterprise Morphogenesis skill installs in one line in Claude Code, Cursor, Codex, Gemini and other agents. It teaches them to act as the system that keeps the company coherent: diagnose, set the target form, run a first loop. Not to write one more document.",
      skTermTitle: "Terminal", skTermHint: "# then ask your agent: “Act as the morphogenetic system of our company.”",
      skSource: "See the skill on GitHub", skOptA: "Add ", skOptB: " to install it in all your projects, or ", skOptC: " to target one agent.",
      skStepsLabel: "The skill’s method",
      qLabel: "The questions that matter", qGroup: "Choose a question",
      qTitle: "Six urgent questions. The skill handles them like a strategy firm: diagnosis, target form, rules, measurement.",
      qWhyNow: "Why now:", qDiag: "Diagnosis", qForm: "Target form", qCommon: "Shared", qLocal: "Local",
      qRules: "Rules in the tools", qSignal: "Drift signal", qDeliv: "Deliverable", qAsk: "Ask your agent",
      skRefuse: "Its golden rule: if it only produces slides or a list of principles, it has failed.",
      skUseLabel: "Examples", skUseTitle: "Start from your why. The agent does the rest.",
      sectorLabel: "Industry", sectorGroup: "Choose an industry",
      ucWhy: "Why", ucNeed: "Your need", ucAsk: "You ask", ucDoes: "The skill", ucGet: "You get",
      copy: "Copy the command", copied: "Copied!", deckTitle: "Present it to your teams.", deckGroup: "Choose a presentation",
      deckLead: "Two ready-to-use decks, built from the white paper. One to open the conversation with everyone, one to go deep with architects and experts.",
      deckDownload: "Download this deck", deckPrev: "Previous slide", deckNext: "Next slide",
      ctaStart: "Understand it in 3 minutes", byline: "Enterprise Morphogenesis · Version 1.0",
      probLabel: "01 · The problem", probTitle: "The plan is outdated before it’s finished.",
      probLead: "We draw the target company, approve it, then reality moves. Teams improvise outside the frame.",
      floorAria: "A dashed plan stays fixed while black blocks appear outside it: reality outgrows the plan.",
      tagPlan: "The approved plan", tagReal: "What actually happens",
      ideaLabel: "02 · The idea", ideaTitle: "Three layers working together.",
      ideaLead: "As in living things: no cell checks a blueprint, yet the body takes shape and repairs itself.",
      stackAria: "Three layers stacked in 3D that pull apart: a direction, a shared map, rules built into the tools.",
      loopLabel: "03 · The motion", loopTitle: "A plan describes. A loop corrects.",
      loopA: "The company no longer aims at an exact point, but at ", loopB: "a zone where everything works", loopC: ". As long as you stay inside, teams are free. If you drift out, the loop sees it and corrects.",
      zoneCore: "the zone", zoneSub: "where everything works",
      ringAria: "On a tilted 3D disc, the company’s systems grow and exchange flows; one system drifts out of the zone, then each one gradually settles into the dotted target form.",
      agLabel: "04 · AI agents", agTitle: "What can you hand over to an AI agent?",
      agLead: "It depends less on the agent than on the action. Pick an example.", exGroup: "Example actions",
      gaugeQ: "Who decides?", zone0: "You decide", zone1: "The agent proposes, you approve", zone2: "The agent acts alone",
      youLabel: "05 · For you", youTitle: "What changes for me?", rolesGroup: "Choose your role",
      changeLabel: "What changes", stepLabel: "Your first step", startBtn: "Where to start",
      stLabel: "06 · Getting started", stTitle: "Start small. But complete.",
      stLead: "No big programme. One loop that really runs, on one scope. Other teams will join it.",
      closing: "A loop that runs beats a big unfinished plan.",
      endLabel: "The idea in one sentence", quoteA: "We no longer draw every part of the company.", quoteB: "We design the mechanisms that let it design itself.",
      lkSum: "The 5-minute summary", lkDoc: "Download (Word)",
      foot: "© 2026 Yannick Huchard · Enterprise Morphogenesis v1.0 · CC BY 4.0"
    } : {
      navLabel: "Sections", navProblem: "Le problème", navIdea: "L’idée", navAgents: "Les agents IA", navYou: "Pour vous", navRead: "Lire le white paper",
      heroKicker: "White paper · Version 1.0 · publié le 31 août 2026 · Yannick Huchard",
      h1a: "Quand l’IA", h1b: "accélère tout,", h1c: "qui garde votre entreprise", h1d: "sur sa trajectoire ?",
      heroA: "Pas un plan figé. Pas un comité débordé. Ce white paper propose ", heroB: "un système qui garde l’entreprise cohérente pendant qu’elle change", heroC: ", et montre ce que chacun peut faire dès lundi.",
      hooksLabel: "Votre question", navDecks: "Présentations",
      deckLabel: "08 · Présentations", navSkill: "Le skill",
      skLabel: "07 · Passer à l’action", skTitle: "Passez du white paper à l’action, avec votre agent IA.",
      skLead: "Le skill Enterprise Morphogenesis s’installe en une ligne dans Claude Code, Cursor, Codex, Gemini et d’autres agents. Il leur apprend à agir comme le système qui garde l’entreprise cohérente : diagnostiquer, poser la forme cible, faire tourner une première boucle. Pas à écrire un document de plus.",
      skTermTitle: "Terminal", skTermHint: "# puis demandez à votre agent : « Agis comme le système morphogénétique de notre entreprise. »",
      skSource: "Voir le skill sur GitHub", skOptA: "Ajoutez ", skOptB: " pour l’installer dans tous vos projets, ou ", skOptC: " pour un agent précis.",
      skStepsLabel: "La méthode du skill",
      qLabel: "Les questions qui comptent", qGroup: "Choisir une question",
      qTitle: "Six questions urgentes. Le skill les traite comme un cabinet de stratégie : diagnostic, forme cible, règles, mesure.",
      qWhyNow: "Pourquoi maintenant :", qDiag: "Diagnostic", qForm: "Forme cible", qCommon: "Commun", qLocal: "Local",
      qRules: "Règles dans les outils", qSignal: "Signal d’écart", qDeliv: "Livrable", qAsk: "À demander à votre agent",
      skRefuse: "Sa règle d’or : s’il ne produit que des slides ou une liste de principes, il a échoué.",
      skUseLabel: "Exemples d’usage", skUseTitle: "Partez de votre « pourquoi ». L’agent fait le reste.",
      sectorLabel: "Secteur", sectorGroup: "Choisir un secteur",
      ucWhy: "Pourquoi", ucNeed: "Votre besoin", ucAsk: "Vous demandez", ucDoes: "Le skill", ucGet: "Vous obtenez",
      copy: "Copier la commande", copied: "Copié !", deckTitle: "Présentez-le à vos équipes.", deckGroup: "Choisir une présentation",
      deckLead: "Deux présentations prêtes à l’emploi, tirées du white paper. L’une pour ouvrir la conversation avec tout le monde, l’autre pour approfondir avec les architectes et les experts.",
      deckDownload: "Télécharger cette présentation", deckPrev: "Diapositive précédente", deckNext: "Diapositive suivante",
      ctaStart: "Comprendre en 3 minutes", byline: "Enterprise Morphogenesis · Version 1.0",
      probLabel: "01 · Le problème", probTitle: "Le plan est dépassé avant d’être terminé.",
      probLead: "On dessine l’entreprise cible, on la valide, puis la réalité bouge. Les équipes improvisent hors du cadre.",
      floorAria: "Un plan en pointillés reste fixe pendant que des blocs noirs apparaissent en dehors de lui : la réalité déborde le plan.",
      tagPlan: "Le plan validé", tagReal: "Ce qui se passe vraiment",
      ideaLabel: "02 · L’idée", ideaTitle: "Trois couches qui travaillent ensemble.",
      ideaLead: "Comme dans le vivant : aucune cellule ne consulte un plan, et pourtant le corps prend forme et se répare.",
      stackAria: "Trois couches empilées en 3D qui se séparent : une direction, une carte commune, des règles intégrées aux outils.",
      loopLabel: "03 · Le mouvement", loopTitle: "Un plan décrit. Une boucle corrige.",
      loopA: "L’entreprise ne vise plus un point précis, mais ", loopB: "une zone où tout fonctionne", loopC: ". Tant qu’on reste dedans, les équipes sont libres. Si on en sort, la boucle le voit et corrige.",
      zoneCore: "la zone", zoneSub: "où tout fonctionne",
      ringAria: "Sur un disque incliné en 3D, les systèmes de l’entreprise grandissent et échangent des flux ; l’un sort de la zone, puis chacun rejoint progressivement la forme cible en pointillés.",
      agLabel: "04 · Les agents IA", agTitle: "Que peut-on confier à un agent IA ?",
      agLead: "Ça dépend moins de l’agent que de l’action. Choisissez un exemple.", exGroup: "Exemples d’actions",
      gaugeQ: "Qui décide ?", zone0: "Vous décidez", zone1: "L’agent propose, vous validez", zone2: "L’agent agit seul",
      youLabel: "05 · Pour vous", youTitle: "Qu’est-ce que ça change pour moi ?", rolesGroup: "Choisir votre rôle",
      changeLabel: "Ce qui change", stepLabel: "Votre premier pas", startBtn: "Par où commencer",
      stLabel: "06 · Commencer", stTitle: "Commencez petit. Mais complet.",
      stLead: "Pas de grand programme. Une seule boucle qui tourne vraiment, sur un seul périmètre. Les autres équipes la rejoindront.",
      closing: "Une boucle qui tourne vaut mieux qu’un grand plan inachevé.",
      endLabel: "L’idée en une phrase", quoteA: "On ne dessine plus chaque partie de l’entreprise.", quoteB: "On conçoit les mécanismes qui lui permettent de se concevoir elle-même.",
      lkSum: "La synthèse en 5 minutes", lkDoc: "Télécharger (Word)",
      foot: "© 2026 Yannick Huchard · Enterprise Morphogenesis v1.0 · CC BY 4.0"
    };

    // Hero sphere: 0 scattered · 1 unbalanced · 2 domains take shape · 3 domains fit together · 4 block
    const c = s.t % 20;
    const phase = !motion ? 4 : c < 2 ? 0 : c < 6 ? 1 : c < 10 ? 2 : c < 14 ? 3 : 4;
    const N = 96, R = 190, golden = Math.PI * (3 - Math.sqrt(5));
    const h = (n) => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
    const unit = [], reg = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i;
      const p = [Math.cos(th) * r, y, Math.sin(th) * r];
      unit.push(p);
      const ax = [0, 1, 2].reduce((m, k) => (Math.abs(p[k]) > Math.abs(p[m]) ? k : m), 0);
      reg.push(ax * 2 + (p[ax] < 0 ? 1 : 0));
    }
    const BU = [0.55, -0.45, 0.7];
    const axisOf = (r) => { const v = [0, 0, 0]; v[Math.floor(r / 2)] = r % 2 ? -1 : 1; return v; };
    const posAt = (i, ph) => {
      const p = unit[i];
      if (ph === 0) return [(h(i + 1) - 0.5) * 3.2 * R, (h(i + 7) - 0.5) * 2.6 * R, (h(i + 13) - 0.5) * 3.2 * R];
      if (ph === 1) {
        const bulge = Math.max(0, p[0] * BU[0] + p[1] * BU[1] + p[2] * BU[2]);
        const f = 1 + 0.6 * bulge * bulge - 0.2 + (h(i + 21) - 0.5) * 0.45;
        return [p[0] * R * f, p[1] * R * f * 0.75, p[2] * R * f];
      }
      if (ph === 2) {
        const a = axisOf(reg[i]);
        return [0, 1, 2].map((k) => p[k] * R * 0.78 + a[k] * R * 0.42);
      }
      return [p[0] * R, p[1] * R, p[2] * R];
    };
    const PD = unit.map((_, i) => posAt(i, phase));
    const PE = phase === 0 ? unit.map((_, i) => posAt(i, 1)) : PD;
    const dots = PD.map((q, i) => ({
      cls: "dot r" + reg[i] + (phase === 0 ? " sc" : ""),
      style: "transform:translate3d(" + q[0].toFixed(1) + "px," + q[1].toFixed(1) + "px," + q[2].toFixed(1) + "px);transition-delay:" + ((i % 24) * 18) + "ms"
    }));
    const seen = {}, edges = [], wires = [];
    const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
    for (let i = 0; i < N; i++) {
      // wires inside a domain: the three nearest neighbours of the same colour
      const same = [], other = [];
      for (let j = 0; j < N; j++) if (j !== i) (reg[j] === reg[i] ? same : other).push([d2(unit[i], unit[j]), j]);
      same.sort((x, y) => x[0] - y[0]);
      other.sort((x, y) => x[0] - y[0]);
      for (let n = 0; n < 3 && n < same.length; n++) wires.push([i, same[n][1]]);
      // joints between domains: only along their shared border
      if (other.length && other[0][0] < 0.16) wires.push([i, other[0][1]]);
    }
    for (const pr of wires) {
      const i = pr[0], j = pr[1], key = i < j ? i + "-" + j : j + "-" + i;
      {
        if (seen[key]) continue;
        seen[key] = 1;
        const A = PE[i], Bq = PE[j], ua = unit[i], ub = unit[j];
        const dx = Bq[0] - A[0], dy = Bq[1] - A[1], dz = Bq[2] - A[2];
        const L = Math.max(0.1, Math.hypot(dx, dy, dz));
        const th0 = Math.atan2(-(ub[2] - ua[2]), ub[0] - ua[0]) * 180 / Math.PI;
        let th = Math.atan2(-dz, dx) * 180 / Math.PI;
        while (th - th0 > 180) th -= 360;
        while (th - th0 < -180) th += 360;
        const ph = Math.asin(Math.max(-1, Math.min(1, dy / L))) * 180 / Math.PI;
        const same = reg[i] === reg[j];
        const tense = phase === 1 && L > R * 0.4;
        const hidden = phase === 0 || (!same && phase < 3);
        const base = "width:" + L.toFixed(1) + "px;transform:translate3d(" + A[0].toFixed(1) + "px," + A[1].toFixed(1) + "px," + A[2].toFixed(1) + "px) rotateY(" + th.toFixed(1) + "deg) rotateZ(" + ph.toFixed(1) + "deg)";
        edges.push({
          cls: "edge" + (same ? " r" + reg[i] : " x") + (hidden ? " off" : "") + (tense ? " tense" : ""),
          style: base, style2: base + " rotateX(90deg)"
        });
      }
    }
    const captions = en ? [
      "Teams, tools, decisions… scattered.",
      "A shape appears, but unbalanced: some areas overflow, links are strained.",
      "Each domain takes shape: its parts link up.",
      "Domains fit together: joints between them hold the whole.",
      "One coherent whole, solid as a block."
    ] : [
      "Des équipes, des outils, des décisions… dispersés.",
      "Une forme apparaît, mais déséquilibrée : des zones débordent, les liens se tendent.",
      "Chaque domaine prend forme : ses éléments se relient entre eux.",
      "Les domaines s’emboîtent : leurs jointures tiennent l’ensemble.",
      "Un tout cohérent, solide comme un bloc."
    ];
    const phaseBars = [0, 1, 2, 3, 4].map((i) => ({ cls: i === phase ? "on" : "" }));

    // Problem facts
    const FA = en ? [
      ["Everything moves faster than plans", ": markets, laws, technologies, organisations."],
      ["AI speeds things up even more", ": an idea can become a tool in a few hours."],
      ["Approvals wait in line.", " So people wait… or work around them."]
    ] : [
      ["Tout bouge plus vite que les plans", " : marchés, lois, technologies, organisations."],
      ["L’IA accélère encore", " : une idée peut devenir un outil en quelques heures."],
      ["Les validations font la queue.", " Alors on attend… ou on contourne."]
    ];
    const facts = FA.map((f, i) => ({ n: String(i + 1), s: f[0], r: f[1] }));

    // Layers
    const L = en ? [
      ["A direction, not a fixed point", "We define a zone where the company works well, and leave freedom inside it."],
      ["One shared map, always up to date", "People, teams, tools, data, AI agents: everything is connected in one living map."],
      ["Rules built into the tools", "Important rules are checked automatically, at the moment you act, not weeks later."]
    ] : [
      ["Une direction, pas un point fixe", "On définit une zone où l’entreprise fonctionne bien, et on laisse de la liberté à l’intérieur."],
      ["Une carte commune, toujours à jour", "Personnes, équipes, outils, données, agents IA : tout est relié dans une même carte vivante."],
      ["Des règles intégrées aux outils", "Les règles importantes sont vérifiées automatiquement, au moment où l’on agit, pas des semaines après."]
    ];
    const layers = L.map((l, i) => ({
      n: "0" + (i + 1), t: l[0], d: l[1], on: i === s.layer,
      cls: "layer" + (i === s.layer ? " on" : ""),
      pick: () => this.setState({ layer: i, layerAuto: false })
    }));
    const pl = (i, base) => "plane " + base + (s.layer === i ? " on" : "");

    // Loop (one turn = 16s): 0 target form · 1 growth · 2 out of frame · 3 adaptation
    const S = en ? [
      ["Set the target form", "Target capabilities and the TOM sketch the shape to reach, in dotted lines."],
      ["Grow and exchange", "Systems expand, agents arrive, flows circulate."],
      ["Spot the drift", "One system drifts out of the zone: indicators show it right away."],
      ["Adapt step by step", "Rules, budgets and priorities adjust: each system settles into the target form."]
    ] : [
      ["Fixer la forme cible", "Les capacités visées et le TOM dessinent la forme à atteindre, en pointillés."],
      ["Grandir et échanger", "Les systèmes se développent, les agents arrivent, les flux circulent."],
      ["Repérer la sortie de cadre", "Un système dérive hors de la zone : les indicateurs le montrent tout de suite."],
      ["S’adapter pas à pas", "Règles, budgets et priorités s’ajustent : chacun rejoint la forme cible."]
    ];
    const lp = !motion ? 3 : Math.floor((s.t % 16) / 4);
    const steps = S.map((x, i) => ({ n: "0" + (i + 1), t: x[0], d: x[1], cls: "step" + (i === lp ? " on" : "") }));
    const SYS = [
      ["cc", en ? "Customers & offers" : "Clients & offres"],
      ["co", en ? "Operations" : "Opérations"],
      ["cd", en ? "Data" : "Données"],
      ["cf", en ? "Finance" : "Finance"],
      ["cp", en ? "People & skills" : "Personnes & compétences"],
      ["ca", en ? "AI agents" : "Agents IA"]
    ];
    const TARGET = [[190, 95], [272, 142], [272, 238], [190, 285], [108, 238], [108, 142]];
    const PHASES = [
      [[150, 120], [250, 110], [300, 215], [215, 300], [92, 252], [118, 168]],
      [[165, 104], [262, 126], [294, 228], [202, 294], [98, 246], [104, 156]],
      [[165, 104], [262, 126], [352, 302], [202, 294], [98, 246], [104, 156]],
      TARGET
    ];
    const P = PHASES[lp];
    const HUB = [190, 190];
    const nodes = [{ cls: "sys cs hub", pos: "left:190px;top:190px", name: en ? "Strategy" : "Stratégie" }];
    SYS.forEach((sy, i) => {
      const out = lp === 2 && i === 2;
      const size = lp === 0 ? " small" : lp === 1 || lp === 2 ? " grow" : "";
      nodes.push({ cls: "sys " + sy[0] + size + (out ? " out" : ""), pos: "left:" + P[i][0] + "px;top:" + P[i][1] + "px", name: out ? sy[1] + (en ? " · out of frame" : " · hors cadre") : sy[1] });
    });
    [[1, 28, -22], [1, 34, 16], [5, -32, -10], [5, -22, 24], [0, -30, -14]].forEach((a) => {
      const p = P[a[0]];
      nodes.push({ cls: "sys ca sat" + (lp === 0 ? " hid" : ""), pos: "left:" + (p[0] + a[1]) + "px;top:" + (p[1] + a[2]) + "px", name: "" });
    });
    const pairs = [];
    for (let i = 0; i < 6; i++) pairs.push([-1, i]);
    for (let i = 0; i < 6; i++) pairs.push([i, (i + 1) % 6]);
    const pt = (i, set) => (i < 0 ? HUB : set[i]);
    const links = pairs.map((pr, k) => {
      const a = pt(pr[0], P), b = pt(pr[1], P);
      const ta = pt(pr[0], TARGET), tb = pt(pr[1], TARGET);
      const base = Math.atan2(tb[1] - ta[1], tb[0] - ta[0]) * 180 / Math.PI;
      let ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
      while (ang - base > 180) ang -= 360;
      while (ang - base < -180) ang += 360;
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const strain = lp === 2 && (pr[0] === 2 || pr[1] === 2);
      const src = pr[0] < 0 ? SYS[pr[1]][0] : SYS[pr[0]][0];
      return {
        cls: "lnk" + (lp === 0 ? " idle" : "") + (strain ? " strain" : ""),
        style: "left:" + a[0] + "px;top:" + a[1] + "px;width:" + len.toFixed(1) + "px;transform:rotate(" + ang.toFixed(1) + "deg)",
        pcls: "pk " + src + (k % 3 === 1 ? " rev" : ""),
        pstyle: "animation-duration:" + (1.8 + (k % 4) * 0.45).toFixed(2) + "s;animation-delay:-" + ((k * 0.37) % 2).toFixed(2) + "s"
      };
    });
    const tags = en
      ? ["Target form: target capabilities + TOM", "Growth: systems expand and exchange", "Alert: data drifts out of the frame", "Adaptation: everything settles into the target form"]
      : ["Forme cible : capacités visées + TOM", "Croissance : les systèmes grandissent et échangent", "Alerte : les données sortent du cadre", "Adaptation : tout rejoint la forme cible"];
    const legend = [{ cls: "cs", name: en ? "Strategy" : "Stratégie" }].concat(SYS.map((sy) => ({ cls: sy[0], name: sy[1] })));

    // Agents gauge
    const E = en ? [
      ["Sort incoming requests", 84, "The agent acts alone.", "Visible, reversible, low impact: a mistake is fixed in one click."],
      ["Draft a reply to a customer", 50, "The agent proposes, you approve.", "The agent is fast; you keep the tone, the judgement and the responsibility."],
      ["Approve a large refund", 18, "You decide.", "A financial commitment: the agent prepares the case, a human decides."],
      ["Change a safety rule", 7, "You decide.", "Serious consequences that are hard to undo: authority stays human."]
    ] : [
      ["Trier les demandes entrantes", 84, "L’agent agit seul.", "Visible, réversible, peu d’impact : une erreur se corrige en un clic."],
      ["Rédiger une réponse client", 50, "L’agent propose, vous validez.", "L’agent va vite ; vous gardez le ton, le jugement et la responsabilité."],
      ["Accorder un gros remboursement", 18, "Vous décidez.", "Un engagement financier : l’agent prépare le dossier, un humain tranche."],
      ["Changer une règle de sécurité", 7, "Vous décidez.", "Des conséquences graves et difficiles à annuler : l’autorité reste humaine."]
    ];
    const ex = E[s.ex];
    const examples = E.map((e, i) => ({ n: String(i + 1), t: e[0], on: i === s.ex, pick: () => this.setState({ ex: i, exAuto: false, exRun: this.state.exRun + 1 }) }));
    const zone = ex[1] < 33 ? 0 : ex[1] < 67 ? 1 : 2;
    let tickPath = "";
    for (let k = 0; k <= 36; k++) {
      const a = k * 5 * Math.PI / 180, r1 = k % 6 === 0 ? 190 : 200, r2 = 212;
      tickPath += "M" + (300 - r1 * Math.cos(a)).toFixed(1) + " " + (300 - r1 * Math.sin(a)).toFixed(1) + "L" + (300 - r2 * Math.cos(a)).toFixed(1) + " " + (300 - r2 * Math.sin(a)).toFixed(1);
    }
    const RU = en ? [
      ["Visible", "You can see what the agent did."],
      ["Reversible", "It can be undone without damage."],
      ["Within the rules", "The rules are checked by the tools."],
      ["The more serious, the more a human decides.", "Autonomy is earned, not declared."]
    ] : [
      ["Visible", "On voit ce que l’agent a fait."],
      ["Réversible", "On peut annuler sans dégâts."],
      ["Dans les règles", "Les règles sont vérifiées par les outils."],
      ["Plus c’est grave, plus l’humain décide.", "L’autonomie se gagne, elle ne se décrète pas."]
    ];
    const rules = RU.map((r) => ({ b: r[0], t: r[1] }));

    // Roles
    const RO = en ? [
      ["Executive", "You no longer approve every decision. You set the direction, the limits and the means, then you watch the gap.", "Pick a pilot team and one real rule to follow. That is your first loop."],
      ["Manager", "Your team gains freedom within a clear frame. You track gaps rather than every task, and you split work between people and agents.", "List the tasks that could go to an agent, and the ones that must stay human."],
      ["Innovator", "As long as you stay in the zone, you wait for no one’s approval. What you build is added straight to the shared map.", "Find the rule that slows you down the most and propose automating it."],
      ["Employee", "You see where your work fits. Your expertise, written down once, becomes a rule the tools apply. Decisions about values stay human.", "Note a decision you make again and again: it can become a rule, with you as its author."]
    ] : [
      ["Dirigeant·e", "Vous ne validez plus chaque décision. Vous fixez la direction, les limites et les moyens, puis vous regardez l’écart.", "Choisissez une équipe pilote et une vraie règle à respecter. C’est votre première boucle."],
      ["Manager", "Votre équipe gagne en liberté dans un cadre clair. Vous suivez les écarts plutôt que chaque tâche, et vous répartissez le travail entre personnes et agents.", "Listez les tâches qui pourraient passer à un agent, et celles qui doivent rester humaines."],
      ["Innovateur·rice", "Tant que vous restez dans la zone, vous n’attendez l’accord de personne. Ce que vous créez s’ajoute directement à la carte commune.", "Repérez la règle qui vous ralentit le plus et proposez de l’automatiser."],
      ["Collaborateur·rice", "Vous voyez où votre travail s’insère. Votre expertise, écrite une fois, devient une règle que les outils appliquent. Les décisions de valeurs restent humaines.", "Notez une décision que vous refaites souvent : elle peut devenir une règle, et vous en êtes l’auteur."]
    ];
    const role = RO[s.role];
    const roles = RO.map((r, i) => ({ t: r[0], on: i === s.role, pick: () => this.setState({ role: i }) }));

    // Start
    const LS = en ? [
      ["One team and one real rule", "A willing owner, a real obligation to meet."],
      ["A simple map", "Who does what, with which tools and which data."],
      ["Two or three automatic rules", "Checked by the tools, not in meetings."],
      ["One gap indicator", "To see when you leave the zone, and correct fast."]
    ] : [
      ["Une équipe et une vraie règle", "Un responsable volontaire, une obligation réelle à respecter."],
      ["Une carte simple", "Qui fait quoi, avec quels outils et quelles données."],
      ["Deux ou trois règles automatiques", "Vérifiées par les outils, pas par des réunions."],
      ["Un indicateur d’écart", "Pour voir quand on sort de la zone, et corriger vite."]
    ];
    const ls = LS.map((x, i) => ({ n: String(i + 1), h: x[0], p: x[1] }));

    // Hero: one question per persona
    const hooks = (en ? [
      ["Executive", "Is my strategy really reaching the front line?", "#idee"],
      ["Manager", "What can I hand over to AI agents?", "#agents"],
      ["Employee", "Where do I fit in tomorrow’s company?", "#vous"]
    ] : [
      ["Dirigeant·e", "Ma stratégie arrive-t-elle vraiment jusqu’au terrain ?", "#idee"],
      ["Manager", "Que puis-je confier aux agents IA ?", "#agents"],
      ["Collaborateur", "Quelle est ma place dans l’entreprise de demain ?", "#vous"]
    ]).map((h) => ({ who: h[0], q: h[1], href: h[2] }));

    // Skill: steps and use cases
    const SK = en ? [
      ["Diagnose", "Where do local decisions affect the whole company? Where does architecture lag behind?"],
      ["Declare the target form", "A one-page card: intended form, a few testable rules, what stays local, signs of drift."],
      ["Install a first loop", "One domain, one owner, one real obligation, two or three executable rules."],
      ["Build the fabric in the repository", "Graph, rules, sensors, decision ledger, Atlas, agent guardrails."],
      ["Teach the teams", "Architects, delivery teams and agents, and everyone else, each in their own way."],
      ["Steer with the gauge", "Six dials read separately, then widen domain by domain."]
    ] : [
      ["Diagnostiquer", "Où vos décisions locales pèsent-elles sur toute l’entreprise ? Où l’architecture prend-elle du retard ?"],
      ["Déclarer la forme cible", "Une carte d’une page : forme visée, quelques règles vérifiables, ce qui reste local, les signes d’écart."],
      ["Installer une première boucle", "Un domaine, un responsable, une vraie obligation, deux ou trois règles exécutables."],
      ["Construire la fabrique dans le dépôt", "Graphe, règles, capteurs, registre des décisions, Atlas, garde-fous des agents."],
      ["Former les équipes", "Architectes, équipes de livraison et agents, et tous les autres, chacun à sa façon."],
      ["Piloter avec la jauge", "Six cadrans lus séparément, puis élargir domaine par domaine."]
    ];
    const skSteps = SK.map((x, i) => ({ n: "0" + (i + 1), h: x[0], p: x[1] }));
    const UC = en ? [
      { t: "Executive", sectors: [
        { t: "Pharma: generics", why: "Our strategy is clear, but every country, plant and team translates it its own way.", need: "Grow fast with pharmacies, without ever weakening patient safety or compliance.",
          prompt: "“Our strategy: become the leading generics supplier to independent pharmacies in Southern Europe, automate pharmacovigilance to cut costs, and keep the trust of health authorities. Express it as a target form and show where our decisions drift from it.”",
          does: ["Separates what stays shared (quality, batch traceability, pharmacovigilance) from what varies by country (prices, reimbursement, distribution)", "Encodes the non-negotiables: every serious safety signal goes to a human expert", "Tracks a drift signal: time to process reports, stock-outs in pharmacies"],
          get: "A one-page target form, a pilot country, and the first rules ready to be checked in the tools." },
        { t: "Banking and asset management", why: "Clients expect advice as personal as their apps, but our processes belong to another era.", need: "Deliver hyper-personalisation at scale, without losing control of risk or compliance.",
          prompt: "“Our strategy: give every client a tailor-made portfolio and advice with AI, automate suitability checks and reporting to cut costs, and keep the regulator’s trust. Express it as a target form and show where our decisions drift from it.”",
          does: ["Separates what stays shared (client knowledge, risk profile, approved investment universe) from what is personalised (allocation, messages, timing)", "Encodes the non-negotiables: no recommendation outside the client’s suitability profile, every piece of advice recorded", "Tracks a drift signal: out-of-profile recommendations, reporting delays"],
          get: "A one-page target form and a pilot segment, for example private-banking clients." },
        { t: "Automotive", why: "We sell vehicles, but our clients buy availability and controlled costs.", need: "Move from the vehicle to the software service, then to autonomy, without breaking what works.",
          prompt: "“Our strategy: sell our electric vehicles to corporate fleets outside Europe, automate over-the-air software updates to cut costs, and run our first autonomous shuttles on our clients’ logistics sites. Express it as a target form and show where our decisions drift from it.”",
          does: ["Connects vehicles, software, sensors, sites and contracts in one graph", "Encodes the non-negotiables: no update without passed safety tests, autonomy expands site by site", "Tracks a drift signal: fleet availability, incidents after an update"],
          get: "A one-page target form and a staged path toward autonomy." }
      ] },
      { t: "Manager", why: "My teams and our agents move fast, but rules arrive by email, weeks too late.", need: "Clear rules applied in the tools, and the right to challenge those that block.",
        prompt: "“Set up a minimum loop on the Claims domain: one real obligation, two or three automatically checked rules, one gap indicator.”",
        does: ["Maps only what the obligation touches", "Turns 2 or 3 rules into automatic checks", "Records every exception: intent, authority, evidence, expiry date"], get: "A loop running in your repository, with its tracking checklist." },
      { t: "Architect", why: "I spend my time in review boards, reading documents few people read.", need: "Move from gatekeeper to navigator: encode what repeats, keep my judgement for what is new.",
        prompt: "“Act as the morphogenetic system for this change: a new AI agent that processes refunds.”",
        does: ["Places the change in the enterprise graph", "Checks the applicable rules: inside the zone, or a dated exception", "Proposes encoding a ruling once it comes back three times"], get: "A recorded decision and a rule ready to be automated." },
      { t: "Employee", why: "I don’t always know what I can decide on my own, or whom to ask.", need: "A readable map of my surroundings and a simple way to flag a rule that blocks.",
        prompt: "“Explain what my team can decide on its own, and how to challenge a rule that blocks good work.”",
        does: ["Reads your domain’s map (the Atlas)", "Separates what is allowed locally from what needs approval", "Explains how to open a recorded challenge"], get: "A clear page for your team, in plain language." }
    ] : [
      { t: "Dirigeant·e", sectors: [
        { t: "Pharma : génériques", why: "Notre stratégie est claire, mais chaque pays, chaque usine et chaque équipe la traduit à sa façon.", need: "Grandir vite auprès des pharmacies, sans jamais fragiliser la sécurité des patients ni la conformité.",
          prompt: "« Notre stratégie : devenir le premier fournisseur de médicaments génériques des pharmacies indépendantes en Europe du Sud, automatiser la pharmacovigilance pour baisser nos coûts, et garder la confiance des autorités de santé. Exprime-la comme une forme cible et montre où nos décisions s’en écartent. »",
          does: ["Sépare ce qui reste commun (qualité, traçabilité des lots, pharmacovigilance) de ce qui varie par pays (prix, remboursement, distribution)", "Encode les règles intouchables : tout signal grave de pharmacovigilance passe par un expert humain", "Suit un signal d’écart : délai de traitement des déclarations, ruptures en pharmacie"],
          get: "Une forme cible d’une page, un pays pilote, et les premières règles prêtes à être vérifiées dans les outils." },
        { t: "Banque et gestion d’actifs", why: "Nos clients attendent des conseils aussi personnalisés que leurs applications, mais nos processus datent d’une autre époque.", need: "Offrir l’hyper-personnalisation à grande échelle, sans perdre la maîtrise du risque ni de la conformité.",
          prompt: "« Notre stratégie : offrir à chaque client un portefeuille et des conseils sur mesure grâce à l’IA, automatiser les contrôles d’adéquation et le reporting pour baisser nos coûts, et garder la confiance du régulateur. Exprime-la comme une forme cible et montre où nos décisions s’en écartent. »",
          does: ["Sépare ce qui reste commun (connaissance client, profil de risque, univers d’investissement autorisé) de ce qui est personnalisé (allocation, messages, rythme)", "Encode les règles intouchables : aucune recommandation hors du profil d’adéquation du client, chaque conseil tracé", "Suit un signal d’écart : recommandations hors profil, retards de reporting"],
          get: "Une forme cible d’une page et un segment pilote, par exemple la clientèle patrimoniale." },
        { t: "Automobile", why: "Nous vendons des véhicules, mais nos clients achètent de la disponibilité et des coûts maîtrisés.", need: "Passer du véhicule au service logiciel, puis à l’autonomie, sans casser ce qui marche.",
          prompt: "« Notre stratégie : vendre nos véhicules électriques aux flottes d’entreprise hors d’Europe, automatiser les mises à jour logicielles à distance pour baisser nos coûts, et faire rouler nos premières navettes autonomes sur les sites logistiques de nos clients. Exprime-la comme une forme cible et montre où nos décisions s’en écartent. »",
          does: ["Relie véhicules, logiciels, capteurs, sites et contrats dans un même graphe", "Encode les règles intouchables : aucune mise à jour sans tests de sécurité validés, l’autonomie progresse site par site", "Suit un signal d’écart : disponibilité des flottes, incidents après une mise à jour"],
          get: "Une forme cible d’une page et une trajectoire par étapes vers l’autonomie." }
      ] },
      { t: "Manager", why: "Mes équipes et nos agents vont vite, mais les règles arrivent par e-mail, des semaines trop tard.", need: "Des règles claires, appliquées dans les outils, et le droit de contester celles qui bloquent.",
        prompt: "« Installe une boucle minimale sur le domaine Sinistres : une vraie obligation, deux ou trois règles vérifiées automatiquement, un indicateur d’écart. »",
        does: ["Cartographie seulement ce que l’obligation touche", "Transforme 2 ou 3 règles en contrôles automatiques", "Trace chaque exception : intention, autorité, preuve, date d’expiration"], get: "Une boucle qui tourne dans votre dépôt, avec sa checklist de suivi." },
      { t: "Architecte", why: "Je passe mon temps en comités, à relire des documents que peu de gens lisent.", need: "Passer de gardien à navigateur : encoder ce qui se répète, garder mon jugement pour le nouveau.",
        prompt: "« Agis comme le système morphogénétique pour ce changement : un nouvel agent IA qui traite les remboursements. »",
        does: ["Situe le changement dans le graphe de l’entreprise", "Vérifie les règles applicables : dans la zone, ou exception datée", "Propose d’encoder une décision dès qu’elle revient trois fois"], get: "Une décision tracée et une règle prête à être automatisée." },
      { t: "Collaborateur·rice", why: "Je ne sais pas toujours ce que j’ai le droit de décider seul, ni à qui demander.", need: "Une carte lisible de mon environnement et un moyen simple de signaler une règle qui bloque.",
        prompt: "« Explique-moi ce que mon équipe peut décider seule, et comment contester une règle qui bloque un bon travail. »",
        does: ["Lit la carte de votre domaine (l’Atlas)", "Distingue ce qui est autorisé localement de ce qui demande un accord", "Explique comment ouvrir une contestation tracée"], get: "Une page claire pour votre équipe, en langage simple." }
    ];
    // Six urgent questions, answered with the skill's method
    const GARTNER = "https://www.gartner.com/en/newsroom/press-releases/2026-04-23-gartner-survey-reveals-80-percent-of-ceos-say-artificial-intelligence-will-force-operational-capability-overhauls";
    const PAPER = "https://yannickhuchard.github.io/enterprise-morphogenesis/";
    const Q = en ? [
      { domain: "Strategy and operating model", who: "CEO, executive committee", short: "Where do we start with AI?",
        q: "AI will reshape our operations: where do we start, without launching a three-year programme?",
        why: "80% of CEOs surveyed by Gartner expect AI to bring a medium-to-high degree of change to their operational capabilities.", src: GARTNER, srcName: "Gartner, April 2026",
        diag: "Find where local decisions create costs for the whole company, and where architecture arrives too late.",
        common: ["Customer identity", "Reference data", "Risk rules"], local: ["Offers by market", "Channels", "Language"],
        rules: ["Every new activity reuses shared platforms first", "No agent without an owner and a scope"],
        signal: "Gap to the target form, measured on one pilot domain",
        deliv: "A one-page target form, and a pilot domain chosen with its owner.",
        prompt: "“Express our strategy as a target form and propose the pilot domain for our first loop.”" },
      { domain: "Go-to-market", who: "Sales, marketing", short: "Redesign go-to-market with AI agents",
        q: "How do we redesign our go-to-market with AI agents, without losing consistency in prices, offers and brand?",
        why: "Bain estimates that AI could double the time sellers spend with customers.", src: "https://www.bain.com/insights/ai-transforming-productivity-sales-remains-new-frontier/", srcName: "Bain, Technology Report 2025",
        diag: "Map who touches the customer, with which data, and where discounts and promises are decided.",
        common: ["Catalogue and price grid", "Customer identity and consent", "Contract terms"], local: ["Messages by segment", "Prospecting sequences", "Channels"],
        rules: ["Discount above the threshold: human approval", "An agent only promises approved terms", "Every contact respects consent"],
        signal: "Sales cycle, win rate, off-grid discounts",
        deliv: "A go-to-market where agents and sellers move fast, within rules the tools check.",
        prompt: "“Redesign our go-to-market with AI agents: what stays shared, what varies, and the rules no agent may cross.”" },
      { domain: "Finance", who: "CFO, finance operations", short: "Payment reconciliation and close by agents",
        q: "Can we hand payment reconciliation and the close to agents, without losing control?",
        why: "In a 2025 PYMNTS survey of 60 CFOs at large US companies, none was ready to give AI agents full access to company data.", src: "https://www.pymnts.com/report/study/ai-agents-in-the-enterprise/", srcName: "PYMNTS Intelligence, Sept. 2025",
        diag: "Follow invoices, payments and bank statements: where gaps pile up, who decides, how long it takes.",
        common: ["Chart of accounts", "Counterparty master data", "Segregation of duties"], local: ["Tax rules by country", "Banks and formats"],
        rules: ["Gap above the threshold: human review", "No write-off without authority", "Every exception recorded, with an expiry date"],
        signal: "How long an unreconciled item stays open",
        deliv: "A reconciliation loop where agents handle the routine and people handle the exceptions.",
        prompt: "“Set up a minimum loop on payment reconciliation: executable control rules, recorded exceptions, one gap indicator.”" },
      { domain: "Risk and compliance", who: "Risk, compliance, legal", short: "Apply a new regulation fast",
        q: "A new regulation lands: how long until every system and every agent applies it?",
        why: "The white paper treats architecture latency (sense, interpret, decide, propagate, adopt) as a first-class metric.", src: PAPER + "#44-architecture-latency-becomes-a-first-class-metric", srcName: "White paper, §4.4",
        diag: "Link the obligation to the products, models, agents and teams it affects.",
        common: ["Register of obligations", "Model governance"], local: ["Requirements by jurisdiction"],
        rules: ["High-impact AI-assisted decision: human oversight", "Explanation evidence kept"],
        signal: "Delay between a rule’s publication and its application",
        deliv: "A rule propagated into the tools, not one more memo to read.",
        prompt: "“This regulation changes: find everything it touches in the graph and propose the rules to encode.”" },
      { domain: "People and organisation", who: "HR, managers", short: "Roles that change with agents",
        q: "Which roles change, and how do our teams work with agents?",
        why: "Only 27% of CEOs surveyed by Gartner expect their organisation to run mainly without human intervention.", src: GARTNER, srcName: "Gartner, April 2026",
        diag: "Sort the tasks that go to agents, those that become human-agent pairs, and those that stay human.",
        common: ["Agent autonomy tiers", "Explicit human accountability"], local: ["Team organisation", "Rituals"],
        rules: ["Any irreversible decision stays human", "Every agent has a named owner"],
        signal: "Time for a newcomer to find their way, Atlas use",
        deliv: "A readable Atlas and a role plan by stage, built with HR.",
        prompt: "“For the Claims team, separate what goes to agents, what becomes a human-agent pair, and what stays human.”" },
      { domain: "Technology", who: "CIO, architecture", short: "Avoid shadow IT made of agents",
        q: "How do we stop hundreds of agents and AI-built apps from becoming a new shadow IT?",
        why: "The white paper: unregistered components piling up at machine speed recreate the stale-repository problem, only faster.", src: PAPER + "#91-architectural-condensation-how-judgment-becomes-substrate", srcName: "White paper, §9.1",
        diag: "Measure what is created outside any register, and what pipelines and agents really consume.",
        common: ["Agent identity", "Component register", "Shared guardrails"], local: ["Team tools", "Local automations"],
        rules: ["Creating means registering: no extension outside the graph", "A ruling that comes back three times becomes a rule"],
        signal: "Share of registered components, exceptions opened versus retired",
        deliv: "Extensions that are born compliant, and a review board with less routine.",
        prompt: "“Make registration mandatory for agents and extensions, with their autonomy tiers.”" }
    ] : [
      { domain: "Stratégie et modèle opérationnel", who: "Direction générale, comex", short: "Par où commencer avec l’IA ?",
        q: "L’IA va transformer nos opérations : par où commencer, sans lancer un programme de trois ans ?",
        why: "80 % des dirigeants interrogés par Gartner s’attendent à ce que l’IA change moyennement à fortement leurs capacités opérationnelles.", src: GARTNER, srcName: "Gartner, avril 2026",
        diag: "Repérer où les décisions locales créent des coûts pour toute l’entreprise, et où l’architecture arrive trop tard.",
        common: ["Identité client", "Données de référence", "Règles de risque"], local: ["Offres par marché", "Canaux", "Langue"],
        rules: ["Toute nouvelle activité réutilise d’abord les plateformes communes", "Pas d’agent sans responsable ni périmètre"],
        signal: "Écart à la forme cible, mesuré sur un domaine pilote",
        deliv: "Une forme cible d’une page et un domaine pilote choisi avec son responsable.",
        prompt: "« Exprime notre stratégie comme une forme cible et propose le domaine pilote de notre première boucle. »" },
      { domain: "Go-to-market", who: "Ventes, marketing", short: "Redessiner le go-to-market avec des agents IA",
        q: "Comment redessiner notre go-to-market avec des agents IA, sans perdre la cohérence des prix, des offres et de la marque ?",
        why: "Selon Bain, l’IA pourrait doubler le temps que les vendeurs passent avec leurs clients.", src: "https://www.bain.com/insights/ai-transforming-productivity-sales-remains-new-frontier/", srcName: "Bain, Technology Report 2025",
        diag: "Cartographier qui touche le client, avec quelles données, et où se décident remises et promesses.",
        common: ["Catalogue et grille de prix", "Identité client et consentement", "Conditions contractuelles"], local: ["Messages par segment", "Séquences de prospection", "Canaux"],
        rules: ["Remise au-delà du seuil : validation humaine", "Un agent ne promet que des conditions approuvées", "Tout contact respecte le consentement"],
        signal: "Cycle de vente, taux de gain, remises hors grille",
        deliv: "Un go-to-market où agents et vendeurs vont vite, dans des règles vérifiées par les outils.",
        prompt: "« Redessine notre go-to-market avec des agents IA : ce qui reste commun, ce qui varie, et les règles qu’aucun agent ne peut franchir. »" },
      { domain: "Finance", who: "Direction financière", short: "Réconciliation des paiements et clôture par des agents",
        q: "Peut-on confier la réconciliation des paiements et la clôture à des agents, sans perdre le contrôle ?",
        why: "Dans une enquête PYMNTS de 2025 auprès de 60 directeurs financiers de grandes entreprises américaines, aucun n’était prêt à donner aux agents IA un accès total aux données de l’entreprise.", src: "https://www.pymnts.com/report/study/ai-agents-in-the-enterprise/", srcName: "PYMNTS Intelligence, sept. 2025",
        diag: "Suivre factures, paiements et relevés bancaires : où les écarts s’accumulent, qui tranche, en combien de temps.",
        common: ["Plan de comptes", "Référentiel tiers", "Séparation des tâches"], local: ["Règles fiscales par pays", "Banques et formats"],
        rules: ["Écart au-delà du seuil : revue humaine", "Aucune passation en perte sans autorité", "Chaque exception tracée, avec date d’expiration"],
        signal: "Durée pendant laquelle un écart reste ouvert",
        deliv: "Une boucle de réconciliation où les agents traitent le courant et les humains l’exceptionnel.",
        prompt: "« Installe une boucle minimale sur la réconciliation des paiements : règles de contrôle exécutables, exceptions tracées, un indicateur d’écart. »" },
      { domain: "Risque et conformité", who: "Risques, conformité, juridique", short: "Appliquer vite une nouvelle réglementation",
        q: "Une nouvelle réglementation tombe : en combien de temps tous nos systèmes et nos agents l’appliquent-ils ?",
        why: "Le white paper fait de la latence d’architecture (détecter, interpréter, décider, propager, adopter) une mesure à part entière.", src: PAPER + "#44-architecture-latency-becomes-a-first-class-metric", srcName: "White paper, §4.4",
        diag: "Relier l’obligation aux produits, modèles, agents et équipes qu’elle touche.",
        common: ["Registre des obligations", "Gouvernance des modèles"], local: ["Exigences par juridiction"],
        rules: ["Décision assistée par IA à fort impact : supervision humaine", "Preuves d’explication conservées"],
        signal: "Délai entre la publication d’une règle et son application",
        deliv: "Une règle propagée dans les outils, pas une note de plus à lire.",
        prompt: "« Cette réglementation change : trouve tout ce qu’elle touche dans le graphe et propose les règles à encoder. »" },
      { domain: "Personnes et organisation", who: "RH, managers", short: "Les rôles qui changent avec les agents",
        q: "Quels rôles changent, et comment nos équipes travaillent-elles avec les agents ?",
        why: "Seuls 27 % des dirigeants interrogés par Gartner s’attendent à ce que leur organisation fonctionne principalement sans intervention humaine.", src: GARTNER, srcName: "Gartner, avril 2026",
        diag: "Trier les tâches qui passent aux agents, celles qui deviennent des duos humain-agent, et celles qui restent humaines.",
        common: ["Paliers d’autonomie des agents", "Responsabilités humaines explicites"], local: ["Organisation des équipes", "Rituels"],
        rules: ["Toute décision irréversible reste humaine", "Chaque agent a un responsable nommé"],
        signal: "Temps d’orientation d’un nouvel arrivant, usage de l’Atlas",
        deliv: "Un Atlas lisible et un plan des rôles par étape, construit avec les RH.",
        prompt: "« Pour l’équipe Sinistres, distingue ce qui passe aux agents, ce qui devient un duo humain-agent et ce qui reste humain. »" },
      { domain: "Technologie", who: "DSI, architecture", short: "Éviter un shadow IT fait d’agents",
        q: "Comment éviter que des centaines d’agents et d’applications créés avec l’IA deviennent un nouveau shadow IT ?",
        why: "Le white paper : des composants non enregistrés qui s’accumulent à la vitesse des machines recréent le problème des référentiels obsolètes, en plus vite.", src: PAPER + "#91-architectural-condensation-how-judgment-becomes-substrate", srcName: "White paper, §9.1",
        diag: "Mesurer ce qui est créé hors de tout registre, et ce que les pipelines et les agents consomment vraiment.",
        common: ["Identité des agents", "Registre des composants", "Garde-fous partagés"], local: ["Outils des équipes", "Automatisations locales"],
        rules: ["Créer, c’est enregistrer : pas d’extension hors du graphe", "Une décision qui revient trois fois devient une règle"],
        signal: "Part des composants enregistrés, exceptions ouvertes et retirées",
        deliv: "Des extensions qui naissent conformes, et un comité qui traite moins de routine.",
        prompt: "« Rends obligatoire l’enregistrement des agents et des extensions, avec leurs paliers d’autonomie. »" }
    ];
    const qCur = Q[s.q];
    const wrap = (xs) => xs.map((x) => ({ t: x }));
    const qc = Object.assign({}, qCur, { common: wrap(qCur.common), local: wrap(qCur.local), rules: wrap(qCur.rules) });
    const qs = Q.map((x, i) => ({
      n: "0" + (i + 1), domain: x.domain, short: x.short, on: i === s.q,
      cls: "qbtn" + (i === s.q ? " on" : "") + (s.qAuto && motion ? " auto" : ""),
      pick: () => this.setState({ q: i, qAuto: false, qRun: this.state.qRun + 1 })
    }));

    const ucRole = UC[s.uc];
    const ucCur = ucRole.sectors ? ucRole.sectors[s.sector] : ucRole;
    const uc = { why: ucCur.why, need: ucCur.need, prompt: ucCur.prompt, get: ucCur.get, does: ucCur.does.map((d) => ({ t: d })) };
    const ucTabs = UC.map((u, i) => ({ t: u.t, on: i === s.uc, pick: () => this.setState({ uc: i, ucRun: this.state.ucRun + 1 }) }));
    const sectors = (ucRole.sectors || []).map((x, i) => ({ t: x.t, on: i === s.sector, pick: () => this.setState({ sector: i, ucRun: this.state.ucRun + 1 }) }));
    const copyCmd = () => {
      const done = () => { this.setState({ copied: true }); setTimeout(() => this.setState({ copied: false }), 2200); };
      try { navigator.clipboard.writeText("npx skills add yannickhuchard/enterprise-morphogenesis").then(done, () => {}); } catch (e) {}
    };

    // Presentations
    const BASE = "../presentations/";
    const CH = ["Agenda", "Ch. 1", "Ch. 2", "Ch. 4", "Ch. 5", "Ch. 8", "Ch. 9", "Ch. 11"];
    const DECKS = [
      { name: "Wide Adoption", title: en ? "For everyone" : "Pour tous",
        sub: en ? "How we keep being the enterprise we mean to be, while work, customers and AI keep changing." : "Comment rester l’entreprise que l’on veut être, pendant que le travail, les clients et l’IA changent.",
        meta: en ? "17 slides · in English · PowerPoint" : "17 diapositives · en anglais · PowerPoint",
        file: BASE + "Enterprise_Morphogenesis_Wide_Adoption_v1_0.pptx",
        imgs: ["../assets/images/decks/wide-02.png", "../assets/images/decks/wide-03.png", "../assets/images/decks/wide-04.png", "../assets/images/decks/wide-06.png", "../assets/images/decks/wide-07.png", "../assets/images/decks/wide-10.png", "../assets/images/decks/wide-11.png", "../assets/images/decks/wide-13.png"] },
      { name: "Specialists", title: en ? "For specialists" : "Pour les spécialistes",
        sub: en ? "Enterprise Architecture as the morphogenetic system of the enterprise, chapter by chapter." : "L’architecture d’entreprise comme système morphogénétique, chapitre par chapitre.",
        meta: en ? "17 slides · in English · PowerPoint" : "17 diapositives · en anglais · PowerPoint",
        file: BASE + "Enterprise_Morphogenesis_Specialists_v1_0.pptx",
        imgs: ["../assets/images/decks/specialists-02.png", "../assets/images/decks/specialists-03.png", "../assets/images/decks/specialists-04.png", "../assets/images/decks/specialists-06.png", "../assets/images/decks/specialists-07.png", "../assets/images/decks/specialists-10.png", "../assets/images/decks/specialists-11.png", "../assets/images/decks/specialists-13.png"] }
    ];
    const deck = DECKS[s.deck];
    const other = DECKS[1 - s.deck];
    const decks = DECKS.map((d, i) => ({ name: d.name, title: d.title, sub: d.sub, meta: d.meta, on: i === s.deck, pick: () => this.setState({ deck: i, slide: 0 }) }));
    const slideAlt = (i) => (en ? "Slide “" : "Diapositive « ") + CH[i] + (en ? "” of the " : " » de la présentation ") + deck.name + (en ? " deck" : "");
    const slides = deck.imgs.map((src, i) => {
      const r = (i - s.slide + 8) % 8;
      let tf, op = 1, z = 10 - r;
      if (r === 0) tf = "translate3d(0,0,40px)";
      else if (r === 7) { tf = "translate3d(-70%,8%,120px) rotateY(-38deg)"; op = 0; z = 11; }
      else if (r <= 3) { tf = "translate3d(" + (r * 6) + "%," + (-r * 7) + "%," + (-r * 110) + "px)"; op = r === 3 ? 0.25 : 1 - r * 0.22; }
      else { tf = "translate3d(24%,-28%,-460px)"; op = 0; }
      return { src, alt: slideAlt(i), style: "transform:" + tf + ";opacity:" + op + ";z-index:" + z };
    });
    const thumbs = deck.imgs.map((src, i) => ({ src, alt: slideAlt(i), on: i === s.slide, pick: () => this.setState({ slide: i, deckAuto: false }) }));

    return {
      hooks, decks, slides, thumbs,
      skSteps, uc, ucTabs, sectors, hasSectors: sectors.length > 0, qs, qc, qPanelCls: "qpanel " + (s.qRun % 2 ? "b" : "a"), ucCls: "ucflow " + (s.ucRun % 2 ? "b" : "a"),
      copyCmd, copyLabel: s.copied ? T.copied : T.copy,
      deckFile: deck.file, deckOther: other.file,
      deckOtherLabel: (en ? "Or the " : "Ou la version ") + other.title.toLowerCase(),
      slideCounter: CH[s.slide] + " · " + (s.slide + 1) + " / 8",
      prevSlide: () => this.setState({ slide: (this.state.slide + 7) % 8, deckAuto: false }),
      nextSlide: () => this.setState({ slide: (this.state.slide + 1) % 8, deckAuto: false }),
      t: T, lang: s.lang, isFr: !en, isEn: en,
      setFr: () => this.setLang("fr"), setEn: () => this.setLang("en"),
      heroKey: "hero-" + s.lang,
      motionCls: motion ? "" : "still",
      dots, edges, phaseBars, caption: captions[phase],
      haloCls: "halo" + (phase === 0 ? " off" : ""),
      cubeCls: "cube" + (phase === 4 ? "" : " off"),
      facts, layers, plane1: pl(0, "pl1"), plane2: pl(1, "pl2"), plane3: pl(2, "pl3"),
      steps, nodes, links, legend,
      ghostCls: "gh" + (lp === 3 ? " on" : ""),
      phaseTag: tags[lp], phaseTagCls: "phasetag p" + lp,
      examples, exVerdict: ex[2], exWhy: ex[3], rules, tickPath,
      z1: "gz z1" + (zone === 0 ? " on" : " dim"), z2: "gz z2" + (zone === 1 ? " on" : " dim"), z3: "gz z3" + (zone === 2 ? " on" : " dim"),
      zl0: zone === 0 ? "on" : "", zl1: zone === 1 ? "on" : "", zl2: zone === 2 ? "on" : "",
      mk0: "gmk" + (s.ex === 0 ? " on" : ""), mk1: "gmk" + (s.ex === 1 ? " on" : ""), mk2: "gmk" + (s.ex === 2 ? " on" : ""), mk3: "gmk" + (s.ex === 3 ? " on" : ""),
      needleStyle: "transform:rotate(" + ((ex[1] - 50) * 1.8).toFixed(1) + "deg);transform-origin:300px 300px",
      tipCls: "tp " + (s.exRun % 2 ? "a" : "b"),
      roles, roleKey: "r" + s.role + s.lang, roleChange: role[1], roleStep: role[2],
      ls
    };
  }
}

  var WHOLE = /^\{\{([^}]+)\}\}$/;
  var VOID = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, source: 1, track: 1, wbr: 1 };

  function lookup(scope, path) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, scope);
  }

  function escape(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function interpolate(text, scope) {
    return text.replace(/\{\{([^}]+)\}\}/g, function (_, path) {
      var v = lookup(scope, path);
      return v == null ? '' : String(v);
    });
  }

  function renderNode(node, scope, out) {
    if (node.nodeType === 3) { out.push(escape(interpolate(node.nodeValue, scope))); return; }
    if (node.nodeType !== 1) return;
    var tag = node.localName;
    if (tag === 'sc-for') {
      var list = lookup(scope, node.getAttribute('list').match(WHOLE)[1]) || [];
      var as = node.getAttribute('as');
      list.forEach(function (item, i) {
        var inner = Object.create(scope);
        inner[as] = item;
        inner.$index = i;
        node.childNodes.forEach(function (c) { renderNode(c, inner, out); });
      });
      return;
    }
    if (tag === 'sc-if') {
      if (lookup(scope, node.getAttribute('value').match(WHOLE)[1])) node.childNodes.forEach(function (c) { renderNode(c, scope, out); });
      return;
    }
    var attrs = '';
    Array.prototype.forEach.call(node.attributes, function (at) {
      var name = at.name;
      if (name === 'key' || name.indexOf('hint-') === 0) return;
      var m = at.value.match(WHOLE);
      if (m) {
        var v = lookup(scope, m[1]);
        if (typeof v === 'function') {
          attrs += ' data-on-' + name.slice(2).toLowerCase() + '="' + handlers.length + '"';
          handlers.push(v);
          return;
        }
        if (v == null) return;
        attrs += ' ' + name + '="' + escape(v) + '"';
        return;
      }
      attrs += ' ' + name + '="' + escape(interpolate(at.value, scope)) + '"';
    });
    out.push('<' + tag + attrs + '>');
    if (VOID[tag]) return;
    node.childNodes.forEach(function (c) { renderNode(c, scope, out); });
    out.push('</' + tag + '>');
  }

  function syncAttributes(from, to) {
    Array.prototype.slice.call(from.attributes).forEach(function (a) {
      if (!to.hasAttribute(a.name)) from.removeAttribute(a.name);
    });
    Array.prototype.forEach.call(to.attributes, function (a) {
      if (from.getAttribute(a.name) !== a.value) from.setAttribute(a.name, a.value);
    });
  }

  // Keeps existing elements so CSS transitions run between states.
  function morph(from, to) {
    var next = Array.prototype.slice.call(to.childNodes);
    for (var i = 0; i < next.length; i++) {
      var n = next[i], o = from.childNodes[i];
      if (!o) { from.appendChild(n); continue; }
      if (o.nodeType !== n.nodeType || o.nodeName !== n.nodeName) { from.replaceChild(n, o); continue; }
      if (n.nodeType === 3) { if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue; continue; }
      if (n.nodeType === 1) { syncAttributes(o, n); morph(o, n); }
    }
    while (from.childNodes.length > next.length) from.removeChild(from.lastChild);
  }

  var template = document.getElementById('landing-template');
  var root = document.getElementById('landing');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var component = new Component({ motion: !reduce, startLang: 'fr' });

  function render() {
    handlers = [];
    var out = [];
    var vals = component.renderVals();
    template.content.childNodes.forEach(function (c) { renderNode(c, vals, out); });
    var box = document.createElement('div');
    box.innerHTML = out.join('');
    morph(root, box);
    if (component.state.lang) document.documentElement.lang = component.state.lang;
  }

  ['click', 'change', 'input'].forEach(function (type) {
    root.addEventListener(type, function (event) {
      var target = event.target.closest('[data-on-' + type + ']');
      if (!target || !root.contains(target)) return;
      var handler = handlers[Number(target.getAttribute('data-on-' + type))];
      if (handler) handler(event);
    });
  });

  render();
  document.documentElement.classList.add('js');
  if (component.componentDidMount) component.componentDidMount();
})();
