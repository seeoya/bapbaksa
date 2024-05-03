const express = require("express");
const router = express.Router();
const recipe = require("../lib/service/recipe");

router.get("/allBasicRecipe", (req, res) => {
    console.log("/basicRecipe");
    recipe.getAllBasicRecipe(req, res);
});

router.get("/allRecipeIngredient", (req, res) => {
    console.log("/recipeIngredient");
    recipe.getAllRecipeIngredient(req, res);
});

router.get("/allRecipeProgress", (req, res) => {
    console.log("/recipeProgress");
    recipe.getAllRecipeProgress(req, res);
});

module.exports = router;