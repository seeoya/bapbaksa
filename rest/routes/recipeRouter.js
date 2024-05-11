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

router.get("/category", (req, res) => {
    console.log("/category");
    recipe.getCategoryList(req, res);
});

router.get("/region", (req, res) => {
    console.log("/region");
    recipe.getRegionList(req, res);
});

router.get("/random", (req, res) => {
    console.log("/random");
    recipe.getRandomRecipe(req, res);
});

module.exports = router;
