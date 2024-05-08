const express = require("express");
const marketService = require("../lib/service/marketService");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ key: "value" });
});

router.get("/allProduct", (req,res) => {
    console.log("[server] marketRouter getAllProduct!");
    marketService.getAllProduct(req,res);
})

module.exports = router;
