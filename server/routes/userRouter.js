const express = require("express");
const router = express.Router();
const userService = require("../lib/service/userService");
const upload = require("../lib/uploadFile/uploadFile");

router.post("/signup_confirm", upload.UPLOAD_MIDDLEWARE(), (req, res) => {
    console.log("signup_confirm()");

    userService.signup_confirm(req, res);
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


router.post("/google/callback", (req, res) => {
    console.log("google/callback()");

    userService.google_callback(req, res);
    
});

module.exports = router;
