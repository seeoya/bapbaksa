const express = require("express");
const router = express.Router();
const userService = require("../lib/service/userService");
const upload = require("../lib/uploadFile/uploadFile");

router.post("/isMember_confirm", (req, res) => {
    userService.isMember_confirm(req, res);
});

router.post("/signup_confirm", upload.UPLOAD_MIDDLEWARE(), (req, res) => {
    userService.signup_confirm(req, res);
});

router.post("/findid_confirm", (req, res) => {
    userService.findid_confirm(req, res);
});

router.post("/findpw_confirm", (req, res) => {
    userService.findpw_confirm(req, res);
});

router.post("/signin_confirm", (req, res) => {
    userService.signin_confirm(req, res);
});

router.post("/modify_form", (req, res) => {
    userService.modify_form(req, res);
});

router.put("/modify_confirm", upload.UPLOAD_MIDDLEWARE(), (req, res) => {
    userService.modify_confirm(req, res);
});

router.post("/refresh_token", (req, res) => {
    userService.refresh_token(req, res);
});

router.delete("/delete_confirm", (req, res) => {
    userService.delete_confirm(req, res);
});

router.post("/regiest_question", (req, res) => {
    userService.regiest_question(req, res);
});

router.post("/load_question", (req, res) => {
    userService.load_question(req, res);
});

router.post("/order_no", (req, res) => {
    userService.order_no(req, res);
});

router.delete("/delete_question", (req, res) => {
    userService.delete_question(req, res);
});

router.post("/google/callback", (req, res) => {
    userService.google_callback(req, res);
});

router.post("/kakao/callback", (req, res) => {
    userService.kakao_callback(req, res);
});

router.post("/naver/callback", (req, res) => {
    userService.naver_callback(req, res);
});

module.exports = router;
