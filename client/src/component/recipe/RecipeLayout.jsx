import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import RecipeAside from './RecipeAside';

const RecipeLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
    }, []);
    return (<>

        <div id="recipe" className='content-wrap'>
            <RecipeAside />

            <Outlet />
        </div>
    </>
    );
};

export default RecipeLayout;