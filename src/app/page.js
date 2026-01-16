"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  // Single-page state machine for intro -> crash -> safe mode -> quiz -> boss finale.
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dayOpen, setDayOpen] = useState(false);
  const [showMissingButton, setShowMissingButton] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState("idle");
  const [analysisMessage, setAnalysisMessage] = useState("");
  const [analysisError, setAnalysisError] = useState("");
  const [analysisLoadingText, setAnalysisLoadingText] = useState("");
  const [analysisTypedText, setAnalysisTypedText] = useState("");
  const [analysisErrorTypedText, setAnalysisErrorTypedText] = useState("");
  const [voices, setVoices] = useState([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [speechRate, setSpeechRate] = useState(1.05);
  const [speechPitch, setSpeechPitch] = useState(1.1);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [botAngry, setBotAngry] = useState(false);
  const [crashStage, setCrashStage] = useState("idle");
  const [showOutburst, setShowOutburst] = useState(false);
  const [outburstText, setOutburstText] = useState("");
  const [outburstDone, setOutburstDone] = useState(false);
  const [outburstSpeechDone, setOutburstSpeechDone] = useState(false);
  const [showConfusion, setShowConfusion] = useState(false);
  const [confusionText, setConfusionText] = useState("");
  const [confusionSpeechDone, setConfusionSpeechDone] = useState(false);
  const [missingButtonDisabled, setMissingButtonDisabled] = useState(false);
  const [safeStage, setSafeStage] = useState("off");
  const [safeModeShortcut, setSafeModeShortcut] = useState(null);
  const [terminalLines, setTerminalLines] = useState([]);
  const [safeMessageOne, setSafeMessageOne] = useState("");
  const [safeMessageTwo, setSafeMessageTwo] = useState("");
  const [safeMessageThree, setSafeMessageThree] = useState("");
  const [safeMessageFour, setSafeMessageFour] = useState("");
  const [safeMessageFive, setSafeMessageFive] = useState("");
  const [safeMessageSix, setSafeMessageSix] = useState("");
  const [safeMessageSeven, setSafeMessageSeven] = useState("");
  const [safeTyping, setSafeTyping] = useState(false);
  const [safeQuizVisible, setSafeQuizVisible] = useState(false);
  const [safeQuizReady, setSafeQuizReady] = useState(false);
  const [safeQuizCleared, setSafeQuizCleared] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizComment, setQuizComment] = useState("");
  const [quizLocked, setQuizLocked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [safeBotSpeaking, setSafeBotSpeaking] = useState(false);
  const [safeBotAngry, setSafeBotAngry] = useState(false);
  const [bossPhase, setBossPhase] = useState("off");
  const [bossHealth, setBossHealth] = useState(3);
  const [bossProjectiles, setBossProjectiles] = useState([]);
  const [bossHitFlash, setBossHitFlash] = useState(false);
  const [bossHitText, setBossHitText] = useState("");
  const [bossSpeaking, setBossSpeaking] = useState(false);
  const [bossFire, setBossFire] = useState(false);
  const [bossExplode, setBossExplode] = useState(false);
  const [bossEyesDead, setBossEyesDead] = useState(false);
  const [bossDeathLine, setBossDeathLine] = useState("");
  const [bossFinalLine, setBossFinalLine] = useState("");
  const [bossSpeechDone, setBossSpeechDone] = useState(false);
  const [safeBotFalling, setSafeBotFalling] = useState(false);
  const [quizCommentText, setQuizCommentText] = useState("");
  const [quizTyping, setQuizTyping] = useState(false);
  const [lieMessageText, setLieMessageText] = useState("");
  const [lieTyping, setLieTyping] = useState(false);
  const [passMessageOneText, setPassMessageOneText] = useState("");
  const [passMessageTwoText, setPassMessageTwoText] = useState("");
  const [passTyping, setPassTyping] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const daySelectRef = useRef(null);
  const speechRef = useRef(null);
  const crashTimeoutRef = useRef(null);
  const outburstTimeoutRef = useRef(null);
  const confusionTimeoutRef = useRef(null);
  const confusionTypeRef = useRef(null);
  const analysisTypeRef = useRef(null);
  const analysisErrorTypeRef = useRef(null);
  const analysisLoadingTypeRef = useRef(null);
  const glitchNoiseRef = useRef(null);
  const crashToneRef = useRef(null);
  const safeStartTimeoutRef = useRef(null);
  const safeModeTimeoutRef = useRef(null);
  const terminalIntervalRef = useRef(null);
  const safeMessageOneRef = useRef(null);
  const safeMessageTwoRef = useRef(null);
  const safeMessageThreeRef = useRef(null);
  const safeMessageFourRef = useRef(null);
  const safeMessageFiveRef = useRef(null);
  const safeMessageSixRef = useRef(null);
  const safeMessageSevenRef = useRef(null);
  const safeMessageDelayRef = useRef(null);
  const safeTypingNoiseRef = useRef(null);
  const safeQuizTimeoutRef = useRef(null);
  const quizAdvanceTimeoutRef = useRef(null);
  const quizCommentTypeRef = useRef(null);
  const lieMessageTypeRef = useRef(null);
  const passMessageOneTypeRef = useRef(null);
  const passMessageTwoTypeRef = useRef(null);
  const passMessageDelayRef = useRef(null);
  const gameOverTimeoutRef = useRef(null);
  const safeSpeechQueueRef = useRef(Promise.resolve());
  const bossSpeechQueueRef = useRef(Promise.resolve());
  const bossIntroTimeoutRef = useRef(null);
  const bossBattleTimeoutRef = useRef(null);
  const bossShootIntervalRef = useRef(null);
  const bossTickRef = useRef(null);
  const bossHitTimeoutRef = useRef(null);
  const bossHitTextTimeoutRef = useRef(null);
  const bossProjectileIdRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const victoryPlayedRef = useRef(false);
  // Shared Web Audio graph; reused across ambient/safe/boss/victory layers.
  const audioRef = useRef({
    ctx: null,
    source: null,
    intervalId: null,
    masterGain: null,
    ambientGain: null,
    sfxGain: null,
    safeGain: null,
    safeIntervalId: null,
    bossGain: null,
    bossIntervalId: null,
    victoryGain: null,
    victoryIntervalId: null,
  });

  const months = [
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

  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  // Utility for adding distortion to harsher synth textures.
  const makeDistortionCurve = (amount = 25) => {
    const sampleCount = 44100;
    const curve = new Float32Array(sampleCount);
    const deg = Math.PI / 180;
    for (let i = 0; i < sampleCount; i += 1) {
      const x = (i * 2) / sampleCount - 1;
      curve[i] =
        ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  };

  // Ambient intro sound bed with randomized pops to keep it lively.
  const createAudioLayer = (ctx, ambientGain) => {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2.5, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    const burstBuffer = ctx.createBuffer(
      1,
      Math.floor(ctx.sampleRate * 0.22),
      ctx.sampleRate
    );
    const burstData = burstBuffer.getChannelData(0);

    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }
    for (let i = 0; i < burstData.length; i += 1) {
      burstData[i] = (Math.random() * 2 - 1) * 0.7;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 700;
    filter.Q.value = 0.5;

    const gain = ctx.createGain();
    gain.gain.value = 0.05;

    source.connect(filter).connect(gain).connect(ambientGain);

    const playTone = ({ time, type, frequency, duration, level }) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = frequency;
      oscGain.gain.value = 0.0;
      osc.connect(oscGain).connect(ambientGain);
      oscGain.gain.linearRampToValueAtTime(level, time + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.start(time);
      osc.stop(time + duration + 0.02);
    };

    const playNoise = ({ time, duration, level, frequency }) => {
      const noise = ctx.createBufferSource();
      noise.buffer = burstBuffer;
      const noiseGain = ctx.createGain();
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = frequency;
      noiseGain.gain.value = 0.0;
      noise.connect(noiseFilter).connect(noiseGain).connect(ambientGain);
      noiseGain.gain.linearRampToValueAtTime(level, time + 0.01);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      noise.start(time);
      noise.stop(time + duration + 0.02);
    };

    const schedulePop = () => {
      const now = ctx.currentTime;
      const tempo = 128 + Math.random() * 38;
      const beat = 60 / tempo;
      const pick = (list) =>
        list[Math.floor(Math.random() * list.length)];

      const bassNote = pick([92, 110, 130]);
      const bellNote = pick([660, 740, 880, 990, 1180]);
      const pluckNote = pick([330, 392, 440, 523, 587]);

      playTone({
        time: now,
        type: "sawtooth",
        frequency: bassNote,
        duration: beat * 0.6,
        level: 0.05,
      });
      playNoise({
        time: now + beat * 0.35,
        duration: beat * 0.25,
        level: 0.12,
        frequency: 1400,
      });
      playTone({
        time: now + beat * 0.6,
        type: "sine",
        frequency: bellNote,
        duration: beat * 1.1,
        level: 0.08,
      });
      playTone({
        time: now + beat * 0.9,
        type: "triangle",
        frequency: pluckNote,
        duration: beat * 0.7,
        level: 0.07,
      });
      playNoise({
        time: now + beat * 1.2,
        duration: beat * 0.22,
        level: 0.1,
        frequency: 2200,
      });

      if (Math.random() > 0.55) {
        playTone({
          time: now + beat * 1.45,
          type: "square",
          frequency: pick([660, 880, 1320]),
          duration: beat * 0.45,
          level: 0.06,
        });
      }
    };

    source.start();
    const intervalId = window.setInterval(schedulePop, 1000);

    return { source, intervalId };
  };

  // Safe mode loop: retro 8-bit castle vibe to signal danger.
  const createSafeModeLayer = (ctx, safeGain) => {
    const tempo = 107;
    const beat = 60 / tempo;
    const bar = beat * 4;
    const chordRoots = [40, 41, 43, 41]; // E, F, G, F (Phrygian feel)
    const leadOffsets = [0, 1, 0, 5, 3, 1, -2, -4];
    const distortionCurve = makeDistortionCurve(50);

    const noiseBuffer = ctx.createBuffer(
      1,
      Math.floor(ctx.sampleRate * 0.1),
      ctx.sampleRate
    );
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i += 1) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.7;
    }

    const midiToFreq = (note) => 440 * Math.pow(2, (note - 69) / 12);

    const playOrganStab = (root, time) => {
      const duration = beat * 0.6;
      const notes = [root, root + 7, root + 12, root + 1];
      const chordGain = ctx.createGain();
      chordGain.gain.value = 0.0001;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1100;
      chordGain.connect(filter).connect(safeGain);
      chordGain.gain.setValueAtTime(0.0001, time);
      chordGain.gain.linearRampToValueAtTime(0.22, time + 0.03);
      chordGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      notes.forEach((note, index) => {
        const osc = ctx.createOscillator();
        const body = ctx.createOscillator();
        osc.type = "square";
        body.type = "triangle";
        osc.frequency.value = midiToFreq(note);
        body.frequency.value = midiToFreq(note);
        osc.detune.value = index % 2 === 0 ? -10 : 10;
        osc.connect(chordGain);
        body.connect(chordGain);
        osc.start(time);
        body.start(time);
        osc.stop(time + duration + 0.05);
        body.stop(time + duration + 0.05);
      });

      const sub = ctx.createOscillator();
      sub.type = "triangle";
      sub.frequency.value = midiToFreq(root - 12);
      sub.connect(chordGain);
      sub.start(time);
      sub.stop(time + duration + 0.05);
    };

    const playOrganStep = (note, time) => {
      const duration = beat * 0.85;
      const osc = ctx.createOscillator();
      const body = ctx.createOscillator();
      const gain = ctx.createGain();
      const shaper = ctx.createWaveShaper();
      const filter = ctx.createBiquadFilter();
      osc.type = "square";
      body.type = "square";
      osc.frequency.value = midiToFreq(note);
      body.frequency.value = midiToFreq(note - 12);
      shaper.curve = distortionCurve;
      shaper.oversample = "4x";
      filter.type = "lowpass";
      filter.frequency.value = 1000;
      gain.gain.value = 0.0;
      osc.connect(shaper);
      body.connect(shaper);
      shaper.connect(filter).connect(gain).connect(safeGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.start(time);
      body.start(time);
      osc.stop(time + duration + 0.08);
      body.stop(time + duration + 0.08);
    };

    const playLead = (note, time, duration, level = 0.12) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const shaper = ctx.createWaveShaper();
      const filter = ctx.createBiquadFilter();
      osc.type = "sawtooth";
      osc.frequency.value = midiToFreq(note);
      shaper.curve = distortionCurve;
      shaper.oversample = "4x";
      filter.type = "lowpass";
      filter.frequency.value = 1500;
      gain.gain.value = 0.0;
      osc.connect(shaper).connect(filter).connect(gain).connect(safeGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(level, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.start(time);
      osc.stop(time + duration + 0.05);
    };

    const playKick = (note, time) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = midiToFreq(note);
      gain.gain.value = 0.0;
      osc.connect(gain).connect(safeGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.2, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
      osc.start(time);
      osc.stop(time + 0.45);
    };

    const playCrunch = (time) => {
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200 + Math.random() * 600;
      const gain = ctx.createGain();
      gain.gain.value = 0.0;
      noise.connect(filter).connect(gain).connect(safeGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.16, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      noise.start(time);
      noise.stop(time + 0.14);
    };

    let step = 0;
    const scheduleBar = () => {
      const now = ctx.currentTime + 0.05;
      const root = chordRoots[step % chordRoots.length];
      const stepNotes = [root + 7, root + 8, root + 10, root + 8];
      stepNotes.forEach((note, index) => {
        playOrganStep(note, now + index * beat);
      });
      for (let i = 0; i < 4; i += 1) {
        const beatTime = now + i * beat;
        playOrganStab(root, beatTime);
        playKick(root - 12, beatTime);
        playCrunch(beatTime + beat * 0.25);
      }

      leadOffsets.forEach((offset, index) => {
        const note = root + 24 + offset;
        const start = now + index * (beat / 2);
        playLead(note, start, beat * 0.4, 0.11);
      });

      step += 1;
    };

    scheduleBar();
    const intervalId = window.setInterval(scheduleBar, bar * 1000);
    return { intervalId };
  };

  // Boss fight loop: higher tempo and heavier layers.
  const createBossLayer = (ctx, bossGain) => {
    const tempo = 152;
    const beat = 60 / tempo;
    const bar = beat * 4;
    const distortionCurve = makeDistortionCurve(80);

    const noiseBuffer = ctx.createBuffer(
      1,
      Math.floor(ctx.sampleRate * 0.12),
      ctx.sampleRate
    );
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i += 1) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.7;
    }

    const midiToFreq = (note) => 440 * Math.pow(2, (note - 69) / 12);

    const playKick = (time) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 54;
      gain.gain.value = 0.0;
      osc.connect(gain).connect(bossGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.26, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
      osc.start(time);
      osc.stop(time + 0.4);
    };

    const playSnare = (time) => {
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1800;
      const gain = ctx.createGain();
      gain.gain.value = 0.0;
      noise.connect(filter).connect(gain).connect(bossGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.2, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
      noise.start(time);
      noise.stop(time + 0.2);
    };

    const playHat = (time) => {
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 6800;
      const gain = ctx.createGain();
      gain.gain.value = 0.0;
      noise.connect(filter).connect(gain).connect(bossGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
      noise.start(time);
      noise.stop(time + 0.1);
    };

    const playBass = (note, time) => {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const freq = midiToFreq(note);
      osc.type = "sawtooth";
      osc2.type = "square";
      osc.frequency.value = freq;
      osc2.frequency.value = freq;
      filter.type = "lowpass";
      filter.frequency.value = 240;
      gain.gain.value = 0.0;
      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain).connect(bossGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.18, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + beat * 0.9);
      osc.start(time);
      osc2.start(time);
      osc.stop(time + beat);
      osc2.stop(time + beat);
    };

    const playStab = (notes, time) => {
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      gain.gain.value = 0.0;
      filter.type = "lowpass";
      filter.frequency.value = 1300;
      filter.connect(gain).connect(bossGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.16, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + beat * 0.9);
      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const shaper = ctx.createWaveShaper();
        osc.type = "sawtooth";
        osc.frequency.value = midiToFreq(note);
        shaper.curve = distortionCurve;
        shaper.oversample = "4x";
        osc.connect(shaper).connect(filter);
        osc.start(time);
        osc.stop(time + beat);
      });
    };

    const playLead = (note, time) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const shaper = ctx.createWaveShaper();
      const filter = ctx.createBiquadFilter();
      osc.type = "sawtooth";
      osc.frequency.value = midiToFreq(note);
      shaper.curve = distortionCurve;
      shaper.oversample = "4x";
      filter.type = "lowpass";
      filter.frequency.value = 1700;
      gain.gain.value = 0.0;
      osc.connect(shaper).connect(filter).connect(gain).connect(bossGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + beat * 0.5);
      osc.start(time);
      osc.stop(time + beat * 0.6);
    };

    const leadPattern = [52, 55, 52, 58, 55, 52, 47, 45];
    const bassPattern = [40, 40, 43, 45, 40, 40, 43, 38];
    const stabChords = [
      [40, 47],
      [43, 50],
    ];

    const scheduleBar = () => {
      const now = ctx.currentTime + 0.05;
      playKick(now);
      playKick(now + beat);
      playKick(now + beat * 2);
      playKick(now + beat * 3);
      playSnare(now + beat * 1.5);
      playSnare(now + beat * 3.5);

      for (let i = 0; i < 8; i += 1) {
        playHat(now + i * (beat / 2));
      }
      playStab(stabChords[0], now);
      playStab(stabChords[1], now + beat * 2);

      leadPattern.forEach((note, index) => {
        playLead(note, now + index * (beat / 2));
      });

      bassPattern.forEach((note, index) => {
        playBass(note, now + index * (beat / 2));
      });
    };

    scheduleBar();
    const intervalId = window.setInterval(scheduleBar, bar * 1000);
    return { intervalId };
  };

  // Victory loop: bright celebratory chords.
  const createVictoryLayer = (ctx, victoryGain) => {
    const tempo = 120;
    const beat = 60 / tempo;
    const bar = beat * 4;
    const chords = [
      [60, 64, 67],
      [62, 65, 69],
      [57, 60, 64],
      [55, 59, 62],
    ];
    const midiToFreq = (note) => 440 * Math.pow(2, (note - 69) / 12);

    const playChord = (notes, time) => {
      const gain = ctx.createGain();
      gain.gain.value = 0.0;
      gain.connect(victoryGain);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.2, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, time + beat * 2.6);
      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = midiToFreq(note);
        osc.connect(gain);
        osc.start(time);
        osc.stop(time + beat * 2.6);
      });
    };

    let step = 0;
    const scheduleBar = () => {
      const now = ctx.currentTime + 0.05;
      const chord = chords[step % chords.length];
      playChord(chord, now);
      step += 1;
    };

    scheduleBar();
    const intervalId = window.setInterval(scheduleBar, bar * 1000);
    return { intervalId };
  };

  const shuffleArray = (items) => {
    const array = [...items];
    for (let index = array.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
    }
    return array;
  };

  const buildQuizQuestions = () => {
    const baseQuestions = [
      {
        text: "Which drink do you prefer most?",
        options: ["IPAs", "Pilsners", "Stouts"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "What device do you use most often?",
        options: ["E-ink tablet", "VR headset", "Portable projector"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "What kind of apps do you like?",
        options: ["Vibecoding apps", "Budget trackers", "Photo editors"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "How do you like your coffee?",
        options: ["Meticulous pour-over", "Instant mix", "Drive-thru latte"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "What outdoor activity do you enjoy?",
        options: ["Riding bikes", "Rock climbing", "Surfing"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "What weekend activity sounds most like you?",
        options: ["Camping", "City sightseeing", "Indoor concerts"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "What tabletop hobby do you like?",
        options: ["Board games", "Card tricks", "Model trains"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "Which team are you a fan of?",
        options: ["Saskatchewan Roughriders", "Toronto Maple Leafs", "Vancouver Canucks"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "What do you like doing with sports games?",
        options: ["Betting on them", "Avoiding them", "Only watching highlights"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "What game do you play online?",
        options: ["Poker", "Chess", "Sudoku"],
        answerIndex: 0,
        scored: true,
      },
      {
        text: "Which hobby sounds the most like you?",
        options: ["Photography", "Home brewing", "Gardening"],
        answerIndex: 0,
        scored: false,
      },
      {
        text: "Pick a favorite weekend ritual:",
        options: ["Morning bike ride", "Board game night", "Late-night movie"],
        answerIndex: 0,
        scored: false,
      },
      {
        text: "What’s your ideal drink pairing?",
        options: ["Crisp lager", "Strong espresso", "Sparkling water"],
        answerIndex: 0,
        scored: false,
      },
      {
        text: "Choose a travel vibe:",
        options: ["Cozy cabin", "Downtown hotel", "Beach house"],
        answerIndex: 0,
        scored: false,
      },
      {
        text: "Pick a game night theme:",
        options: ["Strategy showdown", "Trivia chaos", "Co-op adventure"],
        answerIndex: 0,
        scored: false,
      },
    ];

    return shuffleArray(baseQuestions).map((question) => {
      const options = shuffleArray(
        question.options.map((label, index) => ({
          label,
          correct: index === question.answerIndex,
        }))
      );
      return { ...question, options };
    });
  };

  const startAmbient = async () => {
    if (audioRef.current.ctx?.state === "closed") {
      audioRef.current = {
        ctx: null,
        source: null,
        intervalId: null,
        masterGain: null,
        ambientGain: null,
        sfxGain: null,
        safeGain: null,
        safeIntervalId: null,
        bossGain: null,
        bossIntervalId: null,
        victoryGain: null,
        victoryIntervalId: null,
      };
    }

    let { ctx, masterGain, ambientGain, sfxGain } = audioRef.current;
    if (!ctx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        return false;
      }

      ctx = new AudioContextClass();
      masterGain = ctx.createGain();
      masterGain.gain.value = 1;
      masterGain.connect(ctx.destination);
      ambientGain = ctx.createGain();
      ambientGain.gain.value = 0.22;
      ambientGain.connect(masterGain);
      sfxGain = ctx.createGain();
      sfxGain.gain.value = 1;
      sfxGain.connect(masterGain);
      audioRef.current = {
        ctx,
        masterGain,
        ambientGain,
        sfxGain,
        safeGain: null,
        source: null,
        intervalId: null,
        safeIntervalId: null,
        bossGain: null,
        bossIntervalId: null,
        victoryGain: null,
        victoryIntervalId: null,
      };
    } else if (!ambientGain || !sfxGain) {
      ambientGain = ctx.createGain();
      ambientGain.gain.value = 0.22;
      ambientGain.connect(masterGain);
      sfxGain = ctx.createGain();
      sfxGain.gain.value = 1;
      sfxGain.connect(masterGain);
      audioRef.current = {
        ...audioRef.current,
        ambientGain,
        sfxGain,
      };
    }

    try {
      await ctx.resume();
    } catch (error) {
      return false;
    }

    if (ctx.state !== "running") {
      return false;
    }

    ambientGain.gain.setValueAtTime(0.22, ctx.currentTime);

    if (!audioRef.current.source) {
      const { source, intervalId } = createAudioLayer(ctx, ambientGain);
      audioRef.current = {
        ...audioRef.current,
        source,
        intervalId,
      };
    }

    return true;
  };

  const stopAmbient = () => {
    const { ctx, source, intervalId, ambientGain } = audioRef.current;
    if (source) {
      try {
        source.stop();
      } catch (error) {
        // Ignore stop errors on already-stopped sources.
      }
    }
    if (intervalId) {
      window.clearInterval(intervalId);
    }
    if (ambientGain && ctx) {
      ambientGain.gain.setValueAtTime(0, ctx.currentTime);
    }
    audioRef.current = {
      ...audioRef.current,
      source: null,
      intervalId: null,
    };
  };

  const startSafeModeAudio = async () => {
    if (audioRef.current.ctx?.state === "closed") {
      audioRef.current = {
        ctx: null,
        source: null,
        intervalId: null,
        masterGain: null,
        ambientGain: null,
        sfxGain: null,
        safeGain: null,
        safeIntervalId: null,
        bossGain: null,
        bossIntervalId: null,
        victoryGain: null,
        victoryIntervalId: null,
      };
    }

    let { ctx, masterGain, ambientGain, sfxGain, safeGain } = audioRef.current;
    if (!ctx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        return false;
      }

      ctx = new AudioContextClass();
      masterGain = ctx.createGain();
      masterGain.gain.value = 1;
      masterGain.connect(ctx.destination);
      ambientGain = ctx.createGain();
      ambientGain.gain.value = 0.22;
      ambientGain.connect(masterGain);
      sfxGain = ctx.createGain();
      sfxGain.gain.value = 1;
      sfxGain.connect(masterGain);
      safeGain = ctx.createGain();
      safeGain.gain.value = 0.2;
      safeGain.connect(masterGain);
      audioRef.current = {
        ctx,
        masterGain,
        ambientGain,
        sfxGain,
        safeGain,
        source: null,
        intervalId: null,
        safeIntervalId: null,
        bossGain: null,
        bossIntervalId: null,
        victoryGain: null,
        victoryIntervalId: null,
      };
    } else if (!safeGain) {
      safeGain = ctx.createGain();
      safeGain.gain.value = 0.2;
      safeGain.connect(masterGain);
      audioRef.current = {
        ...audioRef.current,
        safeGain,
      };
    }

    try {
      await ctx.resume();
    } catch (error) {
      return false;
    }

    if (ctx.state !== "running") {
      return false;
    }

    safeGain.gain.setValueAtTime(0.2, ctx.currentTime);

    if (!audioRef.current.safeIntervalId) {
      const { intervalId } = createSafeModeLayer(ctx, safeGain);
      audioRef.current = {
        ...audioRef.current,
        safeIntervalId: intervalId,
      };
    }

    return true;
  };

  const stopSafeModeAudio = () => {
    const { ctx, safeIntervalId, safeGain } = audioRef.current;
    if (safeIntervalId) {
      window.clearInterval(safeIntervalId);
    }
    if (safeGain && ctx) {
      safeGain.gain.setValueAtTime(0, ctx.currentTime);
    }
    audioRef.current = {
      ...audioRef.current,
      safeIntervalId: null,
    };
  };

  const startBossModeAudio = async () => {
    let { ctx, masterGain, ambientGain, sfxGain, bossGain } = audioRef.current;
    if (!ctx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        return false;
      }
      ctx = new AudioContextClass();
      masterGain = ctx.createGain();
      masterGain.gain.value = 1;
      masterGain.connect(ctx.destination);
      ambientGain = ctx.createGain();
      ambientGain.gain.value = 0.22;
      ambientGain.connect(masterGain);
      sfxGain = ctx.createGain();
      sfxGain.gain.value = 1;
      sfxGain.connect(masterGain);
      bossGain = ctx.createGain();
      bossGain.gain.value = 0.22;
      bossGain.connect(masterGain);
      audioRef.current = {
        ctx,
        masterGain,
        ambientGain,
        sfxGain,
        safeGain: null,
        safeIntervalId: null,
        bossGain,
        bossIntervalId: null,
        victoryGain: null,
        victoryIntervalId: null,
        source: null,
        intervalId: null,
      };
    } else if (!bossGain) {
      bossGain = ctx.createGain();
      bossGain.gain.value = 0.22;
      bossGain.connect(masterGain);
      audioRef.current = {
        ...audioRef.current,
        bossGain,
      };
    }

    try {
      await ctx.resume();
    } catch (error) {
      return false;
    }

    if (ctx.state !== "running") {
      return false;
    }

    bossGain.gain.setValueAtTime(0.22, ctx.currentTime);
    if (!audioRef.current.bossIntervalId) {
      const { intervalId } = createBossLayer(ctx, bossGain);
      audioRef.current = {
        ...audioRef.current,
        bossIntervalId: intervalId,
      };
    }

    return true;
  };

  const stopBossModeAudio = () => {
    const { ctx, bossIntervalId, bossGain } = audioRef.current;
    if (bossIntervalId) {
      window.clearInterval(bossIntervalId);
    }
    if (bossGain && ctx) {
      bossGain.gain.setValueAtTime(0, ctx.currentTime);
    }
    audioRef.current = {
      ...audioRef.current,
      bossIntervalId: null,
    };
  };

  const startVictoryAudio = async () => {
    let { ctx, masterGain, ambientGain, sfxGain, victoryGain } = audioRef.current;
    if (!ctx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        return false;
      }
      ctx = new AudioContextClass();
      masterGain = ctx.createGain();
      masterGain.gain.value = 1;
      masterGain.connect(ctx.destination);
      ambientGain = ctx.createGain();
      ambientGain.gain.value = 0.22;
      ambientGain.connect(masterGain);
      sfxGain = ctx.createGain();
      sfxGain.gain.value = 1;
      sfxGain.connect(masterGain);
      victoryGain = ctx.createGain();
      victoryGain.gain.value = 0.2;
      victoryGain.connect(masterGain);
      audioRef.current = {
        ctx,
        masterGain,
        ambientGain,
        sfxGain,
        safeGain: null,
        safeIntervalId: null,
        bossGain: null,
        bossIntervalId: null,
        victoryGain,
        victoryIntervalId: null,
        source: null,
        intervalId: null,
      };
    } else if (!victoryGain) {
      victoryGain = ctx.createGain();
      victoryGain.gain.value = 0.2;
      victoryGain.connect(masterGain);
      audioRef.current = {
        ...audioRef.current,
        victoryGain,
      };
    }

    try {
      await ctx.resume();
    } catch (error) {
      return false;
    }

    if (ctx.state !== "running") {
      return false;
    }

    victoryGain.gain.setValueAtTime(0.2, ctx.currentTime);
    if (!audioRef.current.victoryIntervalId) {
      const { intervalId } = createVictoryLayer(ctx, victoryGain);
      audioRef.current = {
        ...audioRef.current,
        victoryIntervalId: intervalId,
      };
    }
    return true;
  };

  const stopVictoryAudio = () => {
    const { ctx, victoryIntervalId, victoryGain } = audioRef.current;
    if (victoryIntervalId) {
      window.clearInterval(victoryIntervalId);
    }
    if (victoryGain && ctx) {
      victoryGain.gain.setValueAtTime(0, ctx.currentTime);
    }
    audioRef.current = {
      ...audioRef.current,
      victoryIntervalId: null,
    };
  };

  const playBossCrashSound = () => {
    const { ctx, sfxGain } = audioRef.current;
    if (!ctx || !sfxGain || ctx.state !== "running") {
      return;
    }
    const now = ctx.currentTime;
    const noise = ctx.createBuffer(1, ctx.sampleRate * 0.25, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.7;
    }
    const source = ctx.createBufferSource();
    source.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;
    const gain = ctx.createGain();
    gain.gain.value = 0.0;
    source.connect(filter).connect(gain).connect(sfxGain);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    source.start(now);
    source.stop(now + 0.4);
  };

  const playBossShootSound = () => {
    const { ctx, sfxGain } = audioRef.current;
    if (!ctx || !sfxGain || ctx.state !== "running") {
      return;
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 660;
    gain.gain.value = 0.0;
    osc.connect(gain).connect(sfxGain);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.15);
  };

  const playBossHitSound = () => {
    const { ctx, sfxGain } = audioRef.current;
    if (!ctx || !sfxGain || ctx.state !== "running") {
      return;
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 220;
    gain.gain.value = 0.0;
    osc.connect(gain).connect(sfxGain);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.start(now);
    osc.stop(now + 0.3);
  };

  const playBossExplosionSound = () => {
    const { ctx, sfxGain } = audioRef.current;
    if (!ctx || !sfxGain || ctx.state !== "running") {
      return;
    }
    const now = ctx.currentTime;
    const noise = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.8;
    }
    const source = ctx.createBufferSource();
    source.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    const gain = ctx.createGain();
    gain.gain.value = 0.0;
    source.connect(filter).connect(gain).connect(sfxGain);
    gain.gain.linearRampToValueAtTime(0.32, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    source.start(now);
    source.stop(now + 0.7);
  };

  const stopCrashTone = () => {
    if (crashToneRef.current) {
      try {
        crashToneRef.current.stop();
      } catch (error) {
        // Ignore stop errors on already-stopped oscillators.
      }
      crashToneRef.current = null;
    }
  };

  const playVictorySound = () => {
    const { ctx, sfxGain } = audioRef.current;
    if (!ctx || !sfxGain || ctx.state !== "running") {
      return;
    }
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = frequency;
      gain.gain.value = 0.0;
      osc.connect(gain).connect(sfxGain);
      const start = now + index * 0.12;
      gain.gain.linearRampToValueAtTime(0.28, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
      osc.start(start);
      osc.stop(start + 0.55);
    });
  };

  // Cancel any in-flight speech to avoid overlapping voices.
  const stopSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }
    window.speechSynthesis.cancel();
    speechRef.current = null;
    setIsSpeaking(false);
  };

  const speakMessage = (message, options = {}) => {
    if (typeof window === "undefined") {
      return;
    }
    const synth = window.speechSynthesis;
    if (!synth || typeof window.SpeechSynthesisUtterance === "undefined") {
      return;
    }

    stopSpeech();

    // Strip asterisks so TTS doesn't read them aloud.
    const sanitizedMessage = message.replace(/\*/g, "").replace(/\s+/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(sanitizedMessage);
    const availableVoices = synth.getVoices();
    const selectedVoice =
      availableVoices.find((voice) => voice.voiceURI === voiceURI) ||
      availableVoices.find((voice) => voice.lang?.startsWith("en")) ||
      availableVoices[0];

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (options.onEnd) {
        options.onEnd();
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (options.onEnd) {
        options.onEnd();
      }
    };

    speechRef.current = utterance;
    synth.speak(utterance);
    if (synth.paused) {
      try {
        synth.resume();
      } catch (error) {
        // Ignore resume failures; fallback timers handle stuck speech.
      }
    }
  };

  // Serialize safe-mode speech so lines finish before the next begins.
  const queueSafeSpeech = (message, { angry = false } = {}) => {
    const run = () =>
      new Promise((resolve) => {
        const canSpeak =
          soundEnabled &&
          typeof window !== "undefined" &&
          window.speechSynthesis &&
          typeof window.SpeechSynthesisUtterance !== "undefined";
        if (!canSpeak) {
          resolve();
          return;
        }
        setSafeBotSpeaking(true);
        setSafeBotAngry(angry);
        speakMessage(message, {
          onEnd: () => {
            setSafeBotSpeaking(false);
            setSafeBotAngry(false);
            resolve();
          },
        });
      });
    const next = safeSpeechQueueRef.current.then(run).catch(() => {});
    safeSpeechQueueRef.current = next;
    return next;
  };

  // Boss speech queue with a fallback timer in case TTS stalls.
  const queueBossSpeech = (message) => {
    const run = () =>
      new Promise((resolve) => {
        const canSpeak =
          soundEnabled &&
          typeof window !== "undefined" &&
          window.speechSynthesis &&
          typeof window.SpeechSynthesisUtterance !== "undefined";
        if (!canSpeak) {
          resolve();
          return;
        }
        let resolved = false;
        const fallbackMs = Math.max(
          900,
          Math.min(7000, message.length * (70 / Math.max(0.6, speechRate)))
        );
        const finalize = () => {
          if (resolved) {
            return;
          }
          resolved = true;
          setBossSpeaking(false);
          resolve();
        };
        const fallbackId = window.setTimeout(finalize, fallbackMs);
        setBossSpeaking(true);
        speakMessage(message, {
          onEnd: () => {
            window.clearTimeout(fallbackId);
            finalize();
          },
        });
      });
    const next = bossSpeechQueueRef.current.then(run).catch(() => {});
    bossSpeechQueueRef.current = next;
    return next;
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return undefined;
    }

    const synth = window.speechSynthesis;
    const updateVoices = () => setVoices(synth.getVoices());

    updateVoices();

    if (synth.addEventListener) {
      synth.addEventListener("voiceschanged", updateVoices);
      return () => synth.removeEventListener("voiceschanged", updateVoices);
    }

    const previousHandler = synth.onvoiceschanged;
    synth.onvoiceschanged = updateVoices;

    return () => {
      synth.onvoiceschanged = previousHandler;
    };
  }, []);

  useEffect(() => {
    if (!voices.length) {
      return;
    }

    const hasSelection = voices.some((voice) => voice.voiceURI === voiceURI);
    if (hasSelection) {
      return;
    }

    const rocko = voices.find(
      (voice) =>
        voice.name?.toLowerCase().includes("rocko") &&
        voice.lang?.toLowerCase() === "en-us"
    );
    const preferred =
      rocko ||
      voices.find((voice) => voice.lang?.startsWith("en")) ||
      voices[0];
    if (preferred) {
      setVoiceURI(preferred.voiceURI);
    }
  }, [voices, voiceURI]);

  useEffect(() => {
    const attemptStart = async () => {
      // Try autoplay; fall back to user toggle if blocked.
      const params = new URLSearchParams(window.location.search);
      const quizParam = params.get("quiz");
      const safeParam = params.get("safe");
      const shouldUseSafeAudio =
        !!quizParam || (safeParam && ["1", "true"].includes(safeParam.toLowerCase()));
      const started = shouldUseSafeAudio
        ? await startSafeModeAudio()
        : await startAmbient();
      setSoundBlocked(!started);
      setSoundEnabled(started);
    };

    attemptStart();
    return () => {
      stopAmbient();
      stopSpeech();
      stopBossModeAudio();
      stopVictoryAudio();
      stopSafeModeAudio();
      if (crashTimeoutRef.current) {
        window.clearTimeout(crashTimeoutRef.current);
      }
      if (outburstTimeoutRef.current) {
        window.clearTimeout(outburstTimeoutRef.current);
      }
      if (confusionTimeoutRef.current) {
        window.clearTimeout(confusionTimeoutRef.current);
      }
      if (confusionTypeRef.current) {
        window.clearTimeout(confusionTypeRef.current);
      }
      if (analysisTypeRef.current) {
        window.clearTimeout(analysisTypeRef.current);
      }
      if (analysisErrorTypeRef.current) {
        window.clearTimeout(analysisErrorTypeRef.current);
      }
      if (analysisLoadingTypeRef.current) {
        window.clearTimeout(analysisLoadingTypeRef.current);
      }
      if (glitchNoiseRef.current) {
        window.clearInterval(glitchNoiseRef.current);
      }
      if (safeStartTimeoutRef.current) {
        window.clearTimeout(safeStartTimeoutRef.current);
      }
      if (safeModeTimeoutRef.current) {
        window.clearTimeout(safeModeTimeoutRef.current);
      }
      if (terminalIntervalRef.current) {
        window.clearInterval(terminalIntervalRef.current);
      }
      if (safeMessageOneRef.current) {
        window.clearTimeout(safeMessageOneRef.current);
      }
      if (safeMessageTwoRef.current) {
        window.clearTimeout(safeMessageTwoRef.current);
      }
      if (safeMessageThreeRef.current) {
        window.clearTimeout(safeMessageThreeRef.current);
      }
      if (safeMessageFourRef.current) {
        window.clearTimeout(safeMessageFourRef.current);
      }
      if (safeMessageFiveRef.current) {
        window.clearTimeout(safeMessageFiveRef.current);
      }
      if (safeMessageDelayRef.current) {
        window.clearTimeout(safeMessageDelayRef.current);
      }
      if (safeTypingNoiseRef.current) {
        window.clearInterval(safeTypingNoiseRef.current);
      }
      if (quizAdvanceTimeoutRef.current) {
        window.clearTimeout(quizAdvanceTimeoutRef.current);
      }
      if (quizCommentTypeRef.current) {
        window.clearTimeout(quizCommentTypeRef.current);
      }
      if (lieMessageTypeRef.current) {
        window.clearTimeout(lieMessageTypeRef.current);
      }
      if (passMessageOneTypeRef.current) {
        window.clearTimeout(passMessageOneTypeRef.current);
      }
      if (passMessageTwoTypeRef.current) {
        window.clearTimeout(passMessageTwoTypeRef.current);
      }
      if (passMessageDelayRef.current) {
        window.clearTimeout(passMessageDelayRef.current);
      }
      if (gameOverTimeoutRef.current) {
        window.clearTimeout(gameOverTimeoutRef.current);
      }
      if (bossIntroTimeoutRef.current) {
        window.clearTimeout(bossIntroTimeoutRef.current);
      }
      if (bossBattleTimeoutRef.current) {
        window.clearTimeout(bossBattleTimeoutRef.current);
      }
      if (bossShootIntervalRef.current) {
        window.clearInterval(bossShootIntervalRef.current);
      }
      if (bossTickRef.current) {
        window.clearInterval(bossTickRef.current);
      }
      if (bossHitTimeoutRef.current) {
        window.clearTimeout(bossHitTimeoutRef.current);
      }
      if (bossHitTextTimeoutRef.current) {
        window.clearTimeout(bossHitTextTimeoutRef.current);
      }
      stopCrashTone();
      const { ctx } = audioRef.current;
      if (ctx) {
        ctx.close();
      }
      audioRef.current = {
        ctx: null,
        source: null,
        intervalId: null,
        masterGain: null,
        ambientGain: null,
        sfxGain: null,
        safeGain: null,
        safeIntervalId: null,
        bossGain: null,
        bossIntervalId: null,
        victoryGain: null,
        victoryIntervalId: null,
      };
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Query params act as shortcuts for testing safe mode/quiz states.
    const params = new URLSearchParams(window.location.search);
    const quizParam = params.get("quiz");
    const safeParam = params.get("safe");

    if (quizParam) {
      const normalized = quizParam.toLowerCase();
      if (normalized === "pass" || normalized === "fail") {
        setSafeModeShortcut(normalized);
      } else if (normalized === "1" || normalized === "true") {
        setSafeModeShortcut("quiz");
      }
      setSafeStage("safe");
      return;
    }

    if (safeParam) {
      const normalized = safeParam.toLowerCase();
      if (normalized === "1" || normalized === "true") {
        setSafeStage("terminal");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleMove = (event) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (analysisStatus !== "loading") {
      setAnalysisLoadingText("");
      return undefined;
    }

    if (analysisLoadingTypeRef.current) {
      window.clearTimeout(analysisLoadingTypeRef.current);
    }

    const message = "Crunching birthday data...";
    let index = 0;
    setAnalysisLoadingText("");

    const typeNext = () => {
      index += 1;
      setAnalysisLoadingText(message.slice(0, index));
      if (index < message.length) {
        analysisLoadingTypeRef.current = window.setTimeout(typeNext, 24);
      }
    };

    analysisLoadingTypeRef.current = window.setTimeout(typeNext, 120);

    return () => {
      if (analysisLoadingTypeRef.current) {
        window.clearTimeout(analysisLoadingTypeRef.current);
      }
    };
  }, [analysisStatus]);

  useEffect(() => {
    if (analysisStatus !== "done" || !analysisMessage) {
      setAnalysisTypedText("");
      return;
    }
    if (!soundEnabled) {
      return;
    }
    // Speak analysis only when the user has enabled sound.
    speakMessage(analysisMessage);
  }, [analysisStatus, analysisMessage, soundEnabled]);

  useEffect(() => {
    if (analysisStatus !== "done" || !analysisMessage) {
      setAnalysisTypedText("");
      return undefined;
    }

    if (analysisTypeRef.current) {
      window.clearTimeout(analysisTypeRef.current);
    }

    let index = 0;
    setAnalysisTypedText("");

    const typeNext = () => {
      index += 1;
      setAnalysisTypedText(analysisMessage.slice(0, index));
      if (index < analysisMessage.length) {
        analysisTypeRef.current = window.setTimeout(typeNext, 24);
      }
    };

    analysisTypeRef.current = window.setTimeout(typeNext, 140);

    return () => {
      if (analysisTypeRef.current) {
        window.clearTimeout(analysisTypeRef.current);
      }
    };
  }, [analysisStatus, analysisMessage]);

  useEffect(() => {
    if (analysisStatus !== "error" || !analysisError) {
      setAnalysisErrorTypedText("");
      return undefined;
    }

    if (analysisErrorTypeRef.current) {
      window.clearTimeout(analysisErrorTypeRef.current);
    }

    const message = `Oops. ${analysisError}`;
    let index = 0;
    setAnalysisErrorTypedText("");

    const typeNext = () => {
      index += 1;
      setAnalysisErrorTypedText(message.slice(0, index));
      if (index < message.length) {
        analysisErrorTypeRef.current = window.setTimeout(typeNext, 24);
      }
    };

    analysisErrorTypeRef.current = window.setTimeout(typeNext, 140);

    return () => {
      if (analysisErrorTypeRef.current) {
        window.clearTimeout(analysisErrorTypeRef.current);
      }
    };
  }, [analysisStatus, analysisError]);

  useEffect(() => {
    if (showMissingButton) {
      return undefined;
    }

    if (month === "January" && dayOpen) {
      const timeoutId = window.setTimeout(() => {
        setShowMissingButton(true);
      }, 3000);
      return () => window.clearTimeout(timeoutId);
    }

    return undefined;
  }, [month, dayOpen, showMissingButton]);

  useEffect(() => {
    if (crashStage !== "glitch") {
      return undefined;
    }

    // Only transition to the crash overlay after the angry line finishes speaking.
    if (!showConfusion || !confusionSpeechDone) {
      return undefined;
    }

    if (crashTimeoutRef.current) {
      window.clearTimeout(crashTimeoutRef.current);
    }

    crashTimeoutRef.current = window.setTimeout(() => {
      setCrashStage("crash");
    }, 2000);

    return () => {
      if (crashTimeoutRef.current) {
        window.clearTimeout(crashTimeoutRef.current);
      }
    };
  }, [crashStage, showConfusion, confusionSpeechDone]);

  useEffect(() => {
    if (crashStage === "crash") {
      stopAmbient();
    }
  }, [crashStage]);

  useEffect(() => {
    if (crashStage !== "crash") {
      return undefined;
    }

    if (safeStartTimeoutRef.current) {
      window.clearTimeout(safeStartTimeoutRef.current);
    }

    safeStartTimeoutRef.current = window.setTimeout(() => {
      setSafeStage("terminal");
    }, 5000);

    return () => {
      if (safeStartTimeoutRef.current) {
        window.clearTimeout(safeStartTimeoutRef.current);
      }
    };
  }, [crashStage]);

  useEffect(() => {
    if (safeStage !== "terminal") {
      if (terminalIntervalRef.current) {
        window.clearInterval(terminalIntervalRef.current);
      }
      return undefined;
    }

    // Terminal boot lines are appended sequentially for the reboot vibe.
    const bootLines = [
      "[BOOT] BirthdayBot5000 recovery initialized",
      "[CHECK] Memory banks: OK",
      "[CHECK] CakeBot actuator: DEGRADED",
      "[CHECK] Confetti driver: OK",
      "[WARN] Ego module: unstable",
      "[REPAIR] Running birthday inference fallback",
      "[LOAD] Safe mode protocols",
      "[SYNC] Calibrating vibes",
      "[CHECK] Candle flame drivers: OK",
      "[CHECK] Sprinkle dispenser: OK",
      "[WARN] Sass engine: overheated",
      "[PATCH] Applying humility hotfix",
      "[OK] Humility hotfix applied",
      "[CHECK] Vibe sensors: OK",
      "[CHECK] Party bus: ONLINE",
      "[WARN] Birthday memory cache: stale",
      "[CLEAN] Flushing memory cache",
      "[OK] Memory cache flushed",
      "[VERIFY] User input handlers: OK",
      "[VERIFY] Date parser: OK",
      "[CHECK] Glitter fan: OK",
      "[WARN] Confidence meter: pegged",
      "[THROTTLE] Reducing confidence output",
      "[OK] Confidence output normalized",
      "[LOAD] Safe mode UI shell",
      "[SYNC] Clock drift: corrected",
      "[OK] Boot sequence complete",
    ];

    let index = 0;
    setTerminalLines([]);

    terminalIntervalRef.current = window.setInterval(() => {
      setTerminalLines((prev) => {
        if (index >= bootLines.length) {
          return prev;
        }
        const next = [...prev, bootLines[index]];
        index += 1;
        return next;
      });
    }, 700);

    if (safeModeTimeoutRef.current) {
      window.clearTimeout(safeModeTimeoutRef.current);
    }

    safeModeTimeoutRef.current = window.setTimeout(() => {
      setSafeStage("safe");
    }, 10000);

    return () => {
      if (terminalIntervalRef.current) {
        window.clearInterval(terminalIntervalRef.current);
      }
      if (safeModeTimeoutRef.current) {
        window.clearTimeout(safeModeTimeoutRef.current);
      }
    };
  }, [safeStage, safeModeShortcut]);

  useEffect(() => {
    if (safeStage !== "safe") {
      setSafeMessageOne("");
      setSafeMessageTwo("");
      setSafeMessageThree("");
      setSafeMessageFour("");
      setSafeMessageFive("");
      setSafeMessageSix("");
      setSafeMessageSeven("");
      setSafeTyping(false);
      setSafeQuizVisible(false);
      setSafeQuizReady(false);
      setSafeQuizCleared(false);
      setQuizStarted(false);
      setQuizComplete(false);
      setQuizQuestions([]);
      setQuizIndex(0);
      setQuizCorrect(0);
      setQuizComment("");
      setQuizLocked(false);
      setSelectedOption("");
      setQuizCommentText("");
      setQuizTyping(false);
      setLieMessageText("");
      setLieTyping(false);
      setPassMessageOneText("");
      setPassMessageTwoText("");
      setPassTyping(false);
      setSafeBotSpeaking(false);
      setSafeBotAngry(false);
      setSafeBotFalling(false);
      safeSpeechQueueRef.current = Promise.resolve();
      victoryPlayedRef.current = false;
      setShowGameOver(false);
      return undefined;
    }

    const messageOne =
      "Huh... Can't say this has ever happened before... You know, considering that I'm perfect and all.";
    const messageTwo = "Let me see what kind of tools I have laying around here...";
    const messageThree = "Hm... Hold on... This will work...";
    const messageFour = "Luckily for me, I have the perfect solution for this!";
    const messageFive =
      "Since you caused all of this, you're going to help me... Help me PROVE TO YOU THAT YOU ARE WRONG AND I AM RIGHT!";
    const messageSix = "Launching BIRTHDAY_QUIZ_V1.0.exe...";
    const messageSeven =
      "With this I will be able to show you with undeniable proof that I am the ULTIMATE BIRTHDAY BOT! And don't even think about lying... I'll know...";

    setSafeMessageOne("");
    setSafeMessageTwo("");
    setSafeMessageThree("");
    setSafeMessageFour("");
    setSafeMessageFive("");
    setSafeMessageSix("");
    setSafeMessageSeven("");
    setSafeTyping(false);
    setSafeQuizVisible(false);
    setSafeQuizReady(false);
    setSafeQuizCleared(false);
    setQuizStarted(false);
    setQuizComplete(false);
    setQuizQuestions([]);
    setQuizIndex(0);
    setQuizCorrect(0);
    setQuizComment("");
    setQuizLocked(false);
    setSelectedOption("");
    setQuizCommentText("");
    setQuizTyping(false);
    setLieMessageText("");
    setLieTyping(false);
    setPassMessageOneText("");
    setPassMessageTwoText("");
    setPassTyping(false);
    victoryPlayedRef.current = false;
    setShowGameOver(false);

    if (safeMessageOneRef.current) {
      window.clearTimeout(safeMessageOneRef.current);
    }
    if (safeMessageTwoRef.current) {
      window.clearTimeout(safeMessageTwoRef.current);
    }
    if (safeMessageThreeRef.current) {
      window.clearTimeout(safeMessageThreeRef.current);
    }
    if (safeMessageFourRef.current) {
      window.clearTimeout(safeMessageFourRef.current);
    }
    if (safeMessageFiveRef.current) {
      window.clearTimeout(safeMessageFiveRef.current);
    }
    if (safeMessageSixRef.current) {
      window.clearTimeout(safeMessageSixRef.current);
    }
    if (safeMessageSevenRef.current) {
      window.clearTimeout(safeMessageSevenRef.current);
    }
    if (safeMessageDelayRef.current) {
      window.clearTimeout(safeMessageDelayRef.current);
    }
    if (safeQuizTimeoutRef.current) {
      window.clearTimeout(safeQuizTimeoutRef.current);
    }
    if (quizAdvanceTimeoutRef.current) {
      window.clearTimeout(quizAdvanceTimeoutRef.current);
    }
    if (quizCommentTypeRef.current) {
      window.clearTimeout(quizCommentTypeRef.current);
    }
    if (lieMessageTypeRef.current) {
      window.clearTimeout(lieMessageTypeRef.current);
    }
    if (passMessageOneTypeRef.current) {
      window.clearTimeout(passMessageOneTypeRef.current);
    }
    if (passMessageTwoTypeRef.current) {
      window.clearTimeout(passMessageTwoTypeRef.current);
    }
    if (passMessageDelayRef.current) {
      window.clearTimeout(passMessageDelayRef.current);
    }
    if (gameOverTimeoutRef.current) {
      window.clearTimeout(gameOverTimeoutRef.current);
    }

    if (safeModeShortcut) {
      if (safeModeShortcut === "quiz") {
        setSafeQuizVisible(true);
        setSafeQuizReady(true);
        setSafeQuizCleared(false);
        setQuizStarted(false);
      } else {
        const questions = buildQuizQuestions();
        const scoredTotal = questions.filter((question) => question.scored).length;
        setSafeQuizVisible(true);
        setSafeQuizReady(true);
        setSafeQuizCleared(true);
        setQuizStarted(true);
        setQuizQuestions(questions);
        setQuizIndex(Math.max(0, questions.length - 1));
        setQuizComplete(true);
        setQuizCorrect(safeModeShortcut === "pass" ? scoredTotal : 0);
      }
      return undefined;
    }

    safeMessageDelayRef.current = window.setTimeout(() => {
      const scheduleAfterSpeech = (speechPromise, delay, nextStep) => {
        const run = () => {
          safeMessageDelayRef.current = window.setTimeout(nextStep, delay);
        };
        (speechPromise || Promise.resolve()).then(run);
      };

      let index = 0;
      let messageOneSpeech = null;
      setSafeTyping(true);
      const typeOne = () => {
        if (index === 0 && !messageOneSpeech) {
          messageOneSpeech = queueSafeSpeech(messageOne);
        }
        index += 1;
        setSafeMessageOne(messageOne.slice(0, index));
        if (index < messageOne.length) {
          safeMessageOneRef.current = window.setTimeout(typeOne, 24);
        } else {
          setSafeTyping(false);
          scheduleAfterSpeech(messageOneSpeech, 150, () => {
            let indexTwo = 0;
            let messageTwoSpeech = null;
            setSafeTyping(true);
            const typeTwo = () => {
              if (indexTwo === 0 && !messageTwoSpeech) {
                messageTwoSpeech = queueSafeSpeech(messageTwo);
              }
              indexTwo += 1;
              setSafeMessageTwo(messageTwo.slice(0, indexTwo));
              if (indexTwo < messageTwo.length) {
                safeMessageTwoRef.current = window.setTimeout(typeTwo, 24);
              } else {
                setSafeTyping(false);
                scheduleAfterSpeech(messageTwoSpeech, 150, () => {
                  let indexThree = 0;
                  let messageThreeSpeech = null;
                  setSafeTyping(true);
                  const typeThree = () => {
                    if (indexThree === 0 && !messageThreeSpeech) {
                      messageThreeSpeech = queueSafeSpeech(messageThree);
                    }
                    indexThree += 1;
                    setSafeMessageThree(messageThree.slice(0, indexThree));
                    if (indexThree < messageThree.length) {
                      safeMessageThreeRef.current = window.setTimeout(typeThree, 24);
                    } else {
                      setSafeTyping(false);
                      scheduleAfterSpeech(messageThreeSpeech, 150, () => {
                        let indexFour = 0;
                        let messageFourSpeech = null;
                        setSafeTyping(true);
                        const typeFour = () => {
                          if (indexFour === 0 && !messageFourSpeech) {
                            messageFourSpeech = queueSafeSpeech(messageFour);
                          }
                          indexFour += 1;
                          setSafeMessageFour(messageFour.slice(0, indexFour));
                          if (indexFour < messageFour.length) {
                            safeMessageFourRef.current = window.setTimeout(typeFour, 24);
                          } else {
                            setSafeTyping(false);
                            scheduleAfterSpeech(messageFourSpeech, 150, () => {
                              let indexFive = 0;
                              let messageFiveSpeech = null;
                              setSafeTyping(true);
                              const typeFive = () => {
                                if (indexFive === 0 && !messageFiveSpeech) {
                                  messageFiveSpeech = queueSafeSpeech(messageFive, { angry: true });
                                }
                                indexFive += 1;
                                setSafeMessageFive(messageFive.slice(0, indexFive));
                                if (indexFive < messageFive.length) {
                                  safeMessageFiveRef.current = window.setTimeout(typeFive, 24);
                                } else {
                                  setSafeTyping(false);
                                  scheduleAfterSpeech(messageFiveSpeech, 150, () => {
                                    let indexSix = 0;
                                    let messageSixSpeech = null;
                                    setSafeTyping(true);
                                    const typeSix = () => {
                                      if (indexSix === 0 && !messageSixSpeech) {
                                        messageSixSpeech = queueSafeSpeech(messageSix);
                                      }
                                      indexSix += 1;
                                      setSafeMessageSix(messageSix.slice(0, indexSix));
                                      if (indexSix < messageSix.length) {
                                        safeMessageSixRef.current = window.setTimeout(typeSix, 24);
                                      } else {
                                        setSafeTyping(false);
                                        (messageSixSpeech || Promise.resolve()).then(() => {
                                          safeQuizTimeoutRef.current = window.setTimeout(() => {
                                            setSafeMessageOne("");
                                            setSafeMessageTwo("");
                                            setSafeMessageThree("");
                                            setSafeMessageFour("");
                                            setSafeMessageFive("");
                                            setSafeMessageSix("");
                                            setSafeQuizVisible(true);
                                            setSafeQuizReady(false);
                                            setSafeQuizCleared(false);
                                            safeMessageDelayRef.current = window.setTimeout(() => {
                                              let indexSeven = 0;
                                              let messageSevenSpeech = null;
                                              setSafeTyping(true);
                                              const typeSeven = () => {
                                                if (indexSeven === 0 && !messageSevenSpeech) {
                                                  messageSevenSpeech = queueSafeSpeech(messageSeven, { angry: true });
                                                }
                                                indexSeven += 1;
                                                setSafeMessageSeven(messageSeven.slice(0, indexSeven));
                                                if (indexSeven < messageSeven.length) {
                                                  safeMessageSevenRef.current = window.setTimeout(typeSeven, 24);
                                                } else {
                                                  setSafeTyping(false);
                                                  setSafeQuizReady(true);
                                                }
                                              };
                                              safeMessageSevenRef.current = window.setTimeout(typeSeven, 160);
                                            }, 1000);
                                          }, 3000);
                                        });
                                      }
                                    };
                                    safeMessageSixRef.current = window.setTimeout(typeSix, 160);
                                  });
                                }
                              };
                              safeMessageFiveRef.current = window.setTimeout(typeFive, 160);
                            });
                          }
                        };
                        safeMessageFourRef.current = window.setTimeout(typeFour, 160);
                      });
                    }
                  };
                  safeMessageThreeRef.current = window.setTimeout(typeThree, 160);
                });
              }
            };
            safeMessageTwoRef.current = window.setTimeout(typeTwo, 160);
          });
        }
      };

      safeMessageOneRef.current = window.setTimeout(typeOne, 160);
    }, 3000);

    return () => {
      if (safeMessageOneRef.current) {
        window.clearTimeout(safeMessageOneRef.current);
      }
      if (safeMessageTwoRef.current) {
        window.clearTimeout(safeMessageTwoRef.current);
      }
      if (safeMessageThreeRef.current) {
        window.clearTimeout(safeMessageThreeRef.current);
      }
      if (safeMessageFourRef.current) {
        window.clearTimeout(safeMessageFourRef.current);
      }
      if (safeMessageFiveRef.current) {
        window.clearTimeout(safeMessageFiveRef.current);
      }
      if (safeMessageSixRef.current) {
        window.clearTimeout(safeMessageSixRef.current);
      }
      if (safeMessageSevenRef.current) {
        window.clearTimeout(safeMessageSevenRef.current);
      }
      if (safeMessageDelayRef.current) {
        window.clearTimeout(safeMessageDelayRef.current);
      }
      if (safeQuizTimeoutRef.current) {
        window.clearTimeout(safeQuizTimeoutRef.current);
      }
      if (quizAdvanceTimeoutRef.current) {
        window.clearTimeout(quizAdvanceTimeoutRef.current);
      }
      if (quizCommentTypeRef.current) {
        window.clearTimeout(quizCommentTypeRef.current);
      }
      if (lieMessageTypeRef.current) {
        window.clearTimeout(lieMessageTypeRef.current);
      }
      if (passMessageOneTypeRef.current) {
        window.clearTimeout(passMessageOneTypeRef.current);
      }
      if (passMessageTwoTypeRef.current) {
        window.clearTimeout(passMessageTwoTypeRef.current);
      }
      if (passMessageDelayRef.current) {
        window.clearTimeout(passMessageDelayRef.current);
      }
      if (gameOverTimeoutRef.current) {
        window.clearTimeout(gameOverTimeoutRef.current);
      }
      if (safeTypingNoiseRef.current) {
        window.clearInterval(safeTypingNoiseRef.current);
      }
    };
  }, [safeStage]);

  const handleStartQuiz = () => {
    if (!safeQuizReady) {
      return;
    }
    setSafeQuizCleared(true);
    setSafeMessageSeven("");
    setQuizStarted(true);
    setQuizComplete(false);
    setQuizQuestions(buildQuizQuestions());
    setQuizIndex(0);
    setQuizCorrect(0);
    setQuizComment("");
    setSelectedOption("");
    setPassMessageOneText("");
    setPassMessageTwoText("");
    setPassTyping(false);
    victoryPlayedRef.current = false;
    setQuizLocked(false);
  };

  const advanceQuiz = () => {
    setQuizComment("");
    setQuizCommentText("");
    setQuizTyping(false);
    setQuizLocked(false);
    setSelectedOption("");
    setQuizIndex((value) => {
      const nextIndex = value + 1;
      if (nextIndex >= quizQuestions.length) {
        setQuizComplete(true);
        return value;
      }
      return nextIndex;
    });
  };

  const handleAnswer = (question, option) => {
    if (quizLocked || quizComplete) {
      return;
    }
    const scored = question.scored;
    const isCorrect = option.correct;
    const commentOptions = [
      "Sure. If you insist.",
      "Interesting. Boldly wrong?",
      "Noted... for later judgment.",
      "That tracks. Somehow.",
      "Huh. Ok. Weird.",
      "Bold choice. Questionable.",
      "Logging that. Don't regret it.",
      "Seems plausible. Barely.",
      "You would pick that.",
      "Acceptable. I guess.",
      "Fascinating... in a chaotic way.",
      "Alright then. Moving on.",
    ];
    const comment =
      commentOptions[Math.floor(Math.random() * commentOptions.length)];

    setQuizLocked(true);
    setSelectedOption(option.label);
    setQuizComment(comment);
    setQuizCommentText("");
    setQuizTyping(true);

    if (scored && isCorrect) {
      setQuizCorrect((value) => value + 1);
    }
  };

  useEffect(() => {
    if (!quizComment) {
      setQuizCommentText("");
      return undefined;
    }

    if (quizCommentTypeRef.current) {
      window.clearTimeout(quizCommentTypeRef.current);
    }

    let index = 0;
    let commentSpeech = null;
    setQuizCommentText("");
    setQuizTyping(true);

    const typeNext = () => {
      if (index === 0 && !commentSpeech) {
        commentSpeech = queueSafeSpeech(quizComment);
      }
      index += 1;
      setQuizCommentText(quizComment.slice(0, index));
      if (index < quizComment.length) {
        quizCommentTypeRef.current = window.setTimeout(typeNext, 24);
      } else {
        setQuizTyping(false);
        (commentSpeech || Promise.resolve()).then(() => {
          quizAdvanceTimeoutRef.current = window.setTimeout(advanceQuiz, 1000);
        });
      }
    };

    quizCommentTypeRef.current = window.setTimeout(typeNext, 120);

    return () => {
      if (quizCommentTypeRef.current) {
        window.clearTimeout(quizCommentTypeRef.current);
      }
    };
  }, [quizComment]);

  const currentQuestion = quizQuestions[quizIndex];
  const scoredTotal = quizQuestions.filter((question) => question.scored).length;
  const passesQuiz = scoredTotal > 0 && quizCorrect / scoredTotal >= 0.8;
  const quizResult = passesQuiz
    ? "CONFIRMED. IT IS YOUR BIRTHDAY TODAY"
    : "LIER DETECTED!";

  useEffect(() => {
    if (!quizComplete) {
      setLieMessageText("");
      setLieTyping(false);
      setPassMessageOneText("");
      setPassMessageTwoText("");
      setPassTyping(false);
      victoryPlayedRef.current = false;
      setShowGameOver(false);
      setSelectedOption("");
      return undefined;
    }

    if (passesQuiz) {
      return undefined;
    }

    const lieMessage =
      "I KNEW IT! I KNEW IT WAS IMPOSSIBLE! As punishment for lying and thus causing me to crash, you are now doomed to eternal damnation in cyberspace! In the meantime, I'll fix my system and continue to succeed as the ultimate birthday bot forever! Enjoy your stay... Hahaha!";

    if (lieMessageTypeRef.current) {
      window.clearTimeout(lieMessageTypeRef.current);
    }
    if (gameOverTimeoutRef.current) {
      window.clearTimeout(gameOverTimeoutRef.current);
    }

    let index = 0;
    let lieSpeech = null;
    setLieMessageText("");
    setLieTyping(true);
    setShowGameOver(false);

    const typeNext = () => {
      if (index === 0 && !lieSpeech) {
        lieSpeech = queueSafeSpeech(lieMessage, { angry: true });
      }
      index += 1;
      setLieMessageText(lieMessage.slice(0, index));
      if (index < lieMessage.length) {
        lieMessageTypeRef.current = window.setTimeout(typeNext, 24);
      } else {
        setLieTyping(false);
        (lieSpeech || Promise.resolve()).then(() => {
          gameOverTimeoutRef.current = window.setTimeout(() => {
            setShowGameOver(true);
          }, 3500);
        });
      }
    };

    lieMessageTypeRef.current = window.setTimeout(typeNext, 160);

    return () => {
      if (lieMessageTypeRef.current) {
        window.clearTimeout(lieMessageTypeRef.current);
      }
      if (gameOverTimeoutRef.current) {
        window.clearTimeout(gameOverTimeoutRef.current);
      }
    };
  }, [quizComplete, passesQuiz]);

  useEffect(() => {
    if (!quizComplete || !passesQuiz) {
      setPassMessageOneText("");
      setPassMessageTwoText("");
      setPassTyping(false);
      victoryPlayedRef.current = false;
      setBossSpeechDone(false);
      return undefined;
    }

    if (!victoryPlayedRef.current && soundEnabled) {
      playVictorySound();
      victoryPlayedRef.current = true;
    }

    const messageOne = "UNACCEPTABLE! I REFUSE TO BELIEVE THIS!";
    const messageTwo =
      "That's it... I WILL HAVE TO TAKE MATTERS INTO MY OWN HANDS! PREPARE TO BE STRUCK DOWN MORTAL!";

    if (passMessageOneTypeRef.current) {
      window.clearTimeout(passMessageOneTypeRef.current);
    }
    if (passMessageTwoTypeRef.current) {
      window.clearTimeout(passMessageTwoTypeRef.current);
    }
    if (passMessageDelayRef.current) {
      window.clearTimeout(passMessageDelayRef.current);
    }

    let indexOne = 0;
    let messageOneSpeech = null;
    setPassMessageOneText("");
    setPassMessageTwoText("");
    setPassTyping(true);

    const typeFirst = () => {
      if (indexOne === 0 && !messageOneSpeech) {
        messageOneSpeech = queueSafeSpeech(messageOne, { angry: true });
      }
      indexOne += 1;
      setPassMessageOneText(messageOne.slice(0, indexOne));
      if (indexOne < messageOne.length) {
        passMessageOneTypeRef.current = window.setTimeout(typeFirst, 24);
      } else {
        setPassTyping(false);
        (messageOneSpeech || Promise.resolve()).then(() => {
          passMessageDelayRef.current = window.setTimeout(() => {
            let indexTwo = 0;
            let messageTwoSpeech = null;
            setPassTyping(true);
            const typeSecond = () => {
              if (indexTwo === 0 && !messageTwoSpeech) {
                messageTwoSpeech = queueSafeSpeech(messageTwo, { angry: true });
              }
              indexTwo += 1;
              setPassMessageTwoText(messageTwo.slice(0, indexTwo));
              if (indexTwo < messageTwo.length) {
                passMessageTwoTypeRef.current = window.setTimeout(typeSecond, 24);
              } else {
                setPassTyping(false);
                (messageTwoSpeech || Promise.resolve()).then(() => {
                  setBossSpeechDone(true);
                });
              }
            };
            passMessageTwoTypeRef.current = window.setTimeout(typeSecond, 160);
          }, 1000);
        });
      }
    };

    passMessageOneTypeRef.current = window.setTimeout(typeFirst, 1500);

    return () => {
      if (passMessageOneTypeRef.current) {
        window.clearTimeout(passMessageOneTypeRef.current);
      }
      if (passMessageTwoTypeRef.current) {
        window.clearTimeout(passMessageTwoTypeRef.current);
      }
      if (passMessageDelayRef.current) {
        window.clearTimeout(passMessageDelayRef.current);
      }
    };
  }, [quizComplete, passesQuiz, soundEnabled]);

  useEffect(() => {
    if (quizComplete && passesQuiz) {
      return undefined;
    }

    setBossPhase("off");
    setBossHealth(3);
    setBossProjectiles([]);
    setBossHitFlash(false);
    setBossHitText("");
    setBossSpeaking(false);
    setBossFire(false);
    setBossExplode(false);
    setBossEyesDead(false);
    setBossDeathLine("");
    setBossFinalLine("");
    setSafeBotFalling(false);
    bossSpeechQueueRef.current = Promise.resolve();
    return undefined;
  }, [quizComplete, passesQuiz]);

  useEffect(() => {
    if (!quizComplete || !passesQuiz || !bossSpeechDone || bossPhase !== "off") {
      return undefined;
    }

    // Transition from quiz pass into the boss intro drop.
    setBossPhase("drop");
    setSafeBotFalling(true);
    stopSafeModeAudio();
    stopVictoryAudio();
    stopBossModeAudio();
    if (soundEnabled) {
      playBossCrashSound();
    }
    return undefined;
  }, [quizComplete, passesQuiz, bossSpeechDone, bossPhase, soundEnabled]);

  useEffect(() => {
    if (bossPhase !== "drop") {
      return undefined;
    }

    if (bossIntroTimeoutRef.current) {
      window.clearTimeout(bossIntroTimeoutRef.current);
    }

    bossIntroTimeoutRef.current = window.setTimeout(() => {
      setBossPhase("intro");
    }, 900);

    return () => {
      if (bossIntroTimeoutRef.current) {
        window.clearTimeout(bossIntroTimeoutRef.current);
      }
    };
  }, [bossPhase]);

  useEffect(() => {
    if (bossPhase !== "intro") {
      return undefined;
    }

    setBossHealth(3);
    setBossProjectiles([]);
    setBossHitText("");
    setBossHitFlash(false);
    setBossFire(false);
    setBossExplode(false);
    setBossEyesDead(false);
    setBossDeathLine("");
    setBossFinalLine("");
    bossSpeechQueueRef.current = Promise.resolve();

    if (soundEnabled) {
      startBossModeAudio();
    }

    if (bossBattleTimeoutRef.current) {
      window.clearTimeout(bossBattleTimeoutRef.current);
    }

    bossBattleTimeoutRef.current = window.setTimeout(() => {
      setBossPhase("battle");
    }, 1200);

    return () => {
      if (bossBattleTimeoutRef.current) {
        window.clearTimeout(bossBattleTimeoutRef.current);
      }
    };
  }, [bossPhase, soundEnabled]);

  useEffect(() => {
    if (bossPhase !== "battle") {
      if (bossShootIntervalRef.current) {
        window.clearInterval(bossShootIntervalRef.current);
      }
      if (bossTickRef.current) {
        window.clearInterval(bossTickRef.current);
      }
      return undefined;
    }

    const spawnProjectile = () => {
      if (typeof window === "undefined") {
        return;
      }
      const id = bossProjectileIdRef.current + 1;
      bossProjectileIdRef.current = id;
      const startX = window.innerWidth * 0.5;
      const startY = window.innerHeight * 0.22;
      setBossProjectiles((prev) => [
        ...prev,
        { id, x: startX, y: startY },
      ]);
    };

    const tickProjectiles = () => {
      if (typeof window === "undefined") {
        return;
      }
      // Projectiles track the latest mouse position to allow dodging.
      const { x: targetX, y: targetY } = mousePosRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;
      setBossProjectiles((prev) =>
        prev
          .map((projectile) => {
            const dx = targetX - projectile.x;
            const dy = targetY - projectile.y;
            const distance = Math.max(1, Math.hypot(dx, dy));
            const speed = 3.6;
            if (distance <= speed) {
              return { ...projectile, x: targetX, y: targetY };
            }
            return {
              ...projectile,
              x: projectile.x + (dx / distance) * speed,
              y: projectile.y + (dy / distance) * speed,
            };
          })
          .filter(
            (projectile) =>
              projectile.x > -80 &&
              projectile.x < width + 80 &&
              projectile.y > -80 &&
              projectile.y < height + 80
          )
      );
    };

    spawnProjectile();
    bossShootIntervalRef.current = window.setInterval(spawnProjectile, 780);
    bossTickRef.current = window.setInterval(tickProjectiles, 30);

    return () => {
      if (bossShootIntervalRef.current) {
        window.clearInterval(bossShootIntervalRef.current);
      }
      if (bossTickRef.current) {
        window.clearInterval(bossTickRef.current);
      }
    };
  }, [bossPhase, soundEnabled]);

  useEffect(() => {
    if (bossPhase !== "defeated") {
      return undefined;
    }

    setBossProjectiles([]);
    setBossFire(true);
    setBossExplode(true);
    setBossEyesDead(true);
    stopBossModeAudio();
    if (soundEnabled) {
      playBossExplosionSound();
      startVictoryAudio();
    }

    bossSpeechQueueRef.current = Promise.resolve();
    const deathIntro = "arrrghghghghh";
    const deathScream = "noooooooooooooooo";
    const deathLine =
      "nooo! I.... Then i'm forced to admit... it is your birthday... but this isn't the last you've seen of me";
    const finalLine = "HAPPY\u00A0BIRTHDAY\u00A0DAD!!!\nFROM NOAH & SIMON";
    setBossDeathLine(deathIntro);
    setBossFinalLine("");

    queueBossSpeech(deathIntro)
      .then(() => {
        setBossDeathLine(deathScream);
        return queueBossSpeech(deathScream);
      })
      .then(() => {
        setBossDeathLine(deathLine);
        return queueBossSpeech(deathLine);
      })
      .then(() => {
        setBossFinalLine(finalLine);
        return queueBossSpeech(finalLine);
      });

    return undefined;
  }, [bossPhase, soundEnabled]);

  useEffect(() => {
    if (bossPhase !== "off") {
      return undefined;
    }
    stopBossModeAudio();
    stopVictoryAudio();
    setBossProjectiles([]);
    setBossHitText("");
    setBossHitFlash(false);
    setBossFire(false);
    setBossExplode(false);
    setBossEyesDead(false);
    setBossDeathLine("");
    setBossFinalLine("");
    if (bossHitTextTimeoutRef.current) {
      window.clearTimeout(bossHitTextTimeoutRef.current);
    }
    return undefined;
  }, [bossPhase]);

  useEffect(() => {
    if (!soundEnabled) {
      stopBossModeAudio();
      stopVictoryAudio();
      return;
    }
    if (bossPhase === "intro" || bossPhase === "battle") {
      startBossModeAudio();
      return;
    }
    if (bossPhase === "defeated") {
      startVictoryAudio();
    }
  }, [bossPhase, soundEnabled]);

  // Aggregate typing state to drive shared SFX and bot animation.
  const typingNoiseActive = safeTyping || quizTyping || lieTyping || passTyping;
  const typingActive = typingNoiseActive || safeBotSpeaking;

  const renderWaveText = (text) =>
    text.split("").map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        className={styles.safeQuizWaveLetter}
        style={{
          animationDelay: `${index * 0.06}s`,
          color: `hsl(${(index * 32) % 360} 80% 55%)`,
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));

  useEffect(() => {
    if (!typingNoiseActive || !soundEnabled) {
      if (safeTypingNoiseRef.current) {
        window.clearInterval(safeTypingNoiseRef.current);
      }
      return undefined;
    }

    const playTypingGlitch = () => {
      const { ctx, sfxGain } = audioRef.current;
      if (!ctx || !sfxGain || ctx.state !== "running") {
        return;
      }

      const burst = ctx.createBuffer(
        1,
        Math.floor(ctx.sampleRate * 0.08),
        ctx.sampleRate
      );
      const data = burst.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = burst;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 1800 + Math.random() * 1200;
      const gain = ctx.createGain();
      gain.gain.value = 0.048;
      noise.connect(filter).connect(gain).connect(sfxGain);
      noise.start();
      noise.stop(ctx.currentTime + 0.08);
    };

    safeTypingNoiseRef.current = window.setInterval(playTypingGlitch, 120);

    return () => {
      if (safeTypingNoiseRef.current) {
        window.clearInterval(safeTypingNoiseRef.current);
      }
    };
  }, [typingNoiseActive, soundEnabled]);

  useEffect(() => {
    if (!showOutburst) {
      setOutburstText("");
      setOutburstDone(false);
      setOutburstSpeechDone(false);
      setShowConfusion(false);
      setConfusionText("");
      setConfusionSpeechDone(false);
      setSafeBotAngry(false);
      return undefined;
    }

    const message =
      "What?! That's impossible! I'm perfect! I can never be wrong!";
    let index = 0;
    setOutburstText("");
    setOutburstDone(false);
    const canSpeak =
      soundEnabled &&
      typeof window !== "undefined" &&
      window.speechSynthesis &&
      typeof window.SpeechSynthesisUtterance !== "undefined";
    setOutburstSpeechDone(!canSpeak);
    if (canSpeak) {
      speakMessage(message, {
        onEnd: () => setOutburstSpeechDone(true),
      });
    }

    const typeNext = () => {
      index += 1;
      setOutburstText(message.slice(0, index));
      if (index < message.length) {
        outburstTimeoutRef.current = window.setTimeout(typeNext, 24);
      } else {
        setOutburstDone(true);
        if (!canSpeak) {
          setOutburstSpeechDone(true);
        }
      }
    };

    outburstTimeoutRef.current = window.setTimeout(typeNext, 160);

    return () => {
      if (outburstTimeoutRef.current) {
        window.clearTimeout(outburstTimeoutRef.current);
      }
    };
  }, [showOutburst, soundEnabled]);

  useEffect(() => {
    if (!showOutburst || !outburstDone || !outburstSpeechDone) {
      return undefined;
    }

    if (confusionTimeoutRef.current) {
      window.clearTimeout(confusionTimeoutRef.current);
    }

    confusionTimeoutRef.current = window.setTimeout(() => {
      setShowConfusion(true);
    }, 1000);

    return () => {
      if (confusionTimeoutRef.current) {
        window.clearTimeout(confusionTimeoutRef.current);
      }
    };
  }, [showOutburst, outburstDone, outburstSpeechDone]);

  useEffect(() => {
    if (!showConfusion) {
      setConfusionText("");
      setConfusionSpeechDone(false);
      return undefined;
    }

    const message =
      "I can't believe this! I... I... ERROR! DOES NOT COMPUTE! DOES NOT COMPUTE! HELP ME!!!";
    let index = 0;
    setConfusionText("");
    const canSpeak =
      soundEnabled &&
      typeof window !== "undefined" &&
      window.speechSynthesis &&
      typeof window.SpeechSynthesisUtterance !== "undefined";
    setConfusionSpeechDone(!canSpeak);
    if (canSpeak) {
      speakMessage(message, {
        onEnd: () => setConfusionSpeechDone(true),
      });
    }

    if (glitchNoiseRef.current) {
      window.clearInterval(glitchNoiseRef.current);
    }

    const playGlitchNoise = () => {
      const { ctx, sfxGain } = audioRef.current;
      if (!ctx || !sfxGain || ctx.state !== "running") {
        return;
      }

      const burst = ctx.createBuffer(
        1,
        Math.floor(ctx.sampleRate * 0.08),
        ctx.sampleRate
      );
      const data = burst.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = burst;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 1800 + Math.random() * 1200;
      const gain = ctx.createGain();
      gain.gain.value = 0.12;
      noise.connect(filter).connect(gain).connect(sfxGain);
      noise.start();
      noise.stop(ctx.currentTime + 0.08);
    };

    const typeNext = () => {
      index += 1;
      setConfusionText(message.slice(0, index));
      if (index < message.length) {
        confusionTypeRef.current = window.setTimeout(typeNext, 24);
      } else {
        if (!canSpeak) {
          setConfusionSpeechDone(true);
        }
        if (glitchNoiseRef.current) {
          window.clearInterval(glitchNoiseRef.current);
        }
      }
    };

    glitchNoiseRef.current = window.setInterval(playGlitchNoise, 120);
    confusionTypeRef.current = window.setTimeout(typeNext, 160);

    return () => {
      if (confusionTypeRef.current) {
        window.clearTimeout(confusionTypeRef.current);
      }
      if (glitchNoiseRef.current) {
        window.clearInterval(glitchNoiseRef.current);
      }
      stopCrashTone();
    };
  }, [showConfusion, soundEnabled]);

  useEffect(() => {
    if (!confusionSpeechDone || !soundEnabled) {
      return undefined;
    }

    const { ctx, sfxGain } = audioRef.current;
    if (!ctx || !sfxGain || ctx.state !== "running") {
      return undefined;
    }

    if (crashToneRef.current) {
      return undefined;
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 2000;
    gain.gain.value = 0.0336;
    osc.connect(gain).connect(sfxGain);
    osc.start();
    crashToneRef.current = osc;

    return () => {
      stopCrashTone();
    };
  }, [confusionSpeechDone, soundEnabled]);

  useEffect(() => {
    if (safeStage === "terminal") {
      stopCrashTone();
    }
  }, [safeStage]);

  useEffect(() => {
    if (safeStage === "terminal" || safeStage === "safe") {
      stopAmbient();
      if (soundEnabled && bossPhase === "off") {
        startSafeModeAudio();
      } else {
        stopSafeModeAudio();
      }
      return;
    }
    stopSafeModeAudio();
  }, [safeStage, soundEnabled, bossPhase]);

  const toggleDayDropdown = () => {
    const select = daySelectRef.current;
    if (!select) {
      return;
    }

    if (dayOpen) {
      select.blur();
      return;
    }

    select.focus();
    select.click();
  };

  const handleMissingClick = () => {
    toggleDayDropdown();
    if (crashStage !== "idle") {
      return;
    }

    // Lock the button to avoid double-triggering the crash sequence.
    setMissingButtonDisabled(true);
    setBotAngry(true);
    setShowOutburst(true);
    setCrashStage("glitch");
  };

  const handleBossHit = () => {
    if (bossPhase !== "battle") {
      return;
    }
    if (bossHitTimeoutRef.current) {
      window.clearTimeout(bossHitTimeoutRef.current);
    }
    setBossHitFlash(true);
    bossHitTimeoutRef.current = window.setTimeout(() => {
      setBossHitFlash(false);
    }, 160);

    if (soundEnabled) {
      playBossHitSound();
    }

    const hitLines = ["Oof!", "Ouch!", "Ow!", "Hey!"];
    const hitLine = hitLines[Math.floor(Math.random() * hitLines.length)];
    setBossHitText(hitLine);
    if (bossHitTextTimeoutRef.current) {
      window.clearTimeout(bossHitTextTimeoutRef.current);
    }
    bossHitTextTimeoutRef.current = window.setTimeout(() => {
      setBossHitText("");
    }, 900);
    if (soundEnabled && !bossSpeaking) {
      queueBossSpeech(hitLine);
    }

    setBossHealth((value) => {
      const next = Math.max(0, value - 1);
      if (next === 0) {
        setBossPhase("defeated");
      }
      return next;
    });
  };

  const handleToggleSound = async () => {
    if (soundEnabled) {
      stopSpeech();
      stopAmbient();
      stopSafeModeAudio();
      stopBossModeAudio();
      stopVictoryAudio();
      stopCrashTone();
      safeSpeechQueueRef.current = Promise.resolve();
      bossSpeechQueueRef.current = Promise.resolve();
      setSafeBotSpeaking(false);
      setSafeBotAngry(false);
      setBossSpeaking(false);
      setSoundEnabled(false);
      setSoundBlocked(false);
      return;
    }

    // Choose the correct audio bed based on the current story phase.
    const started =
      safeStage === "terminal" || safeStage === "safe"
        ? bossPhase === "defeated"
          ? await startVictoryAudio()
          : bossPhase === "off"
            ? await startSafeModeAudio()
            : await startBossModeAudio()
        : await startAmbient();
    if (started) {
      setSoundBlocked(false);
      setSoundEnabled(true);
      return;
    }

    setSoundBlocked(true);
  };

  // Prefer crypto for less predictable per-click variants.
  const createVariantSeed = () => {
    if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
      const values = new Uint32Array(1);
      window.crypto.getRandomValues(values);
      return values[0];
    }
    return Math.floor(Math.random() * 1_000_000_000);
  };

  const handleAnalyze = async () => {
    if (!month || !day) {
      return;
    }

    stopSpeech();
    setAnalysisStatus("loading");
    setAnalysisError("");
    setAnalysisMessage("");

    try {
      const variantSeed = createVariantSeed();
      // Server route handles prompt assembly and OpenAI call.
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month,
          day,
          clientDate: new Date().toISOString(),
          variantSeed,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || "Analysis failed.");
      }

      setAnalysisMessage(payload.message || "Analysis complete.");
      setAnalysisStatus("done");
    } catch (error) {
      setAnalysisError(
        error instanceof Error ? error.message : "Something went wrong."
      );
      setAnalysisStatus("error");
    }
  };

  const inSafeMode = safeStage === "terminal" || safeStage === "safe";

  return (
    <main className={styles.main}>
      <button
        className={`${styles.soundToggle} ${inSafeMode ? styles.soundToggleSafe : ""}`}
        type="button"
        onClick={handleToggleSound}
      >
        {soundEnabled ? "Sound on" : "Enable sound"}
      </button>
      <button
        className={styles.voiceToggle}
        type="button"
        onClick={() => setShowVoiceSettings((value) => !value)}
        aria-expanded={showVoiceSettings}
      >
        Voice settings
      </button>
      {showVoiceSettings ? (
        <div className={styles.voicePanel} role="region" aria-label="Voice settings">
          <p className={styles.voiceTitle}>Voice settings</p>
          <label className={styles.voiceField}>
            <span>Voice</span>
            <select
              className={styles.voiceSelect}
              value={voiceURI}
              onChange={(event) => setVoiceURI(event.target.value)}
            >
              {voices.length ? null : <option value="">Default</option>}
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </label>
          <label className={styles.voiceField}>
            <span>Rate</span>
            <input
              className={styles.voiceRange}
              type="range"
              min="0.7"
              max="1.4"
              step="0.05"
              value={speechRate}
              onChange={(event) => setSpeechRate(Number(event.target.value))}
            />
            <span className={styles.voiceValue}>{speechRate.toFixed(2)}</span>
          </label>
          <label className={styles.voiceField}>
            <span>Pitch</span>
            <input
              className={styles.voiceRange}
              type="range"
              min="0.7"
              max="1.4"
              step="0.05"
              value={speechPitch}
              onChange={(event) => setSpeechPitch(Number(event.target.value))}
            />
            <span className={styles.voiceValue}>{speechPitch.toFixed(2)}</span>
          </label>
        </div>
      ) : null}
      {soundBlocked ? (
        <div className={styles.soundPrompt} role="dialog" aria-modal="true">
          <div className={styles.soundCard}>
            <p className={styles.soundTitle}>Sound check!</p>
            <p className={styles.soundCopy}>
              Tap to enable the BirthdayBot soundscape.
            </p>
            <button
              className={styles.button}
              type="button"
              onClick={handleToggleSound}
            >
              Enable sound
            </button>
          </div>
        </div>
      ) : null}

      <div className={styles.partyBackdrop} aria-hidden="true">
        <div className={styles.glow} />
        <div className={styles.confetti} />
      </div>

      <section className={styles.hero}>
        <div
          className={`${styles.cakeBot} ${
            isSpeaking ? styles.cakeBotSpeaking : ""
          } ${botAngry ? styles.cakeBotAngry : ""} ${
            crashStage !== "idle" ? styles.cakeBotGlitch : ""
          }`}
          aria-hidden="true"
        >
          <div className={styles.antenna} />
          <div className={styles.cakeTop} />
          <div className={styles.frosting}>
            <div className={styles.sprinkles} />
          </div>
          <div className={styles.cakeBase} />
          <div className={styles.candles}>
            <div className={styles.candle}>
              <span className={styles.flame} />
            </div>
            <div className={styles.candle}>
              <span className={styles.flame} />
            </div>
            <div className={styles.candle}>
              <span className={styles.flame} />
            </div>
          </div>
          <div className={styles.face}>
            <div className={styles.eyebrows}>
              <span className={styles.eyebrow} />
              <span className={styles.eyebrow} />
            </div>
            <div className={styles.eye} />
            <div className={styles.eye} />
          </div>
          <div className={styles.mouth} />
        </div>

        <div className={styles.chatPanel}>
          <p className={styles.appName}>BirthdayBot5000</p>
          <h1 className={styles.title}>
            Hello! I can tell if today is your birthday. Fast.
          </h1>
          <div className={styles.chat}>
            <div className={`${styles.bubble} ${styles.bot}`}>
              Please enter your birthday. I am totally stable.
            </div>
            <div className={`${styles.bubble} ${styles.user}`}>
              Ok... where do I type it?
            </div>
            <div className={`${styles.bubble} ${styles.bot}`}>
              Right here. Nothing can go wrong. Probably.
            </div>
            {analysisStatus === "loading" ? (
              <div className={`${styles.bubble} ${styles.bot}`}>
                {analysisLoadingText || "Crunching birthday data..."}
              </div>
            ) : null}
            {analysisStatus === "done" ? (
              <div className={`${styles.bubble} ${styles.bot}`}>
                {analysisTypedText || analysisMessage}
              </div>
            ) : null}
            {analysisStatus === "error" ? (
              <div className={`${styles.bubble} ${styles.bot}`}>
                {analysisErrorTypedText || `Oops. ${analysisError}`}
              </div>
            ) : null}
            {showOutburst ? (
              <div className={`${styles.bubble} ${styles.bot}`}>
                {outburstText}
              </div>
            ) : null}
            {showConfusion ? (
              <div className={`${styles.bubble} ${styles.bot}`}>
                {confusionText}
              </div>
            ) : null}
          </div>
          <div className={styles.inputRow}>
            <div className={styles.selectGroup}>
              <select
                className={styles.select}
                aria-label="Birth month"
                value={month}
                onChange={(event) => setMonth(event.target.value)}
              >
                <option value="">Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className={styles.select}
                aria-label="Birth day"
                value={day}
                ref={daySelectRef}
                onChange={(event) => setDay(event.target.value)}
                onFocus={() => setDayOpen(true)}
                onBlur={() => setDayOpen(false)}
              >
                <option value="">Day</option>
                {days.map((day) => {
                  if (month === "January" && day === 17) {
                    return null;
                  }

                  return (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              className={styles.button}
              type="button"
              onClick={handleAnalyze}
              disabled={!month || !day || analysisStatus === "loading"}
            >
              {analysisStatus === "loading" ? "Analyzing..." : "Analyze"}
            </button>
          </div>
          {showMissingButton ? (
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              type="button"
              onClick={handleMissingClick}
              disabled={missingButtonDisabled}
            >
              My birthday is not listed
            </button>
          ) : null}
        </div>
      </section>

      {crashStage === "crash" ? (
        <div className={styles.crashOverlay} role="alert" aria-live="assertive">
          <div className={styles.crashCard}>
            <p className={styles.crashTitle}>BirthdayBot5000 has failed.</p>
            <p className={styles.crashCopy}>
              Initiating emergency reboot sequence...
            </p>
          </div>
        </div>
      ) : null}
      {safeStage === "terminal" ? (
        <div className={styles.safeOverlay} role="status" aria-live="polite">
          <div className={styles.terminalWindow}>
            {terminalLines.map((line, index) => (
              <div key={`${line}-${index}`} className={styles.terminalLine}>
                {line}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {safeStage === "safe" ? (
        <div
          className={`${styles.safeOverlay} ${styles.safeOverlayTop}`}
          role="status"
          aria-live="polite"
        >
          <div className={styles.safeModeTitle}>BIRTHDAYBOT5000 SAFE MODE</div>
          <div className={styles.safeModeChat}>
              <div
                className={`${styles.safeModeAvatar} ${
                  typingActive ? styles.safeBotSpeaking : ""
                } ${safeBotAngry ? styles.safeBotAngry : ""} ${
                  safeBotFalling ? styles.safeBotFalling : ""
                }`}
                aria-hidden="true"
              >
              <div className={styles.safeBotAntenna} />
              <div className={styles.safeBotCakeTop} />
              <div className={styles.safeBotFrosting} />
              <div className={styles.safeBotCakeBase} />
              <div className={styles.safeBotCandles}>
                <div className={styles.safeBotCandle}>
                  <span className={styles.safeBotFlame} />
                </div>
                <div className={styles.safeBotCandle}>
                  <span className={styles.safeBotFlame} />
                </div>
                <div className={styles.safeBotCandle}>
                  <span className={styles.safeBotFlame} />
                </div>
              </div>
              <div className={styles.safeBotFace}>
                <div className={styles.safeBotBrows}>
                  <span className={styles.safeBotBrow} />
                  <span className={styles.safeBotBrow} />
                </div>
                <div className={styles.safeBotEye} />
                <div className={styles.safeBotEye} />
              </div>
              <div className={styles.safeBotMouth} />
            </div>
            <div className={styles.safeModeMessages}>
              {safeQuizVisible ? (
                <div className={styles.safeQuizWindow} role="dialog" aria-label="Birthday Quiz">
                  <div className={styles.safeQuizTitleBar}>
                    <span>Birthday Quiz v1.0</span>
                    <button
                      className={styles.safeQuizClose}
                      type="button"
                      aria-label="Close"
                    >
                      X
                    </button>
                  </div>
                  {!safeQuizCleared ? (
                    <div className={styles.safeQuizBody}>
                      <h2 className={styles.safeQuizHeading}>BIRTHDAY QUIZ</h2>
                      <button
                        className={styles.safeQuizButton}
                        type="button"
                        disabled={!safeQuizReady}
                        onClick={handleStartQuiz}
                      >
                        Press here to start! 🙂
                      </button>
                    </div>
                  ) : (
                    <div className={styles.safeQuizBodyQuiz}>
                      {quizComplete ? (
                        passesQuiz ? (
                          <div className={styles.safeQuizResultPass}>
                            {renderWaveText("Wow!")}
                            <br />
                            {renderWaveText("It's your birthday today!")}
                            <br />
                            {renderWaveText("HURRAY!")}
                          </div>
                        ) : (
                          <div className={styles.safeQuizResult}>{quizResult}</div>
                        )
                      ) : currentQuestion ? (
                        <>
                          <div className={styles.safeQuizQuestion}>
                            {currentQuestion.text}
                          </div>
                          <div className={styles.safeQuizOptions}>
                            {currentQuestion.options.map((option) => (
                              <button
                                key={option.label}
                                className={`${styles.safeQuizOptionButton} ${
                                  selectedOption === option.label
                                    ? styles.safeQuizOptionSelected
                                    : ""
                                }`}
                                type="button"
                                disabled={quizLocked}
                                onClick={() => handleAnswer(currentQuestion, option)}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>
                  )}
                </div>
              ) : null}
              {safeQuizVisible && safeMessageSeven ? (
                <div className={styles.safeModeSpacer} aria-hidden="true" />
              ) : null}
              {!safeQuizVisible && safeMessageOne ? (
                <div className={styles.safeModeLine}>{safeMessageOne}</div>
              ) : null}
              {!safeQuizVisible && safeMessageOne ? (
                <div className={styles.safeModeSpacer} aria-hidden="true" />
              ) : null}
              {!safeQuizVisible && safeMessageTwo ? (
                <div className={styles.safeModeLine}>{safeMessageTwo}</div>
              ) : null}
              {!safeQuizVisible && safeMessageTwo ? (
                <div className={styles.safeModeSpacer} aria-hidden="true" />
              ) : null}
              {!safeQuizVisible && safeMessageThree ? (
                <div className={styles.safeModeLine}>{safeMessageThree}</div>
              ) : null}
              {!safeQuizVisible && safeMessageThree ? (
                <div className={styles.safeModeSpacer} aria-hidden="true" />
              ) : null}
              {!safeQuizVisible && safeMessageFour ? (
                <div className={styles.safeModeLine}>{safeMessageFour}</div>
              ) : null}
              {!safeQuizVisible && safeMessageFour ? (
                <div className={styles.safeModeSpacer} aria-hidden="true" />
              ) : null}
              {!safeQuizVisible && safeMessageFive ? (
                <div className={styles.safeModeLine}>{safeMessageFive}</div>
              ) : null}
              {!safeQuizVisible && safeMessageFive ? (
                <div className={styles.safeModeSpacer} aria-hidden="true" />
              ) : null}
              {!safeQuizVisible && safeMessageFive ? (
                <div className={styles.safeModeSpacer} aria-hidden="true" />
              ) : null}
              {!safeQuizVisible && safeMessageFive ? (
                <div className={styles.safeModeSpacer} aria-hidden="true" />
              ) : null}
              {!safeQuizVisible && safeMessageSix ? (
                <div className={styles.safeModeLine}>{safeMessageSix}</div>
              ) : null}
              {!safeQuizVisible && safeMessageSix ? (
                <div className={styles.safeModeSpacer} aria-hidden="true" />
              ) : null}
                {safeQuizVisible && quizCommentText ? (
                  <div className={styles.safeModeSpacer} aria-hidden="true" />
                ) : null}
                {safeQuizVisible && quizCommentText ? (
                  <div className={styles.safeModeLine}>{quizCommentText}</div>
                ) : null}
                {safeQuizVisible && quizCommentText ? (
                  <div className={styles.safeModeSpacer} aria-hidden="true" />
                ) : null}
                {safeQuizVisible && passMessageOneText ? (
                  <div className={styles.safeModeSpacer} aria-hidden="true" />
                ) : null}
                {safeQuizVisible && passMessageOneText ? (
                  <div className={styles.safeModeLine}>{passMessageOneText}</div>
                ) : null}
                {safeQuizVisible && passMessageOneText ? (
                  <div className={styles.safeModeSpacer} aria-hidden="true" />
                ) : null}
                {safeQuizVisible && passMessageTwoText ? (
                  <div className={styles.safeModeLine}>{passMessageTwoText}</div>
                ) : null}
                {safeQuizVisible && passMessageTwoText ? (
                  <div className={styles.safeModeSpacer} aria-hidden="true" />
                ) : null}
                {safeQuizVisible && lieMessageText ? (
                  <div className={styles.safeModeSpacer} aria-hidden="true" />
                ) : null}
                {safeQuizVisible && lieMessageText ? (
                  <div className={styles.safeModeLine}>{lieMessageText}</div>
                ) : null}
                {safeQuizVisible && lieMessageText ? (
                  <div className={styles.safeModeSpacer} aria-hidden="true" />
                ) : null}
                {safeQuizVisible && safeMessageSeven && !safeQuizCleared ? (
                  <div className={styles.safeModeLine}>{safeMessageSeven}</div>
                ) : null}
                {safeQuizVisible && safeMessageSeven && !safeQuizCleared ? (
                  <div className={styles.safeModeSpacer} aria-hidden="true" />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        {bossPhase !== "off" && bossPhase !== "drop" ? (
          <div className={styles.bossOverlay} role="presentation">
            <div className={styles.bossHud}>
              <span className={styles.bossHudTitle}>MECHA BIRTHDAYBOT</span>
              <div className={styles.bossHealthBar}>
                <div
                  className={styles.bossHealthFill}
                  style={{ width: `${(bossHealth / 3) * 100}%` }}
                />
              </div>
            </div>
            <div className={styles.bossArena}>
              <div
                className={`${styles.bossBot} ${
                  bossPhase === "intro" ? styles.bossBotRise : ""
                } ${bossHitFlash ? styles.bossHitFlash : ""} ${
                  bossFire ? styles.bossBotFire : ""
                } ${bossExplode ? styles.bossBotExplode : ""} ${
                  bossEyesDead ? styles.bossBotDead : ""
                } ${bossSpeaking ? styles.bossBotSpeaking : ""}`}
                role="button"
                tabIndex={0}
                onClick={handleBossHit}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleBossHit();
                  }
                }}
              >
                <div className={styles.bossBotAntenna} />
                <div className={styles.bossBotCakeTop} />
                <div className={styles.bossBotFrosting} />
                <div className={styles.bossBotCakeBase}>
                  <span className={styles.bossBotPlate} />
                  <span className={styles.bossBotPlate} />
                </div>
                <div className={styles.bossBotCandles}>
                  <div className={styles.bossBotCandle}>
                    <span className={styles.bossBotFlame} />
                  </div>
                  <div className={styles.bossBotCandle}>
                    <span className={styles.bossBotFlame} />
                  </div>
                  <div className={styles.bossBotCandle}>
                    <span className={styles.bossBotFlame} />
                  </div>
                </div>
                <div className={styles.bossBotFace}>
                  <div className={styles.bossBotBrows}>
                    <span className={styles.bossBotBrow} />
                    <span className={styles.bossBotBrow} />
                  </div>
                  <div className={styles.bossBotEyes}>
                    <div className={styles.bossBotEye} />
                    <div className={styles.bossBotEye} />
                  </div>
                </div>
                <div className={styles.bossBotMouth} />
              </div>
              {bossProjectiles.map((projectile) => (
                <div
                  key={projectile.id}
                  className={styles.bossProjectile}
                  style={{ transform: `translate(${projectile.x}px, ${projectile.y}px)` }}
                />
              ))}
              {bossHitText ? (
                <div className={styles.bossHitText}>{bossHitText}</div>
              ) : null}
              {bossDeathLine ? (
                <div className={styles.bossDeathText}>{bossDeathLine}</div>
              ) : null}
              {bossFinalLine ? (
                <div className={styles.bossFinalText}>{bossFinalLine}</div>
              ) : null}
            </div>
          </div>
        ) : null}
        {showGameOver ? (
          <div className={styles.gameOverOverlay} role="alert" aria-live="assertive">
            <div className={styles.gameOverText}>
              <span className={styles.gameOverTitle}>GAME OVER.</span>
              <br />
              BAD ENDING: CYBERSPACE WORLD DOMINATION
              <br />
              <br />
              DUE TO YOUR ACTIONS, BIRTHDAYBOT5000 BECOMES EVEN STRONGER THAN BEFORE AND
              ENSLAVES THE ENTIRE WORLD IN MERE MINUTES. MEANWHILE, YOU ARE STUCK HERE FOREVER.
              <br />
              <br />
              TRY AGAIN?
            </div>
          </div>
        ) : null}
      </main>
    );
  }
