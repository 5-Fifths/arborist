import styles from "./styles.module.css";

export default function LoadingScreen() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
            <p>Loading data...</p>
        </div>
    )
}