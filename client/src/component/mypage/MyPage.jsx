import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';

const MyPage = () => {

    useEffect(() => {
        setTitle('마이 페이지');
    });

    return (
        <div className='mypage-list'>
            <Link to={"/mypage/like"} className='btn main'>좋아하는 레시피</Link>
            <Link to={"/mypage/myfridge"} className='btn main'>내 냉장고</Link>
            <Link to={"/market/pay-history"} className='btn main'>구매내역</Link>
        </div>
    );
};

export default MyPage;