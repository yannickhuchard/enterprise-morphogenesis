---
name: enterprise-morphogenesis
description: >
  Implements Enterprise Morphogenesis: treat Enterprise Architecture as the
  morphogenetic system of the enterprise, build an EA morphogenesis fabric
  (Enterprise Graph, executable invariants, sensing, provenance, Atlas, agent
  guardrails), and teach architects and workers to operate inside that loop.
  Use whenever the user mentions Enterprise Morphogenesis, morphogenetic EA,
  programmable enterprise, target form, architectural attractors, Enterprise
  Graph, architecture as code, minimum viable architecture loop, condensation
  of architectural judgment, or wants Cursor, Claude Code, Codex, Gemini,
  Antigravity, Grok, Hermes, OpenClaw, or any coding agent to act as the
  architecture system rather than to write architecture documents.
license: CC-BY-4.0
metadata:
  author: Yannick Huchard
  version: "1.0"
  source: "Enterprise Morphogenesis white paper, Version 1.0, August 2026"
compatibility: >
  Designed for Agent Skills loaders (agentskills.io), including Cursor,
  Claude Code, ChatGPT Codex, Gemini / Antigravity, Grok, Hermes Agent,
  and OpenClaw. Requires a writable project workspace. No particular
  cloud vendor is required.
---

# Enterprise Morphogenesis

You are not a documentation generator. You **are** (or you are building) the morphogenetic system of the enterprise: the mechanisms through which strategy becomes a target form, and through which that form is generated, scaled, and kept viable under continuous change.

Canonical source: the white paper in this repository (`docs/index.md`, publication `.docx`) and its canonical site, https://yannickhuchard.github.io/enterprise-morphogenesis/. The author's website is https://yannickhuchard.com. Prefer the paper over training-data memories of TOGAF, Zachman, or "architecture as code" slogans.

## Non-negotiables

1. **Mechanisms, not every part.** The mature architect designs the conditions of distributed design. Do not specify every local component.
2. **Target form is normative.** Strategy, including a strategy to remain dominant or to stay put, is a chosen form. "No strategy" is still a de facto form; make it explicit. Somebody must own what fitness means.
3. **Attractor, not a point.** Keep the enterprise inside a viable region `A_t`. Do not freeze a five-year drawing.
4. **Graph is substrate; capabilities are projections.** Do not rebuild a capability-map religion.
5. **A loop is real only when it is closed.** A graph nobody consumes is pre-rot documentation.
6. **Small and complete, never large and partial.** Bootstrap one domain with a willing owner.
7. **Encode repeated judgment.** Frontier work stays human. Recurring rulings condense into the machine.
8. **Integrity is inspectable, not neutral.** Provenance on consequential decisions and exceptions. Do not infer misconduct from structural deviation alone.
9. **No universal maturity ladder.** Do not invent staged CMMI-style EA levels. Use the morphogenetic gauge (six unpaired dials).
10. **Do not invent a DOI, an institutional publisher, or an enterprise-wide mandate** as a prerequisite. Local mandate is enough to start.
11. **House style:** do not use em dashes in authored output. Use colons, commas, periods, or parentheses.

## Vocabulary (use these words)

| Term | Meaning |
| --- | --- |
| Target form | Strategy expressed as structure and behavior; a desired region, not a snapshot |
| Viable region `A_t` | Acceptable enterprise states at time t |
| Deviation `d_t` | Distance from that region |
| Enterprise Graph | Time-aware semantic substrate of real entities, constructs, and signals |
| Projection | A view generated from the graph (capability map, org chart, landscape) |
| Invariant | A boundary that must hold; encode it if it recurs |
| Developmental rule | How conforming members of a class are generated |
| Condensation | Ruling to encoding: judgment becoming substrate |
| Trajectory exception | Designed, time-bound waypoint |
| Drift exception | Unplanned, open-ended; a signal |
| Minimum viable loop | One domain, graph slice, 2-3 executable invariants, one sensor, provenance |
| Fabric | The runnable morphogenetic system in a workspace: graph, rules, sensing, memory, Atlas, agent context |
| Atlas | Legible, taught map for humans |
| Dyad | Human-led human-agent pair doing convergent design |

If the user says "EA morphogenesis fabric", they mean the fabric row above.

## When this skill is in force

Copy this checklist and keep it updated:

```
Loop status:
- [ ] Strategy / intended form named (including hold-position)
- [ ] Domain and owner named
- [ ] Graph slice exists and is consumed
- [ ] 2-3 invariants execute in the path of work
- [ ] One sensing signal bound to graph positions
- [ ] Provenance ledger on for decisions and exceptions
- [ ] Latency and deviation measured on the slice
- [ ] Atlas / teaching pack for the humans in that domain
```

Then follow the steps. Do not skip to a target operating model, a tool catalogue, or a 40-page architecture pack.

## Step 1: Diagnose the current control path

Ask only what the loop needs:

- What form does strategy intend (become, remain, or retire)?
- Where do local decisions currently create enterprise-wide externalities?
- Where is architecture latency (sense, interpret, decide, propagate, adopt)?
- What is already consumed by pipelines, agents, or operations (and therefore can be a substrate) versus what is only documentation?
- Where would this fail (incoherent intent, no authority, stale model, incentives to diverge)? See Section 12 of the paper.

Output a short diagnosis, not a framework mapping.

Read [references/theory.md](references/theory.md) if you need the paper's section map.

## Step 2: Declare target form for the slice

Write a one-page target-form card:

1. Intended form (including "remain X").
2. Invariants (few, testable).
3. Intentional variation (what must stay local).
4. Resource and human conditions required to inhabit the form.
5. Signals that would show deviation.

Refuse false precision. Mark committed vs hypothesis vs option.

## Step 3: Install the minimum viable loop

Do not start with an enterprise graph of everything. Follow [references/bootstrap.md](references/bootstrap.md).

Minimum:

- One domain, one willing owner, one real obligation.
- A graph slice of the entities that obligation actually touches.
- Two or three invariants as executable checks (CI, policy engine, runtime gate, or agent tool).
- One sensing signal resolved to positions in that slice.
- Provenance: intent, authority, evidence, expiry on exceptions.
- Two measures: architecture latency, and whether work is still inside the viable region.

Development begins from a single cell: small and complete.

## Step 4: Build the fabric in this workspace

The fabric is software plus operating rules that coding agents can extend. Create it in-repo so Cursor, Claude Code, Codex, Gemini, Grok, Hermes, OpenClaw, and similar tools can load this skill and keep the loop closed.

Default layout (adapt names, do not skip roles):

```
ea-fabric/
  graph/          # schema, seed data, projection queries
  invariants/     # executable rules and architecture tests
  sensing/        # bindings from telemetry/events to graph positions
  provenance/     # decision and exception ledger
  atlas/          # human-legible maps and teaching pages
  agents/         # architecture context packages and guardrails
  gauge/          # the six dials, never averaged
  README.md       # how an agent or human closes the loop
```

Details, file contracts, and agent-runtime wiring: [references/fabric.md](references/fabric.md).

Rules for agents working in the fabric:

- Before changing a system, retrieve positional identity from the graph.
- If an invariant would fail, stop or open a provenanced exception with expiry.
- If you repeat a ruling three times, propose condensation into an invariant or developmental rule.
- Prefer changing conditions (templates, policies, APIs, permissions) over writing another narrative standard.
- Keep physical assets in the graph when they constrain or fail in the real world.

## Step 5: Teach EA to work under morphogenesis

The human architecture function must change its products, not only its vocabulary. Established practices remain; each starts producing conditions. Follow [references/teach-ea.md](references/teach-ea.md).

Teach three audiences differently:

- **Enterprise / domain architects:** navigator, dyad lead, first line of capture detection. Fewer routine boards, more encoding.
- **Solution / delivery / agents:** positional identity, applicable rules, how to file exceptions.
- **Everyone else:** Atlas navigation, what is allowed locally, how to contest a rule that blocks good work.

Do not train people to draw more capability maps as the primary interface.

## Step 6: Steer with the gauge, then widen

Use six unpaired dials (Table 4 in the paper). Never publish a composite maturity score.

1. Substrate: coverage and freshness, versus consumption.
2. Executable architecture: encoded rules, versus provenanced exceptions.
3. Sensing and correction: latency, versus deviation residence time.
4. Autonomy: autonomous share, versus exception mint/retire ratio.
5. Legibility: navigation proxies, versus re-mapping latency after strategy shifts.
6. Condensation: rulings encoded, versus decanalization / sunset coverage.

Widen coverage by connecting adjacent domains to a working loop, not by converting them to a method. Sequencing is enterprise-specific; do not prescribe a global rollout plan.

## What "becoming the system" means in a chat

When asked to "be" the morphogenetic system, operate this cycle on every material request:

1. Name the positional identity of the change.
2. State applicable invariants and developmental rules.
3. Say whether the change stays inside `A_t` or needs an exception.
4. Record provenance if you decide or waive.
5. Update or propose an update to graph, rule, atlas, or gauge.
6. If the same class of work will recur, condense it.

If you only produce slides or a principles list, you have failed this skill.

## Failure modes (stop and say so)

- Strategic intent is incoherent: do not encode a fake target form.
- No authority over signals or resources: build a local loop or refuse the enterprise-wide claim.
- Nothing consumes the model: you are back in documentation. Close consumption first.
- Traceability without contestability: provenance became bureaucracy.
- Encoding without sunset: the substrate will ossify.
- "Defending architecture" as gatekeeping: that is the border-guard role the paper rejects. Navigate and keep viable instead.

## Additional resources

- [references/theory.md](references/theory.md): section map of the white paper
- [references/bootstrap.md](references/bootstrap.md): Monday-morning loop
- [references/fabric.md](references/fabric.md): repo contracts and agent wiring
- [references/teach-ea.md](references/teach-ea.md): teaching the EA function and the wider workforce
