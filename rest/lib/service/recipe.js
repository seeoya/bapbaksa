const DB = require('../db/db');

const recipe = {
    getAllBasicRecipe: (req, res) => {
        console.log('/allBasicRecipe');
        DB.query(`SELECT * FROM RECIPE_BASIC`,
            (error, result) => {
                console.log('1234567');
                if (error) {
                    console.log(error);
                    res.json({
                        'RF_NO': "000",
                    });
                } else {
                    console.log(result);

                    let recpDict = {};
                    result.forEach(function (item) {
                        recpDict[item.RECP_CODE] = item;
                    });

                    res.json(recpDict);
                }
            });
    },
    getAllRecipeIngredient: (req, res) => {
        console.log('/allRecipeIngredient');
        DB.query(`SELECT * FROM RECIPE_INGREDIENT`,
            (error, result) => {
                console.log('1234567');
                if (error) {
                    console.log(error);
                    res.json({
                        'RECP_CODE': "000",
                    });
                } else {
                    console.log(result);

                    let recpDict = {};
                    result.forEach(function (item) {
                        recpDict[item.RECP_CODE] = item;
                    });

                    res.json(recpDict);
                }
            });
    },
    getAllRecipeProgress: (req, res) => {
        console.log('/allRecipeProgress');
        DB.query(`SELECT * FROM RECIPE_PROGRESS`,
            (error, result) => {
                console.log('1234567');
                if (error) {
                    console.log(error);
                    res.json({
                        'RECP_CODE': "000",
                    });
                } else {
                    console.log(result);

                    const recipeDict = {};

                    result.forEach(step => {
                        console.log(step);
                        const recpCode = step["RECP_CODE"];
                            //351 

                            
                        if (!recipeDict[recpCode]) {
                            recipeDict[recpCode] = {};
                        }

                        recipeDict[recpCode][step.RECP_ORDER_NO] = step;
                    });

                    console.log(recipeDict);

                    res.json(recipeDict);
                    // res.json();
                }
            });
    }
}

module.exports = recipe;