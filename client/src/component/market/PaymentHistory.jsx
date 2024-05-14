import { useEffect, useState } from "react";
import { getToken } from "../../storage/loginedToken";
import axios from 'axios';
import { Link } from "react-router-dom";

const PaymentHistory = () => {
    const [selectedItems, setSelectedItems] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [orderInfo, setOrderInfo] = useState([]);
    let u_no = getToken('loginedUNo');

    useEffect(() => {
        axios_getPaymentHistory();
    }, []);

    useEffect(() => {
        console.log("💘💘💘💘", orderInfo);
    }, [orderInfo]);

    const omit = (obj, key) => {
        const { [key]: _, ...rest } = obj;
        return rest;
    };

    const toggleItemSelection = (orderId, productId) => {
        setSelectedItems((prevSelectedItems) => {
            const key = `${orderId}_${productId}`;
            const isSelected = prevSelectedItems[key];
            return isSelected
                ? omit(prevSelectedItems, key)
                : { ...prevSelectedItems, [key]: true };
        });
    };

    const toggleSelectAll = (isSelectAll) => {
        setSelectedItems((prevSelectedItems) => {
            if (isSelectAll) {
                const newSelectedItems = {};
                orderInfo.forEach((order) => {
                    order.orders.forEach((item) => {
                        newSelectedItems[`${order.o_id}_${item.p_no}`] = true;
                    });
                });
                return newSelectedItems;
            } else {
                return {};
            }
        });
        setSelectAll(isSelectAll);
    };

    const axios_getPaymentHistory = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/getPaymentHistory", {
                u_no
            })
            setOrderInfo(response.data);
            console.log("❤❤❤❤",orderInfo);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='content-wrap' id="payment_history_wrap">
            <h2 className='title'>결제 내역</h2>
            <div id="payment_total_wrap">
                <div className='content ingredient-cart-wrap'>
                    <div className="payment-history-btn-status">
                        <div className="all-select-btn">
                            <input
                                className="ingredient-cart-all-check-btn"
                                type="checkbox"
                                checked={selectAll}
                                onChange={(e) => toggleSelectAll(e.target.checked)}
                            />
                            <p>전체 선택</p>
                        </div>
                        <p>주문 상태 : 배송 중</p>
                    </div>
                    {orderInfo.map((order, orderIdx) => (
                        <div key={orderIdx}>
                            <div className="ingredient-payment-history">
                                <div>
                                    <p>주문 번호: {order.o_id}</p>
                                </div>
                                <div>
                                    <p>주문 시간: {order.orders[0].o_reg_date}</p>
                                </div>
                            </div>

                            <div className="ingredient-cart-item">
                                {order.orders.map((item) => (
                                    <div key={`${order.o_id}_${item.p_no}`} className="payment-history-check">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems[`${order.o_id}_${item.p_no}`] || false}
                                            onChange={() => toggleItemSelection(order.o_id, item.p_no)}
                                        />
                                        {item.productInfo && item.productInfo.length > 0 ? (
                                            <>
                                                <img className="ingredient-cart-img" src={`/imgs/product/${item.productInfo[0].PROD_IMG}`} />
                                                <div>
                                                    <span>이름: {item.productInfo[0].PROD_NAME}</span>
                                                </div>
                                                <div>
                                                    <span>수량: {item.o_count}개</span><br/>
                                                    <span>단위: {item.productInfo[0].DSBN_STEP_ACTO_WT}{item.productInfo[0].DSBN_STEP_ACTO_UNIT_NM}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div>상품 정보를 가져오는 중...</div>
                                        )}
                                        <div>
                                            <span>가격: {item.o_final_price.toLocaleString()}원</span>
                                        </div>
                                        <div className="ingredient-cart-btn">
                                            <button>구매 취소</button>
                                            <button>환불 요청</button>
                                            <button>구매 확정</button>
                                            <Link to={`/market/payment_detail/${order.o_id}`}>
                                                상세 보기
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p>총 가격: {order.orders.reduce((total, item) => total + item.o_final_price, 0).toLocaleString()}원</p>
                        </div>
                    ))}
                </div>
            </div>
                            
        </div>
    );
}

export default PaymentHistory;