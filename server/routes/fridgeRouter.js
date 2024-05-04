const express = require("express");
const { select_my_fridge } = require("../lib/service/fridgeService");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("params", req.query);

    select_my_fridge(req, res);
});

module.exports = router;
