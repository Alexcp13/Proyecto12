import { useState } from "react";

const useAngles = () => {
    const [angles, setAngles] = useState([165, 90, 135]);

    const rotateImage = (index) => {
        const newAngles = angles.map((angle, i) =>
            i === index && angle !== 0 ? (angle + 15) % 360 : angle
        );
        setAngles(newAngles);
        return newAngles;
    };

    const resetAngles = () => {
        setAngles([165, 90, 135]);
    };

    return { angles, rotateImage, resetAngles };
};

export default useAngles;