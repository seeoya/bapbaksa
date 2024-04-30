const express = require("express");
const router = express.Router();
const basicRecipe = require("../lib/service/basicRecipe");

router.get("/", (req, res) => {
    console.log("/basicRecipe");
    basicRecipe.getBasicRecipe(req, res);
});

module.exports = router;