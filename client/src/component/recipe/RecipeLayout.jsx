import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import RecipeAside from './RecipeAside';

const RecipeLayout = () => {
    const dispatch = useDispatch();

    const fridgeList = useSelector((state) => state.fridge.allFridge);

    useEffect(() => {
        initRecipeLayout();
    }, []);

    const initRecipeLayout = async () => {
        
    }

    return (<>

        <div id="recipe" className='content-wrap'>
            <RecipeAside />

            <Outlet />
        </div>
    </>
    );
};

export default RecipeLayout;