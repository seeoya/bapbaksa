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

        <div className='content-wrap' id="payment_history_wrap">
                <h2 className='title'>결제 내역</h2>
                <div id="payment_total_wrap">
                    <div className='content ingredient-cart-wrap'>
                        <div className="ingredient-payment-history">
                            <div>
                                <p>주문 번호: 1</p>
                            </div>
                            <div>
                                <p>주문 시간: 2024.04.29.12:30</p>
                            </div>
                        </div>
                        <div className="select-btn-order-info">
                            <div className="payment-history-btn-status">
                                <div className="all-select-btn">
                                    <input
                                        className="ingredient-cart-all-check-btn"
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={toggleSelectAll}
                                        />
                                        <p>전체 선택</p>
                                </div>
                                <p>주문 상태 : 배송 중</p>
                            </div>
                        </div>
                        <div className="ingredient-cart-item">
                            <div className="payment-history-check">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(0)}
                                    onChange={() => toggleItemSelection(0)}
                                />
                                <img className="ingredient-cart-img" src="/img/방울토마토.jpg" alt="ingredient" />
                            </div>
                            <div>
                                <span>이름:토마토</span>
                            </div>
                            <div>
                                <span>수량:5kg</span>
                            </div>
                            <div>
                                <span>가격:55,000원</span>
                            </div>
                        </div>
                        <div className="ingredient-cart-item">
                            <div className="payment-history-check">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(1)}
                                    onChange={() => toggleItemSelection(1)}
                                />
                                <img className="ingredient-cart-img" src="/img/상추.jpg" alt="ingredient" />
                            </div>
                            <div>
                                <span>이름:상추</span>
                            </div>
                            <div>
                                <span>수량:5kg</span>
                            </div>
                            <div>
                                <span>가격:80,000원</span>
                            </div>
                        </div>
                    
                        <div className="ingredient-cart-btn">
                            <p>가격 : 135,000원</p>
                            <button>환불 요청</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory;