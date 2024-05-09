import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMyFridgeAction } from '../../redux/actions/fridge_action';
import { getToken } from '../../storage/loginedToken';

const MyFridge = () => {
    const dispatch = useDispatch();

    const allFridgeList = useSelector((state) => state.fridge.allFridge);
    const myFridgeList = useSelector((state) => state.fridge.myFridge);

    const [myFridgeState, setMyFridgeState] = useState([]);
    const [notMyFridgeState, setNotMyFridgeState] = useState([]);

    useEffect(() => {
        initMyFridge()
    }, []);

    useEffect(() => {
        initIngreDivine();
    }, [allFridgeList, myFridgeList]);

    const initMyFridge = async () => {
        let uNo = getToken('loginedUNo');
        console.log("uno", uNo);

        if (uNo) {
            dispatch(await loadMyFridgeAction(uNo));
        }
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

    const addIngreBtnEvent = async (no) => {
        await axios
            .post(process.env.REACT_APP_SERVER_URL + "/fridge/add", {
                // #TODO u_no 수정하기
                u_no: getToken('loginedUNo'),
                rf_no: no
            })
            .then((data) => {
                console.log(data.data);
                if (data.data.status === 200) {
                    initMyFridge();
                }
            })
            .catch((err) => {
                return { type: "error" };
            });
    }

    const deleteIngreBtnEvent = async (no) => {
        await axios
            .post(process.env.REACT_APP_SERVER_URL + "/fridge/delete", {
                // #TODO u_no 수정하기
                u_no: 1,
                rf_no: no

            })
            .then((data) => {
                console.log(data.data);
                if (data.data.status === 200) {
                    initMyFridge();
                }
            })
            .catch((err) => {
                return { type: "error" };
            });
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
                                                    {/* #TODO  이미지 파일명 수정되면 RF_IMG 로 수정 */}
                                                    <img src={allFridgeList[el].RF_IMG ? "/imgs/product/" + allFridgeList[el].RF_NAME + ".jpg" : "/imgs/recipe/recipe_default.png"} alt={allFridgeList[el].RF_NAME} />
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
                                                    {/* #TODO  이미지 파일명 수정되면 RF_IMG 로 수정 */}
                                                    <img src={allFridgeList[el].RF_IMG ? "/imgs/product/" + allFridgeList[el].RF_NAME + ".jpg" : "/imgs/recipe/recipe_default.png"} alt={allFridgeList[el].RF_NAME} />
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