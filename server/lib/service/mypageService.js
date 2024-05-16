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
};

module.exports = mypageService;
