const DB = require('../db/db');

const refrigeator = {
    getRefrigeator: (req, res) => {
        console.log('/refrigeator');
        DB.query(`SELECT * FROM REFRIGERATOR WHERE RF_NO = 518`,
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

module.exports = refrigeator;