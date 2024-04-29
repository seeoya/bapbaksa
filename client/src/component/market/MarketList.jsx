import React, { useState } from "react";

const MarketList = () => {
    const [searchText, setSearchText] = useState("");
    const [visibleCount, setVisibleCount] = useState(12);

    const searchValue = (e) => {
        setSearchText(e.target.value);
    };

    function banbokmun() {
        let jaeryo = [];

        for(let i = 1; i <= 50; i++) {
            jaeryo.push(i);
        }

        return jaeryo;
    }

    let banbokmunlist = banbokmun();

    function searchBtnClickHandler() {
        setSearchText("");
    }

    function handleMoreClick() {
        setVisibleCount(prevCount => prevCount + 12);
    }

    return (
        <div className='content-wrap' id="market_list">
            <h2 className='title'>제품 리스트</h2>
            <div className='content'>
                <div className="search-wrap">
                    <input 
                        type="text" 
                        value={searchText} 
                        name="search_text" 
                        data-search_text={searchText}
                        onChange={(e) => searchValue(e)}
                        placeholder="검색어를 입력해 주세요."
                    />
                    <button 
                        type="button" 
                        onClick={searchBtnClickHandler} 
                    >
                        검색
                    </button>
                </div>    
                <div className="ingredient-wrap">
                    <ul>
                        {banbokmunlist.slice(0, visibleCount).map((item, index) => (
                            <li 
                                key={index}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    {visibleCount < banbokmunlist.length && (
                        <button onClick={handleMoreClick}>더 보기</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarketList;
