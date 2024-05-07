import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const dispatch = useDispatch();

    // 재료
    const allFridgeList = useSelector((state) => state.fridge.allFridge);
    const myFridgeList = useSelector((state) => state.fridge.myFridge);

    const [myFridgeState, setMyFridgeState] = useState([]);
    const [notMyFridgeState, setNotMyFridgeState] = useState([]);
    const [activeIngreList, setActiveIngreList] = useState([]);

    // 카테고리
    // const [regionList, setRegionList] = useSelector((state) => state.recipe.region);
    // const [categoryList, setCategoryList] = useSelector((state) => state.recipe.category);
    const [regionList, setRegionList] = useState({});
    const [categoryList, setCategoryList] = useState({});
    const [activeRegionList, setActiveRegionList] = useState([]);
    const [activeCateList, setActiveCateList] = useState([]);

    // 검색 정렬
    const [searchString, setSearchString] = useState("전");
    const [sortState, setSortState] = useState("new");

    // 레시피
    const [recipeList, setRecipeList] = useState({});
    const [recipePage, setRecipePage] = useState(1);
    const [recipePageItemCount, setRecipePageItemCount] = useState(20);
    const [moreBtnState, setMoreBtnState] = useState(true);

    useEffect(() => {
        initIngreDivine();
        initCategoryList();
        initRecipeList();
    }, []);

    useEffect(() => {
        initIngreDivine();
    }, [allFridgeList, myFridgeList]);

    useEffect(() => {
        initRecipeList();
    }, [recipePage, recipePageItemCount]);

    const initCategoryList = async () => {
        // category
        await axios
            .get(process.env.REACT_APP_REST_SERVER_URL + "/recipe/category")
            .then((data) => {
                console.log(1111, data.data);
                setCategoryList(data.data);
            })
            .catch((err) => {
                return { type: "error" };
            });

        // region
        await axios
            .get(process.env.REACT_APP_REST_SERVER_URL + "/recipe/region")
            .then((data) => {
                console.log(2222, data.data);
                setRegionList(data.data);
            })
            .catch((err) => {
                return { type: "error" };
            });
    }

    const initRecipeList = async () => {
        console.log("recipe init")

        await axios
            .get(process.env.REACT_APP_REST_SERVER_URL + "/recipe", {
                params: {
                    type: "list",
                    page: recipePage,
                    pagePerItem: recipePageItemCount,
                    sort: sortState,
                    search: searchString,
                    cateList: activeCateList,
                    regionList: activeRegionList,
                },
            })
            .then((data) => {
                // #TODO 페이징 추가 후 반복문 제거
                let newList = {}

                for (let i = 0; i < (recipePageItemCount * recipePage); i++) {
                    let thisRecipeNo = Object.keys(data.data)[i];

                    if (thisRecipeNo) {
                        newList[thisRecipeNo] = data.data[thisRecipeNo];
                    } else {
                        setMoreBtnState(false)
                    }
                }

                console.log("newList", newList);

                setRecipeList(newList);
                // setRecipeList(data.data);
            })
            .catch((err) => {
                return { type: "error" };
            });
    }

    const initIngreDivine = () => {
        if (allFridgeList && myFridgeList) {
            let tmpList = [];
            let tmpList2 = myFridgeList;

            Object.keys(allFridgeList).map((el) => {
                if (!myFridgeList.includes(parseInt(el))) { tmpList.push(parseInt(el)) };
            })

            tmpList.sort((a, b) => {
                return allFridgeList[a].RF_NAME > allFridgeList[b].RF_NAME ? 1 : allFridgeList[a].RF_NAME < allFridgeList[b].RF_NAME ? -1 : 0;
            });
            tmpList2.sort((a, b) => {
                return allFridgeList[a].RF_NAME > allFridgeList[b].RF_NAME ? 1 : allFridgeList[a].RF_NAME < allFridgeList[b].RF_NAME ? -1 : 0;
            });

            setNotMyFridgeState(tmpList);
            setMyFridgeState(tmpList2);
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

    const cateBtnClickEvent = async (e) => {

    }

    const regionBtnClickEvent = async (e) => {

    }

    const moreBtnClickEvent = () => {
        console.log(111);

        setRecipePage((prev) => { return prev + 1 })
    }

    return (
        <>
            <h2 className='title'>레시피 목록</h2>

            <div className='content'>

                <div className='recipe-filter'>
                    <div>
                        <div>내 냉장고 재료</div>
                        <div className='filter-wrap fridge-ingre'>
                            {
                                myFridgeState ?
                                    myFridgeState.map((el, idx) => {
                                        return <button type='button' data-idx={allFridgeList[el].RF_NO} key={idx} className={activeIngreList.includes(allFridgeList[el].RF_NO) ? "btn ingre on" : "btn ingre"} onClick={(e) => ingreBtnClickEvent(e)}>{allFridgeList[el].RF_NAME}</button>
                                    })
                                    : null
                            }
                        </div>
                    </div>

                    <div>
                        <div>추가 재료</div>
                        <div className='filter-wrap ingre'>
                            {
                                notMyFridgeState ?
                                    notMyFridgeState.map((el, idx) => {
                                        return <button type='button' data-idx={allFridgeList[el].RF_NO} key={idx} className={activeIngreList.includes(allFridgeList[el].RF_NO) ? "btn ingre on" : "btn ingre"} onClick={(e) => ingreBtnClickEvent(e)}>{allFridgeList[el].RF_NAME}</button>
                                    }) : null
                            }
                        </div>
                    </div>

                    <div>
                        <div>카테고리</div>
                        <div className='filter-wrap cate'>
                            {
                                categoryList ?
                                    Object.keys(categoryList).map((el, idx) => {
                                        return <button type='button' data-idx={categoryList[el].RECP_CATEGORY_CODE} key={idx} className={'btn cate'} onClick={(e) => cateBtnClickEvent(e)} >{categoryList[el].RECP_CATEGORY_NAME}</button>
                                    }) : null
                            }
                        </div>
                    </div>

                    <div className='half'>
                        <div>나라별</div>
                        <div className='filter-wrap region'>
                            {
                                regionList ?
                                    Object.keys(regionList).map((el, idx) => {
                                        return <button type='button' data-idx={regionList[el].RECP_REGION_CODE} key={idx} className={'btn cate'} onClick={(e) => regionBtnClickEvent(e)} >{regionList[el].RECP_REGION_NAME}</button>
                                    }) : null
                            }
                        </div>
                    </div>

                    <div className='half'>
                        <div>시간별</div>
                        <div className='filter-wrap region'>
                            {
                                regionList ?
                                    Object.keys(regionList).map((el, idx) => {
                                        return <button type='button' data-idx={regionList[el].RECP_REGION_CODE} key={idx} className={'btn cate'} onClick={(e) => regionBtnClickEvent(e)} >{regionList[el].RECP_REGION_NAME}</button>
                                    }) : null
                            }
                        </div>
                    </div>

                    <div className='half'>
                        <div>난이도별</div>
                        <div className='filter-wrap region'>
                            {
                                regionList ?
                                    Object.keys(regionList).map((el, idx) => {
                                        return <button type='button' data-idx={regionList[el].RECP_REGION_CODE} key={idx} className={'btn cate'} onClick={(e) => regionBtnClickEvent(e)} >{regionList[el].RECP_REGION_NAME}</button>
                                    }) : null
                            }
                        </div>
                    </div>
                </div>

                <div className='recipe-list'>
                    {

                        recipeList ?
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
                            }) : null
                    }

                    {
                        moreBtnState ?
                            <button type='button' className='btn main btn-more' onClick={moreBtnClickEvent}>더보기</button>
                            : null
                    }

                </div>

            </div>
        </>
    );
};

export default RecipeList;