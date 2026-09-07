'use client';

import { useState, useRef, useEffect } from "react";

import Timer from "./Timer";

import styles from "./styles.module.css";

// TODO: Make a way for users to adjust the initial time
// TODO: Add a sound to the timer finish
// TODO: Add a listener for every 10 mins to award the user coins
// TODO: Add conic-gradient to the timer to show how much time is left
// TODO: Add a background to the page 
// TODO: Add a user coins value in the top right

export default function Focus() {
    const DEFAULT_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

    const intervalId = useRef<ReturnType<typeof setInterval>>(null);
    const [isReset, setIsReset] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(DEFAULT_TIME); // Measured in milliseconds
    const [initialTime, setInitialTime] = useState(DEFAULT_TIME); // So that user doesn't have to reset to x time everytime the timer ends

    useEffect(() => {
        if (time === 0) {
            stopTimer();
        }

        // Cleanup on unmount
        return () => {
            stopTimer();
        }
    }, []);

    const decrementTime = () => {
        setTime(prev => Math.max(prev - 1000, 0));
    }

    const handleStart = () => {
        setIsPaused(false);
        setIsReset(false);

        // Prevent multiple intervals
        if (intervalId.current) {
            return;
        }
    
        // Start the timer
        const id = setInterval(decrementTime, 1000);
        intervalId.current = id;
    }

    const handlePause = () => {
        setIsPaused(true);

        stopTimer();
    }

    const handleReset = () => {
        setTime(initialTime);
        setIsPaused(false);
        setIsReset(true);

        console.log("RESET");

        stopTimer();
    }

    const stopTimer = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    }

    const buttonLabel = isReset 
        ? 'Start' 
        : isPaused 
            ? 'Resume' 
            : 'Pause';

    return (
        <main className={styles.container}>
            <Timer 
                time={time}
            />
            <div className={styles.buttonSet}>
                <button 
                    className={styles.button}
                    onClick={() => {
                        if (isReset || isPaused) {
                            handleStart();
                        }
                        else {
                            handlePause();
                        }
                    }}
                    disabled={time === 0}
                >
                    {buttonLabel}
                </button>
                <button 
                    className={styles.button}
                    onClick={handleReset}
                    disabled={isReset}
                >
                    Reset
                </button>
            </div>
        </main>
    )    
}