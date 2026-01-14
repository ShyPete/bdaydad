"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dayOpen, setDayOpen] = useState(false);
  const [showMissingButton, setShowMissingButton] = useState(false);
  const daySelectRef = useRef(null);
  const audioRef = useRef({ ctx: null, source: null, intervalId: null });

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

  const startAmbient = async () => {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    const ctx = new AudioContextClass();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2.5, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 700;
    filter.Q.value = 0.5;

    const gain = ctx.createGain();
    gain.gain.value = 0.06;

    source.connect(filter).connect(gain).connect(ctx.destination);

    const schedulePop = () => {
      const now = ctx.currentTime;

      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = "sine";
      chime.frequency.value = 660 + Math.random() * 220;
      chimeGain.gain.value = 0.0;
      chime.connect(chimeGain).connect(ctx.destination);
      chimeGain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      chime.start(now);
      chime.stop(now + 0.7);

      const pop = ctx.createOscillator();
      const popGain = ctx.createGain();
      pop.type = "triangle";
      pop.frequency.value = 520 + Math.random() * 180;
      popGain.gain.value = 0.0;
      pop.connect(popGain).connect(ctx.destination);
      popGain.gain.linearRampToValueAtTime(0.1, now + 0.02);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      pop.start(now + 0.12);
      pop.stop(now + 0.55);
    };

    await ctx.resume();
    source.start();
    const intervalId = window.setInterval(schedulePop, 2600);

    audioRef.current = { ctx, source, intervalId };
  };

  const stopAmbient = () => {
    const { ctx, source, intervalId } = audioRef.current;
    if (source) {
      source.stop();
    }
    if (intervalId) {
      window.clearInterval(intervalId);
    }
    if (ctx) {
      ctx.close();
    }
    audioRef.current = { ctx: null, source: null, intervalId: null };
  };

  useEffect(() => {
    startAmbient();
    return () => stopAmbient();
  }, []);

  useEffect(() => {
    if (month === "January" && dayOpen) {
      const timeoutId = window.setTimeout(() => {
        setShowMissingButton(true);
      }, 5000);
      return () => window.clearTimeout(timeoutId);
    }

    setShowMissingButton(false);
  }, [month, dayOpen]);

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

  return (
    <main className={styles.main}>
      <div className={styles.partyBackdrop} aria-hidden="true">
        <div className={styles.glow} />
        <div className={styles.confetti} />
      </div>

      <section className={styles.hero}>
        <div className={styles.cakeBot} aria-hidden="true">
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
            <button className={styles.button} type="button">
              Analyze
            </button>
          </div>
          {showMissingButton ? (
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              type="button"
              onClick={toggleDayDropdown}
            >
              My birthday is not listed
            </button>
          ) : null}
        </div>
      </section>
    </main>
  );
}
