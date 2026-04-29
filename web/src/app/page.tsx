import Logo from "./components/Logo/Logo";
import Link from "next/link";

import styles from "./styles.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero_container}>
        <header className={styles.header}>
          <div className={styles.brand_container}>
            <Logo  color={"white"} size={42}/>
            <h1 className={styles.brand}>nurture</h1>
          </div>
          <nav className={styles.nav}>
            <Link href="/contact-us" className={styles.link}>Contact Us</Link>
            <Link href="/login" className={styles.link}>Sign In</Link>
          </nav>
        </header>

        <div className={styles.text_overlay_container}>
          <p className={styles.major_line}>Plant trees you'll sit under.</p>
          <p className={styles.minor_line}>The best time to start was yesterday. The next best time is now.</p>
          <div className={styles.action_button_container}>
            <Link className={styles.button} href="/signup">Get Started</Link>
            <Link className={styles.button} href="#features">Explore Features</Link>
          </div>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.feature_container}>
          <div className={styles.description_container}>
            <h2 className={styles.description_head}>Garden</h2>
            <p className={styles.description_text}>When you finish a project or a daily streak, you earn coins to buy unique seeds. From common succulents to rare, glowing night-blooms, your garden reflects the work you've put into it. Over time, your productivity transforms from a boring list into a lush, visual sanctuary.</p>
          </div>
        </div>
        <div className={styles.feature_container}>
          <div className={styles.description_container}>
            <h2 className={styles.description_head}>Canvas Interface</h2>
            <p className={styles.description_text}>Ever missed a Canvas assignment because you couldn't find it? Nurture handles importing and creating tasks for your assignments so you never miss another.</p>
          </div>
        </div>
        <div className={styles.feature_container}>
          <div className={styles.description_container}>
            <h2 className={styles.description_head}>Focus Mode</h2>
            <p className={styles.description_text}>Use focus mode to set your work and break periods in a way best tailored to you. Deep focus mode hides all the distracting clutter and shows only your selected tasks for utmost concentration.</p>
          </div>
        </div>
        <div className={styles.feature_container}>
          <div className={styles.description_container}>
            <h2 className={styles.description_head}>Clean UI</h2>
            <p className={styles.description_text}>Categorize your growth with color-coded botanical tags, set tasks to reappear on "seasonal" cycles (daily, weekly, or custom intervals), and rank urgency with priority tiers that don't overwhelm the eye. </p>
          </div>
        </div>
      </section>
    </main>
  );
}
