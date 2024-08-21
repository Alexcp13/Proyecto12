import { useEffect, useReducer, useCallback } from "react";
import "./game1.css";
import Button from "../../Utils/Button/Button";


const initialState = {
    characters: [],
    characterSelected: null,
    randomNames: [],
    levels: 1,
    points: 0
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHARACTERS':
            return { ...state, characters: action.payload };
        case 'SET_CHARACTER_SELECTED':
            return { ...state, characterSelected: action.payload };
        case 'SET_RANDOM_NAMES':
            return { ...state, randomNames: action.payload };
        case 'INCREMENT_LEVEL':
            return { ...state, levels: state.levels + 1 };
        case 'INCREMENT_POINTS':
            return { ...state, points: state.points + 1 };
        default:
            return state;
    }
};

const Game1 = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

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
        fetch(`https://rickandmortyapi.com/api/character/`)
            .then((res) => res.json())
            .then((res) => {
                dispatch({ type: 'SET_CHARACTERS', payload: res.results });
                nextLevel(res.results);
            });
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