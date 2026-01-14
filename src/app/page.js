import styles from "./page.module.css";

export default function Home() {
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
            Hello! I can determine if today is your birthday.
          </h1>
          <div className={styles.chat}>
            <div className={`${styles.bubble} ${styles.bot}`}>
              Please enter your birthday. I am totally stable.
            </div>
            <div className={`${styles.bubble} ${styles.user}`}>
              Ok... where do I type it?
            </div>
            <div className={`${styles.bubble} ${styles.bot}`}>
              Right here. Probably. Please do not panic if I reboot.
            </div>
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder="Type your birthday..."
              aria-label="Birthday input"
            />
            <button className={styles.button} type="button">
              Analyze
            </button>
          </div>
          <p className={styles.microcopy}>
            Safe mode will activate if the birthday question fails.
          </p>
        </div>
      </section>
    </main>
  );
}
