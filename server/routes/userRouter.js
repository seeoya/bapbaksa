const express = require("express");
const router = express.Router();
const userService = require("../lib/service/userService");
const upload = require("../lib/uploadFile/uploadFile");


router.post("/isMember_confirm", (req, res) => {
    console.log("isMember_confirm()");

    userService.isMember_confirm(req, res);
});

router.post("/signup_confirm", upload.UPLOAD_MIDDLEWARE(), (req, res) => {
    console.log("signup_confirm()");

    userService.signup_confirm(req, res);
});

router.post("/findid_confirm", (req, res) => {
    console.log("findid_confirm()");

    userService.findid_confirm(req, res);
});

router.post("/findpw_confirm", (req, res) => {
    console.log("findpw_confirm()");

    userService.findpw_confirm(req, res);
});

router.post("/signin_confirm", (req, res) => {
    console.log("signin_confirm()");

    userService.signin_confirm(req, res);
});

router.post("/modify_form", (req, res) => {
    console.log("modify_form()");

    userService.modify_form(req, res);
});

router.put("/modify_confirm", upload.UPLOAD_MIDDLEWARE(), (req, res) => {
    console.log("modify_confirm()");

    userService.modify_confirm(req, res);
});

router.post("/refresh_token", (req, res) => {
    console.log("refresh_token()");

    userService.refresh_token(req, res);
});

router.delete("/delete_confirm", (req, res) => {
    console.log("delete_confirm()");

    userService.delete_confirm(req, res);
});

router.post("/regiest_question", (req, res) => {
    console.log("regiest_question()");

    userService.regiest_question(req, res);
});

router.post("/load_question", (req, res) => {
    console.log("load_question()");

    userService.load_question(req, res);
});

router.post("/order_no", (req, res) => {
    console.log("order_no()");

    userService.order_no(req, res);
});

router.delete("/delete_question", (req, res) => {
    console.log("delete_question()");

    userService.delete_question(req, res);
});



router.post("/google/callback", (req, res) => {
    console.log("google/callback()");

    userService.google_callback(req, res);
    
});

router.post("/kakao/callback", (req, res) => {
    console.log("kakao/callback()");

    userService.kakao_callback(req, res);
    
});

router.post("/naver/callback", (req, res) => {
    console.log("naver/callback()");

    userService.naver_callback(req, res);
    
});

module.exports = router;
