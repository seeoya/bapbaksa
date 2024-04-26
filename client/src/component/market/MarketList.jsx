import React, { useState } from "react";
import "../../css/market/marketList.css";

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
        <div id="market_list">
            <div className="title-wrap">판매 목록</div>
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
    );
}

export default MarketList;
