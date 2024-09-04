import { useState } from "react";

const useGameSetts = () => {
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setHasWon(false);
    };

    const endGame = (won) => {
        setGameOver(true);
        setHasWon(won);
    };

    const resetGame = () => {
        setGameStarted(false);
        setGameOver(false);
        setHasWon(false);
    };

    return { gameOver, gameStarted, hasWon, startGame, endGame, resetGame };
};

export default useGameSetts;