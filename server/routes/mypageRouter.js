const express = require("express");
const mypageService = require("../lib/service/mypageService");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("params", req.query);
});

router.get("/like_recipe", (req, res) => {
    mypageService.select_my_like_recipe(req, res);
});

module.exports = router;
