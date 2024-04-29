import React from 'react';
import Fridge from './Fridge';
import FridgeList from './FridgeList';

const RecipeAside = () => {
    return (
        <aside className="recipe-aside">
            <Fridge />
            <FridgeList />
        </aside>
    );
};

export default RecipeAside;