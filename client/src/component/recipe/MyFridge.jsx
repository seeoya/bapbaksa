import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMyFridgeAction } from '../../redux/actions/fridge_action';

const MyFridge = () => {
    const dispatch = useDispatch();

    const fridgeList = useSelector((state) => state.fridge.MyFridge);

    useEffect(() => {

        initMyFridge();

    }, []);

    const initMyFridge = async () => {
        let uNo = 1;
        dispatch(await loadMyFridgeAction(uNo));
    }

    return (
        <div className='content-wrap'>

            <h2 className='title'>나의 냉장고</h2>

            <div className='content'>
                {
                    fridgeList ?
                        fridgeList.map((el) => {
                            return <div>{el}</div>
                        })
                        :
                        <div>냉장고에 재료가 없습니다.</div>
                }

            </div>


        </div>
    );
};

export default MyFridge;