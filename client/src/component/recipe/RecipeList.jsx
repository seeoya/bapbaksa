import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllFridgeQuery, MyFridgeQuery } from '../../query/fridgeQuerys';
import { AllRecipeQuery } from '../../query/recipeQuerys';
import { initIngreDivineAction } from '../../redux/actions/fridge_action';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';
import RecipeListFilter from './RecipeListFilter';
import RecipeListItem from './RecipeListItem';

const RecipeList = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [isFilterLoading, setIsFilterLoading] = useState(true);

    // 재료
    const { data: myFridgeList, isLoading: myFridgeIsLoading, isError: myFridgeIsError } = MyFridgeQuery();
    const { data: allFridgeList, isLoading: allFridgeIsLoading, isError: allFridgeIsError } = AllFridgeQuery();

    // 레시피
    const { data: recipeList, isLoading: recipeIsLoading, isError: recipeIsError } = AllRecipeQuery();
    const [filteredRecipeList, setFilteredRecipeList] = useState([]);
    const [filteredRecipeCount, setFilteredRecipeCount] = useState(0);
    const [moreBtnState, setMoreBtnState] = useState(true);

    // 카테고리
    const [activeRegionList, setActiveRegionList] = useState([]);
    const [activeCateList, setActiveCateList] = useState([]);
    const [activeDifficultList, setActiveDifficultList] = useState([]);

    // 필터
    const recipeSearch = useSelector((state) => state.recipe.search);
    const [activeIngreList, setActiveIngreList] = useState([]);
    const [sortState, setSortState] = useState("old");
    const [filterInclude, setFilterInclude] = useState(0);
    const [recipeListViewCount, setRecipeListViewCount] = useState(20);

    useEffect(() => {
        setTitle("레시피 목록");
    }, []);

    useEffect(() => {
        setIsLoading(true);
        if (allFridgeList && Object?.keys(allFridgeList)?.length > 0 && myFridgeList) {
            initIngreDivine();
        }
    }, [allFridgeList, myFridgeList]);

    useEffect(() => {
        setIsLoading(false);
    }, [filteredRecipeList]);

    useEffect(() => {
        filterRecipe();
    }, [recipeList]);

    useEffect(() => {
        setIsFilterLoading(true);
        filterRecipe();
        setRecipeListViewCount(20);
        setIsFilterLoading(false);
    }, [activeIngreList, activeRegionList, activeCateList, activeDifficultList, sortState, filterInclude, recipeSearch]);

    useEffect(() => {
        setIsFilterLoading(true);
        filteredRecipeCount > recipeListViewCount ? setMoreBtnState(true) : setMoreBtnState(false);
        setIsFilterLoading(false);
    }, [filteredRecipeCount, recipeListViewCount]);

    const initIngreDivine = () => {
        dispatch(initIngreDivineAction(allFridgeList, myFridgeList));
    }

    const filterRecipe = async () => {
        setIsFilterLoading(true);

        if (recipeList) {
            let keys = Object.keys(recipeList);
            keys = keys.map((el) => parseInt(el));

            let tmp = [];

            keys.map((el, idx) => {
                let item = recipeList[el];

                // activeRegionList [숫자, 숫자]
                if (activeRegionList.length > 0 && !activeRegionList.includes(item.RECP_REGION_CODE)) {
                    return false;
                }

                // activeCateList [숫자, 숫자]
                if (activeCateList.length > 0 && !activeCateList.includes(item.RECP_CATEGORY_CODE)) {
                    return false;
                }
                // activeDifficultList ['보통' ]
                if (activeDifficultList.length > 0 && !activeDifficultList.includes(item.RECP_DIFFICULT)) {
                    return false;
                }

                // recipeSearch '가지'
                if (recipeSearch && item.RECP_NAME.indexOf(recipeSearch) < 0) {
                    return false;
                }

                // activeIngreList [숫자, 숫자]
                // filterInclude 0 // 0 하나라도 1 전부 포함
                if (activeIngreList.length > 0) {
                    if (filterInclude == 0) {
                        let flag = false;

                        Object.keys(item.RECP_INGRD).map((ingre) => {
                            if (activeIngreList.includes(parseInt(ingre))) {
                                flag = true;
                            }
                        })

                        if (!flag) {
                            return false;
                        }
                    } else if (filterInclude == 1) {
                        let ingreTmp = Object.keys(item.RECP_INGRD).map((ingre) => {
                            return parseInt(ingre);
                        })

                        let flag = true;

                        activeIngreList.map((active) => {
                            if (!ingreTmp.includes(active)) {
                                flag = false;
                            }
                        })

                        if (!flag) {
                            return false;
                        }
                    }
                }

                tmp.push(parseInt(el));

                // sortState 'old'
                switch (sortState) {
                    case "old":
                        tmp.sort((a, b) => {
                            return a - b;
                        });
                        break;
                    case "new":
                        tmp.sort((a, b) => {
                            return b - a;
                        });
                        break;
                    case "lesstime":
                        tmp.sort((a, b) => {
                            return parseInt(recipeList[a].RECP_TIME) - parseInt(recipeList[b].RECP_TIME);
                        });
                        break;
                    case "moretime":
                        tmp.sort((a, b) => {
                            return parseInt(recipeList[b].RECP_TIME) - parseInt(recipeList[a].RECP_TIME);
                        });
                        break;
                    case "rowkal":
                        tmp.sort((a, b) => {
                            return parseInt(recipeList[a].RECP_KCAL) / parseInt(recipeList[a].RECP_SERVIN) - parseInt(recipeList[b].RECP_KCAL) / parseInt(recipeList[b].RECP_SERVIN);
                        });
                        break;
                    case "hightkal":
                        tmp.sort((a, b) => {
                            return parseInt(recipeList[b].RECP_KCAL) / parseInt(recipeList[b].RECP_SERVIN) - parseInt(recipeList[a].RECP_KCAL) / parseInt(recipeList[a].RECP_SERVIN);
                        });
                        break;
                    default:
                        break;
                }
            })

            setFilteredRecipeList(tmp);
            setFilteredRecipeCount(tmp.length);
        }
        setIsFilterLoading(false);
    }

    const moreBtnClickEvent = () => {
        setIsFilterLoading(true);
        setRecipeListViewCount((prev) => prev + 20);
    }

    return (
        <>
            {isLoading || isFilterLoading ? <Loading /> : null}

            <h2 className='title'>
                {
                    recipeSearch ?
                        `"${recipeSearch}" 검색 결과 ${filteredRecipeCount} 건`
                        : "레시피 목록"
                }
            </h2>

            <div className='content'>
                <RecipeListFilter
                    activeIngreList={activeIngreList} activeRegionList={activeRegionList} activeCateList={activeCateList} activeDifficultList={activeDifficultList}
                    setActiveIngreList={setActiveIngreList} setActiveRegionList={setActiveRegionList} setActiveCateList={setActiveCateList} setActiveDifficultList={setActiveDifficultList}
                    setSortState={setSortState} filterInclude={filterInclude} setFilterInclude={setFilterInclude}
                    filteredRecipeCount={filteredRecipeCount} setIsFilterLoading={setIsFilterLoading}
                />

                <div className='recipe-list'>
                    {
                        filteredRecipeList && filteredRecipeList.length > 0 ?
                            filteredRecipeList.map((el, idx) => {
                                if (idx < recipeListViewCount) {
                                    return <RecipeListItem itemNo={el} idx={idx} />
                                }
                            }) : <div className='empty'>일치하는 레시피가 없어요!</div>
                    }

                    {
                        moreBtnState ?
                            <button type='button' className='btn sub btn-more' onClick={moreBtnClickEvent}>더보기</button>
                            : null
                    }
                </div>

            </div>
        </>
    );
};

export default RecipeList;