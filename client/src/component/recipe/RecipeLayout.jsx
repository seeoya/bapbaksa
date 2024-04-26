import React from 'react';
import { Outlet } from 'react-router-dom';
import RecipeAside from './RecipeAside';

const RecipeLayout = () => {
    return (
        <div id="recipe" className="">
            <RecipeAside />

            <div className="recipe-content">
                <Outlet />
            </div>
        </div>
    );
};

export default RecipeLayout;