import styles from "./styles.module.css";

interface ProgressBarProps {
    percentageFilled: number
}

export default function ProgressBar({ percentageFilled }: ProgressBarProps) {
    return (
        <div className={styles.container}>
            <div className={styles.progress} style={{width: `${percentageFilled * 100}%`}}></div>
        </div>
    )
}