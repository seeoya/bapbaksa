import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getToken } from '../../storage/loginedToken';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';

const PaymentDetail = () => {
    let u_id = getToken('loginedUId');
    const { oId } = useParams();
    const [payInfo, setPayInfo] = useState([]);
    let totalPay = 0;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTitle('결제 상세 내역');
    }, []);

    useEffect(() => {
        axios_get_payment_detail();
    }, [oId]);


    async function axios_get_payment_detail() {
        setIsLoading(true);
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/getPaymentDetail", {
                'O_ID': oId,
            });
            console.log("🤍중요한 데이터🤍", response);
            setPayInfo(response.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? <Loading /> : null}

            <div className='content-wrap' id="payment_wrap">
                <h2 className='title'>결제 상세 페이지</h2>
                <div className='content flex-wrap'>
                    <div className="payment-ingredient-wrap">
                        {
                            payInfo ?
                                payInfo.map((info, idx) => {
                                    const { o_id, orders } = info;
                                    const { o_s_name, o_s_no, p_zip_code, p_first_address, p_second_address } = orders[0];

                                    return (
                                        <div key={idx}>
                                            <h3>주문 번호: {o_id}</h3>
                                            {orders.map((order, orderIdx) => {
                                                const { o_count, productInfo, p_no } = order;
                                                const { PROD_AVRG_PRCE, PROD_SPCS_CODE, PROD_IMG, PROD_NAME, DSBN_STEP_ACTO_WT, DSBN_STEP_ACTO_UNIT_NM } = productInfo[0];
                                                const itemPrice = PROD_AVRG_PRCE * o_count;
                                                totalPay += itemPrice;

                                                return (
                                                    <div className="flex-item" key={orderIdx}>
                                                        <Link to={`/market/view/${p_no}_${PROD_SPCS_CODE}`}>
                                                            <img className="ingredient-img" src={`/imgs/product/${PROD_IMG}`} alt="ingredient" />
                                                            <span className="ingredient-title">{PROD_NAME}</span>
                                                        </Link>
                                                        <span className="ingredient-unit">
                                                            {DSBN_STEP_ACTO_WT} {DSBN_STEP_ACTO_UNIT_NM}
                                                        </span>
                                                        <span className="ingredient-unit">{Number(PROD_AVRG_PRCE).toLocaleString()}원</span>
                                                        <span className="ingredient-unit">{o_count}</span>
                                                        <span className="ingredient-price">{itemPrice.toLocaleString()}원</span>
                                                        <span className="ingredient-title">배송상태 : {order.o_s_name}</span>
                                                    </div>
                                                );
                                            })}
                                            <div className="payment-price-wrap">
                                                <div className="payment-member-info">
                                                    <span className="ingredient-title">아이디 : {u_id}</span>

                                                    <span className="ingredient-title">우편번호 : {p_zip_code}</span>
                                                    <span className="ingredient-title">주소 : {p_first_address + ' ' + p_second_address}</span>
                                                    <span className="ingredient-title">상품 가격 : {totalPay.toLocaleString()}원</span>
                                                    <span className="ingredient-title">배송비 : 3,000원</span>
                                                    <span className="ingredient-title">총 가격 : {(totalPay + 3000).toLocaleString()}원</span>
                                                    <Link to={`/market/pay-history`}>
                                                        <span className="ingredient-title">뒤로 가기</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                : null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentDetail;