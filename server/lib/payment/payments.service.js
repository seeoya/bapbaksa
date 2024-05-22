// read-only
const fetch = require("node-fetch");

// TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

async function confirmPayment(dataParam) {
    let { paymentKey, orderId, amount } = dataParam;

    const encryptedSecretKey = "Basic " + Buffer.from(secretKey + ":").toString("base64");

    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
        method: "POST",
        body: JSON.stringify({ orderId, amount, paymentKey }),
        headers: {
            Authorization: encryptedSecretKey,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();

    return data;
}

module.exports = { confirmPayment };
