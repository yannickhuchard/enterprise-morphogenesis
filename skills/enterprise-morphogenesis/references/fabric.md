# EA morphogenesis fabric

The fabric is the runnable form of the theory in a git workspace. Coding agents should leave the loop more closed than they found it.

## Directory contract

```
ea-fabric/
  graph/
    schema.md          # node and edge types; say they are an implementation choice
    slice.json         # current slice instance (or a real store behind it)
    projections.md     # how Atlas, capability, and tech views are generated
  invariants/
    README.md          # which invariants exist, owners, sunset dates
    checks/            # executable tests or policy files
  sensing/
    bindings.md        # signal -> graph position
  provenance/
    ledger.md          # or append-only store; never a spreadsheet as the system of record for long
    exception-policy.md
  atlas/
    index.md           # how a newcomer orients
  agents/
    context-package.md # what an agent must retrieve before acting
    guardrails.md      # autonomy tiers (paper 8.4)
  gauge/
    dials.md           # six dials, sources, no composite score
  README.md
```

Use the enterprise's real stores (graph DB, OPA, CI, ITSM, warehouse) when they exist. The files above are the **contract** even if they become pointers.

## Graph slice

Represent real entities first: team, product, service, contract, dataset, application, model, agent, policy, facility, machine, obligation. Put capability, domain, and target-state in as **constructs**, labeled as such.

A change request must be able to resolve: who owns this, what it depends on, which invariants apply, what an agent may do, what evidence to keep.

If nothing reads the graph on a critical path, the graph is documentation. Add a consumer in the same change (check, agent tool, or gate).

## Invariants and developmental rules

- Invariants: must-hold boundaries (identity, data authority, safety, regulatory evidence).
- Developmental rules: how a conforming service, agent, or process is generated (templates, golden paths, scaffolds).
- Both need owners and sunset or review dates (decanalization).

A reference architecture that remains a picture is a genome never transcribed.

## Agent context package

Before an agent (or a human-agent dyad) acts, load:

- Positional identity in the graph
- Applicable products, services, abilities
- Approved interfaces and data
- Policy and safety constraints
- Current target-form trajectory
- Exception procedure

Do not dump the whole repository into the prompt. Scope it.

Autonomy scales with observability, reversibility, and policy assurance, and shrinks as impact grows (Section 8.4).

## Wiring this skill into agent runtimes

The skill package is `skills/enterprise-morphogenesis/`. Install or copy it where the runtime loads Agent Skills:

| Runtime | Typical load path |
| --- | --- |
| Cursor | `.cursor/skills/enterprise-morphogenesis/` or personal `~/.cursor/skills/` |
| Claude Code | `.claude/skills/` or a plugin marketplace install |
| ChatGPT Codex | project skills directory documented by Codex, or repo `skills/` |
| Gemini / Antigravity | the environment's skill or GEMINI.md plus this folder |
| Grok / Hermes / OpenClaw | follow that agent's skill loader; keep the folder name equal to `name` |

Also point the agent at this repo's white paper. In Cursor, add a project rule only if needed: "When doing EA, architecture, or enterprise change, read skills/enterprise-morphogenesis/SKILL.md."

Do not fork the theory per runtime. Fork only adapters (CI vendor, policy engine, ticket system).

## Condensation loop

When the same class of exception or ruling appears:

1. Record it in provenance.
2. If it is legitimate and recurring, encode a rule or developmental path.
3. Set a sunset review.
4. Measure ruling-to-encoding latency (gauge dial 6).

If minting of exceptions durably exceeds retirement, you are hiding deviation as waivers (Section 7.10).
