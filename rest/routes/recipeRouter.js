const express = require("express");
const router = express.Router();
const recipe = require("../lib/service/recipe");

router.get("/", (req, res) => {
    let params = req.query;

    switch (params.type) {
        case "list":
            recipe.loadList(req,res);
            break;
        case "view":
            recipe.getSelectRecipeProgress(req, res);
            break;
    }
});

module.exports = router;