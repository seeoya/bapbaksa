import React, { useEffect } from 'react';
import { setTitle } from '../../util/setTitle';

const AdminMain = () => {

    useEffect(() => {
        setTitle('관리자 홈');
    });

    return (
        <div>
            관리자 메인
        </div>
    );
};

export default AdminMain;