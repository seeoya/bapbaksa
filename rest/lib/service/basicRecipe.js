const DB = require('../db/db');

const basicRecipe = {
    getBasicRecipe: (req, res) => {
        console.log('/basicRecipe');
        DB.query(`SELECT * FROM RECIPE_BASIC`,
        (error, result) => {
            console.log('1234567');
            if(error) {
                console.log(error);
                res.json({
                    'RF_NO': "000",
                });
            } else {
                console.log(result);

                res.json(result);
            }
        });
    }

}

module.exports = basicRecipe;