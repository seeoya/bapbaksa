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
        case "":
            break;    
        default:
            break;
    }
})

router.get("/all", (req, res) => {
    console.log("/basicRecipe");
    recipe.getAllBasicRecipe(req, res);
});

router.get("/food", (req, res) => {
    console.log("/recipeIngredient");
    recipe.getAllRecipeIngredient(req, res);
});

router.get("/allRecipeProgress", (req, res) => {
    console.log("/allRecipeProgress");
    recipe.getAllRecipeProgress(req, res);
});

router.get("/detail", (req, res) => {
    console.log("/selectRecipeProgress");
    recipe.getSelectRecipeProgress(req, res);
});

router.get("/view", (req, res) => {
    console.log("/view");
    recipe.view(req, res);
});

module.exports = router;