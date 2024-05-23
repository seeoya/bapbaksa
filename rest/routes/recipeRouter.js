const express = require("express");
const router = express.Router();
const recipe = require("../lib/service/recipe");

router.get("/", (req, res) => {
    let params = req.query;

    switch (params.type) {
        case "list":
            recipe.getAllRecipe(req, res);
            break;

        case "view":
            recipe.getSelectRecipeProgress(req, res);
            break;
    }
});

router.get("/category", (req, res) => {
    recipe.getCategoryList(req, res);
});

router.get("/region", (req, res) => {
    recipe.getRegionList(req, res);
});

router.get("/random", (req, res) => {
    recipe.getRandomRecipe(req, res);
});

module.exports = router;
