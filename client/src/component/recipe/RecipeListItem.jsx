import React from 'react';
import { Link } from 'react-router-dom';
import { AllRecipeQuery } from '../../query/recipeQuerys';

const RecipeListItem = ({ itemNo, idx }) => {
    const { data: recipeList, isLoading: recipeIsLoading, isError: recipeIsError } = AllRecipeQuery();

    const item = recipeList[itemNo];

    return (
        <>
            {
                recipeList ?
                    <Link to={"/recipe/view/" + itemNo} className='recipe-item' key={idx} >
                        <div className='recipe-info'>
                            <div>{item.RECP_CODE}</div>
                            <img src={item.RECP_MAIN_IMG} alt={item.RECP_NAME} />
                            <div className='recipe-name'>{item.RECP_NAME}</div>

                            <div className='recipe-sub-info'>
                                <div className='recipe-third-info'>
                                    <span>
                                        {item.RECP_REGION_NAME}
                                    </span>
                                    <span>
                                        {item.RECP_CATEGORY_NAME}
                                    </span>
                                    <span>
                                        {item.RECP_KCAL}
                                    </span>
                                    <span>
                                        {item.RECP_SERVIN}
                                    </span>
                                </div>
                                <div>{item.RECP_TIME}/{item.RECP_DIFFICULT} 난이도</div>
                                <div className='recipe-intro'>{item.RECP_INTRO}</div>
                            </div>
                        </div>
                    </Link > : null
            }
        </>
    );
};

export default RecipeListItem;