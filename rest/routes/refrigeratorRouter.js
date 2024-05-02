const express = require("express");
const router = express.Router();
const refrigeator = require("../lib/service/refrigeator");

router.get("/", (req, res) => {
    console.log("/refrigeator");
    refrigeator.getAllRefrigeator(req, res);
});

module.exports = router;