import styles from './Timer.module.css';

interface TimerProps {
    initialTime: number,
    time: number,
}

export default function Timer({
    initialTime,
    time
}: TimerProps) {
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (60 * 1000));

    return (
        <div 
            className={styles.timerContainer} 
            style={{
                backgroundImage: `conic-gradient(#4F6F52 ${(initialTime - time) / initialTime * 360}deg, #c7cdbf ${(initialTime - time) / initialTime * 360}deg)`
            }}>
            <div className={styles.textContainer}>
                <div className={styles.timer}>
                    <p className={styles.timerText}>{minutes}m {seconds}s</p>
                </div>
            </div>
        </div>
    )
}