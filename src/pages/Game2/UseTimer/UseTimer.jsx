import { useEffect, useState } from "react";

const useTimer = (initialTime, onTimeUp) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            onTimeUp();
        }
    }, [timeLeft]);

    const resetTimer = () => {
        setTimeLeft(initialTime);
    };

    return { timeLeft, resetTimer };
};

export default useTimer;