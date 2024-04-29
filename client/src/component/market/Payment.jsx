import PostCode from "./PostCode";


const Payment = () => {
    

    return(
        <div id="payment_wrap">
            <div className="title-wrap">결제창</div>

            <div className="flex-wrap">
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
                    <span className="ingredient-title">주문자:최희범</span>
                    <span><PostCode/></span>
                    <span className="ingredient-title">상품 가격:102,500</span>
                    <span className="ingredient-title">배송바:3000</span>
                    <span className="ingredient-title">총 가격:105,500</span>
                    <a href="#none">뒤로 가기</a>
                    
                    <button type="button">결제</button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
