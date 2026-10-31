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
    this.state = { t: 0, lang, layer: 0, layerAuto: true, ex: 1, exAuto: true, exRun: 0, role: 0, deck: 0, slide: 0, deckAuto: true };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      if (!(this.props.motion ?? true)) return;
      const t = this.state.t + 1;
      const next = { t };
      if (this.state.layerAuto && t % 4 === 0) next.layer = (this.state.layer + 1) % 3;
      if (this.state.exAuto && t % 4 === 2) { next.ex = (this.state.ex + 1) % 4; next.exRun = this.state.exRun + 1; }
      if (this.state.deckAuto && t % 4 === 1) next.slide = (this.state.slide + 1) % 8;
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
      heroKicker: "White paper · Yannick Huchard · 2026",
      h1a: "When AI", h1b: "speeds everything up,", h1c: "who keeps your company", h1d: "on course?",
      heroA: "Not a frozen plan. Not an overloaded committee. This white paper proposes ", heroB: "a system that keeps the company coherent while it changes", heroC: ", and shows what everyone can do on Monday.",
      hooksLabel: "Your question", navDecks: "Presentations",
      deckLabel: "07 · Presentations", deckTitle: "Present it to your teams.", deckGroup: "Choose a presentation",
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
      heroKicker: "White paper · Yannick Huchard · 2026",
      h1a: "Quand l’IA", h1b: "accélère tout,", h1c: "qui garde votre entreprise", h1d: "sur sa trajectoire ?",
      heroA: "Pas un plan figé. Pas un comité débordé. Ce white paper propose ", heroB: "un système qui garde l’entreprise cohérente pendant qu’elle change", heroC: ", et montre ce que chacun peut faire dès lundi.",
      hooksLabel: "Votre question", navDecks: "Présentations",
      deckLabel: "07 · Présentations", deckTitle: "Présentez-le à vos équipes.", deckGroup: "Choisir une présentation",
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
