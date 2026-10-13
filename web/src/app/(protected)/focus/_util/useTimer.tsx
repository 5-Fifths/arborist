import {
    useState,
    useRef,
    useEffect
} from "react";

export function useTimer(initialTime: number) {
    const [isReset, setIsReset] = useState(true);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(initialTime);
    const [prevInitialTime, setPrevInitialTime] = useState(initialTime);

    // Prevents a flash of the progress bar
    if (prevInitialTime !== initialTime) {
        setPrevInitialTime(initialTime);
        setTime(initialTime);
        setIsReset(true);
        setIsPaused(true);
    }

    const intervalId = useRef<ReturnType<typeof setInterval>>(null);

    const decrementTime = () => {
        setTime(prev => {
            if (prev <= 1000) {
                handleTimerEnd();
                return 0;
            }
            else {
                return prev - 1000;
            }
        })
    }

    const startTimer = () => {
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

    const pauseTimer = () => {
        setIsPaused(true);

        stopTimer();
    }

    const resetTimer = () => {
        setTime(initialTime);
        setIsPaused(false);
        setIsReset(true);

        stopTimer();
    }

    // Natural stop when time reaches 0
    const handleTimerEnd = () => {
        stopTimer();
    }

    // Kills interval instance
    const stopTimer = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    }

    useEffect(() => {
        stopTimer();
        setTime(initialTime);
        setIsReset(true);
        setIsPaused(true);

        // Cleanup on unmount
        return () => {
            stopTimer();
        }
    }, [initialTime]);

    return {
        startTimer,
        pauseTimer,
        resetTimer,
        isReset,
        isPaused,
        time
    }
}