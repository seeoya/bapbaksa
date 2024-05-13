import React, { useEffect, useState } from 'react';
import { AddMyFridgeQuery, AllFridgeQuery, DeleteMyFridgeQuery, MyFridgeQuery } from '../../query/fridgeQuerys';
import { getToken } from '../../storage/loginedToken';

const MyFridge = () => {

    const { data: myFridgeList, isLoading: myFridgeIsLoading, isError: myFridgeIsError } = MyFridgeQuery();
    const { data: allFridgeList, isLoading: allFridgeIsLoading, isError: allFridgeIsError } = AllFridgeQuery();
    const { mutate: addMyFridgeMutate } = AddMyFridgeQuery();
    const { mutate: deleteMyFridgeMutate } = DeleteMyFridgeQuery();

    const [myFridgeState, setMyFridgeState] = useState([]);
    const [notMyFridgeState, setNotMyFridgeState] = useState([]);

    useEffect(() => {
        initIngreDivine();
        console.log("내 냉장고: ", myFridgeState);
    }, [allFridgeList, myFridgeList]);

    const initIngreDivine = () => {
        if (allFridgeList && myFridgeList) {
            let tmpList = [];
            let tmpList2 = Object.keys(myFridgeList).map((el) => {
                return parseInt(el);
            });

            Object.keys(allFridgeList).map((el) => {
                if (!tmpList2.includes(parseInt(el))) { tmpList.push(parseInt(el)) };
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

    const addIngreBtnEvent = async (no) => {
        addMyFridgeMutate(no);
    }

    const deleteIngreBtnEvent = async (no) => {
        deleteMyFridgeMutate(no);
    }

    return (
        <div id='my_fridge' className='content-wrap'>
            <h2 className='title'>나의 냉장고</h2>
            <div className='content'>
                {
                    getToken('loginedUNo') ?
                        <>
                            <div className='my-fridge fridge-list'>
                                <div className='title'>냉장고</div>

                                <div className='ingre-list'>
                                    {
                                        myFridgeState ?
                                            myFridgeState.map((el, idx) => {
                                                return <button type='button' data-index={allFridgeList[el].RF_NO} key={allFridgeList[el].RF_NO} className='btn main' onClick={() => deleteIngreBtnEvent(allFridgeList[el].RF_NO)}>
                                                    <img src={allFridgeList[el].RF_IMG ? "/imgs/product/" + allFridgeList[el].RF_IMG : "/imgs/recipe/recipe_default.png"} alt={allFridgeList[el].RF_NAME} />
                                                    {allFridgeList[el].RF_NAME}
                                                </button>
                                            })
                                            :
                                            <div className='empty'>냉장고에 재료가 없습니다.</div>
                                    }
                                </div>
                            </div>

                            <div className='not-my-fridge fridge-list'>
                                <div className='title'>재료 목록</div>

                                <div className='ingre-list'>
                                    {
                                        notMyFridgeState ?
                                            notMyFridgeState.map((el) => {
                                                return <button type='button' data-index={allFridgeList[el].RF_NO} key={allFridgeList[el].RF_NO} className='btn sub' onClick={() => addIngreBtnEvent(allFridgeList[el].RF_NO)}>
                                                    <img src={allFridgeList[el].RF_IMG ? "/imgs/product/" + allFridgeList[el].RF_IMG : "/imgs/recipe/recipe_default.png"} alt={allFridgeList[el].RF_NAME} />
                                                    {allFridgeList[el].RF_NAME}
                                                </button>
                                            }) : null
                                    }
                                </div>
                            </div>
                        </>
                        : <div className='empty'>로그인 후 확인할 수 있습니다.</div>
                }
            </div>
        </div>
    );
};

export default MyFridge;