const express = require("express");
const { load_my_fridge } = require("../lib/service/fridgeService");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ key: "value" });
});

module.exports = router;
