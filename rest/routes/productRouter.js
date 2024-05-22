const express = require("express");
const product = require("../lib/service/product");
const router = express.Router();

router.get("/", (req, res) => {
    // 마켓 품목 갯수 및 뷰
    product.loadList(req, res);
});

router.get("/getAllProduct", (req, res) => {
    product.getAllProduct(req, res);
});

router.post("/view", (req, res) => {
    // 상세 뷰
    product.loadView(req, res);
});

router.get("/getNewDate", (req, res) => {
    product.getNewDate(req, res);
});

router.get("/twelveProduct", (req, res) => {
    product.getTwelveProduct(req, res);
});

router.post("/postSelectedProduct", (req, res) => {
    product.postSelectedProduct(req, res);
});

router.post("/paymentGetProd", (req, res) => {
    product.paymentGetProd(req, res);
});

router.post("/getChartData", (req, res) => {
    product.getChartData(req, res);
});

router.post("/getProduct", (req, res) => {
    product.getProduct(req, res);
});

router.post("/getProductInfo", (req, res) => {
    product.getProductInfo(req, res);
});

router.post("/getProdName", (req, res) => {
    product.getProdName(req, res);
});

router.get("/random", (req, res) => {
    product.random(req, res);
});

router.get("/compareprice", (req, res) => {
    product.compareprice(req, res);
});

router.post("/axios_get_product", (req, res) => {
    product.axiosGetProduct(req, res);
});

router.post("/delete_cart_prod_info", (req, res) => {
    product.deleteCartProdInfo(req, res);
});

module.exports = router;