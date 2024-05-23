const DB = require("../db/db");

const commonService = {
    checkUser: (req, res) => {
        DB.query(
            "SELECT u_status FROM TBL_USER WHERE u_no = ? AND u_id = ?",
            [req.query.u_no, req.query.u_id],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    res.json({ status: 400 });
                } else {
                    res.json(result);
                }
            }
        );
    },
    checkAdmin: (req, res) => {
        DB.query(
            "SELECT count(*) FROM TBL_USER WHERE u_no = ? AND u_id = ? AND u_status = 999",
            [req.query.u_no, req.query.u_id],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    res.json({ status: 400 });
                } else {
                    res.json(result);
                }
            }
        );
    },
};

module.exports = commonService;
