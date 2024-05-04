const express = require("express");
const router = express.Router();
const userService = require('../lib/service/userService');
const upload = require('../lib/uploadFile/uploadFile');

router.post("/signup_confirm", upload.UPLOAD_MIDDLEWARE(), (req, res) => {
    console.log('signup_confirm()');

    userService.signup_confirm(req, res);
    
});

router.post("/signin_confirm", (req, res) => {
    console.log('signin_confirm()');

    userService.signin_confirm(req, res);
    
});

router.post("/sign_token", (req, res) => {
    console.log('sign_token()');

    userService.sign_token(req, res);
    
});


router.post("/modify_confirm", upload.UPLOAD_MIDDLEWARE(), (req, res) => {
    console.log('modify_confirm()');

    userService.modify_confirm(req, res);
    
});


module.exports = router;
