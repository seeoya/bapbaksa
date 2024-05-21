const express = require("express");
const product = require("../lib/service/product");
const router = express.Router();

// router.get("/allProduct", (req, res) => {
//     console.log('/product/allProduct');
//     product.getAllProduct(req, res);
// });

router.get("/", (req, res) => {
    console.log('/product/');
    // 마켓 품목 갯수 및 뷰
    product.loadList(req, res);
});

router.get("/getAllProduct", (req,res) => {
    console.log('/product/getAllProduct');
    product.getAllProduct(req,res);
})

router.post("/view", (req, res) => {
    console.log('product/view');
    // 상세 뷰
    product.loadView(req, res);
})

router.get("/getNewDate", (req, res) => {
    console.log('/product/getNewDate');
    product.getNewDate(req, res);
});

router.get("/twelveProduct", (req, res) => {
    console.log('/product/twelveProduct');
    product.getTwelveProduct(req, res);
});

router.post("/postSelectedProduct", (req, res) => {
    console.log('/product/postSelectedProduct');
    product.postSelectedProduct(req, res);
});

router.post("/paymentGetProd", (req,res) => {
    console.log('/product/paymentGetProd');
    product.paymentGetProd(req,res);
});

// router.get("/selectedProduct", (req, res) => {
//     console.log('/product/selectedProduct');
//     product.getSelectedProduct(req, res);
// });

// router.get("/searchedProduct", (req, res) => {
//     console.log('/product/searchedProduct');
//     product.getSearchedProduct(req, res);
// });

router.post('/getChartData', (req, res) => {
    console.log('/product/getChartData')
    product.getChartData(req, res);
});

router.post('/getProduct', (req, res) => {
    console.log('/product/getProduct')
    product.getProduct(req, res);
});

router.post('/getProductInfo', (req,res) => {
    console.log('/product/getProductInfo');
    product.getProductInfo(req,res);
});

router.post('/getProdName', (req,res) => {
    console.log('/product/getProdName');
    product.getProdName(req,res);
});

router.get('/random', (req, res) => {
    console.log('/product/random');
    product.random(req, res);
});

router.get('/compareprice', (req, res) => {
    console.log('/product/compareprice');
    product.compareprice(req, res);
});

router.post('/axios_get_product', (req,res) => {
    console.log('/product/axios_get_product');
    product.axiosGetProduct(req,res);
})

module.exports = router;