const express = require("express");
const { checkUser, checkAdmin } = require("../lib/service/commonService");
const router = express.Router();

router.get("/checkUser", (req, res) => {
    checkUser(req, res);
});

router.get("/checkAdmin", (req, res) => {
    if (req.query.u_no != 0 || req.query.u_id != "admin") {
        res.json({ status: 400 });
    } else {
        checkAdmin(req, res);
    }
});

module.exports = router;
