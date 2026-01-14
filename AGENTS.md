# Agents

This file captures shared agent guidance for this repo. Keep it short and update it
whenever scope, tone, or constraints change.

## Product intent
- Fun, playful vibecoded birthday app for Dad.
- End experience should clearly wish him a happy birthday.

## Experience pillars
- Choose-your-own-adventure flow that asks questions and branches on responses.
- Lighthearted "fake broken" moments (intentional errors) that resolve quickly.
- Target runtime: 3–5 minutes.
- Current intro screen: "BirthdayBot5000" chat panel with cake-bot mascot and month/day selectors.
- Trigger detail: Jan 17 is intentionally missing to kick off the "birthday not listed" crash flow.
- Ambient audio: Web Audio soundscape with layered synths + percussion; try autoplay, but show an enable-sound prompt and keep a visible toggle.
- Birthday analysis uses a server-side `/api/analyze` route that calls OpenAI via `OPENAI_API_KEY` (never from the client).
- Analysis prompt lives in `prompts/prompts.json` for easy tuning and reuse.
- Analyze responses vary via prompt modes/formats/toggles plus a client-side `variantSeed` for per-click variety.
- Seasonal/astrology traits are hidden tone cues only; do not mention them explicitly.
- BirthdayBot speaks responses aloud with browser TTS; the cake-bot animates while speaking.

## Tone and style
- Warm, funny, and a bit glitchy.
- Short screens and punchy copy.
- If a prompt calls for it, allow mild-to-moderate profanity, but avoid slurs, hate, or threats.

## Guardrails
- Keep it family friendly and positive unless a prompt explicitly requests a harsher tone.
- Any "error" screens must be obviously safe and reversible.
- Always ask before making changes that are not explicitly mentioned.
- Do not make changes that are not specifically mentioned without asking first.
- Ask clarifying questions when a request is unclear.

## When updating
- Add new features, flow notes, and tech decisions here.
- Keep personal facts in sync with project context.
- Always read `AGENTS.md` and `projectcontext.md`, and suggest updates to them after making relevant changes.
