import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddMyFridgeQuery, AllFridgeQuery, DeleteMyFridgeQuery, MyFridgeQuery } from '../../query/fridgeQuerys';
import { initIngreDivineAction } from '../../redux/actions/fridge_action';
import { getToken } from '../../storage/loginedToken';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';

const MyFridge = () => {
    const dispatch = useDispatch();

    const { data: myFridgeList, isLoading: myFridgeIsLoading, isError: myFridgeIsError } = MyFridgeQuery();
    const { data: allFridgeList, isLoading: allFridgeIsLoading, isError: allFridgeIsError } = AllFridgeQuery();
    const { mutate: addMyFridgeMutate } = AddMyFridgeQuery();
    const { mutate: deleteMyFridgeMutate } = DeleteMyFridgeQuery();

    const myFridgeState = useSelector((state) => state.fridge.myFridgeState);
    const notMyFridgeState = useSelector((state) => state.fridge.notMyFridgeState);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTitle("나의 냉장고");
    }, []);


    useEffect(() => {
        setIsLoading(true);
        if (allFridgeList && myFridgeList) {
            initIngreDivine();
        }
    }, [allFridgeList, myFridgeList]);

    const initIngreDivine = () => {
        dispatch(initIngreDivineAction(allFridgeList, myFridgeList));
        setIsLoading(false);
    }

    const addIngreBtnEvent = async (no) => {
        setIsLoading(true);
        addMyFridgeMutate(no);
    }

    const deleteIngreBtnEvent = async (no) => {
        setIsLoading(true);
        deleteMyFridgeMutate(no);
    }

    return (
        <>
            {isLoading ? <Loading /> : null}

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
        </>
    );
};

export default MyFridge;