import React, { useEffect, useState } from 'react';

const RecipeView = () => {

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        initRecipe();
    }, []);

    const initRecipe = () => {
        let dummy = {
            "RECP_CODE": 1,
            "RECP_NAME": "나물비빔밥",
            "RECP_INTRO": "육수로 지은 밥에 야채를 듬뿍 넣은 영양만점 나물비빔밥!",
            "RECP_REGION_CODE": 3020001,
            "RECP_REGION_NAME": "한식",
            "RECP_CATEGORY_CODE": 3010001,
            "RECP_CATEGORY_NAME": "밥",
            "RECP_TIME": "60분",
            "RECP_KCAL": "580Kcal",
            "RECP_SERVIN": "4인분",
            "RECP_DIFFICULT": "보통",
            "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/000200.jpg"
        };

        setRecipe(dummy);
    }



    return (
        <>
            <h2 className='title'>레시피 뷰</h2>

            <div className='content'>
                <div className='recipe-view'>

                    <div className='recipe-info'>
                        <div>{recipe.RECP_CODE}</div>
                        <img src={recipe.RECP_MAIN_IMG} alt="" />
                        <div>{recipe.RECP_NAME}</div>

                        <div className=''>
                            <div>{recipe.RECP_CATEGORY_NAME}</div>
                            <div>{recipe.RECP_KCAL}</div>
                            <div>{recipe.RECP_SERVIN}</div>
                            <div>{recipe.RECP_DIFFICULT}</div>
                        </div>
                    </div>


                    <div className='recipe-intro'>{recipe.RECP_INTRO}</div>


                    <div>재료 목록</div>

                    <div>레시피 과정</div>

                </div>
            </div>
        </>
    );
};

export default RecipeView;