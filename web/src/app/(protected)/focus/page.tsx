'use client';

import { 
    useState,
    useMemo
} from "react";

import { useTimer } from "./_util/useTimer";
import Timer from "./_components/Timer/Timer";

import styles from "./styles.module.css";

export default function Focus() {
    const DEFAULT_TIME = 15 * 60 * 1000;
    
    const [initialTime, setInitialTime] = useState(DEFAULT_TIME);
    const {
        startTimer,
        pauseTimer,
        resetTimer,
        isPaused,
        isReset,
        time
    } = useTimer(initialTime);

    const buttonLabel = isReset 
        ? 'Start' 
        : isPaused 
            ? 'Resume' 
            : 'Pause';

    // Format date string
    const date = useMemo(() => { 
        return new Date(Date.now()).toLocaleDateString(
            undefined, 
            {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            }
        ).replace(/,/g, ' ּּּ· ');
    }, []);

    return (
        <main className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <p className={styles.date}>{date}</p>
                <p className={styles.welcomeMessage}>Focus</p>
            </div>
            <div className={styles.container}>
                <Timer 
                    initialTime={initialTime}
                    time={time}
                />
                <div className={styles.buttonSet}>
                    <div className={styles.actionButtons}>
                        <button 
                            className={`${styles.button} ${styles.active}`}
                            onClick={() => {
                                isReset || isPaused ? startTimer() : pauseTimer();
                            }}
                            disabled={time === 0}
                        >
                            {buttonLabel}
                        </button>
                        <button 
                            className={styles.button}
                            onClick={resetTimer}
                            disabled={isReset}
                        >
                            Reset
                        </button>
                    </div>
                    <div className={styles.timeButtons}>
                        <p className={styles.label}>DURATION</p>
                        <button 
                            className={`${styles.button} ${initialTime === 15 * 60 * 1000 ? styles.active : ''}`}
                            onClick={() => setInitialTime(15 * 60 * 1000)}
                        >
                            15 mins
                        </button>
                        <button 
                            className={`${styles.button} ${initialTime === 30 * 60 * 1000 ? styles.active : ''}`}
                            onClick={() => setInitialTime(30 * 60 * 1000)}
                        >
                            30 mins
                        </button>
                        <button 
                            className={`${styles.button} ${initialTime === 45 * 60 * 1000 ? styles.active : ''}`}
                            onClick={() => setInitialTime(45 * 60 * 1000)}
                        >
                            45 mins
                        </button>
                        <button 
                            className={`${styles.button} ${initialTime === 60 * 60 * 1000 ? styles.active : ''}`}
                            onClick={() => setInitialTime(60 * 60 * 1000)}
                        >
                            60 mins
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )    
}