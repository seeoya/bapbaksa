import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';

const MyPage = () => {

    useEffect(() => {
        setTitle('마이 페이지');
    });

    return (
        <div className='mypage-list'>
            <Link to={"/mypage/like"} className='btn main'>
                <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                <span>좋아하는 레시피</span>
            </Link>
            <Link to={"/mypage/myfridge"} className='btn sub'>
                <FontAwesomeIcon icon="fa-solid fa-carrot" />
                <span>내 냉장고</span>
            </Link>
            <Link to={"/market/pay-history"} className='btn highlight'>
                <FontAwesomeIcon icon="fa-solid fa-receipt" />
                <span>구매내역</span>
            </Link>
        </div>
    );
};

export default MyPage;