import React, { useState } from "react";
import "../../css/market/listView.css";

const ListView = () => {
    const [quantityInt ,setQuantityInt] = useState(0);

    const handleCount = (type) => {
        if (type === "plus") {
            setQuantityInt(quantityInt + 1);
        } else if (type === "minus" && quantityInt > 0) {
            setQuantityInt(quantityInt - 1);
        }
    };

    const quantityValue = (e) => {
        setQuantityInt(parseInt(e.target.value));
    };

    return (
        <div id="list_view">
            <div className="ingredient-view-wrap">
                <div className="ingredient-img-wrap">
                    <img className="ingredient-img" src="/img/방울토마토.jpg" alt="ingredient" />
                </div>
                <div className="ingredient-info-wrap">
                    <div className="ingredient-top-wrap">
                        <span className="ingredient-title">토마토</span>
                        <span className="ingredient-unit">5kg</span>
                        <span className="ingredient-price">10,000원</span>
                    </div>
                    <div className="ingredient-mid-wrap">
                        <select>
                            <option value={"방울토마토"}>방울토마토</option>
                            <option value={"대추토마토"}>대추토마토</option>
                        </select>
                    </div>
                    <div className="ingredient-cart-wrap">
                        <button type="button">장바구니</button>
                    </div>
                    <div className="ingredient-bottom-wrap">
                        <input type="button" onClick={() => handleCount("plus")} value="+" />
                        <input type="number" onChange={(e) => quantityValue(e)} value={quantityInt} id="result"></input>
                        <input type="button" onClick={() => handleCount("minus")} value="-" />
                        &nbsp;&nbsp;&nbsp;<button type="button">바로 결제</button>
                    </div>
                </div>
            </div>
            <div className="price-chart-wrap"></div>
        </div>
    );
};

export default ListView;
