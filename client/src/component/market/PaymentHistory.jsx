import { useEffect, useState } from "react";
import { getToken } from "../../storage/loginedToken";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
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
    },[])


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
        if (cancelInfo && cancelInfo.p_no &&cancelInfo.o_id) {
            axios_cancel_order();
        }
    }, [cancelInfo]);

    const loginCheck = () => {

        if(u_no === null) {
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

    const acceptPayment = (p_no ,o_id) => {
        const accept = {
            'o_id': o_id,
            'p_no': p_no
        };
        setAcceptInfo(accept);
    }

    const cancelPayment = (p_no, o_id) => {
        const cancel = {
            'o_id': o_id,
            'p_no' : p_no
        };
        setCancelInfo(cancel);
    }


    const axios_getPaymentHistory = async () => {
        let u_no = getToken('loginedUNo');
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/getPaymentHistory", {
                'u_no': u_no,
            })
            console.log("💝💝", response.data.orders);

            setOrderInfo(response.data.orders);
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    };

    const axios_refund_order = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/refundOrder", {
                'refundInfo': refundInfo
            })
            console.log("성공", response.data);
            setTemp((temp) => !temp);
            alert('주문 상태 바꾸기 성공');
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    };

    const axios_accept_order = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/acceptOrder", {
                'acceptInfo': acceptInfo
            })
            console.log("성공", response.data);
            setTemp((temp) => !temp);
            alert('구매 확정 바꾸기 성공');
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
            console.log("성공", response.data);
            setTemp((temp) => !temp);
            alert('구매 취소 바꾸기 성공');
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? <Loading /> : <div className='content-wrap' id="payment_history_wrap">
            <h2 className='title'>결제 내역</h2>
            <div id="payment_total_wrap">
                <div className='content ingredient-cart-wrap'>
                    {Object.keys(orderInfo).map((order) => {
                        const firstItem = orderInfo[order][Object.keys(orderInfo[order])[0]];
                        return (
                            <div key={order}>
                                <div className="ingredient-payment-history">
                                    <div>
                                        <p>주문 번호: {order}</p>
                                    </div>
                                    <div>
                                        <p>주문 시간: {firstItem.o_reg_date}</p>
                                    </div>
                                </div>
                                <div className="ingredient-cart-item">
                                    {Object.keys(orderInfo[order]).map((prod, orderIdx) => {
                                        let item = orderInfo[order][prod];
                                        return (
                                            <div key={`${order}_${item.p_no}`} className="payment-history-check">
                                                <img className="ingredient-cart-img" src={`/imgs/product/${item.PROD_IMG}`} />
                                                <div>
                                                    <span>이름: {item.PROD_NAME}</span>
                                                </div>
                                                <div>
                                                    <span>수량: {item.o_count}개</span><br />
                                                    <span>단위: {item.DSBN_STEP_ACTO_WT}{item.DSBN_STEP_ACTO_UNIT_NM}</span>
                                                </div>
                                                <div>
                                                    <span>가격: {item.o_final_price.toLocaleString()}원</span>
                                                </div>
                                                <div className="ingredient-cart-btn">
                                                    {item.o_s_no === 0 || item.o_s_no === 6 ? <button onClick={() => refundProduct(item.p_no, item.o_id)}>환불 요청</button> : null}
                                                    <p>주문 상태: {item.o_s_name}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="ingredient-cart-btn">
                                    <Link to={`/market/payment_detail/${firstItem.o_id}`}>
                                        상세 보기
                                    </Link>
                                    
                                    {firstItem.o_s_no === 0 ? <button onClick={() => cancelPayment(firstItem.p_no, firstItem.o_id)}>구매 취소</button> : ''}
                                    {firstItem.o_s_no === 0 || firstItem.o_s_no === 1 || firstItem.o_s_no === 6 ? <button onClick={() => acceptPayment(firstItem.p_no, firstItem.o_id)}>구매 확정</button> : ''}
                                </div>
                                <p>총 가격: {Object.values(orderInfo[order]).reduce((total, item) => total + item.o_final_price, 0).toLocaleString()}원</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>}
        </>
        
    );
}
export default PaymentHistory;