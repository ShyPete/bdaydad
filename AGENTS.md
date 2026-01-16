# Agents

This file captures shared agent guidance for this repo. Keep it short and update it
whenever scope, tone, or constraints change.

## Product intent
- Fun, playful vibecoded birthday app for Dad.
- End experience should clearly wish him a happy birthday.

## Experience pillars
- Choose-your-own-adventure flow that asks questions and branches on responses.
- Lighthearted "fake broken" moments (intentional errors) that resolve quickly.
- Target runtime: 3-5 minutes.
- Current intro screen: "BirthdayBot5000" chat panel with cake-bot mascot and month/day selectors.
- Trigger detail: Jan 17 is intentionally missing to kick off the "birthday not listed" crash flow.
- Crash flow: "My birthday is not listed" triggers angry bot outburst, glitch, crash overlay, terminal reboot sequence, then SAFE MODE screen.
- Ambient audio: Web Audio soundscape with layered synths + percussion; try autoplay, but show an enable-sound prompt and keep a visible toggle.
- Crash audio: glitch bursts during panic + a steady tone between panic and reboot; stop audio on reboot screen.
- Safe mode audio: darker, oldschool 8-bit loop with organ stabs, a per-beat crunchy organ line, and crunchy accents (retro castle vibe); starts when the terminal appears.
- Birthday analysis uses a server-side `/api/analyze` route that calls OpenAI via `OPENAI_API_KEY` (never from the client).
- Sound toggle stays visible in safe mode/quiz (higher z-index); intro ambient does not play in safe mode.
- Safe mode/quiz lines use TTS that begins as the text starts typing and trigger the green bot speaking animation (angry brows when appropriate).
- Safe mode/quiz waits for each spoken line to finish before printing the next (0.15s gap), and typing SFX stop when typing ends.
- Boss finale: after the pass speech, the safe-mode bot drops offscreen with a crash SFX, the mecha BirthdayBot rises in, shoots larger fast-tracking projectiles, and takes 6 clicks to defeat. Hits play SFX + "oof/ouch"; death triggers an explosion effect + flames, X eyes, and a spoken sequence (capitalized/punctuated) before the final birthday shout. Boss shakes on defeat, then slides offscreen before the final shout. Boss fight music is faster and more intense; the final shout is centered, multicolored, free-floating, and split into two lines, with a subtle translucent backing.
- Analysis prompt lives in `prompts/prompts.json` for easy tuning and reuse.
- Analyze responses vary via prompt modes/formats/toggles plus a client-side `variantSeed` for per-click variety.
- Seasonal/astrology traits are hidden tone cues only; do not mention them explicitly.
- BirthdayBot speaks responses aloud with browser TTS; the cake-bot animates while speaking and chat responses type out.
- Current status: Safe mode terminal + popup quiz flow implemented with randomized questions, scoring, pass/fail endings, polished boss finale, and credits scene.
- Shortcuts: `?safe=1` jumps to the green terminal boot screen; `?quiz=1` (or `?quiz=true`) jumps to SAFE MODE + quiz; `?quiz=pass` / `?quiz=fail` jump to quiz endings.

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
- Do not change the popup window style unless explicitly requested; keep its font and color scheme consistent.
- "Clear the popup window" means removing only the popup body content, not the title bar.

## When updating
- Add new features, flow notes, and tech decisions here.
- Keep personal facts in sync with project context.
- Always read `AGENTS.md` and `projectcontext.md`, and suggest updates to them after making relevant changes.
- When adding new code segments, add clarifying comments where they improve intent or explain non-obvious logic.

## Safe mode quiz notes
- Quiz runs inside the popup with 15 randomized questions (10 scored from personal facts, 5 unscored fun).
- No correctness feedback per question; BirthdayBot makes snarky typed comments below the popup with typing sound + mouth animation.
- Pass threshold: 80%+ on scored questions; otherwise fail.
- Fail end card: "LIER DETECTED!" plus a typed threat; after delay, a GAME OVER overlay appears.
- Pass end card: colorful waving "Wow! It's your birthday today! HURRAY!" plus a victory sound, followed by two typed angry messages.
- Quiz buttons have hover/focus states and show the selected answer.
- Browser tab title is "BirthdayBot5000" and the favicon is the BirthdayBot icon.
- Terminal boot lines render top-down without reflow spacing between earlier lines.
- Credits: after the final shout, a timed button appears to open a scrolling credits roll.
