const express = require("express");
const marketService = require("../lib/service/marketService");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ key: "value" });
});

router.post("/goToMarketCart", (req,res) => {
    console.log('goToMarketCart');
    marketService.goToMarketCart(req,res);
});

router.post("/getMarketCart", (req,res) => {
    console.log('getMarketCart');
    marketService.getMarketCart(req,res);
});

router.post("/deleteCart", (req,res) => {
    console.log('deleteCart');
    marketService.deleteInCart(req,res);
});

router.post("/payment", (req,res) => {
    console.log('payment');
    marketService.payment(req,res);
})

router.post("/insertPayment", (req,res) => {
    console.log('insertPayment');
    marketService.insertPayment(req,res);
})

router.post("/getPaymentHistory", (req,res) => {
    console.log('getPaymentHistory');
    marketService.getPaymentHistory(req,res);
})

router.post("/getPaymentDetail", (req,res) => {
    console.log('getPaymentDetail');
    marketService.getPaymentDetail(req,res);
})

router.post("/refundOrder", (req,res) => {
    console.log('refundOrder');
    marketService.refundOrder(req,res);
})

router.post("/acceptOrder", (req,res) => {
    console.log('acceptOrder');
    marketService.acceptOrder(req,res);
})

router.post("/cancelOrder", (req,res) => {
    console.log('cancelOrder');
    marketService.cancelOrder(req,res);
})

router.post("/paymentDeleteCart", (req,res) => {
    console.log("axios_deleteCart");
    marketService.deleteCart(req,res);
})


// router.get("/allProduct", (req,res) => {
//     console.log("[server] marketRouter getAllProduct!");
//     marketService.getAllProduct(req,res);
// })



module.exports = router;
