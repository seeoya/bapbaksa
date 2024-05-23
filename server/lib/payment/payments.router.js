// read-only
const router = require("express").Router();

const controller = require("./payments.controller");

router.post("/confirm", (req, res) => {
    controller.confirmPayment(req, res);
});

module.exports = router;
