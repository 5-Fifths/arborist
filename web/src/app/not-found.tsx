import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <main className={styles.container}>
            <h1 className={styles.error}>404</h1>
            <p className={styles.blurb}>Are you sure your URL is correct?</p>
            <Link href={"/"} className={styles.link}>Back to Home</Link>
        </main>
    )
}