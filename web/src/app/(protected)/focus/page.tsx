'use client';

import { 
    useState,
    useMemo
} from "react";

import { useTimer } from "./_util/useTimer";
import Timer from "./_components/Timer/Timer";

import styles from "./styles.module.css";

export default function Focus() {
    const DEFAULT_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
    
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
                    time={time}
                />
                <div className={styles.buttonSet}>
                    <button 
                        className={styles.button}
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
            </div>
        </main>
    )    
}