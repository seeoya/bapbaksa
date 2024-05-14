import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllFridgeQuery, MyFridgeQuery } from '../../query/fridgeQuerys';
import { AllRecipeQuery } from '../../query/recipeQuerys';
import { initIngreDivineAction } from '../../redux/actions/fridge_action';
import RecipeListFilter from './RecipeListFilter';
import RecipeListItem from './RecipeListItem';

const RecipeList = () => {
    const dispatch = useDispatch();

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
        initIngreDivine();
    }, [allFridgeList, myFridgeList]);

    useEffect(() => {
        filterRecipe();
    }, [recipeList]);

    useEffect(() => {

        console.log(activeIngreList, activeRegionList, activeCateList, activeDifficultList, sortState, filterInclude, recipeSearch)
        filterRecipe();
        setRecipeListViewCount(20);
    }, [activeIngreList, activeRegionList, activeCateList, activeDifficultList, sortState, filterInclude, recipeSearch]);

    useEffect(() => {
        filteredRecipeCount > recipeListViewCount ? setMoreBtnState(true) : setMoreBtnState(false);
    }, [filteredRecipeCount, recipeListViewCount]);

    const initIngreDivine = () => {
        if (allFridgeList && myFridgeList) {
            dispatch(initIngreDivineAction(allFridgeList, myFridgeList));
        }
    }

    const filterRecipe = async () => {
        console.log("recipe filter");

        if (recipeList) {
            let keys = Object.keys(recipeList);
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
                // filterInclude 0
                

                // sortState 'old'


                tmp.push(el);
            })

            console.log("length: ", tmp.length);

            setFilteredRecipeList(tmp);
            setFilteredRecipeCount(tmp.length);
        }
    }


    const moreBtnClickEvent = () => {
        console.log('more');

        setRecipeListViewCount((prev) => prev + 20);
    }

    return (
        <>
            <div>지역: {activeRegionList}</div>
            <div>카테: {activeCateList}</div>
            <div>난이도: {activeDifficultList}</div>
            <div>검색어: {recipeSearch}</div>
            <div>재료: {activeIngreList}</div>
            <div>포함여부: {filterInclude}</div>
            <div>소트: {sortState}</div>

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
                    setMoreBtnState={setMoreBtnState} filteredRecipeCount={filteredRecipeCount}
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
                            <button type='button' className='btn main btn-more' onClick={moreBtnClickEvent}>더보기</button>
                            : null
                    }
                </div>

            </div>
        </>
    );
};

export default RecipeList;