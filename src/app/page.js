import styles from "./page.module.css";

export default function Home() {
  const title = "Dad Birthday";

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 className={styles.title}>
          {title.split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              className={char === " " ? styles.space : styles.letter}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>
    </main>
  );
}
