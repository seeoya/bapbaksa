import React from 'react';
import { Link } from 'react-router-dom';

const RecipeListItem = ({ itemNo, idx, recipeList }) => {

    return (
        <>
            {
                recipeList ?
                    <Link to={"/recipe/view/" + itemNo} className='recipe-item' key={idx} >
                        <div className='recipe-info'>
                            <div>{recipeList[itemNo].RECP_CODE}</div>
                            <img src={recipeList[itemNo].RECP_MAIN_IMG} alt={recipeList[itemNo].RECP_NAME} />
                            <div className='recipe-name'>{recipeList[itemNo].RECP_NAME}</div>

                            <div className='recipe-sub-info'>
                                <div className='recipe-third-info'>
                                    <span>
                                        {recipeList[itemNo].RECP_REGION_NAME}
                                    </span>
                                    <span>
                                        {recipeList[itemNo].RECP_CATEGORY_NAME}
                                    </span>
                                    <span>
                                        {recipeList[itemNo].RECP_KCAL}
                                    </span>
                                    <span>
                                        {recipeList[itemNo].RECP_SERVIN}
                                    </span>
                                </div>
                                <div>{recipeList[itemNo].RECP_TIME}/{recipeList[itemNo].RECP_DIFFICULT} 난이도</div>
                                <div className='recipe-intro'>{recipeList[itemNo].RECP_INTRO}</div>
                            </div>
                        </div>
                    </Link > : null
            }
        </>
    );
};

export default RecipeListItem;