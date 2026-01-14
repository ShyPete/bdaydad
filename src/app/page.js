"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
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
  const [terminalLines, setTerminalLines] = useState([]);
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
  const audioRef = useRef({
    ctx: null,
    source: null,
    intervalId: null,
    masterGain: null,
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

  const createAudioLayer = (ctx, masterGain) => {
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

    source.connect(filter).connect(gain).connect(masterGain);

    const playTone = ({ time, type, frequency, duration, level }) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = frequency;
      oscGain.gain.value = 0.0;
      osc.connect(oscGain).connect(masterGain);
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
      noise.connect(noiseFilter).connect(noiseGain).connect(masterGain);
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

  const startAmbient = async () => {
    if (audioRef.current.ctx?.state === "closed") {
      audioRef.current = {
        ctx: null,
        source: null,
        intervalId: null,
        masterGain: null,
      };
    }

    let { ctx, masterGain } = audioRef.current;
    if (!ctx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        return false;
      }

      ctx = new AudioContextClass();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.22;
      masterGain.connect(ctx.destination);
      audioRef.current = {
        ctx,
        masterGain,
        source: null,
        intervalId: null,
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

    masterGain.gain.setValueAtTime(0.22, ctx.currentTime);

    if (!audioRef.current.source) {
      const { source, intervalId } = createAudioLayer(ctx, masterGain);
      audioRef.current = {
        ...audioRef.current,
        source,
        intervalId,
      };
    }

    return true;
  };

  const stopAmbient = () => {
    const { ctx, source, intervalId, masterGain } = audioRef.current;
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
    if (masterGain && ctx) {
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
    }
    audioRef.current = {
      ...audioRef.current,
      source: null,
      intervalId: null,
    };
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
      const started = await startAmbient();
      setSoundBlocked(!started);
      setSoundEnabled(started);
    };

    attemptStart();
    return () => {
      stopAmbient();
      stopSpeech();
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
      };
    };
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
      }, 5000);
      return () => window.clearTimeout(timeoutId);
    }

    return undefined;
  }, [month, dayOpen, showMissingButton]);

  useEffect(() => {
    if (crashStage !== "glitch") {
      return undefined;
    }

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
  }, [safeStage]);

  useEffect(() => {
    if (!showOutburst) {
      setOutburstText("");
      setOutburstDone(false);
      setOutburstSpeechDone(false);
      setShowConfusion(false);
      setConfusionText("");
      setConfusionSpeechDone(false);
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
  }, [showOutburst]);

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
      const { ctx, masterGain } = audioRef.current;
      if (!ctx || !masterGain || ctx.state !== "running") {
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
      noise.connect(filter).connect(gain).connect(masterGain);
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

    const { ctx, masterGain } = audioRef.current;
    if (!ctx || !masterGain || ctx.state !== "running") {
      return undefined;
    }

    if (crashToneRef.current) {
      return undefined;
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 2000;
    gain.gain.value = 0.084;
    osc.connect(gain).connect(masterGain);
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

    setMissingButtonDisabled(true);
    setBotAngry(true);
    setShowOutburst(true);
    setCrashStage("glitch");
  };

  const handleToggleSound = async () => {
    if (soundEnabled) {
      stopSpeech();
      stopAmbient();
      stopCrashTone();
      setSoundEnabled(false);
      setSoundBlocked(false);
      return;
    }

    const started = await startAmbient();
    if (started) {
      setSoundBlocked(false);
      setSoundEnabled(true);
      return;
    }

    setSoundBlocked(true);
  };

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

  return (
    <main className={styles.main}>
      <button
        className={styles.soundToggle}
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
        <div className={styles.safeOverlay} role="status" aria-live="polite">
          <div className={styles.safeModeTitle}>
            BIRTHDAYBOT5000 SAFE MODE
          </div>
        </div>
      ) : null}
    </main>
  );
}
