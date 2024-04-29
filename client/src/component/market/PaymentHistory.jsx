import React from "react";
import { useState } from "react";

const PaymentHistory = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const toggleItemSelection = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter(itemIndex => itemIndex !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allItems = Array.from({ length: 2 }, (_, i) => i); // 품목 수에 따라 수정
            setSelectedItems(allItems);
        }
        setSelectAll(!selectAll);
    };

    return (
    <div id="shpping_cart_wrap">
        <div className="title-wrap">
            결제 내역
        </div>

        <div className="ingredient-cart-wrap">
            <div className="ingredient-payment-history">
                <p>주문 번호: 1</p>
                <p>주문 시간: 2024.04.29.12:30</p>
            </div>
            <div className="select-btn-order-info">
                <div className="all-select-btn">
                    <p>전체 선택</p>
                    <input
                        className="ingredient-cart-all-check-btn"
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                    />
                </div>
                <div>
                    <p>주문 상태 : 배송 중</p>
                </div>                
            </div>
            <div className="ingredient-cart-item">
                <input
                    type="checkbox"
                    checked={selectedItems.includes(0)}
                    onChange={() => toggleItemSelection(0)}
                />
                <img className="ingredient-cart-img" src="/img/방울토마토.jpg" alt="ingredient" />
                <span>이름:토마토</span>
                <span>수량:5kg</span>
                <span>가격:55,000원</span>
            </div>
            <div className="ingredient-cart-item">
                <input
                    type="checkbox"
                    checked={selectedItems.includes(1)}
                    onChange={() => toggleItemSelection(1)}
                />
                <img className="ingredient-cart-img" src="/img/상추.jpg" alt="ingredient" />
                <span>이름:상추</span>
                <span>수량:5kg</span>
                <span>가격:80,000원</span>
            </div>
        </div>
        <div className="ingredient-cart-btn">
            <input type="text" placeholder="총 가격" value={"135,000원"}/>
            <button>가격 : 135,000원</button>
            <button>선택 취소</button>
        </div>

    </div>
    )
}

export default PaymentHistory;