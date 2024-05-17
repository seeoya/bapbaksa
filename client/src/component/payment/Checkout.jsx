import { ANONYMOUS, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef, useState } from "react";
import { getToken } from "../../storage/loginedToken";

export function CheckoutPage(props) {
    let { p_no, o_count, totalPay, orderNo, newProductList } = props;

    let u_id = getToken('loginedUId');

    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const agreementWidgetRef = useRef(null);

    const [pName, setPName] = useState("상품");


    useEffect(() => {
        if (newProductList) {
            newProductList.map((el) => {
                if (el.PROD_NO == p_no[0]) {
                    setPName(`${el.PROD_NAME}(${el.PROD_SPCS_NAME})`)
                }
            })
        }
    }, [newProductList])

    useEffect(() => {
        (async () => {
            const paymentWidget = await loadPaymentWidget("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm", ANONYMOUS); // 비회원 customerKey

            if (paymentWidgetRef.current == null) {
                paymentWidgetRef.current = paymentWidget;
            }

            const paymentMethodsWidget = paymentWidgetRef.current.renderPaymentMethods(
                "#payment-method",
                { value: totalPay },
                { variantKey: "DEFAULT" }
            );

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
                                await paymentWidget?.requestPayment({
                                    orderId: orderNo,
                                    orderName: p_no?.length > 1 ? (pName) + " 외 " + (p_no.length - 1) + "건" : pName,
                                    customerName: u_id,
                                    customerEmail: "customer123@gmail.com",
                                    successUrl: window.location.origin + "/sandbox/success" + window.location.search,
                                    failUrl: window.location.origin + "/sandbox/fail" + window.location.search,
                                });
                            } catch (error) { }
                        }}
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
}