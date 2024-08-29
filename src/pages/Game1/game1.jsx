import { useEffect, useCallback } from "react";
import "./game1.css";
import Button from "../../components/Button/Button";
import useGameReducer from "./Game1Reducer/Game1Reducer";


const Game1 = () => {
    const [state, dispatch] = useGameReducer();

    const checkAnswer = useCallback((name) => {
        if (name === state.characterSelected.name) {
            dispatch({ type: 'INCREMENT_POINTS' });
        }
        dispatch({ type: 'INCREMENT_LEVEL' });
        nextLevel(state.characters);
    }, [state.characterSelected, state.characters]);

    const nextLevel = useCallback((res) => {
        const positionSelected = Math.floor(Math.random() * res.length);
        const currentCharacter = res[positionSelected];
        dispatch({ type: 'SET_CHARACTER_SELECTED', payload: currentCharacter });

        const randomNames = [currentCharacter.name];
        while (randomNames.length < 3) {
            const randomCharacter = res[Math.floor(Math.random() * res.length)];
            if (!randomNames.includes(randomCharacter.name)) {
                randomNames.push(randomCharacter.name);
            }
        }

        dispatch({ type: 'SET_RANDOM_NAMES', payload: randomNames.sort(() => Math.random() - 0.5) });
    }, []);

    useEffect(() => {
        const fetchAllCharacters = async () => {
            let allCharacters = [];
            let page = 1;
            let hasMorePages = true;

            while (hasMorePages) {
                const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
                const data = await res.json();
                allCharacters = [...allCharacters, ...data.results];
                hasMorePages = data.info.next !== null;
                page++;
            }

            dispatch({ type: 'SET_CHARACTERS', payload: allCharacters });
            nextLevel(allCharacters);
        };

        fetchAllCharacters();
    }, [nextLevel]);

    return (
        <div className="choiceGame">
            <div className="infoLevels">
                <p>Puntos: {state.points}</p>
            </div>
            {state.characterSelected && (
                <div className="character">
                    <img src={state.characterSelected.image} alt={state.characterSelected.name} />
                    <div className="options">
                        {state.randomNames.map((name) => (
                            <Button key={name} onClick={() => checkAnswer(name)}>
                                {name}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game1;