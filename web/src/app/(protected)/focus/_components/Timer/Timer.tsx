'use client';

import { useState } from "react";
import { useTimer } from "../../_util/useTimer";

import styles from './Timer.module.css';

export default function Timer() {
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

    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (60 * 1000));

    return (
        <>
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
        </>
    )
}