import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const dispatch = useDispatch();

    const allFridgeList = useSelector((state) => state.fridge.allFridge);
    const myFridgeList = useSelector((state) => state.fridge.myFridge);

    const [myFridgeState, setMyFridgeState] = useState([]);
    const [notMyFridgeState, setNotMyFridgeState] = useState([]);
    const [activeIngreList, setActiveIngreList] = useState([]);

    // const [regionList, setRegionList] = useSelector((state) => state.recipe.region);
    // const [categoryList, setCategoryList] = useSelector((state) => state.recipe.category);
    const [activeRegionList, setActiveRegionList] = useState([]);
    const [activeCateList, setActiveCateList] = useState([]);

    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        initCategoryList();
        initRecipeList();

        sortIngreState();

    }, []);

    useEffect(() => {
        sortIngreState()
    }, [allFridgeList, myFridgeList]);



    const initCategoryList = () => {

    }

    const initRecipeList = () => {

    }

    const sortIngreState = () => {
        console.log(allFridgeList);
        console.log(myFridgeList);

        if (allFridgeList && myFridgeList) {

            let tmp = myFridgeList;

            console.log("tmp", tmp);

            tmp.sort((a, b) => {

                console.log(a, b);

                console.log(allFridgeList[a]);
                console.log(allFridgeList[b]);

                return allFridgeList[a].RF_NAME > allFridgeList[b].RF_NAME ? 1 : allFridgeList[a].RF_NAME < allFridgeList[b].RF_NAME ? -1 : 0;
            });

            setMyFridgeState(tmp);
        }
    }

    const ingreBtnClickEvent = async (e) => {
        let item = e.target;

        if (item.classList.contains("on")) {
            let list = activeIngreList.filter((el) => {
                return el !== parseInt(item.dataset.idx)
            });

            setActiveIngreList(list);
        } else {
            setActiveIngreList([...activeIngreList, parseInt(item.dataset.idx)]);
        }
    }

    return (
        <>
            <h2 className='title'>레시피 목록</h2>

            <div className='content'>

                <div className='recipe-filter'>
                    <div>내 냉장고 재료</div>
                    <div className='filter-wrap fridge-ingre'>
                        {
                            myFridgeState.map((el, idx) => {
                                return <button type='button' data-idx={allFridgeList[el].RF_NO} key={idx} className={activeIngreList.includes(allFridgeList[el].RF_NO) ? "btn ingre on" : "btn ingre"} onClick={(e) => ingreBtnClickEvent(e)}>{allFridgeList[el].RF_NAME}</button>
                            })
                        }
                    </div>

                    <div>추가 재료</div>
                    <div className='filter-wrap ingre'>
                        {

                            myFridgeState.map((el, idx) => {
                                return <button type='button' data-idx={allFridgeList[el].RF_NO} key={idx} className={activeIngreList.includes(allFridgeList[el].RF_NO) ? "btn ingre on" : "btn ingre"} onClick={(e) => ingreBtnClickEvent(e)}>{allFridgeList[el].RF_NAME}</button>
                            })
                        }
                    </div>

                    <div>카테고리</div>
                    <div className='filter-wrap cate'>
                        {/* {cateList.map((el, idx) => {
                            return <button type='button' data-idx={el} key={idx} className={'btn cate'} onClick={(e) => cateBtnClickEvent(e)} >{el}</button>
                        })} */}
                    </div>
                </div>

                <div className='recipe-list'>
                    {
                        Object.keys(recipeList).map((el, idx) => {
                            return <Link to={"/recipe/view/" + el} className='recipe-item' key={idx} >
                                <div className='recipe-info'>
                                    <div>{recipeList[el].RECP_CODE}</div>
                                    <img src={recipeList[el].RECP_MAIN_IMG} alt={recipeList[el].RECP_NAME} />
                                    <div className='recipe-name'>{recipeList[el].RECP_NAME}</div>

                                    <div className='recipe-sub-info'>
                                        <div className='recipe-third-info'>
                                            <span>
                                                {recipeList[el].RECP_REGION_NAME}
                                            </span>
                                            <span>
                                                {recipeList[el].RECP_CATEGORY_NAME}
                                            </span>
                                            <span>
                                                {recipeList[el].RECP_KCAL}
                                            </span>
                                            <span>
                                                {recipeList[el].RECP_SERVIN}
                                            </span>
                                        </div>
                                        <div>{recipeList[el].RECP_TIME}/{recipeList[el].RECP_DIFFICULT} 난이도</div>
                                        <div className='recipe-intro'>{recipeList[el].RECP_INTRO}</div>
                                    </div>
                                </div>
                            </Link>
                        })
                    }


                </div>

            </div>
        </>
    );
};

export default RecipeList;