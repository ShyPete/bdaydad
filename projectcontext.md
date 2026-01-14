# Project Context

## Summary
Simple vibecoded birthday web app for Dad. The app ends by wishing him a happy
birthday.

## Current concept
1) Data-collection adventure with branching responses (choose-your-own-adventure).
2) Intentional, playful "broken app" moments (fake errors).
3) Intro screen is already implemented (BirthdayBot5000 chat UI + cake-bot + month/day selectors).

## Rough roadmap
1) Intro: Present "BirthdayBot5000" that claims it can determine if today is the
   user's birthday.
2) Initial prompt: Tries to ask for the user's birthday, but fails in a silly
   way (system crash or UI hell makes it impossible to answer).
3) Fake crash: The app appears to break, then reboots into "safe mode." or some other weird glitchy mode.
4) Safe mode: Attempts to infer the birthday using playful questions tied to
   Dad's interests and answers.
5) Finale: Reveals the result and wishes Dad a happy birthday.

## Current implementation notes
- Roadmap step 1 is complete: intro screen exists with chat bubbles and month/day selectors.
- Jan 17 is intentionally missing from the day list; after 5 seconds on January,
  a "My birthday is not listed" button appears to trigger the crash flow.
- Ambient audio uses Web Audio with layered synths + percussive noise and a faster rhythm.
- Autoplay is attempted; if blocked, show an enable-sound prompt and a persistent toggle.
- Analyze button now calls `/api/analyze` when month + day are selected and displays the response in the chat.
- Requires `OPENAI_API_KEY` in the environment (and optional `OPENAI_MODEL` override).
- Analysis prompt copy lives in `prompts/prompts.json`.
- Analyze responses are spoken aloud with browser TTS and trigger the cake-bot speaking animation (eyebrows + mouth + stronger float).
- Voice settings (voice/rate/pitch) are hidden behind a toggle button under the sound control.
- Analyze prompt allows smug, slightly mean tone with occasional mild profanity; avoids slurs/hate.
- Prompt includes modes, formats, toggles, glitch tokens, and hidden seasonal/astrology tone cues (not mentioned explicitly). Holidays may be mentioned.
- Variation uses a per-click `variantSeed` from the client plus the selected date.
- Seasonal flavor assumes Northern Hemisphere.

## Near-term focus
- Step 2: Wire the "My birthday is not listed" button to trigger the failure + crash sequence.
- Fill out the intro with more micro-features and copy beats.
- Add the successful "birthday analysis" path so an entered date can resolve cleanly.

## Goals
- Make the flow delightful and personal.
- Keep the experience short and snappy.
- Land the final birthday wish.

## Open questions
- Preferred length: 3–5 minutes.

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
