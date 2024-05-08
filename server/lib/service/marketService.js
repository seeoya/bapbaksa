const DB = require('../db/db');

const marketService = {    

    getAllProduct: (req, res) => {
        console.log("getAllProduct");
        DB.query(`SELECT * FROM PRODUCT`, (error, result) => {
            if(error) {
                console.log(error);
                console.log('여기로 들어오면 안 되는데?');
                res.json({
                    'PROD_NO': "000",
                });
            } else {
                console.log(result);
                console.log('여기로 와야해!');
                res.json(result);
            }
        });
    },



}

module.exports = marketService;