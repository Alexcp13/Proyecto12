import { useEffect, useState } from "react";



const useCharacters = () => {


    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/`)
            .then((res) => res.json())
            .then((res) => {
                const randomCharacters = [];
                while (randomCharacters.length < 3) {
                    const randomCharacter = res.results[Math.floor(Math.random() * res.results.length)];
                    if (!randomCharacters.includes(randomCharacter)) {
                        randomCharacters.push(randomCharacter);
                    }
                }
                setCharacters(randomCharacters);
            });
    }, []);

    return characters;
};

export default useCharacters;