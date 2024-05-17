const DB = require("../db/db");

const mypageService = {
    select_my_like_recipe: (req, res) => {
        DB.query(
            "SELECT * FROM TBL_LIKE_RECIPE WHERE u_no = ?",
            [req.query.u_no],
            (error, result) => {
                if (error) {
                    res.json({ status: 400 });
                }

                let tmp = {};

                result.map((el) => {
                    if (!tmp[el.r_no]) {
                        tmp[el.r_no] = {};
                    }

                    tmp[el.r_no] = el;
                });

                res.json(tmp);
            }
        );
    },

    check_my_like_recipe: (req, res) => {
        let u_no = req.query.u_no;
        let rf_no = req.query.rf_no;

        DB.query(
            "SELECT * FROM TBL_LIKE_RECIPE WHERE u_no =? AND r_no = ?",
            [u_no, rf_no],
            (error, result) => {
                if (error) {
                    res.json({ status: 400 });
                } else {
                    console.log("111", result?.length);
                    res.json(result);
                }
            }
        );
    },
    insert_my_like_recipe: (req, res) => {
        let u_no = req.body.u_no;
        let rf_no = req.body.rf_no;

        DB.query(
            "INSERT INTO TBL_LIKE_RECIPE VALUES(?, ?, NOW())",
            [u_no, rf_no],
            (error, result) => {
                if (error) {
                    res.json({ status: 400 });
                } else {
                    console.log("2222", result);
                    res.json(result);
                }
            }
        );
    },
    delete_my_like_recipe: (req, res) => {
        let u_no = parseInt(req.body.u_no);
        let rf_no = parseInt(req.body.rf_no);

        console.log(u_no, rf_no);

        DB.query(
            "DELETE FROM TBL_LIKE_RECIPE WHERE u_no = ? AND r_no = ?",
            [u_no, rf_no],
            (error, result) => {
                if (error) {
                    res.json({ status: 400 });
                } else {
                    console.log("3333", result);
                    res.json(result);
                }
            }
        );
    },
};

module.exports = mypageService;
