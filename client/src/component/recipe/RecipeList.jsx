import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeListItem from './RecipeListItem';

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
    const [activeDifficultList, setActiveDifficultList] = useState([]);

    // 검색 정렬
    const [searchString, setSearchString] = useState("전");
    const [sortState, setSortState] = useState("new");

    // 레시피
    const [recipeList, setRecipeList] = useState({});
    const [recipePage, setRecipePage] = useState(1);
    const [recipePageItemCount, setRecipePageItemCount] = useState(30);
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
    }, [activeIngreList, activeRegionList, activeCateList, activeDifficultList]);

    const initCategoryList = async () => {
        // category
        await axios
            .get(process.env.REACT_APP_REST_SERVER_URL + "/recipe/category")
            .then((data) => {
                setCategoryList(data.data);
            })
            .catch((err) => {
                return { type: "error" };
            });

        // region
        await axios
            .get(process.env.REACT_APP_REST_SERVER_URL + "/recipe/region")
            .then((data) => {
                setRegionList(data.data);
            })
            .catch((err) => {
                return { type: "error" };
            });
    }

    const initRecipeList = async () => {
        console.log("recipe init")


        console.log(activeDifficultList);

        await axios
            .get(process.env.REACT_APP_REST_SERVER_URL + "/recipe", {
                params: {
                    type: "list",
                    // search: searchString,
                    // sort: sortState,
                    // sort: "lesstime",
                    region: activeRegionList,
                    // food: activeIngreList,
                    // food: [1,2,3],
                    // foodinclu: 0,
                    difficult: activeDifficultList,
                    category: activeCateList,
                    // page: recipePage,
                    // pagePerItem: recipePageItemCount,
                },
            })
            .then((data) => {
                console.log(data.data);

                // #TODO 페이징 추가 후 반복문 제거
                // let newList = {}

                // for (let i = 0; i < (recipePageItemCount * recipePage); i++) {
                //     let thisRecipeNo = Object.keys(data.data)[i];

                //     if (thisRecipeNo) {
                //         newList[thisRecipeNo] = data.data[thisRecipeNo];
                //     } else {
                //         setMoreBtnState(false)
                //     }
                // }

                // console.log("newList", newList);

                // setRecipeList(newList);
                setRecipeList(data.data);
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

            // #TODO 나중에 다시 처리
            // initDefaultActive();
        }
    }

    const initDefaultActive = () => {
        // #TODO 나중에 다시 처리
        if (myFridgeList) {
            console.log(11111);
            myFridgeList.map((el) => {
                console.log(22222, el)
                ingreBtnActiveEvent(el);
            })
        }
    }

    const ingreBtnActiveEvent = (no) => {
        console.log("active", no);
        if (activeIngreList.indexOf(parseInt(no)) > -1) {
            let list = activeIngreList.filter((el) => {
                return parseInt(el) !== parseInt(no)
            });

            setActiveIngreList(list);
        } else {
            setActiveIngreList([...activeIngreList, parseInt(no)]);
        }
    }

    const cateBtnActiveEvent = (no) => {
        console.log(this);

        if (activeCateList.indexOf(parseInt(no)) > -1) {
            let list = activeCateList.filter((el) => {
                return el !== parseInt(no)
            });

            setActiveCateList(list);
        } else {
            setActiveCateList([...activeCateList, parseInt(no)]);
        }

    }

    const regionBtnActiveEvent = (no) => {
        if (activeRegionList.indexOf(parseInt(no)) > -1) {
            let list = activeRegionList.filter((el) => {
                return el !== parseInt(no)
            });

            setActiveRegionList(list);
        } else {
            setActiveRegionList([...activeRegionList, parseInt(no)]);
        }
    }

    const difficultBtnActiveEvent = (text) => {
        if (activeDifficultList.indexOf(text) > -1) {
            let list = activeDifficultList.filter((el) => {
                return el !== text
            });

            setActiveDifficultList(list);
        } else {
            setActiveDifficultList([...activeDifficultList, text]);
        }
    }

    const moreBtnClickEvent = async () => {
        console.log('more');

        setRecipePage((prev) => { return prev + 1 })
    }

    return (
        <>
            <h2 className='title'>레시피 목록</h2>

            <div className='content'>

                <div className='recipe-filter'>
                    <div>
                        <div className='filter-title'>내 냉장고 재료</div>
                        <div className='filter-wrap fridge-ingre'>
                            {
                                myFridgeState ?
                                    myFridgeState.map((el, idx) => {
                                        return <button type='button' data-idx={allFridgeList[el].RF_NO} key={idx} className={activeIngreList.includes(allFridgeList[el].RF_NO) ? "btn ingre on" : "btn ingre"} onClick={() => ingreBtnActiveEvent(allFridgeList[el].RF_NO)}>{allFridgeList[el].RF_NAME}</button>
                                    })
                                    : null
                            }
                        </div>
                    </div>

                    <div>
                        <div className='filter-title'>추가 재료</div>
                        <div className='filter-wrap ingre'>
                            {
                                notMyFridgeState ?
                                    notMyFridgeState.map((el, idx) => {
                                        return <button type='button' data-idx={allFridgeList[el].RF_NO} key={idx} className={activeIngreList.includes(allFridgeList[el].RF_NO) ? "btn ingre on" : "btn ingre"} onClick={() => ingreBtnActiveEvent(allFridgeList[el].RF_NO)}>{allFridgeList[el].RF_NAME}</button>
                                    }) : null
                            }
                        </div>
                    </div>

                    <div>
                        <div className='filter-title'>카테고리</div>
                        <div className='filter-wrap cate'>
                            {
                                categoryList ?
                                    Object.keys(categoryList).map((el, idx) => {
                                        return <button type='button' data-idx={categoryList[el].RECP_CATEGORY_CODE} key={idx} className={activeCateList.includes(categoryList[el].RECP_CATEGORY_CODE) ? "btn cate on" : 'btn cate'} onClick={() => cateBtnActiveEvent(categoryList[el].RECP_CATEGORY_CODE)} >{categoryList[el].RECP_CATEGORY_NAME}</button>
                                    }) : null
                            }
                        </div>
                    </div>

                    <div className='half'>
                        <div className='filter-title'>나라별</div>
                        <div className='filter-wrap region'>
                            {
                                regionList ?
                                    Object.keys(regionList).map((el, idx) => {
                                        return <button type='button' data-idx={regionList[el].RECP_REGION_CODE} key={idx} className={activeRegionList.includes(regionList[el].RECP_REGION_CODE) ? "btn region on" : 'btn region'} onClick={() => regionBtnActiveEvent(regionList[el].RECP_REGION_CODE)} >{regionList[el].RECP_REGION_NAME}</button>
                                    }) : null
                            }
                        </div>
                    </div>

                

                    <div className='half'>
                        <div className='filter-title'>난이도별</div>
                        <div className='filter-wrap difficult'>
                            {
                                ["초보환영", "보통", "어려움"].map((el, idx) => {
                                    return <button type='button' data-idx={el} key={idx} className={activeDifficultList.includes(el) ? "btn difficult on" : 'btn difficult'} onClick={() => difficultBtnActiveEvent(el)} >{el}</button>
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='recipe-list'>
                    {

                        recipeList ?
                            Object.keys(recipeList).map((el, idx) => {
                                return <RecipeListItem itemNo={el} idx={idx} recipeList={recipeList} />
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