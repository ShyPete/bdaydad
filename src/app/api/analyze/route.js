import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MS_PER_DAY = 24 * 60 * 60 * 1000;
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

const normalizeSeasonalVibes = (value) => {
  return {
    winter: normalizeList(value?.winter),
    spring: normalizeList(value?.spring),
    summer: normalizeList(value?.summer),
    fall: normalizeList(value?.fall),
  };
};

const parseMonthDay = (value) => {
  if (typeof value !== "string") {
    return null;
  }
  const match = value.match(/^(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }
  const month = Number(match[1]);
  const day = Number(match[2]);
  if (Number.isNaN(month) || Number.isNaN(day)) {
    return null;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  return { month, day };
};

const normalizeHolidayWindows = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((entry) => {
      const name = normalizePrompt(entry?.name);
      const start = parseMonthDay(entry?.start);
      const end = parseMonthDay(entry?.end);
      const prompt = normalizePrompt(entry?.prompt);
      if (!name || !start || !end || !prompt) {
        return null;
      }
      return { name, start, end, prompt };
    })
    .filter(Boolean);
};

const normalizeAstroTraits = (value) => ({
  Aries: normalizeList(value?.Aries),
  Taurus: normalizeList(value?.Taurus),
  Gemini: normalizeList(value?.Gemini),
  Cancer: normalizeList(value?.Cancer),
  Leo: normalizeList(value?.Leo),
  Virgo: normalizeList(value?.Virgo),
  Libra: normalizeList(value?.Libra),
  Scorpio: normalizeList(value?.Scorpio),
  Sagittarius: normalizeList(value?.Sagittarius),
  Capricorn: normalizeList(value?.Capricorn),
  Aquarius: normalizeList(value?.Aquarius),
  Pisces: normalizeList(value?.Pisces),
});

const loadPrompts = async () => {
  if (cachedPrompts) {
    return cachedPrompts;
  }
  try {
    const prompt = await readFile(PROMPT_PATH, "utf8");
    const parsed = JSON.parse(prompt);
    const systemPrompt = normalizePrompt(parsed?.analyze?.system);
    const modes = normalizeList(parsed?.analyze?.modes);
    const formats = normalizeList(parsed?.analyze?.formats);
    const styleToggles = normalizeList(parsed?.analyze?.styleToggles);
    const glitchTokens = normalizeList(parsed?.analyze?.glitchTokens);
    const seasonalVibes = normalizeSeasonalVibes(parsed?.analyze?.seasonalVibes);
    const holidayWindows = normalizeHolidayWindows(
      parsed?.analyze?.holidayWindows
    );
    const astroTraits = normalizeAstroTraits(parsed?.analyze?.astroTraits);
    if (!systemPrompt) {
      throw new Error("Missing analyze prompt.");
    }
    cachedPrompts = {
      systemPrompt,
      modes,
      formats,
      styleToggles,
      glitchTokens,
      seasonalVibes,
      holidayWindows,
      astroTraits,
    };
    return cachedPrompts;
  } catch (error) {
    cachedPrompts = {
      systemPrompt:
        "You are BirthdayBot5000, a cocky, smug birthday analysis bot. " +
        "State if the selected date is today, then give the result briefly.",
      modes: [],
      formats: [],
      styleToggles: [],
      glitchTokens: [],
      seasonalVibes: { winter: [], spring: [], summer: [], fall: [] },
      holidayWindows: [],
      astroTraits: {},
    };
    return cachedPrompts;
  }
};

const safeDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date();
  }
  return date;
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

const getSeason = (monthIndex) => {
  const month = monthIndex + 1;
  if (month === 12 || month <= 2) {
    return "winter";
  }
  if (month <= 5) {
    return "spring";
  }
  if (month <= 8) {
    return "summer";
  }
  return "fall";
};

const isWithinWindow = (month, day, window) => {
  const { start, end } = window;
  const startKey = start.month * 100 + start.day;
  const endKey = end.month * 100 + end.day;
  const valueKey = month * 100 + day;

  if (startKey <= endKey) {
    return valueKey >= startKey && valueKey <= endKey;
  }
  return valueKey >= startKey || valueKey <= endKey;
};

const getZodiacSign = (monthIndex, dayNumber) => {
  const month = monthIndex + 1;
  const ranges = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ];

  for (const range of ranges) {
    const [startMonth, startDay] = range.start;
    const [endMonth, endDay] = range.end;
    const startKey = startMonth * 100 + startDay;
    const endKey = endMonth * 100 + endDay;
    const valueKey = month * 100 + dayNumber;

    if (startKey <= endKey) {
      if (valueKey >= startKey && valueKey <= endKey) {
        return range.sign;
      }
    } else if (valueKey >= startKey || valueKey <= endKey) {
      return range.sign;
    }
  }

  return "Capricorn";
};

const buildAnalysisContext = (month, day, clientDate) => {
  const monthIndex = MONTHS.indexOf(month);
  const dayNumber = Number(day);
  if (monthIndex < 0 || Number.isNaN(dayNumber)) {
    return null;
  }

  const today = safeDate(clientDate);
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const selectedThisYear = new Date(
    today.getFullYear(),
    monthIndex,
    dayNumber
  );

  let relation = "upcoming";
  let daysUntil = Math.round((selectedThisYear - todayStart) / MS_PER_DAY);

  if (daysUntil === 0) {
    relation = "today";
  } else if (daysUntil < 0) {
    relation = "passed";
    const selectedNextYear = new Date(
      today.getFullYear() + 1,
      monthIndex,
      dayNumber
    );
    daysUntil = Math.round((selectedNextYear - todayStart) / MS_PER_DAY);
  }

  const todayText = `${MONTHS[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  const selectedText = `${MONTHS[monthIndex]} ${dayNumber}`;

  return { relation, daysUntil, todayText, selectedText, monthIndex, dayNumber };
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
  const { month, day, clientDate, variantSeed } = body || {};

  if (!month || !day) {
    return NextResponse.json(
      { error: "Month and day are required." },
      { status: 400 }
    );
  }

  const context = buildAnalysisContext(month, day, clientDate);
  if (!context) {
    return NextResponse.json(
      { error: "Invalid date selection." },
      { status: 400 }
    );
  }

  const model = process.env.OPENAI_MODEL || "gpt-5.2";
  const {
    systemPrompt,
    modes,
    formats,
    styleToggles,
    glitchTokens,
    seasonalVibes,
    holidayWindows,
    astroTraits,
  } = await loadPrompts();

  const seedBase = Number.isFinite(Number(variantSeed))
    ? Number(variantSeed)
    : Date.now();
  const seed =
    (seedBase +
      context.dayNumber * 31 +
      (context.monthIndex + 1) * 997) >>>
    0;
  const rng = mulberry32(seed);

  const season = getSeason(context.monthIndex);
  const seasonList = seasonalVibes?.[season] || [];
  const seasonalVibe = pickFrom(rng, seasonList);

  const holidayMatches = holidayWindows.filter((window) =>
    isWithinWindow(context.monthIndex + 1, context.dayNumber, window)
  );
  const holidayPrompt = pickFrom(
    rng,
    holidayMatches.map((match) => match.prompt)
  );

  const zodiacSign = getZodiacSign(context.monthIndex, context.dayNumber);
  const zodiacTraits = astroTraits?.[zodiacSign] || [];
  const zodiacTrait = pickFrom(rng, zodiacTraits);

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
  const toneNotes = [];
  if (seasonalVibe) {
    toneNotes.push(`Seasonal tone cue: ${seasonalVibe}`);
  }
  if (zodiacTrait) {
    toneNotes.push(`Astro tone cue: ${zodiacTrait}`);
  }
  const toneInstruction = toneNotes.length
    ? `Hidden tone cues (do not mention explicitly):\n- ${toneNotes.join(
        "\n- "
      )}`
    : null;
  const holidayInstruction = holidayPrompt
    ? `Holiday vibe (if relevant): ${holidayPrompt}`
    : null;
  const creativeBrief = [
    modeInstruction,
    formatInstruction,
    toggleInstruction,
    glitchInstruction,
    holidayInstruction,
    toneInstruction,
  ]
    .filter(Boolean)
    .join("\n");

  const userPrompt =
    `Selected birthday: ${context.selectedText}. Today's date: ${context.todayText}. ` +
    `Is today: ${context.relation === "today" ? "yes" : "no"}. ` +
    `Relation: ${context.relation}. Days until next birthday (if not today): ${context.daysUntil}.\n` +
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
      max_completion_tokens: 160,
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
