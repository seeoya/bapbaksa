import { ANONYMOUS, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef } from "react";
import { getToken } from "../../storage/loginedToken";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

export function CheckoutPage(props) {
    let { p_no, o_count, totalPay, orderNo } = props;

    let u_id = getToken('loginedUId');

    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const agreementWidgetRef = useRef(null);

    useEffect(() => {
        (async () => {
            const paymentWidget = await loadPaymentWidget("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm", ANONYMOUS); // 비회원 customerKey

            if (paymentWidgetRef.current == null) {
                paymentWidgetRef.current = paymentWidget;
            }

            /**
             * 결제창을 렌더링합니다.
             * @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods%EC%84%A0%ED%83%9D%EC%9E%90-%EA%B2%B0%EC%A0%9C-%EA%B8%88%EC%95%A1
             */
            const paymentMethodsWidget = paymentWidgetRef.current.renderPaymentMethods(
                "#payment-method",
                { value: totalPay },
                { variantKey: "DEFAULT" }
            );

            /**
             * 약관을 렌더링합니다. 
             * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement%EC%84%A0%ED%83%9D%EC%9E%90-%EC%98%B5%EC%85%98
             */
            agreementWidgetRef.current = paymentWidgetRef.current.renderAgreement('#agreement', { variantKey: 'DEFAULT' });

            paymentMethodsWidgetRef.current = paymentMethodsWidget;
        })();
    }, []);

    return (
        <div className="wrapper w-100">
            <div className="max-w-540 w-100">
                <div id="payment-method" className="w-100" />
                <div id="agreement" className="w-100" />
                <div className="btn-wrapper w-100">

                    <button
                        className="btn primary w-100"
                        onClick={async () => {
                            const paymentWidget = paymentWidgetRef.current;

                            try {
                                /**
                                 * 결제 요청
                                 * @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment%EA%B2%B0%EC%A0%9C-%EC%A0%95%EB%B3%B4
                                 */
                                // #TODO 아이템명 [0]번째로 변경
                                await paymentWidget?.requestPayment({
                                    // orderId: generateRandomString(),
                                    orderId: orderNo,
                                    orderName: p_no?.length > 1 ? "토스 티셔츠 외 " + (p_no.length - 1) + "건" : "토스 티셔츠",
                                    customerName: u_id,
                                    customerEmail: "customer123@gmail.com",
                                    successUrl: window.location.origin + "/sandbox/success" + window.location.search,
                                    failUrl: window.location.origin + "/sandbox/fail" + window.location.search,
                                });
                            } catch (error) {
                                // TODO: 에러 처리
                            }
                        }}
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}