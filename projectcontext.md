# Project Context

## Summary
Simple vibecoded birthday web app for Dad. The app ends by wishing him a happy
birthday.

## Current concept
1) Data-collection adventure with branching responses (choose-your-own-adventure).
2) Intentional, playful "broken app" moments (fake errors).
3) Intro and crash-to-safe-mode sequence implemented; safe mode leads into a popup quiz flow with pass/fail endings.

## Rough roadmap
1) Intro: Present "BirthdayBot5000" that claims it can determine if today is the
   user's birthday.
2) Initial prompt: Tries to ask for the user's birthday, but fails in a silly
   way (system crash or UI hell makes it impossible to answer).
3) Fake crash: The app appears to break, then reboots into "safe mode."
4) Safe mode: Attempts to infer the birthday using playful questions tied to
   Dad's interests and answers.
5) Finale: Reveals the result and wishes Dad a happy birthday.

## Current implementation notes
- Roadmap steps 1-3 are complete with an intro chat UI and full crash sequence.
- Jan 17 is intentionally missing from the day list; after 5 seconds on January
  with the day dropdown open, a "My birthday is not listed" button appears and
  stays visible. Clicking it disables the button and triggers the crash.
- Crash flow: angry outburst and second message type out letter-by-letter and
  are spoken via TTS. Glitch noise plays during the second message typing.
- Crash overlay appears after the second message speech ends + 2 seconds.
- A steady 2000 Hz crash tone plays after the second message speech ends and
  stops when the reboot screen turns black.
- Safe mode transition: 5-second crash overlay, then a black terminal window
  prints reboot lines for 10 seconds, then a SAFE MODE screen with typed lines.
  A Windows-style popup ("Birthday Quiz v1.0") appears after the safe-mode
  messages, with a disabled start button until the final line finishes typing.
- Terminal boot lines render top-down sequentially (no equal spacing reflow).
- Safe mode audio: a darker oldschool 8-bit loop with organ stabs, a per-beat
  crunchy organ line, and crunchy accents (retro castle vibe) that starts when
  the terminal appears.
- Boss fight audio: faster-tempo, heavier layered loop for a more intense battle feel.
- Safe mode/quiz messages start TTS as soon as the text begins typing and
  animate the green bot while speaking (angry brows during angry lines).
- Safe mode/quiz waits for each spoken line to finish before printing the next
  (0.15s gap), and typing SFX stop immediately when the text finishes.
- Popup quiz: 15 randomized questions (10 scored from personal facts, 5 unscored).
  Each question has 3 options; no correct/incorrect feedback. BirthdayBot makes
  snarky typed comments below the popup with typing sound and mouth animation.
- Scoring: pass if 80%+ of scored questions are correct; otherwise fail.
- Fail end: "LIER DETECTED!" end card in the popup, a typed threat below, then a
  GAME OVER overlay.
- Pass end: colorful wave-text end card ("Wow! It's your birthday today! HURRAY!"),
  victory sound, then two angry typed BirthdayBot messages.
- Boss finale (quiz pass): after the pass speech, the safe-mode bot drops offscreen
  with a crash SFX, a mecha BirthdayBot rises in, shoots larger fast-tracking
  projectiles, and takes 3 clicks to defeat. Hits play SFX + "oof/ouch"; death
  triggers an explosion effect + flames, X eyes, and a spoken sequence
  ("arrrghghghghh" -> "noooooooooooooooo" -> death line) before the final birthday shout,
  which is centered, multicolored, free-floating, split into two lines, and has a subtle translucent backing.
- Quiz buttons have hover/focus states and a visible selected state.
- Browser tab title is "BirthdayBot5000"; favicon uses the BirthdayBot icon.
- Popup window styling must remain consistent unless explicitly requested.
- "Clear the popup window" means removing only the body content, not the title bar.
- Ambient audio uses Web Audio with layered synths + percussive noise and a
  faster rhythm. Autoplay is attempted; if blocked, show an enable-sound prompt
  and a persistent toggle.
- Sound toggle remains visible in safe mode/quiz (above overlays); intro ambient
  does not play in safe mode.
- Analyze button calls `/api/analyze` when month + day are selected and displays
  responses as typed text in the chat. Loading and error bubbles type out too.
- Requires `OPENAI_API_KEY` in the environment (and optional `OPENAI_MODEL` override).
- Analysis prompt copy lives in `prompts/prompts.json`.
- Analyze responses are spoken aloud with browser TTS and trigger the cake-bot
  speaking animation (eyebrows + mouth + stronger float).
- Voice settings (voice/rate/pitch) are hidden behind a toggle button under the
  sound control.
- Quiz testing shortcuts: `?safe=1` (or `?safe=true`) jumps to the green terminal
  boot screen; `?quiz=1` (or `?quiz=true`) jumps to SAFE MODE + quiz; `?quiz=pass`
  / `?quiz=fail` jump to quiz ending states.
- Analyze prompt allows smug, slightly mean tone with occasional mild profanity;
  avoids slurs/hate.
- Prompt includes modes, formats, toggles, glitch tokens, and hidden
  seasonal/astrology tone cues (not mentioned explicitly). Holidays may be
  mentioned.
- Variation uses a per-click `variantSeed` from the client plus the selected date.
- Seasonal flavor assumes Northern Hemisphere.

## Near-term focus
- Polish boss battle pacing and finale transitions.

## Goals
- Make the flow delightful and personal.
- Keep the experience short and snappy.
- Land the final birthday wish.

## Open questions
- Safe mode interaction design and question count.

## Tech decisions
- Next.js App Router with CSS Modules for styling.
- Web Audio API for ambient sound effects.
- OpenAI chat completions via a server route handler.

## Personal facts to include
- Likes beer, especially IPAs.
- Uses an e-ink tablet often.
- Likes vibecoding apps.
- Loves coffee, especially meticulous pour overs with quality equipment.
- Likes riding bikes.
- Likes camping.
- Likes board games.
- Fan of the Saskatchewan Roughriders.
- Likes betting on sports games.
- Likes playing online poker.

## Notes
- Update this file as features and story beats are decided.
