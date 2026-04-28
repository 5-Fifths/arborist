import styles from "./styles.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero_container}>
        <div style={styles.title_container}>
            <h1 className={styles.hero_title}>Welcome to <span className={styles.brand}>nurture</span></h1>
            <p className={styles.hero_description}>
              
            </p>
        </div>
      </section>
    </main>
  );
}
