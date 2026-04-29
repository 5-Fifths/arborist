import Logo from "./components/Logo/Logo";
import Link from "next/link";

import styles from "./styles.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero_container}>
        <header className={styles.header}>
          <div className={styles.brand_container}>
            <Logo  color={"white"} size={45}/>
            <h1 className={styles.brand}>nurture</h1>
          </div>
          <nav className={styles.nav}>
            <Link href="/contact-us" className={styles.link}>Contact Us</Link>
            <Link href="/login" className={styles.link}>Sign In</Link>
          </nav>
        </header>

        <div className={styles.text_overlay_container}>
          <p>Grow your own peace of mind</p>
          <p>Cultivate healthy habits with us</p>
        </div>
      </section>
    </main>
  );
}
