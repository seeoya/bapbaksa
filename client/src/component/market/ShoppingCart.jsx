import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShoppingCart = () => {

    return (
        <div id="shopping_cart_wrap" className='content-wrap'>
            <h2 className='title'>장바구니</h2>
            <div className="all-select-btn">
                <input id="selectAllCheckbox" type="checkbox" />
                <label htmlFor="selectAllCheckbox">전체 선택</label>
            </div>
            <div className='content ingredient-cart-wrap'>
                <div className='ingredient-view-wrap'>
                    <div className="ingredient-img-wrap">
                        <input type="checkbox" />
                        <Link to={`/market/view/:no`}>
                        <img className="ingredient-img" src="/img/방울토마토.jpg" alt="ingredient" />
                        </Link>
                        <Link to={`/market/view/:no`}>
                        <span className="ingredient-title">토마토</span>
                        </Link>
                    </div>
                    <div className="ingredient-info-wrap">
                        <div className="ingredient-top-wrap">
                            <span className="ingredient-unit">5kg</span>
                            <span className="ingredient-price">10,000원</span>
                        </div>
                    </div>
                    <div>
                        <div className="ingredient-middle-wrap">
                            <input type="button" value="-" />
                            <input type="number" id="result" />
                            <input type="button" value="+" />
                        </div>
                    </div>
                    <div>
                        <div className="ingredient-bottom-wrap">
                            <span className="ingredient-info">총액 : </span>
                            <span className="ingredient-price">10,000원</span>
                        </div>
                    </div>
                </div>
                <div className='ingredient-view-wrap'>
                        <div className="ingredient-img-wrap">
                            <input type="checkbox" />
                            <Link to={`/market/view/:no`}>
                            <img className="ingredient-img" src="/img/방울토마토.jpg" alt="ingredient" />
                            </Link>
                            <Link to={`/market/view/:no`}>
                            <span className="ingredient-title">토마토</span>
                            </Link>
                        </div>
                    <div className="ingredient-info-wrap">
                        <div className="ingredient-top-wrap">
                            <span className="ingredient-unit">5kg</span>
                            <span className="ingredient-price">10,000원</span>
                        </div>
                    </div>
                    <div>
                        <div className="ingredient-middle-wrap">
                            <input type="button" value="-" />
                            <input type="number" id="result" />
                            <input type="button" value="+" />
                        </div>
                    </div>
                    <div>
                        <div className="ingredient-bottom-wrap">
                            <span className="ingredient-info">총액 : </span>
                            <span className="ingredient-price">10,000원</span>
                        </div>
                    </div>
                </div>
                <div className="cart-payment-btn">
                    <button type="button" className='go-cart-btn'>선택 삭제</button>
                    <button type="button" className='go-payment-btn'>선택 결제</button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;
