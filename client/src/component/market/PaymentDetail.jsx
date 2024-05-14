import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getToken } from '../../storage/loginedToken';

const PaymentDetail = () => {

    let u_id = getToken('loginedUId');
    const { oId } = useParams();
    const [payInfo, setPayInfo] = useState([]);

    let totalPay = 0;
    let o_count = [];
    let o_price = [];
    let p_no = [];

    useEffect(() => {
        axios_get_payment_detail();
    },[]);
    

    async function axios_get_payment_detail() {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/getPaymentDetail", {
                'O_ID': oId,
            })
            setPayInfo(response.data);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='content-wrap' id="payment_wrap">

            <h2 className='title'>결제 상세 페이지</h2>

            <div className='content flex-wrap'>
            <div className="payment-ingredient-wrap">
                {payInfo.map((info, idx) => (
                    <div key={idx}>
                    <h3>주문 번호: {info.o_id}</h3>
                    {info.orders.map((order, orderIdx) => {
                        const mcCount = order.o_count;
                        const itemPrice = order.productInfo[0].PROD_AVRG_PRCE * mcCount;
                        totalPay += itemPrice;
                        o_count.push(mcCount);
                        o_price.push(order.productInfo[0].PROD_AVRG_PRCE);
                        p_no.push(order.p_no);

                        return (
                        <div className="flex-item" key={orderIdx}>
                            <Link to={`/market/view/${order.p_no}_${order.productInfo[0].PROD_SPCS_CODE}`}>
                            <img className="ingredient-img" src={`/imgs/product/${order.productInfo[0].PROD_IMG}`} alt="ingredient" />
                            <span className="ingredient-title">{order.productInfo[0].PROD_NAME}</span>
                            </Link>
                            <span className="ingredient-unit">
                            {order.productInfo[0].DSBN_STEP_ACTO_WT} {order.productInfo[0].DSBN_STEP_ACTO_UNIT_NM}
                            </span>
                            <span className="ingredient-unit">{Number(order.productInfo[0].PROD_AVRG_PRCE).toLocaleString()}원</span>
                            <span className="ingredient-unit">{mcCount}</span>
                            <span className="ingredient-price">{itemPrice.toLocaleString()}원</span>
                        </div>
                        );
                    })}
                    </div>
                ))}
                </div>

                <div className="payment-price-wrap">
                    <div className="payment-member-info">
                        <span className="ingredient-title">아이디 : {u_id}</span>
                        <span className="ingredient-title">우편번호 : 추가 예정</span>
                        <span className="ingredient-title">주소 : 주소 + 상세 주소 추가 예정</span>
                        <span className="ingredient-title">상품 가격 : {totalPay.toLocaleString()}원</span>
                        <span className="ingredient-title">배송비 : 3,000원</span>
                        <span className="ingredient-title">총 가격 : {(totalPay + 3000).toLocaleString()}원</span>
                        <Link to={`/market/pay-history`}>
                            <span className="ingredient-title">뒤로 가기</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PaymentDetail;