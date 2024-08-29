
import "./game2.css";
import Button from "../../components/Button/Button";
import customHookGame2 from "./CustomHookGame2/CustomHookGame2";


const Game2 = () => {
    const {
        characters,
        angles,
        gameOver,
        gameStarted,
        hasWon,
        timeLeft,
        rotateImage,
        startGame,
        resetGame
    } = customHookGame2();

    const centerImage = (index) => {
        const imageElement = document.querySelectorAll('.rotateGame img')[index];
        if (imageElement) {
            imageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleRotateImage = (index) => {
        rotateImage(index);
        centerImage(index);
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
                <Button onClick={startGame}>Start Game</Button>
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
            <Button onClick={resetGame} disabled={!gameStarted}>Reiniciar</Button>
        </div>
    );
};

export default Game2;