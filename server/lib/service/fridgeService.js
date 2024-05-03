const DB = require("../db/db");

const fridgeService = {
    select_my_fridge: (req, res) => {
        DB.query("SELECT * FROM TBL_FRIDGE WHERE U_NO = ?", [req.query.u_no], (error, result) => {
            if (error) {
                console.log("error", error);
                return { status: 400 };
            } else {
                res.json(result);
            }
        });
    },
};

module.exports = fridgeService;
