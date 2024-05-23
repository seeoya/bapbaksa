import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NewProductQuery } from "../../query/productQuerys";
import { getToken } from "../../storage/loginedToken";
import { setTitle } from "../../util/setTitle";
import Loading from "../include/Loading";

const ShoppingCart = () => {
    const { data: newProductList } = NewProductQuery();
    const [cartItems, setCartItems] = useState([]);
    const [cartInfo, setCartInfo] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [temp, setTemp] = useState(false);
    const [goToPay, setGoToPay] = useState([]);
    const u_no = getToken('loginedUNo');
    const [stockList, setStockList] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getStock();
        loginCheck();
        axios_getCartInfo(u_no);
        setTitle('장바구니');
    }, []);

    useEffect(() => {
        if (newProductList && cartInfo) {
            let tmp = [];
            cartInfo.map((el) => {
                newProductList.map((item) => {
                    if (el.p_code === item.PROD_CODE && el.ps_code === item.PROD_SPCS_CODE) {
                        tmp.push({ ...el, ...item });
                    }
                });
            });
            setCartItems(tmp);
        }
    }, [newProductList, cartInfo]);

    useEffect(() => {
        axios_getCartInfo(u_no);
    }, [temp]);

    useEffect(() => {
        setPaymentInfo();
    }, [selectAll]);

    const getStock = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/stock", { params: {} })
            .then((data) => {
                setStockList(data.data);
            }).catch((err) => {
                return { type: "error" };
            });
    };

    const handleCount = (e, index) => {
        let target = e.target;
        let type = target.dataset.type;
        const updatedCartItems = [...cartItems];

        let defCount = updatedCartItems[index].mc_count;

        if (type === "plus") {
            updatedCartItems[index].mc_count++;
        } else if (type === "minus" && updatedCartItems[index].mc_count > 1) {
            updatedCartItems[index].mc_count--;
        }
        setCartItems(updatedCartItems);
        if (defCount != updatedCartItems[index].mc_count) {
            axios_cart_count_change(target.dataset.pCode, target.dataset.psCode, updatedCartItems[index].mc_count);
        }
        setPaymentInfo();
    };

    const handleInputChange = (event, index) => {
        let target = event.target;
        const updatedCartItems = [...cartItems];
        const value = parseInt(event.target.value);

        let defCount = updatedCartItems[index].mc_count;

        if (isNaN(value) || value <= 0) {
            updatedCartItems[index].mc_count = 1;
        } else {
            updatedCartItems[index].mc_count = value;
        }

        setCartItems(updatedCartItems);
        if (defCount != updatedCartItems[index].mc_count) {
            axios_cart_count_change(target.dataset.pCode, target.dataset.psCode, updatedCartItems[index].mc_count);
        }
        setPaymentInfo();
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedCartItems = cartItems.map(item => {
            return {
                ...item,
                isSelected: !selectAll
            };
        });
        setCartItems(updatedCartItems);
        setPaymentInfo();
    };

    const handleItemSelect = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].isSelected = !updatedCartItems[index].isSelected;
        setCartItems(updatedCartItems);
        setPaymentInfo();
    };

    const setPaymentInfo = () => {
        let items = [];
        const checkedItems = cartItems.filter(item => item.isSelected && stockList[item.PROD_CODE][item.PROD_SPCS_CODE] > 0);
        checkedItems.map(item => {
            items.push({
                'PROD_NO': item.PROD_NO,
                'MC_COUNT': item.mc_count
            });
        });
        setGoToPay(items);
    };

    const deleteCart = () => {
        const checkedItems = cartItems.filter(item => item.isSelected);
        if (checkedItems.length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }

        const mcNos = checkedItems.map(item => item.mc_no);
        axios_deleteCart(mcNos);
    };

    const loginCheck = () => {
        if (u_no === null) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/signin');
        }
    };

    async function axios_deleteCart(mcNos) {
        setIsLoading(true);
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/deleteCart", {
                'MC_NO': mcNos,
            });
            if (response.data != null) {
                setTemp((temp) => !temp);
            } else {
                alert('삭제 실패');
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const axios_cart_count_change = async (pCode, psCode, count) => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/cartUpdateCount", {
                'u_no': u_no,
                'p_code': pCode,
                'ps_code': psCode,
                'mc_count': count
            })
            setTemp((temp) => !temp);
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    };



    async function axios_getCartInfo(u_no) {
        setIsLoading(true);

        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/getMarketCart", {
                'U_NO': u_no,
            });
            setCartInfo(response.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? <Loading /> : null}

            <div id="shopping_cart_wrap" className='content-wrap'>
                <h2 className='title'>장바구니</h2>
                {cartItems && cartItems.length > 0 ? (
                    <div>
                        <div className="all-select-btn">
                            <input id="selectAllCheckbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                            <label htmlFor="selectAllCheckbox">전체 선택</label>
                        </div>
                        <div className='content ingredient-cart-wrap'>
                            {cartItems.map((item, index) => (
                                <div key={index} className='ingredient-view-wrap'>
                                    <div className="ingredient-img-wrap">
                                        {stockList[item.PROD_CODE][item.PROD_SPCS_CODE] > 0 ?
                                            <span className="cart-checkbox-warp">
                                                <input
                                                    type="checkbox"
                                                    checked={item.isSelected}
                                                    onChange={() => handleItemSelect(index)}
                                                />
                                            </span> : <span className="cart-checkbox-warp"></span>}
                                        <Link to={`/market/view/${item.PROD_CODE}_${item.PROD_SPCS_CODE}`}>
                                            <img className="ingredient-img" src={`/imgs/product/${item.PROD_IMG}`} alt="ingredient" />
                                        </Link>
                                        <Link to={`/market/view/${item.PROD_CODE}_${item.PROD_SPCS_CODE}`}>
                                            <div className="ingredient-title-wrap">
                                                <span className="ingredient-title">{item.PROD_NAME}</span>
                                                <span className="ingredient-sub-title">{item.PROD_SPCS_NAME}</span>
                                            </div>
                                        </Link>
                                    </div>
                                    {stockList[item.PROD_CODE][item.PROD_SPCS_CODE] > 0 ? <>
                                        <div className="ingredient-info-wrap">
                                            <div className="ingredient-top-wrap">
                                                <span className="ingredient-unit">{item.DSBN_STEP_ACTO_WT + item.DSBN_STEP_ACTO_UNIT_NM}</span>
                                                <span className="ingredient-price">{item.PROD_AVRG_PRCE.toLocaleString()}원</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="ingredient-middle-wrap">
                                                <button type="button" className="btn highlight minus-btn" data-p-code={item.PROD_CODE} data-ps-code={item.PROD_SPCS_CODE} data-type="minus" onClick={(e) => handleCount(e, index)} value="-" >
                                                    <FontAwesomeIcon icon="fa-solid fa-minus" />
                                                </button>
                                                <input
                                                    type="number"
                                                    className="input"
                                                    value={item.mc_count}
                                                    data-p-code={item.PROD_CODE}
                                                    data-ps-code={item.PROD_SPCS_CODE}
                                                    onChange={(event) => handleInputChange(event, index)}
                                                />
                                                <button type="button" className="btn highlight plus-btn" data-p-code={item.PROD_CODE} data-ps-code={item.PROD_SPCS_CODE} data-type="plus" onClick={(e) => handleCount(e, index)} value="+" >
                                                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="ingredient-bottom-wrap">
                                                <span className="ingredient-info">총액 : </span>
                                                <span className="ingredient-price">{(item.PROD_AVRG_PRCE * item.mc_count).toLocaleString()}원</span>
                                            </div>
                                        </div>
                                    </> : <div className="sold-out-wrap">품절 상품입니다.</div>}
                                </div>
                            ))}
                            <div className="cart-payment-btn">
                                <button type="button" className='go-cart-btn' onClick={deleteCart}>선택 삭제</button>
                                {goToPay.length > 0 ? (
                                    <Link to={`/market/payment`} state={{ goToPay: goToPay }} className='go-payment-btn main btn'>
                                        선택 결제
                                    </Link>
                                ) : <button>선택 결제</button>}
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
        </>
    );
};

export default ShoppingCart;