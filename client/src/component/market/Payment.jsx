import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NewProductQuery } from '../../query/productQuerys';
import { getToken } from '../../storage/loginedToken';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';
import { CheckoutPage } from '../payment/Checkout';

const Payment = () => {
    const [postcode, setPostcode] = useState('');
    const [roadAddress, setRoadAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [payInfo, setPayInfo] = useState([]);
    const [userInfo, setUserInfo] = useState();

    const { data: newProductList } = NewProductQuery();

    const [isPayment, setIsPayment] = useState(false);

    const [totalPay, setTotalPay] = useState(0);

    const [o_count, setOCount] = useState([]);
    const [o_price, setOPrice] = useState([]);
    const [p_no, setPNo] = useState([]);

    const [orderNo, setOrderNo] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    let u_id = getToken('loginedUId');
    let u_no = getToken('loginedUNo');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        loginCheck();
        let fors = [];
        location.state.goToPay.map(item => {
            fors.push(item.I_NO);
        })
        axios_paymentGetProd(fors);
        axios_getUserInfo();
        setTitle('결제창');
    }, []);

    useEffect(() => {
        if (location.state && location.state.goToPay) {
            console.log("비정상", location.state.goToPay);
        } else {
            console.log('없다 아직');
        }
    }, [location]);

    useEffect(() => {
        initTotalPay()
    }, [payInfo]);

    useEffect(() => {
        if (userInfo) {
            setPostcode(userInfo[0].u_zip_code);
            setRoadAddress(userInfo[0].u_first_address);
            setDetailAddress(userInfo[0].u_second_address);
        }
    }, [userInfo]);

    useEffect(() => {
        setDetailAddress('');
    }, [postcode]);

    const loginCheck = () => {
        if (u_no === null) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/signin')
        }
    }

    const payBtnClick = async () => {
        await axios_insertPayment();
        setIsPayment(true);
    };

    const initTotalPay = () => {
        let sum = 0;
        payInfo.map((info, idx) => {
            let mcCount = location.state.goToPay[idx].MC_COUNT;
            let itemPrice = info.PROD_AVRG_PRCE * mcCount;
            sum += itemPrice;

            setOCount(prev => [...prev, mcCount]);
            setOPrice(prev => [...prev, info.PROD_AVRG_PRCE]);
            setPNo(prev => [...prev, info.PROD_NO]);
        })

        setTotalPay(sum);

    }

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
            let updatedRoadAddress = roadAddress;
            if (extraAddress !== '') {
                updatedRoadAddress = roadAddress + extraAddress;
            }
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/insertPayment", {
                u_no,
                o_count,
                o_price,
                p_no,
                postcode,
                updatedRoadAddress,
                detailAddress
            })

            if (response.status === 200) {
                alert("결제 성공");
                setOrderNo(response.data.orderId);
            } else {
                alert("결제 실패");
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    const axios_paymentGetProd = async (i_no) => {
        try {
            const response = await axios.post(process.env.REACT_APP_REST_SERVER_URL + "/product/paymentGetProd", {
                'I_NO': i_no,
            })
            setPayInfo(response.data);
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    const axios_getUserInfo = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/user", {
                params: {
                    u_no: u_no
                }
            })
            setUserInfo(response.data);
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    const locationBack = () => {
        navigate(-1);
    }

    return (
        <>
            {
                isPayment ?
                    <div id='modal' className='modal payment' >
                        <div className="modal-wrap">
                            <CheckoutPage p_no={p_no} o_count={o_count} totalPay={totalPay} orderNo={orderNo} newProductList={newProductList} />
                        </div>
                    </div>
                    : null
            }
            {isLoading ? <Loading /> : <div className='content-wrap' id="payment_wrap">
                <h2 className='title'>결제창</h2>
                <div className='content flex-wrap'>
                    <div className="payment-ingredient-wrap">
                        {payInfo !== null ?
                            payInfo.map((info, idx) => {
                                let mcCount = location.state.goToPay[idx].MC_COUNT;
                                let itemPrice = info.PROD_AVRG_PRCE * mcCount;

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
                                <input type="text" defaultValue={postcode} placeholder="우편번호" readOnly></input>
                            </div>
                            <input type="text" defaultValue={roadAddress + extraAddress} placeholder="도로명 주소" readOnly></input>
                            <input
                                type="text"
                                defaultValue={detailAddress}
                                placeholder="상세 주소"
                                onChange={(e) => setDetailAddress(e.target.value)}>
                            </input>

                            <span className="ingredient-title">상품 가격 : {totalPay.toLocaleString()}원</span>
                            <span className="ingredient-title">배송비 : 3,000원</span>
                            <span className="ingredient-title">총 가격 : {(totalPay + 3000).toLocaleString()}원</span>
                        </div>
                        <div className="payment-btn">
                            <button type='button' onClick={locationBack}>뒤로 가기</button>
                            <button type="button" onClick={payBtnClick}>결제</button>
                        </div>
                    </div>
                </div>
            </div>}

        </>
    );
}

export default Payment;
