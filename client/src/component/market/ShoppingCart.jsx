import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import { getToken } from "../../storage/loginedToken";

const ShoppingCart = () => {

    const [cartInfo, setCartInfo] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [temp, setTemp] = useState(false);
    const [goToPay, setGoToPay] = useState([]);

    useEffect(() => {
        let u_no = getToken('loginedUNo');
        axios_getCartInfo(u_no);
    }, [temp]);

    useEffect(() => {
        setPaymentInfo()
    },[selectAll]);

    const handleCount = (type, index) => {
        const updatedCartInfo = [...cartInfo];
        if (type === "plus") {
            updatedCartInfo[index].mc_count++;
        } else if (type === "minus" && updatedCartInfo[index].mc_count > 1) {
            updatedCartInfo[index].mc_count--;
        }
        setCartInfo(updatedCartInfo);
        setPaymentInfo();
    };

    const handleInputChange = (event, index) => {
        const updatedCartInfo = [...cartInfo];
        const value = parseInt(event.target.value);
        updatedCartInfo[index].mc_count = isNaN(value) ? 1 : value;
        setCartInfo(updatedCartInfo);
        setPaymentInfo();
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedCartInfo = cartInfo.map(item => {
            return {
                ...item,
                isSelected: !selectAll
            };
        });
        setCartInfo(updatedCartInfo);
        setPaymentInfo();
    };

    const handleItemSelect = (index) => {
        
        const updatedCartInfo = [...cartInfo];
        updatedCartInfo[index].isSelected = !updatedCartInfo[index].isSelected;
        setCartInfo(updatedCartInfo);
        setPaymentInfo();
    };

    const setPaymentInfo = () => {
        let items = [];
        const checkedItems = cartInfo.filter(item => item.isSelected);
        
        checkedItems.map(item => {
            items.push({
                'I_NO': item.i_no,
                'MC_COUNT': item.mc_count
            });
        });
        console.log("❤❤❤",items);
        setGoToPay(items);
        
    }
    
    const handleCheckout = () => {
        const checkedItems = cartInfo.filter(item => item.isSelected);
        if (checkedItems.length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }
    
        const mcNos = checkedItems.map(item => item.mc_no);
        
        axios_deleteCart(mcNos);
    };
    
    // const handlePayment = () => {
    //     const checkedItems = cartInfo.filter(item => item.isSelected);
        
    //     if (checkedItems.length === 0) {
    //         alert('선택된 항목이 없습니다.');
    //         return;
    //     }
    
    //     let items = [];
    //     checkedItems.map(item => {
    //         items.push({
    //             'I_NO': item.i_no,
    //             'MC_COUNT': item.mc_count
    //         });
    //     });
    
    //     setGoToPay(items);
    // };


    async function axios_deleteCart(mcNos) {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/deleteCart", {
                'MC_NO': mcNos,
            })
            if (response.data != null) {
                setTemp((temp) => !temp);
                alert('삭제 성공');
            } else {
                alert('삭제 실패');
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function axios_getCartInfo(u_no) {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/getMarketCart", {
                'U_NO': u_no,
            })
            console.log("장바구니 가져오기 성공", response.data);
            setCartInfo(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id="shopping_cart_wrap" className='content-wrap'>
            <h2 className='title'>장바구니</h2>

            {/* {Object.keys(goToPay).map(item => {
                return <div>{goToPay[item].I_NO}</div>
            })} */}

            {cartInfo.length > 0 ? (
                <div>
                    <div className="all-select-btn">
                        <input id="selectAllCheckbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                        <label htmlFor="selectAllCheckbox">전체 선택</label>
                    </div>
                    <div className='content ingredient-cart-wrap'>
                        {cartInfo.map((item, index) => (
                            <div key={index} className='ingredient-view-wrap'>
                                <div className="ingredient-img-wrap">
                                    <input
                                        type="checkbox"
                                        checked={item.isSelected}
                                        onChange={() => handleItemSelect(index)}
                                    />
                                    <Link to={`/market/view/${item.i_no}_${item.productInfo.PROD_SPCS_CODE}`}>
                                        <img className="ingredient-img" src={`/imgs/product/${item.productInfo.PROD_IMG}`} alt="ingredient" />
                                    </Link>
                                    <Link to={`/market/view/${item.i_no}_${item.productInfo.PROD_SPCS_CODE}`}>
                                        <div className="ingredient-title-wrap">
                                            <span className="ingredient-title">{item.productInfo.PROD_NAME}</span>
                                            <span className="ingredient-sub-title">{item.productInfo.PROD_SPCS_NAME}</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="ingredient-info-wrap">
                                    <div className="ingredient-top-wrap">
                                        <span className="ingredient-unit">{item.productInfo.DSBN_STEP_ACTO_WT + item.productInfo.DSBN_STEP_ACTO_UNIT_NM}</span>
                                        <span className="ingredient-price">{item.productInfo.PROD_AVRG_PRCE.toLocaleString()}원</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="ingredient-middle-wrap">
                                        <input type="button" onClick={() => handleCount("minus", index)} value="-" />
                                        <input
                                            type="number"
                                            value={item.mc_count}
                                            onChange={(event) => handleInputChange(event, index)}
                                        />
                                        <input type="button" onClick={() => handleCount("plus", index)} value="+" />
                                    </div>
                                </div>
                                <div>
                                    <div className="ingredient-bottom-wrap">
                                        <span className="ingredient-info">총액 : </span>
                                        <span className="ingredient-price">{(item.productInfo.PROD_AVRG_PRCE * item.mc_count).toLocaleString()}원</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="cart-payment-btn">
                            <button type="button" className='go-cart-btn' onClick={handleCheckout}>선택 삭제</button>
                            {goToPay.length > 0 ? (
                                <Link to={`/market/payment`} state={{ goToPay: goToPay }} className='go-payment-btn'>
                                    선택 결제
                                </Link>
                            ) : 
                                <button>선택 결제</button>
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <div id="cart-no-item" className="content-wrap">
                    <div className="content">

                        <div className="error-content">
                            <p>장바구니에 담긴 상품이 없습니다.</p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}


export default ShoppingCart;