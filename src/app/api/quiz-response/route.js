import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const PROMPT_PATH = path.join(process.cwd(), "prompts", "prompts.json");

let cachedPrompts = null;

const normalizePrompt = (prompt) => {
  if (Array.isArray(prompt)) {
    return prompt.join("\n").trim();
  }
  if (!prompt) {
    return "";
  }
  return String(prompt).trim();
};

const normalizeList = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((entry) => normalizePrompt(entry)).filter(Boolean);
};

const loadPrompts = async () => {
  if (cachedPrompts) {
    return cachedPrompts;
  }
  try {
    const prompt = await readFile(PROMPT_PATH, "utf8");
    const parsed = JSON.parse(prompt);
    const systemPrompt = normalizePrompt(parsed?.quizText?.system);
    const modes = normalizeList(parsed?.quizText?.modes);
    const formats = normalizeList(parsed?.quizText?.formats);
    const styleToggles = normalizeList(parsed?.quizText?.styleToggles);
    const glitchTokens = normalizeList(parsed?.quizText?.glitchTokens);
    if (!systemPrompt) {
      throw new Error("Missing quiz text prompt.");
    }
    cachedPrompts = {
      systemPrompt,
      modes,
      formats,
      styleToggles,
      glitchTokens,
    };
    return cachedPrompts;
  } catch (error) {
    cachedPrompts = {
      systemPrompt:
        "You are BirthdayBot5000, a smug, snarky quiz bot. Respond briefly to the user's answer.",
      modes: [],
      formats: [],
      styleToggles: [],
      glitchTokens: [],
    };
    return cachedPrompts;
  }
};

const mulberry32 = (seed) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const pickFrom = (rng, list) => {
  if (!list || list.length === 0) {
    return null;
  }
  const index = Math.floor(rng() * list.length);
  return list[index];
};

const pickMany = (rng, list, count) => {
  if (!list || list.length === 0) {
    return [];
  }
  const pool = [...list];
  const picks = [];
  for (let i = 0; i < count && pool.length > 0; i += 1) {
    const index = Math.floor(rng() * pool.length);
    picks.push(pool.splice(index, 1)[0]);
  }
  return picks;
};

export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { question, answer, variantSeed } = body || {};
  if (!question || !answer) {
    return NextResponse.json(
      { error: "Question and answer are required." },
      { status: 400 }
    );
  }

  const model = process.env.OPENAI_MODEL || "gpt-5.2";
  const { systemPrompt, modes, formats, styleToggles, glitchTokens } =
    await loadPrompts();

  const seedBase = Number.isFinite(Number(variantSeed))
    ? Number(variantSeed)
    : Date.now();
  const seed = (seedBase + answer.length * 31 + question.length * 17) >>> 0;
  const rng = mulberry32(seed);

  const modePrompt = pickFrom(rng, modes);
  const formatPrompt = pickFrom(rng, formats);
  const togglePrompts = pickMany(rng, styleToggles, 2);
  const glitchToken = pickFrom(rng, glitchTokens);

  const formatInstruction = formatPrompt
    ? `Format:\n${formatPrompt}`
    : "Format: any structure.";
  const modeInstruction = modePrompt ? `Mode:\n${modePrompt}` : null;
  const toggleInstruction = togglePrompts.length
    ? `Style toggles:\n- ${togglePrompts.join("\n- ")}`
    : null;
  const glitchInstruction = glitchToken
    ? `Glitch token to use sometimes: ${glitchToken}`
    : null;

  const creativeBrief = [
    modeInstruction,
    formatInstruction,
    toggleInstruction,
    glitchInstruction,
  ]
    .filter(Boolean)
    .join("\n");

  const userPrompt =
    `Question: ${question}\n` +
    `User answer: ${answer}\n` +
    `${creativeBrief}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.9,
      max_completion_tokens: 140,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    return NextResponse.json(
      { error: payload?.error?.message || "OpenAI request failed." },
      { status: response.status }
    );
  }

  const message = payload?.choices?.[0]?.message?.content?.trim();
  if (!message) {
    return NextResponse.json(
      { error: "Empty response from model." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message });
}
