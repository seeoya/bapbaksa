import React from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
    return (
        <div>
            <Link to={"/mypage/like"} className='btn main'>좋아하는 레시피</Link>
            <Link to={"/mypage/myfridge"} className='btn main'>내 냉장고</Link>
            <Link to={"/market/pay-history"} className='btn main'>구매내역</Link>
        </div>
    );
};

export default MyPage;