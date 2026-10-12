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
                <p className={styles.timerText}>{minutes}m {seconds}s</p>
            </div>
        </div>
    )
}