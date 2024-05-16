// read-only
const router = require("express").Router();

const controller = require("./payments.controller");

router.post("/confirm", (req, res) => {
    console.log("결제승인", req.data, req.body.body);
    // res.send("1234");

    controller.confirmPayment(req, res);
});

module.exports = router;
