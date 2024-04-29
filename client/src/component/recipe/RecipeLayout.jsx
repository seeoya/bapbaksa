import React from 'react';
import { Outlet } from 'react-router-dom';
import RecipeAside from './RecipeAside';

const RecipeLayout = () => {
    return (<>
        <RecipeAside />

        <div id="recipe" className='content-wrap'>
            <Outlet />
        </div>
    </>
    );
};

export default RecipeLayout;