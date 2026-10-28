import {
    useState,
    useRef,
    useEffect
} from "react";

// initialTime is measured in minutes
export function useTimer(initialDurationInMs: number) {
    const [isReset, setIsReset] = useState(true);
    const [isPaused, setIsPaused] = useState(true);
    const [remainingTime, setRemainingTime] = useState(initialDurationInMs);

    const targetTimeRef = useRef(initialDurationInMs + Date.now());
    const remainingTimeDuringPause = useRef(initialDurationInMs);
    const intervalId = useRef<ReturnType<typeof setInterval>>(null);

    const startTimer = () => {
        setIsPaused(false);
        setIsReset(false);

        // Prevent multiple intervals
        if (intervalId.current) {
            return;
        }

        // Start the timer
        const id = setInterval(decrementTime, 350);
        intervalId.current = id;
        targetTimeRef.current = remainingTimeDuringPause.current + Date.now();
    }

    const decrementTime = () => {
        const timeLeft = targetTimeRef.current - Date.now();

        if (timeLeft <= 0) {
            setIsPaused(true);
            setRemainingTime(0);
            remainingTimeDuringPause.current = 0;

            handleTimerEnd();
        }
        else {
            setRemainingTime(timeLeft);
            remainingTimeDuringPause.current = timeLeft;
        }
    }

    const pauseTimer = () => {
        setIsPaused(true);
        stopTimer();

        remainingTimeDuringPause.current = targetTimeRef.current - Date.now();  
    }

    const resetTimer = () => {
        setIsPaused(true);
        setIsReset(true);

        remainingTimeDuringPause.current = initialDurationInMs;
        targetTimeRef.current = initialDurationInMs + Date.now();
        setRemainingTime(initialDurationInMs);

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
        targetTimeRef.current = initialDurationInMs + Date.now();
        remainingTimeDuringPause.current = initialDurationInMs;
        setRemainingTime(initialDurationInMs);

        

        return () => {
            stopTimer();
        }
    }, [initialDurationInMs]);

    return {
        startTimer,
        pauseTimer,
        resetTimer,
        isReset,
        isPaused,
        remainingTime
    }
}