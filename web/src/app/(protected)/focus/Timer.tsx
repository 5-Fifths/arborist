import styles from './Timer.module.css';

interface TimerProps {
    time: number,
}

export default function Timer({
    time
}: TimerProps) {
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (60 * 1000));

    return (
        <div className={styles.timerContainer}>
            <div className={styles.timer}>
                <div className={styles.timerProgress}></div>
                <input className={styles.timerText} value={`${minutes}m`} />
                <input className={styles.timerText} value={`${seconds}s`} />
            </div>
        </div>
    )
}