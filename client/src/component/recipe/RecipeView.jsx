import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const RecipeView = () => {

    let url_params = useParams().no;

    const [recipe, setRecipe] = useState({});
    const [progress, setProgress] = useState({});
    const [ingre, setIngre] = useState([]);

    useEffect(() => {
        initRecipe();
        window.scrollTo(0, 0);
    }, []);

    const initRecipe = async () => {
        await axios.get(process.env.REACT_APP_REST_SERVER_URL + "/recipe", {
            params: {
                type: "view",
                recipe: url_params
            }
        }).then((data) => {
            console.log(data.data);

            setRecipe(data.data);
            setIngre(data.data.RECP_INGRD);
            setProgress(data.data.RECP_PROGRESS);
        }).catch((err) => {
            return { type: "error" };
        });
    }


    return (
        <>
            <h2 className='title'>{recipe.RECP_NAME}</h2>

            <div className='content'>
                <div className='recipe-view' data-recp-code={recipe.RECP_CODE}>
                    <div className='recipe-info'>
                        <h3 className='recipe-title'>기본정보</h3>

                        <div className='recipe-content'>
                            <div>
                                <img src={recipe.RECP_MAIN_IMG} alt={recipe.RECP_NAME} />
                            </div>

                            <div className='info'>
                                <div>
                                    <div className='info-title'>종류</div>
                                    <div>{recipe.RECP_REGION_NAME} / {recipe.RECP_CATEGORY_NAME}</div>
                                </div>

                                <div className='sub'>
                                    <div>
                                        <div className='info-title'>양</div>
                                        <div>{recipe.RECP_SERVIN}</div>
                                    </div>
                                    <div>
                                        <div className='info-title'>열량</div>
                                        <div>{recipe.RECP_KCAL}</div>
                                    </div>
                                    <div>
                                        <div className='info-title'>소요시간</div>
                                        <div>{recipe.RECP_TIME}</div>
                                    </div>

                                    <div>
                                        <div className='info-title'>난이도</div>
                                        <div>{recipe.RECP_DIFFICULT}</div>
                                    </div>
                                </div>

                                <div>
                                    <div className='info-title'>소개</div>
                                    <div>{recipe.RECP_INTRO}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='recipe-ingre'>
                        <h3 className='recipe-title'>재료 목록</h3>

                        <div className='recipe-content'>
                            {
                                Object.keys(ingre).map((el, idx) => {

                                    let ingreText = ingre[el].RECP_INGRD_PORTIONS !== "" ? " / " + ingre[el].RECP_INGRD_PORTIONS : "";
                                    let ingreClass = "";

                                    switch (ingre[el].RECP_INGRED_TYPE_NAME) {
                                        case "주재료":
                                            ingreClass = "main-ingre";
                                            break;
                                        case "부재료":
                                            ingreClass = "sub-ingre";
                                            break;
                                        case "양념":
                                            ingreClass = "add-ingre";
                                            break;
                                        default:
                                            break;
                                    }

                                    return <Link to={"/market/list?seacrh=" + ingre[el].RECP_INGRD_NAME} className={'ingre-link ' + ingreClass} key={idx}>
                                        {ingre[el].RECP_INGRD_NAME}{ingreText}
                                        <span><i class="fa-solid fa-magnifying-glass"></i></span>
                                    </Link>
                                })
                            }

                        </div>

                    </div>

                    <div className='recipe-progress'>
                        <h3 className='recipe-title'>레시피 과정</h3>

                        <div className='recipe-content'>
                            {Object.keys(progress).sort().map((el, idx) => {
                                let progressImg = progress[el].RECP_ORDER_IMG.trim() ? progress[el].RECP_ORDER_IMG : "/imgs/recipe/recipe_default.png";
                                let progressTip = progress[el].RECP_ORDER_TIP.trim() ?
                                    <div className='tip'><i class="fa-regular fa-lightbulb"></i> {progress[el].RECP_ORDER_TIP}</div> : null;

                                return <div className='progress-item' data-idx={progress[el].RECP_ORDER_NO} key={idx}>
                                    <img src={progressImg} alt={progress[el].RECP_CODE + "_" + progress[el].RECP_ORDER_NO} />

                                    <div className='progress-detail'>
                                        <div><span className='no'>{progress[el].RECP_ORDER_NO} .</span>{progress[el].RECP_ORDER_DETAIL}</div>
                                        {progressTip}
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default RecipeView;