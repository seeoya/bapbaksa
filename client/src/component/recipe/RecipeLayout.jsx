import React from 'react';
import { Outlet } from 'react-router-dom';
import RecipeAside from './RecipeAside';

const RecipeLayout = () => {
    return (<>

        <div id="recipe" className='content-wrap'>
            <RecipeAside />

            <Outlet />
        </div>
    </>
    );
};

export default RecipeLayout;