const express = require("express");
const router = express.Router();
const userService = require('../lib/service/userService');
const upload = require('../lib/uploadFile/uploadFile');

router.post("/signup_confirm", upload.UPLOAD_MIDDLEWARE(), (req, res) => {
    console.log('signup_confirm()');

    userService.signup_confirm(req, res);
    
});

module.exports = router;
