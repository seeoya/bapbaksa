import axios from "axios";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getToken } from "../../storage/loginedToken";

export function SuccessPage() {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [searchParams] = useSearchParams();

    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    async function confirmPayment() {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/sandbox-dev/api/v1/payments/confirm", {
            body: JSON.stringify({
                paymentKey,
                orderId,
                amount
            })
        });

        let { totalAmount, method } = response.data.data;
        if (response.status === 200) {
            setIsConfirmed(true);
            axios_insertPayment(totalAmount, method);
        }
    }

    const axios_insertPayment = async (totalAmount, method) => {
        let u_no = getToken('loginedUNo');

        try {
            await axios.post(process.env.REACT_APP_SERVER_URL + "/market/insertTossPayment", {
                'u_no': u_no,
                'o_id': orderId,
                'pm_price': totalAmount,
                'pm_method': method
            }).then((data) => {
                axios_deleteCart(data.data.insertId);
            }
            )
        } catch (error) {
            console.log(error)
        }
    };

    const axios_deleteCart = async (insertId) => {
        let u_no = getToken('loginedUNo');
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/paymentDeleteCart", {
                'u_no': u_no,
                'p_no': orderId,
                'pm_no': insertId
            })
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="wrapper w-100 payment payment-success">
            {isConfirmed ? (
                <div
                    className="flex-column align-center confirm-success w-100 max-w-540"
                    style={{
                        display: "flex"
                    }}
                >
                    <img
                        src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
                        width="120"
                        height="120"
                    />
                    <h2 className="title">결제를 완료했어요</h2>
                    <div className="response-section w-100">
                        <div className="flex justify-between">
                            <span className="response-label">결제 금액</span>
                            <span id="amount" className="response-text">
                                {parseInt(amount).toLocaleString()} 원
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="response-label">주문번호</span>
                            <span id="orderId" className="response-text">
                                {orderId}
                            </span>
                        </div>
                    </div>

                    <div className="w-100 button-group">

                        <div className="flex" style={{ gap: "16px" }}>
                            <Link to={"/market/pay-history"} className="btn w-100">구매내역</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-column align-center confirm-loading w-100 max-w-540">
                    <div className="flex-column align-center">
                        <img
                            src="https://static.toss.im/lotties/loading-spot-apng.png"
                            width="120"
                            height="120"
                        />
                        <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
                        <h4 className="text-center description">결제 승인하고 완료해보세요.</h4>
                    </div>
                    <div className="w-100">
                        <button className="btn primary w-100" onClick={confirmPayment}>
                            결제 승인하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}