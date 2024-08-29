import { useReducer } from "react";

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

const useGameReducer = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    return [state, dispatch];
};

export default useGameReducer;