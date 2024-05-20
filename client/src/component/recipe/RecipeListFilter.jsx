import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllFridgeQuery, MyFridgeQuery } from '../../query/fridgeQuerys';
import { searchRecipe } from '../../redux/actions/recipe_action';

const RecipeListFilter = (props) => {
    let {
        activeIngreList, activeRegionList, activeCateList, activeDifficultList,
        setActiveIngreList, setActiveRegionList, setActiveCateList, setActiveDifficultList,
        setSortState, filterInclude, setFilterInclude, filteredRecipeCount, setIsFilterLoading } = props;

    const dispatch = useDispatch();

    // 재료
    const { data: myFridgeList, isLoading: myFridgeIsLoading, isError: myFridgeIsError } = MyFridgeQuery();
    const { data: allFridgeList, isLoading: allFridgeIsLoading, isError: allFridgeIsError } = AllFridgeQuery();
    const myFridgeState = useSelector((state) => state.fridge.myFridgeState);
    const notMyFridgeState = useSelector((state) => state.fridge.notMyFridgeState);

    const [regionList, setRegionList] = useState({});
    const [categoryList, setCategoryList] = useState({});

    useEffect(() => {
        setIsFilterLoading(true);
        initCategoryList();
    }, []);

    useEffect(() => {
        if (regionList && categoryList) {
            setIsFilterLoading(false);
        }
    }, [regionList, categoryList]);
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

    const ingreBtnActiveEvent = (no) => {
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

    const sortChangeEvent = () => {
        let sortFilter = document.getElementById("sort_filter").value;
        setSortState(sortFilter);
    }

    const resetRecipeEvent = () => {
        setActiveRegionList([]);
        setActiveCateList([]);
        setActiveDifficultList([]);
        dispatch(searchRecipe(""));
        document.getElementById("recipe_search").value = "";
        setActiveIngreList([]);
        setFilterInclude(0);
        setSortState("old");
    }

    return (
        <div className='recipe-filter'>
            <div className='default-filter'>
                <div>
                    <div className='filter-title'>내 냉장고 재료</div>
                    <div className='filter-wrap fridge-ingre'>
                        {
                            myFridgeState && myFridgeState.length > 0 ?
                                myFridgeState.map((el, idx) => {
                                    return <button type='button' data-idx={allFridgeList[el].RF_NO} key={idx} className={activeIngreList.includes(allFridgeList[el].RF_NO) ? "btn ingre on" : "btn ingre"} onClick={() => ingreBtnActiveEvent(allFridgeList[el].RF_NO)}>{allFridgeList[el].RF_NAME}</button>
                                })
                                : <div className='empty'>로그인 후 확인할 수 있습니다.</div>
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

                <div className='fit'>
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

                <div className='fit'>
                    <div className='filter-title'>난이도별</div>
                    <div className='filter-wrap difficult'>
                        {
                            ["초보환영", "보통", "어려움"].map((el, idx) => {
                                return <button type='button' data-idx={el} key={idx} className={activeDifficultList.includes(el) ? "btn difficult on" : 'btn difficult'} onClick={() => difficultBtnActiveEvent(el)} >
                                    {
                                        el == "초보환영" ? "★" : el == "보통" ? "★★" : "★★★"
                                    }
                                </button>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='sub-filter'>
                <div>
                    <div>
                        <input type="radio" name="food_include" id="food_include_0" value="0" defaultChecked={filterInclude === 0 ? "checked" : ""} onClick={() => setFilterInclude(0)} />
                        <label htmlFor="food_include_0">재료 하나라도 포함</label>
                        <input type="radio" name="food_include" id="food_include_1" value="1" defaultChecked={filterInclude === 1 ? "checked" : ""} onClick={() => setFilterInclude(1)} />
                        <label htmlFor="food_include_1">재료 전부 포함</label>
                    </div>

                    <select id="sort_filter" onChange={sortChangeEvent} className='input'>
                        <option value="old" defaultValue>번호 낮은 순</option>
                        <option value="new">번호 높은 순</option>
                        <option value="lesstime">조리시간 짧은 순</option>
                        <option value="moretime">조리시간 긴순</option>
                        <option value="rowkal">칼로리 낮은 순(인분당)</option>
                        <option value="hightkal">칼로리 높은 순(인분당)</option>
                    </select>
                </div>

                <div>
                    <div>총 {filteredRecipeCount} 건</div>
                    <button type='button' onClick={resetRecipeEvent}>선택 옵션 되돌리기 <FontAwesomeIcon icon="fa-solid fa-rotate-left" /></button>

                </div>
            </div>
        </div>
    );
};

export default RecipeListFilter;