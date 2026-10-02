import styles from "./styles.module.css";

interface ErrorScreenProps {
    error: Error | null
}

export default function ErrorScreen({ error }: ErrorScreenProps) {
    const message = error?.message || "An error occurred.";

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Error</h1>
            <p className={styles.message}>{message}</p>
        </div>
    )
}