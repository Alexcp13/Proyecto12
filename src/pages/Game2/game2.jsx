
import "./game2.css";
import Button from "../../components/Button/Button";

import useCharacters from "./UseCharacter/UseCharacter";
import useAngles from "./UseAngles/UseAngles";
import useGameSetts from "./UseGameSetts/UseGameSetts";
import useTimer from "./UseTimer/UseTimer";


const Game2 = () => {
    const characters = useCharacters();
    const { angles, rotateImage, resetAngles } = useAngles();
    const { gameOver, gameStarted, hasWon, startGame, endGame, resetGame } = useGameSetts();
    const { timeLeft, resetTimer } = useTimer(8, () => endGame(false));

    const centerImage = (index) => {
        const imageElement = document.querySelectorAll('.rotateGame img')[index];
        if (imageElement) {
            imageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleRotateImage = (index) => {
        if (gameOver) return;
        const newAngles = rotateImage(index);
        centerImage(index);
        if (newAngles.every(angle => angle === 0)) {
            endGame(true);
        }
    };

    const handleStartGame = () => {
        startGame();
        resetAngles();
        resetTimer();
    };

    const handleResetGame = () => {
        resetGame();
        resetAngles();
        resetTimer();
    };

    return (
        <div className="game2">
            <div className={`rotateGame ${gameStarted ? 'gameStarted' : ''}`}>
                {characters.map((character, index) => (
                    <img
                        key={character.id}
                        src={character.image}
                        alt={character.name}
                        style={{
                            transform: `rotate(${angles[index]}deg)`,
                            border: angles[index] === 0 ? '2px solid yellow' : '3px solid black'
                        }}
                        onClick={() => handleRotateImage(index)}
                    />
                ))}
            </div>
            {!gameStarted ? (
                <Button onClick={handleStartGame}>Start Game</Button>
            ) : (
                <>
                    <div className="timer">
                        Quedan: {timeLeft} segundos
                    </div>
                    {gameOver && (
                        <div className="gameOver">
                            {hasWon ? "Has ganado!" : "Game Over!"}
                        </div>
                    )}
                </>
            )}
            <Button onClick={handleResetGame} disabled={!gameStarted}>Reiniciar</Button>
        </div>
    );
};

export default Game2;