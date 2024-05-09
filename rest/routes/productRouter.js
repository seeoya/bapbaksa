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

module.exports = router;