import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeView = () => {

    const [recipe, setRecipe] = useState({});
    const [progress, setProgress] = useState({});
    const [ingre, setIngre] = useState({});

    useEffect(() => {
        initRecipe();
        initProgress();
        initIngre();
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

    const initProgress = () => {
        let dummy = {
            "1": {
                "RECP_CODE": 1,
                "RECP_ORDER_NO": 1,
                "RECP_ORDER_DETAIL": "양지머리로 육수를 낸 후 식혀 기름을 걷어낸 후, 불린 쌀을 넣어 고슬고슬하게 밥을 짓는다.",
                "RECP_ORDER_IMG": "http://file.okdab.com/UserFiles/searching/recipe/000200_p01.jpg",
                "RECP_ORDER_TIP": "여기는 팁을 작성하는 자리입니다. 팁팁."
            },
            "2": {
                "RECP_CODE": 1,
                "RECP_ORDER_NO": 2,
                "RECP_ORDER_DETAIL": "안심은 불고기 양념하여 30분간 재워 국물 없이 구워 한 김 식으면 한입 크기로 자른다.",
                "RECP_ORDER_IMG": "http://file.okdab.com/UserFiles/searching/recipe/000200_p02.jpg",
                "RECP_ORDER_TIP": " "
            },
            "5": {
                "RECP_CODE": 1,
                "RECP_ORDER_NO": 5,
                "RECP_ORDER_DETAIL": "밥을 참기름으로 무쳐 그릇에 담고 준비한 재료를 고루 얹는다.",
                "RECP_ORDER_IMG": " ",
                "RECP_ORDER_TIP": " "
            },
            "4": {
                "RECP_CODE": 1,
                "RECP_ORDER_NO": 4,
                "RECP_ORDER_DETAIL": "콩나물과 숙주, 미나리는 데쳐서 국간장과 참기름으로 간하고, 고사리와 도라지는 참기름을 두른 프라이팬에 살짝 볶아놓는다.",
                "RECP_ORDER_IMG": " ",
                "RECP_ORDER_TIP": " "
            },
            "3": {
                "RECP_CODE": 1,
                "RECP_ORDER_NO": 3,
                "RECP_ORDER_DETAIL": "청포묵은 고기와 비슷한 크기로 잘라 끓는 물에 데쳐내고 계란은 노른자와 흰자를 분리해 지단부쳐 곱게 채썬다.",
                "RECP_ORDER_IMG": " ",
                "RECP_ORDER_TIP": " "
            }
        }

        setProgress(dummy);

    }

    const initIngre = () => {
        let dummy = {
            "1": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 1,
                "RECP_INGRD_NAME": "쌀",
                "RECP_INGRD_CODE": 111,
                "RECP_INGRD_PORTIONS": "4컵",
                "RECP_INGRD_TYPE": 3060001,
                "RECP_INGRED_TYPE_NAME": "주재료"
            },
            "2": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 2,
                "RECP_INGRD_NAME": "안심",
                "RECP_INGRD_CODE": 0,
                "RECP_INGRD_PORTIONS": "200g",
                "RECP_INGRD_TYPE": 3060001,
                "RECP_INGRED_TYPE_NAME": "주재료"
            },
            "3": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 3,
                "RECP_INGRD_NAME": "콩나물",
                "RECP_INGRD_CODE": 818,
                "RECP_INGRD_PORTIONS": "20g",
                "RECP_INGRD_TYPE": 3060001,
                "RECP_INGRED_TYPE_NAME": "주재료"
            },
            "4": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 4,
                "RECP_INGRD_NAME": "청포묵",
                "RECP_INGRD_CODE": 0,
                "RECP_INGRD_PORTIONS": "1/2모",
                "RECP_INGRD_TYPE": 3060001,
                "RECP_INGRED_TYPE_NAME": "주재료"
            },
            "5": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 5,
                "RECP_INGRD_NAME": "미나리",
                "RECP_INGRD_CODE": 256,
                "RECP_INGRD_PORTIONS": "20g",
                "RECP_INGRD_TYPE": 3060001,
                "RECP_INGRED_TYPE_NAME": "주재료"
            },
            "6": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 6,
                "RECP_INGRD_NAME": "소금",
                "RECP_INGRD_CODE": 652,
                "RECP_INGRD_PORTIONS": "약간",
                "RECP_INGRD_TYPE": 3060003,
                "RECP_INGRED_TYPE_NAME": "양념"
            },
            "7": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 7,
                "RECP_INGRD_NAME": "국간장",
                "RECP_INGRD_CODE": 816,
                "RECP_INGRD_PORTIONS": "약간",
                "RECP_INGRD_TYPE": 3060003,
                "RECP_INGRED_TYPE_NAME": "양념"
            },
            "8": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 8,
                "RECP_INGRD_NAME": "다진파",
                "RECP_INGRD_CODE": 248,
                "RECP_INGRD_PORTIONS": "약간",
                "RECP_INGRD_TYPE": 3060003,
                "RECP_INGRED_TYPE_NAME": "양념"
            },
            "9": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 9,
                "RECP_INGRD_NAME": "다진마늘",
                "RECP_INGRD_CODE": 261,
                "RECP_INGRD_PORTIONS": "약간",
                "RECP_INGRD_TYPE": 3060003,
                "RECP_INGRED_TYPE_NAME": "양념"
            },
            "10": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 10,
                "RECP_INGRD_NAME": "참기름",
                "RECP_INGRD_CODE": 837,
                "RECP_INGRD_PORTIONS": "약간",
                "RECP_INGRD_TYPE": 3060003,
                "RECP_INGRED_TYPE_NAME": "양념"
            },
            "11": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 11,
                "RECP_INGRD_NAME": "고추장",
                "RECP_INGRD_CODE": 814,
                "RECP_INGRD_PORTIONS": "1/2큰술",
                "RECP_INGRD_TYPE": 3060002,
                "RECP_INGRED_TYPE_NAME": "부재료"
            },
            "12": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 12,
                "RECP_INGRD_NAME": "설탕",
                "RECP_INGRD_CODE": 833,
                "RECP_INGRD_PORTIONS": "약간",
                "RECP_INGRD_TYPE": 3060003,
                "RECP_INGRED_TYPE_NAME": "양념"
            },
            "13": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 13,
                "RECP_INGRD_NAME": "숙주",
                "RECP_INGRD_CODE": 0,
                "RECP_INGRD_PORTIONS": "20g",
                "RECP_INGRD_TYPE": 3060001,
                "RECP_INGRED_TYPE_NAME": "주재료"
            },
            "14": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 14,
                "RECP_INGRD_NAME": "도라지",
                "RECP_INGRD_CODE": 0,
                "RECP_INGRD_PORTIONS": "20g",
                "RECP_INGRD_TYPE": 3060001,
                "RECP_INGRED_TYPE_NAME": "주재료"
            },
            "15": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 15,
                "RECP_INGRD_NAME": "고사리",
                "RECP_INGRD_CODE": 0,
                "RECP_INGRD_PORTIONS": "20g",
                "RECP_INGRD_TYPE": 3060001,
                "RECP_INGRED_TYPE_NAME": "주재료"
            },
            "16": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 16,
                "RECP_INGRD_NAME": "계란",
                "RECP_INGRD_CODE": 516,
                "RECP_INGRD_PORTIONS": "1개",
                "RECP_INGRD_TYPE": 3060001,
                "RECP_INGRED_TYPE_NAME": "주재료"
            },
            "17": {
                "RECP_CODE": 1,
                "RECP_INGRD_ORDER_NO": 17,
                "RECP_INGRD_NAME": "양지머리",
                "RECP_INGRD_CODE": 0,
                "RECP_INGRD_PORTIONS": "100g",
                "RECP_INGRD_TYPE": 3060002,
                "RECP_INGRED_TYPE_NAME": "부재료"
            }
        }

        setIngre(dummy)
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
                                Object.keys(ingre).map((el) => {

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

                                    return <Link to={"/market/list?seacrh=" + ingre[el].RECP_INGRD_NAME} className={'ingre-link ' + ingreClass}>
                                        {ingre[el].RECP_INGRD_NAME}{ingreText}
                                    </Link>
                                })
                            }

                        </div>

                    </div>

                    <div className='recipe-progress'>
                        <h3 className='recipe-title'>레시피 과정</h3>

                        <div className='recipe-content'>
                            {Object.keys(progress).sort().map(el => {
                                let progressImg = progress[el].RECP_ORDER_IMG.trim() ? progress[el].RECP_ORDER_IMG : "/imgs/recipe/recipe_default.png";
                                let progressTip = progress[el].RECP_ORDER_TIP.trim() ?
                                    <div className='tip'><i class="fa-regular fa-lightbulb"></i> {progress[el].RECP_ORDER_TIP}</div> : null;

                                return <div className='progress-item' data-idx={progress[el].RECP_ORDER_NO}>
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