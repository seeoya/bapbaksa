import React, { useEffect } from 'react';
import { setTitle } from '../../util/setTitle';

const AdminMarketRefund = () => {

    useEffect(() => {
        setTitle('물품 환불승인');
    });

    return (
        <>
            <div className='title'>관리자 환불관리</div>

        </>
    );
};

export default AdminMarketRefund;