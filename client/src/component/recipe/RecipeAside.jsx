import React, { useEffect, useState } from 'react';
import Fridge from './Fridge';

const RecipeAside = () => {
    const [windowX, setWindowX] = useState(900);
    const [windowY, setWindowY] = useState(120);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    useEffect(() => {
        dragEvent()
    }, [windowX, windowY, startX, startY]);

    const dragEvent = () => {
        const asideWindow = document.getElementById("recipe_aside");

        asideWindow.addEventListener('mousedown', (e) => {
            e.preventDefault();
            let offsets = asideWindow.getBoundingClientRect();

            setWindowX(offsets.left);
            setWindowY(offsets.top);

            setStartX(e.clientX);
            setStartY(e.clientY);

            asideWindow.classList.add("active");
        });

        document.addEventListener('mousemove', (e) => {
            e.preventDefault();
            if (e.target.closest(".active") !== null) {
                setWindowX(windowX + (e.clientX - startX));
                setWindowY(windowY + (e.clientY - startY));
                setStartX(e.clientX);
                setStartY(e.clientY);
            }
        })

        document.addEventListener('mouseup', (e) => {
            e.preventDefault();
            asideWindow.classList.remove("active");
        })
    }

    return (
        <aside id="recipe_aside" style={{ top: `${windowY}px`, left: `${windowX}px` }}>
            <Fridge />
            {/* <FridgeList /> */}
        </aside>
    );
};

export default RecipeAside;