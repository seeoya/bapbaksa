import React, { useState } from 'react';

const Payment = () => {
    const [postcode, setPostcode] = useState('');
    const [roadAddress, setRoadAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

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

    return (
        <div className='content-wrap' id="payment_wrap">
            <h2 className='title'>결제창</h2>
            <div className='content flex-wrap'>
                <div className="payment-ingredient-wrap">
                    <div className="flex-item">
                        <a href="#none"><img className="ingredient-img" src="/img/방울토마토.jpg" alt="ingredient" /></a>
                        <span className="ingredient-title">토마토</span>
                        <span className="ingredient-unit">5kg</span>
                        <span className="ingredient-price">25,000원</span>
                    </div>
                    <div className="flex-item">
                        <a href="#none"><img className="ingredient-img" src="/img/상추.jpg" alt="ingredient" /></a>
                        <span className="ingredient-title">상추</span>
                        <span className="ingredient-unit">10kg</span>
                        <span className="ingredient-price">77,500원</span>
                    </div>
                </div>

                <div className="payment-price-wrap">
                    <div className="payment-member-info">
                        <span className="ingredient-title">주문자 : 최희범</span>
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
                        <span className="ingredient-title">상품 가격 : 102,500</span>
                        <span className="ingredient-title">배송비 : 3,000</span>
                        <span className="ingredient-title">총 가격 : 105,500</span>
                    </div>
                    <div className="payment-btn">
                        <a href="#none">뒤로 가기</a>
                        <button type="button">결제</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
