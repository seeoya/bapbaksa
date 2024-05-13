const express = require("express");
const {
    select_my_fridge,
    add_my_fridge,
    delete_my_fridge,
} = require("../lib/service/fridgeService");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("params", req.query);

    select_my_fridge(req, res);
});

router.post("/add", (req, res) => {
    console.log("add fridge", req.body);

    add_my_fridge(req, res);
});

router.delete("/delete", (req, res) => {
    console.log("delete fridge", req.body);

    delete_my_fridge(req, res);
});

module.exports = router;
