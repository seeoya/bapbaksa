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

    add_my_fridge: (req, res) => {
        let data = req.body;
        DB.query(
            "INSERT INTO TBL_FRIDGE(u_no, ig_no) VALUES(?, ?)",
            [data.u_no, data.rf_no],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    console.log(result);
                    res.json({ status: 200 });
                }
            }
        );
    },
    delete_my_fridge: (req, res) => {
        let data = req.body;
        DB.query(
            "DELETE FROM TBL_FRIDGE WHERE u_no = ? AND ig_no =?",
            [data.u_no, data.rf_no],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    console.log(result);
                    res.json({ status: 200 });
                }
            }
        );
    },
};

module.exports = fridgeService;
