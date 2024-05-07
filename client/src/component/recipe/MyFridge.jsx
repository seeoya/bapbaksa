import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMyFridgeAction } from '../../redux/actions/fridge_action';

const MyFridge = () => {
    const dispatch = useDispatch();

    const allFridgeList = useSelector((state) => state.fridge.allFridge);
    const myFridgeList = useSelector((state) => state.fridge.MyFridge);

    useEffect(() => {

        initMyFridge();

    }, []);

    const initMyFridge = async () => {
        // #TODO 로그인한 회원 u_no로 변경
        let uNo = 1;
        dispatch(await loadMyFridgeAction(uNo));
    }

    return (
        <div className='content-wrap'>

            <h2 className='title'>나의 냉장고</h2>

            <div className='content'>
                {
                    allFridgeList ?
                        Object.keys(allFridgeList).map((el, idx) => {
                            return <div key={idx}>{allFridgeList[el].RF_NO} : {allFridgeList[el].RF_NAME}</div>
                        })
                        :
                        <div>냉장고에 재료가 없습니다.</div>
                }

            </div>


        </div>
    );
};

export default MyFridge;