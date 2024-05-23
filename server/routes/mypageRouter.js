const express = require("express");
const mypageService = require("../lib/service/mypageService");
const router = express.Router();

router.get("/", (req, res) => {});

router.get("/like_recipe", (req, res) => {
    mypageService.select_my_like_recipe(req, res);
});

router.get("/check_like_recipe", (req, res) => {
    mypageService.check_my_like_recipe(req, res);
});

router.post("/add_like_recipe", (req, res) => {
    mypageService.insert_my_like_recipe(req, res);
});

router.delete("/delete_like_recipe", (req, res) => {
    mypageService.delete_my_like_recipe(req, res);
});

module.exports = router;
