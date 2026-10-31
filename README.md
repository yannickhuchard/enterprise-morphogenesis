# Enterprise Morphogenesis

White paper by **Yannick Huchard** · Version 1.0 · August 2026

**Read the paper:** [yannickhuchard.github.io/enterprise-morphogenesis](https://yannickhuchard.github.io/enterprise-morphogenesis/)

**Discover it in 3 minutes (FR / EN):** [yannickhuchard.github.io/enterprise-morphogenesis/landing/](https://yannickhuchard.github.io/enterprise-morphogenesis/landing/)

**Author:** [yannickhuchard.com](https://yannickhuchard.com)

Enterprise Architecture as the morphogenetic system of the enterprise: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.

## Abstract

Enterprise Architecture emerged to create coherence across increasingly complex organizations, information systems and technologies. Yet the object it seeks to architect has become non-stationary. This white paper argues that the resulting tension cannot be resolved by better documentation alone. It requires a clearer theory of what Enterprise Architecture is for.

The central proposition is that Enterprise Architecture is the morphogenetic system of the enterprise. Its purpose is to translate strategic intent into a target enterprise form; establish the rules, resource constraints, signals and developmental mechanisms by which that form can emerge; and keep that form viable under continuous change.

## Read

| Format | Where |
| --- | --- |
| HTML (canonical) | [GitHub Pages](https://yannickhuchard.github.io/enterprise-morphogenesis/) |
| Markdown | [`docs/index.md`](docs/index.md) |
| Word | [`Enterprise_Morphogenesis_White_Paper_Yannick_Huchard_v1_0_Publication.docx`](Enterprise_Morphogenesis_White_Paper_Yannick_Huchard_v1_0_Publication.docx) |

There is no DOI yet. Do not invent one.

## Presentations

Two PowerPoint decks (17 slides each, in English) follow the paper chapter by chapter:

| Deck | Audience | File |
| --- | --- | --- |
| Wide Adoption | Everyone in the organization | [`docs/presentations/Enterprise_Morphogenesis_Wide_Adoption_v1_0.pptx`](docs/presentations/Enterprise_Morphogenesis_Wide_Adoption_v1_0.pptx) |
| Specialists | Architects and experts | [`docs/presentations/Enterprise_Morphogenesis_Specialists_v1_0.pptx`](docs/presentations/Enterprise_Morphogenesis_Specialists_v1_0.pptx) |

On GitHub Pages they are served from `https://yannickhuchard.github.io/enterprise-morphogenesis/presentations/`.

## Cite this white paper

Huchard, Y. (2026). *Enterprise Morphogenesis: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.* (Version 1.0) [White paper]. https://yannickhuchard.github.io/enterprise-morphogenesis/

Machine-readable files: [`CITATION.cff`](CITATION.cff), [`citation.bib`](citation.bib), [`citation.ris`](citation.ris). GitHub will offer **Cite this repository** from the CFF file.

## Agent skill

[`skills/enterprise-morphogenesis/`](skills/enterprise-morphogenesis/) is an Agent Skill (agentskills.io) for Cursor, Claude Code, Codex, Gemini, OpenClaw, and others. It teaches an agent to operate as the morphogenetic system described in the paper, not to generate architecture documents.

Install it with the [skills.sh](https://skills.sh) CLI:

```bash
npx skills add yannickhuchard/enterprise-morphogenesis
```

Add `-g` to make it available in every project, or `-a <agent>` (for example `-a claude-code`) to install it for one agent. You can also copy the folder into a project's skill directory, or point the agent at `SKILL.md`.

### Make the paper actionable

The skill turns the paper into work your agent can do. It diagnoses the current control path, declares a one-page target form, installs a minimum viable loop, builds the fabric in your repository (graph, rules, sensing, provenance, Atlas, agent guardrails), teaches the teams, and steers with the six-dial gauge. Its rule: if it only produces slides or a list of principles, it has failed.

It handles urgent business questions the way a strategy firm would: diagnosis, target form (what stays shared, what stays local), rules the tools enforce, and a drift signal.

| Urgent question | Rules the skill puts in the tools | Drift signal |
| --- | --- | --- |
| **Strategy:** AI will reshape our operations. Where do we start without a three-year programme? | Every new activity reuses shared platforms first; no agent without an owner and a scope | Gap to the target form on one pilot domain |
| **Go-to-market:** how do we redesign it with AI agents without losing consistency in prices, offers and brand? | Discount above the threshold needs human approval; an agent only promises approved terms; every contact respects consent | Sales cycle, win rate, off-grid discounts |
| **Finance:** can agents run payment reconciliation and the close without us losing control? | Gap above the threshold goes to human review; no write-off without authority; every exception recorded with an expiry date | How long an unreconciled item stays open |
| **Compliance:** a new regulation lands. How long until every system and agent applies it? | High-impact AI-assisted decisions keep human oversight; explanation evidence is kept | Delay between a rule's publication and its application |
| **People:** which roles change, and how do teams work with agents? | Irreversible decisions stay human; every agent has a named owner | Newcomer orientation time, Atlas use |
| **Technology:** how do we stop agents and AI-built apps from becoming shadow IT? | Creating means registering in the graph; a ruling that recurs three times becomes a rule | Share of registered components, exceptions opened versus retired |

Or start from your *why*, then ask your agent:

| Who | Why | Ask your agent | What you get |
| --- | --- | --- | --- |
| Executive, pharma (generics) | The strategy is clear, but every country, plant and team translates it its own way. | "Our strategy: become the leading generics supplier to independent pharmacies in Southern Europe, automate pharmacovigilance to cut costs, and keep the trust of health authorities. Express it as a target form and show where our decisions drift from it." | A one-page target form separating what stays shared (quality, batch traceability, pharmacovigilance) from what varies by country, a pilot country, and rules such as "every serious safety signal goes to a human expert". |
| Executive, banking and asset management | Clients expect advice as personal as their apps, but processes belong to another era. | "Our strategy: give every client a tailor-made portfolio and advice with AI, automate suitability checks and reporting to cut costs, and keep the regulator's trust. Express it as a target form and show where our decisions drift from it." | A one-page target form, a pilot segment such as private-banking clients, and rules such as "no recommendation outside the client's suitability profile, every piece of advice recorded". |
| Executive, automotive | We sell vehicles, but clients buy availability and controlled costs. | "Our strategy: sell our electric vehicles to corporate fleets outside Europe, automate over-the-air software updates to cut costs, and run our first autonomous shuttles on our clients' logistics sites. Express it as a target form and show where our decisions drift from it." | One graph connecting vehicles, software, sensors, sites and contracts, rules such as "no update without passed safety tests", and a staged path toward autonomy, site by site. |
| Manager | Teams and agents move fast, but rules arrive by email, weeks too late. | "Set up a minimum loop on the Claims domain: one real obligation, two or three automatically checked rules, one gap indicator." | A loop running in your repository, with exceptions recorded (intent, authority, evidence, expiry). |
| Architect | Too much time in review boards, reading documents few people read. | "Act as the morphogenetic system for this change: a new AI agent that processes refunds." | The change placed in the graph, the applicable rules checked, a recorded decision, and a proposal to encode rulings that recur. |
| Employee | Unclear what can be decided locally, or whom to ask. | "Explain what my team can decide on its own, and how to challenge a rule that blocks good work." | A plain-language page from your domain's Atlas, and how to open a recorded challenge. |

The same examples, in French and English, are on the [landing page](https://yannickhuchard.github.io/enterprise-morphogenesis/landing/#skill).

## For ChatGPT, Claude, Gemini, Grok, Perplexity, and Copilot

The paper is public, crawlable, and available as clean text. After GitHub Pages is live:

| What to fetch | URL |
| --- | --- |
| Preferred full text | https://yannickhuchard.github.io/enterprise-morphogenesis/llms-full.txt |
| Markdown manuscript | https://yannickhuchard.github.io/enterprise-morphogenesis/index.md |
| LLM index (`llms.txt`) | https://yannickhuchard.github.io/enterprise-morphogenesis/llms.txt |
| HTML | https://yannickhuchard.github.io/enterprise-morphogenesis/ |
| Machine card | https://yannickhuchard.github.io/enterprise-morphogenesis/paper.json |

Paste `llms-full.txt` or `index.md` into a chat, a custom GPT, a Claude project, Gemini Gems, Grok, Perplexity, or Copilot as source material. Crawlers (including GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-SearchBot, Google-Extended, Bingbot, PerplexityBot) are allowed in `docs/robots.txt`. There is no `noai` tag.

## License

Copyright (c) 2026 Yannick Huchard. This white paper, site, presentations, and agent skill are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). See [`LICENSE`](LICENSE).

## Site

Un premier brouillon pédagogique bilingue est disponible localement dans
[`docs/discover/index.html`](docs/discover/index.html). Voir [`SITE.md`](SITE.md)
pour la configuration GitHub Pages, la prévisualisation et les vérifications.

The GitHub Pages site is generated from the publication Word file:

```bash
python scripts/convert_whitepaper.py
```

Edit `Enterprise_Morphogenesis_White_Paper_Yannick_Huchard_v1_0_Publication.docx` first, then run the converter. Pages source is branch `main`, folder `/docs`.
