import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeListFilter from './RecipeListFilter';
import RecipeListItem from './RecipeListItem';

const RecipeList = () => {
    const dispatch = useDispatch();

    // 재료
    const allFridgeList = useSelector((state) => state.fridge.allFridge);
    const myFridgeList = useSelector((state) => state.fridge.myFridge);
    const recipeSearch = useSelector((state) => state.recipe.search);

    const [myFridgeState, setMyFridgeState] = useState([]);
    const [notMyFridgeState, setNotMyFridgeState] = useState([]);
    const [activeIngreList, setActiveIngreList] = useState([]);

    // 카테고리
    // const [regionList, setRegionList] = useSelector((state) => state.recipe.region);
    // const [categoryList, setCategoryList] = useSelector((state) => state.recipe.category);

    const [activeRegionList, setActiveRegionList] = useState([]);
    const [activeCateList, setActiveCateList] = useState([]);
    const [activeDifficultList, setActiveDifficultList] = useState([]);

    // 검색 정렬
    const [searchString, setSearchString] = useState("");
    const [sortState, setSortState] = useState("old");
    const [filterInclude, setFilterInclude] = useState(0);

    // 레시피
    const [recipeList, setRecipeList] = useState({});
    const [recipeSortList, setRecipeSortList] = useState([]);

    const [recipePage, setRecipePage] = useState(0);
    const [recipePageItemCount, setRecipePageItemCount] = useState(20);
    const [recipeCount, setRecipeCount] = useState(0);
    const [moreBtnState, setMoreBtnState] = useState(true);

    useEffect(() => {
        initIngreDivine();
        initRecipeList();
    }, []);

    useEffect(() => {
        initIngreDivine();
    }, [allFridgeList, myFridgeList]);

    useEffect(() => {
        setRecipePage(0);
        initRecipeList();
    }, [activeIngreList, activeRegionList, activeCateList, activeDifficultList, sortState, filterInclude, recipeSearch]);

    useEffect(() => {
        setMoreBtn();
    }, [recipeCount, recipePage, recipePageItemCount]);

    const initRecipeList = async () => {
        console.log("recipe init");

        await loadRecipe("init");
    }

    const initIngreDivine = () => {
        if (allFridgeList) {
            if (myFridgeList) {
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
            } else {
                let tmpList = [];

                Object.keys(allFridgeList).map((el) => {
                    tmpList.push(parseInt(el))
                })

                tmpList.sort((a, b) => {
                    return allFridgeList[a].RF_NAME > allFridgeList[b].RF_NAME ? 1 : allFridgeList[a].RF_NAME < allFridgeList[b].RF_NAME ? -1 : 0;
                });

                setNotMyFridgeState(tmpList);
            }
        }
    }

    const setMoreBtn = () => {
        if (recipeCount > (recipePage + 1) * recipePageItemCount) {
            setMoreBtnState(true);
        } else {
            setMoreBtnState(false)
        }
    }

    const moreBtnClickEvent = async () => {
        console.log('more');

        await loadRecipe("more");
    }

    const loadRecipe = async (type) => {
        await axios
            .get(process.env.REACT_APP_REST_SERVER_URL + "/recipe", {
                params: {
                    type: "list",
                    search: recipeSearch,
                    sort: sortState,
                    region: activeRegionList,
                    food: activeIngreList,
                    foodinclu: filterInclude,
                    difficult: activeDifficultList,
                    category: activeCateList,
                    page: type === "more" ? recipePage + 1 : 0,
                    pagePerItem: recipePageItemCount,
                },
            })
            .then((data) => {
                console.log(data.data);

                if (data.data.count > 0) {
                    setRecipeCount(data.data.count)
                } else {
                    setRecipeCount(0)
                };

                if (type === "init") {
                    if (data.data.sortNo) {
                        setRecipeSortList(data.data.sortNo)
                    }

                    setRecipeList(data.data);
                    setRecipePage(0);
                } else if (type === "more") {
                    if (data.data.sortNo) {
                        setRecipeSortList([...recipeSortList, ...data.data.sortNo])
                    }

                    setRecipeList({ ...recipeList, ...data.data });
                    setRecipePage(prev => prev + 1);
                }
            })
            .catch((err) => {
                return { type: "error" };
            });
    }

    return (
        <>
            <h2 className='title'>
                {
                    recipeSearch ?
                        `"${recipeSearch}" 검색 결과 ${recipeCount} 건`
                        : "레시피 목록"
                }
            </h2>
            <div className='content'>
                <RecipeListFilter myFridgeState={myFridgeState} notMyFridgeState={notMyFridgeState}
                    activeIngreList={activeIngreList} activeRegionList={activeRegionList} activeCateList={activeCateList} activeDifficultList={activeDifficultList}
                    setActiveIngreList={setActiveIngreList} setActiveRegionList={setActiveRegionList} setActiveCateList={setActiveCateList} setActiveDifficultList={setActiveDifficultList}
                    setSortState={setSortState} filterInclude={filterInclude} setFilterInclude={setFilterInclude}
                    setMoreBtnState={setMoreBtnState} recipeCount={recipeCount}
                />

                <div className='recipe-list'>
                    {
                        recipeSortList ?
                            recipeSortList.map((el, idx) => {
                                if (el !== "count") {
                                    return <RecipeListItem itemNo={el} idx={idx} recipeList={recipeList} />
                                }
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