const DB = require('../db/db');

const refrigeator = {
    getAllRefrigeator: (req, res) => {
        console.log('/refrigeator');
        DB.query(`SELECT * FROM REFRIGERATOR`,
        (error, result) => {
            console.log('1234567');
            if(error) {
                console.log(error);
                res.json({
                    'RF_NO': "000",
                });
            } else {
                console.log(result);

                    let refDict = {};
                    result.forEach(function (item) {
                        refDict[item.RF_NO] = item;
                    });

                    res.json(refDict);
            }
        });
    }

}

module.exports = refrigeator;