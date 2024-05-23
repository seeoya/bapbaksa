import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../storage/loginedToken";
import { setTitle } from "../../util/setTitle";
import Loading from "../include/Loading";

const PaymentHistory = () => {

    const [orderInfo, setOrderInfo] = useState([]);
    const [refundInfo, setRefundInfo] = useState();
    const [acceptInfo, setAcceptInfo] = useState();
    const [cancelInfo, setCancelInfo] = useState();
    const [temp, setTemp] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    let u_no = getToken('loginedUNo');

    const navigate = useNavigate();

    useEffect(() => {
        loginCheck();
        setTitle('결제 내역');
    }, [])


    useEffect(() => {
        axios_getPaymentHistory();
    }, [temp]);

    useEffect(() => {
        if (refundInfo && refundInfo.p_no && refundInfo.o_id) {
            axios_refund_order();
        }
    }, [refundInfo]);

    useEffect(() => {
        if (acceptInfo && acceptInfo.p_no && acceptInfo.o_id) {
            axios_accept_order();
        }
    }, [acceptInfo]);

    useEffect(() => {
        if (cancelInfo && cancelInfo.o_id) {
            axios_cancel_order();
        }
    }, [cancelInfo]);

    const loginCheck = () => {
        if (u_no === null) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/signin')
        }
    }

    const refundProduct = (p_no, o_id) => {
        const refund = {
            'p_no': p_no,
            'o_id': o_id
        };
        setRefundInfo(refund);
    };

    const acceptPayment = (p_no, o_id) => {
        const accept = {
            'o_id': o_id,
            'p_no': p_no
        };
        setAcceptInfo(accept);
    }

    const cancelPayment = (p_no, o_id) => {
        const cancel = {
            'p_no': p_no,
            'o_id': o_id
        };
        setCancelInfo(cancel);
    }


    const axios_getPaymentHistory = async () => {
        let u_no = getToken('loginedUNo');

        setIsLoading(true);
        await axios.post(process.env.REACT_APP_SERVER_URL + "/market/getPaymentHistory", {
            'u_no': u_no,
        }).then((data) => {
            setOrderInfo(data.data.orders);
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false);
        })
    };

    const axios_refund_order = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/refundOrder", {
                'refundInfo': refundInfo
            })
            setTemp((temp) => !temp);
            alert('환불 신청이 완료되었습니다.');
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    };

    const axios_accept_order = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/acceptOrder", {
                'acceptInfo': acceptInfo
            })
            setTemp((temp) => !temp);
            alert('구매 확정되었습니다.');
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    };

    const axios_cancel_order = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/cancelOrder", {
                'cancelInfo': cancelInfo
            })
            setTemp((temp) => !temp);
            alert('구매 취소에 성공했습니다.');
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? <Loading /> : null}

            <div className='content-wrap' id="payment_history_wrap">
                <h2 className='title'>결제 내역</h2>

                <div id="payment_total_wrap">
                    <div className='content ingredient-cart-wrap'>
                        {orderInfo && Object.keys(orderInfo).length > 0 ? (
                            Object.keys(orderInfo).map((order, idx) => {
                                const firstItem = orderInfo[order][Object.keys(orderInfo[order])[0]];
                                return (
                                    <div key={idx}>
                                        <div className="ingredient-payment-history">
                                            <div>
                                                <p>주문 번호: {order}</p>
                                            </div>
                                            <div>
                                                <p>주문 시간: {firstItem.o_reg_date}</p>
                                            </div>
                                        </div>

                                        <div className="ingredient-cart-item">
                                            {Object.keys(orderInfo[order]).map((prod) => {
                                                let item = orderInfo[order][prod];
                                                return (
                                                    <div key={`${item.PROD_CODE}_${item.PROD_SPCS_CODE}`} className="payment-history-check">
                                                        <Link to={`/market/view/${item.PROD_CODE}_${item.PROD_SPCS_CODE}`}>
                                                            <img className="ingredient-cart-img" src={`/imgs/product/${item.PROD_IMG}`} />
                                                        </Link>

                                                        <Link to={`/market/view/${item.PROD_CODE}_${item.PROD_SPCS_CODE}`}>
                                                            <div className="payment-history-name">
                                                                <span>{item.PROD_NAME}</span>
                                                                <span>{item.PROD_SPCS_NAME}</span>
                                                            </div>
                                                        </Link>

                                                        <span className="ingredient-count-kg">수량: {item.o_count}개</span><br />
                                                        <span className="ingredient-count-kg">단위: {item.DSBN_STEP_ACTO_WT}{item.DSBN_STEP_ACTO_UNIT_NM}</span>
                                                        <span className="ingredient-price">가격: {item.o_final_price.toLocaleString()}원</span>

                                                        <div className="ingredient-cart-btn">
                                                            {item.o_s_no === 1 || item.o_s_no === 6 ? (
                                                                <button onClick={() => acceptPayment(item.p_no, item.o_id)}>구매 확정</button>
                                                            ) : null}
                                                            {item.o_s_no === 6 ? (
                                                                <button onClick={() => refundProduct(item.p_no, item.o_id)}>환불 요청</button>
                                                            ) : null}
                                                            <p>주문 상태: {item.o_s_name}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div >

                                        <div className="ingredient-cart-btn">
                                            {firstItem.o_s_no === 0 ? (
                                                <button onClick={() => cancelPayment(firstItem.p_no, firstItem.o_id)}>구매 취소</button>
                                            ) : null}
                                            <Link to={`/market/payment_detail/${firstItem.o_id}`}>상세 보기</Link>
                                            <p>총 가격: {(Object.values(orderInfo[order]).reduce((total, item) => total + item.o_final_price, 0) + 3000).toLocaleString()}원</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="content">
                                <div className="error-content">
                                    <p>결제내역이 없습니다.</p>
                                </div>
                            </div>
                        )}
                    </div >
                </div >
            </div >
        </>
    );
}

export default PaymentHistory;