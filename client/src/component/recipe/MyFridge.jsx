import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadMyFridgeAction } from '../../redux/actions/fridge_action';

const MyFridge = () => {
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    const loadMyFridge = async () => {
        let uNo = 1;
        dispatch(await loadMyFridgeAction(uNo));
    }

    const reduxTest2 = () => {
        dispatch({
            type: "view_state",
            data: { u_no: 1 }
        })
    }

    const reduxTest3 = () => {
        dispatch({
            type: "add_state",
            data: { u_no: 1 }
        })
    }

    return (
        <div className='content-wrap'>

            <h2 className='title'>나의 냉장고</h2>

            <div className='content'>
                <button type='button' onClick={loadMyFridge}>불러오기 버튼</button>

                {
                    // fridgeList
                    // fridgeList.length > 0 ?
                    //     fridgeList.map((el) => {
                    //         return <div>{el}</div>
                    //     })
                    //     :
                    //     <div>냉장고가 비어있습니다.</div>
                }

                <button type='button' onClick={loadMyFridge}>RT</button>
                <button type='button' onClick={reduxTest2}>view state</button>
                <button type='button' onClick={reduxTest3}>add state</button>


            </div>


        </div>
    );
};

export default MyFridge;