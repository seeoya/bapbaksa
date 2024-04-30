const express = require("express");
const product = require("../lib/service/product");
const router = express.Router();

router.get("/allProduct", (req, res) => {
    console.log('/product/allProduct');
    product.getAllProduct(req, res);
});

router.get("/twelveProduct", (req, res) => {
    console.log('/product/twelveProduct');
    product.getTwelveProduct(req, res);
});

router.post("/selectedProduct", (req, res) => {
    console.log('/product/selectedProduct');
    product.postSelectedProduct(req, res);
});

router.get("/selectedProduct", (req, res) => {
    console.log('/product/selectedProduct');
    product.getSelectedProduct(req, res);
});

router.get("/searchedProduct", (req, res) => {
    console.log('/product/searchedProduct');
    product.getSearchedProduct(req, res);
});

module.exports = router;