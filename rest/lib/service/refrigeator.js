const DB = require("../db/db");

const refrigeator = {
    getAllRefrigeator: (req, res) => {
        DB.query(`SELECT * FROM REFRIGERATOR`, (error, result) => {
            if (error) {
                console.log(error);
                res.json({
                    RF_NO: "000",
                });
            } else {
                let refDict = {};
                result.forEach(function (item) {
                    refDict[item.RF_NO] = item;
                });

                res.json(refDict);
            }
        });
    },
};

module.exports = refrigeator;