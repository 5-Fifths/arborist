import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.content}>
                    <h2 className={styles.brand}>nurture</h2>
                    <p className={styles.tagline}>grow your own peace of mind</p>
                </div>
            </div>
            <div className={styles.login_container}>
                {children}
            </div>
        </div>
    )
}