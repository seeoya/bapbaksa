import React, { useEffect, useState } from 'react';

const RecipeList = () => {

    const [ingreList, setIngreList] = useState({});
    const [fridgeIngreList, setFridgeIngreList] = useState([]);
    const [notFridgeIngreList, setNotFridgeIngreList] = useState([]);
    const [activeIngreList, setActiveIngreList] = useState([]);

    const [cateList, setCateList] = useState([]);
    const [activeCateList, setActiveCateList] = useState([1, 2, 3, 4]);

    useEffect(() => {
        // 테스트용
        // initList();

        console.log("use state");

    }, []);

    useEffect(() => {
        initIngreList();
    }, [activeIngreList]);



    const initList = async () => {
        setIngreList({
            111: {
                RF_NO: 111,
                RF_NAME: "쌀",
            },
            112: {
                RF_NO: 112,
                RF_NAME: "찹쌀",
            },
            141: {
                RF_NO: 141,
                RF_NAME: "콩",
            },
            142: {
                RF_NO: 142,
                RF_NAME: "팥",
            },
            143: {
                RF_NO: 143,
                RF_NAME: "녹두",
            },
            151: {
                RF_NO: 151,
                RF_NAME: "고구마",
            },
            152: {
                RF_NO: 152,
                RF_NAME: "감자",
            },
        });

        setFridgeIngreList([111, 141])
        setIngreList([152, 151]);
        setActiveIngreList([1, 2, 3, 111]);
    }

    const initIngreList = () => {
        let finalList = [];
        let notActiveList = [];
        let activeList = [];

        if (fridgeIngreList.length > 0) {
            finalList = [];
            notActiveList = [];
            activeList = [];

            fridgeIngreList.map((el) => {
                if (activeIngreList.includes(el.RF_NO)) {
                    activeList.push(el);
                } else {
                    notActiveList.push(el);
                }
            })

            activeList.sort((a, b) => {
                return a.RF_NAME > b.RF_NAME ? 1 : a.RF_NAME < b.RF_NAME ? -1 : 0;
            });

            finalList = [...activeList, ...notActiveList];
            setFridgeIngreList(finalList);
        }
    }

    const activeFilter = () => {

    }

    const setFridgeIngre = () => {

    }

    const setIngre = () => {

    }

    const setCate = () => {

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

    const cateBtnClickEvent = (e) => {
        let item = e.target;

        if (item.classList.contains("on")) {
            let list = activeCateList.filter((el) => {
                return el !== parseInt(item.dataset.idx)
            });

            setActiveCateList(list);
        } else {
            setActiveCateList([...activeCateList, parseInt(item.dataset.idx)]);
        }
    }

    return (
        <>
            <h2 className='title'>레시피 목록</h2>

            <div className='content'>

                <div className='recipe-filter'>
                    <div>내 냉장고 재료</div>
                    <div className='filter-wrap fridge-ingre'>
                        {/* {ingreList.map((el, idx) => { */}
                        {/* console.log(el); */}
                        {/* return <button type='button' data-idx={ingreList.el.RF_NO} className={activeIngreList.includes(ingreList.el.RF_NO) ? "btn ingre on" : "btn ingre"} onClick={(e) => ingreBtnClickEvent(e)} key={idx}>{ingreList.el.RF_NAME}</button> */}
                        {/* })} */}
                        {/* {fridgeIngreList.map((el, idx) => {
                            console.log(el);
                            return <button type='button' data-idx={ingreList.el.RF_NO} className={activeIngreList.includes(ingreList.el.RF_NO) ? "btn ingre on" : "btn ingre"} onClick={(e) => ingreBtnClickEvent(e)} key={idx}>{ingreList.el.RF_NAME}</button>
                        })} */}
                    </div>

                    <div className='filter-wrap ingre'>
                        <div>전체 재료</div>
                        {notFridgeIngreList.map((el, idx) => {
                            return <button type='button' data-idx={el} className={'btn ingre'} onClick={(e) => ingreBtnClickEvent(e)} key={idx}>{el}</button>
                        })}
                    </div>

                    <div className='filter-wrap cate'>
                        {cateList.map((el, idx) => {
                            return <button type='button' data-idx={el} className={'btn cate'} onClick={(e) => cateBtnClickEvent(e)} key={idx}>{el}</button>
                        })}

                    </div>
                </div>

            </div>
        </>
    );
};

export default RecipeList;