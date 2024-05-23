const express = require("express");
const marketService = require("../lib/service/marketService");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ key: "value" });
});

router.post("/goToMarketCart", (req, res) => {
    marketService.goToMarketCart(req, res);
});

router.post("/getMarketCart", (req, res) => {
    marketService.getMarketCart(req, res);
});

router.post("/deleteCart", (req, res) => {
    marketService.deleteInCart(req, res);
});

router.post("/payment", (req, res) => {
    marketService.payment(req, res);
});

router.post("/insertPayment", (req, res) => {
    marketService.insertPayment(req, res);
});

router.post("/getPaymentHistory", (req, res) => {
    marketService.getPaymentHistory(req, res);
});

router.post("/getPaymentDetail", (req, res) => {
    marketService.getPaymentDetail(req, res);
});

router.post("/refundOrder", (req, res) => {
    marketService.refundOrder(req, res);
});

router.post("/acceptOrder", (req, res) => {
    marketService.acceptOrder(req, res);
});

router.post("/cancelOrder", (req, res) => {
    marketService.cancelOrder(req, res);
});

router.post("/paymentDeleteCart", (req, res) => {
    marketService.deleteCart(req, res);
});

router.post("/insertTossPayment", (req, res) => {
    marketService.insertTossPayment(req, res);
});

router.post("/cartUpdateCount", (req, res) => {
    marketService.cartUpdateCount(req, res);
});

module.exports = router;
