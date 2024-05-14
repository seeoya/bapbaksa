import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getToken } from '../../storage/loginedToken';

const Payment = () => {
    const [postcode, setPostcode] = useState('');
    const [roadAddress, setRoadAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [payInfo, setPayInfo] = useState([]);

    let totalPay = 0;
    let o_count = [];
    let o_price = [];
    let p_no = [];
    let u_id = getToken('loginedUId');
    let u_no = getToken('loginedUNo');
    
    const location = useLocation();
    
    useEffect(() => {
            let fors = [];
            location.state.goToPay.map(item => {
                fors.push(item.I_NO);
            })
                axios_paymentGetProd(fors);
    }, []);

    useEffect(() => {
        if(location.state && location.state.goToPay) {
            console.log("비정상",location.state.goToPay);
        } else {
            console.log('없다 아직');
        }
    }, [location]);

    const payBtnClick = () => {
        console.log("payBtnClick clik");

        axios_insertPayment();
    };

    const execDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                let extraRoadAddr = '';

                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }

                setPostcode(data.zonecode);
                setRoadAddress(data.roadAddress);
                setExtraAddress(` (${extraRoadAddr})`);
            }
        }).open();
    };

    const axios_insertPayment = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/insertPayment", {
                u_no, o_count , o_price, p_no
            })
            if (response.data === true) {
                alert("결제 성공");
                if (location.pathname === "/market/payment") {
                    window.location.href = "/market/pay-history";
                }
            } else {
                alert("결제 실패");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const axios_paymentGetProd = async (i_no) => {
        console.log("💘💘💘",i_no);
        try {
            const response = await axios.post(process.env.REACT_APP_REST_SERVER_URL + "/product/paymentGetProd", {
                'I_NO': i_no,
            })
            setPayInfo(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='content-wrap' id="payment_wrap">
            <h2 className='title'>결제창</h2>
            <div className='content flex-wrap'>
                <div className="payment-ingredient-wrap">
                {payInfo !== null ?
                payInfo.map((info, idx) => {
                    let mcCount = location.state.goToPay[idx].MC_COUNT;
                    let itemPrice = info.PROD_AVRG_PRCE * mcCount;
                        totalPay += itemPrice;
                        o_count.push(mcCount);
                        o_price.push(info.PROD_AVRG_PRCE);
                        p_no.push(info.PROD_NO);

                        return (
                        <div className="flex-item" key={idx}>
                            <Link to={`/market/view/${info.PROD_NO}_${info.PROD_SPCS_CODE}`}>
                            <img className="ingredient-img" src={`/imgs/product/${info.PROD_IMG}`} alt="ingredient" />
                            <span className="ingredient-title">{info.PROD_NAME}</span>
                            </Link>
                            <span className="ingredient-unit">
                            {info.DSBN_STEP_ACTO_WT}
                            {info.DSBN_STEP_ACTO_UNIT_NM}
                            </span>
                            <span className="ingredient-unit">{Number(info.PROD_AVRG_PRCE).toLocaleString()}원</span>
                            <span className="ingredient-unit">{mcCount}</span>
                            <span className="ingredient-price">{itemPrice.toLocaleString()}원</span>
                        </div>
                        );
                    })
                    :
                    null
                }
                </div>

                <div className="payment-price-wrap">
                    <div className="payment-member-info">
                        <span className="ingredient-title">주문자 : {u_id}님</span>
                        <div className='find-address-btn'>
                            <button className='btn main' onClick={execDaumPostcode}>주소 찾기</button>
                            <input type="text" defaultValue={postcode} placeholder="우편번호"></input>
                        </div>
                        <input type="text" defaultValue={roadAddress + extraAddress} placeholder="도로명 주소"></input>
                        <input
                            type="text"
                            defaultValue={detailAddress}
                            placeholder="상세 주소"
                            onChange={(e) => setDetailAddress(e.target.value)}
                        ></input>
                        <span className="ingredient-title">상품 가격 : {totalPay.toLocaleString()}원</span>
                        <span className="ingredient-title">배송비 : 3,000원</span>
                        <span className="ingredient-title">총 가격 : {(totalPay + 3000).toLocaleString()}원</span>
                    </div>
                    <div className="payment-btn">
                        <a href="#none">뒤로 가기</a>
                        <button type="button" onClick={payBtnClick}>결제</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
