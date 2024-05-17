const DB = require("../db/db");

const adminService = {
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

    get_all_users: (req, res) => {
        DB.query(
            "SELECT u_no, u_id, u_mail, u_phone, u_status, u_reg_date FROM TBL_USER",
            [],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    let tmpList = {};

                    if (result) {
                        result.map((el) => {
                            tmpList[el.u_no] = el;
                        });
                    }

                    res.json(tmpList);
                }
            }
        );
    },
    get_user: (req, res) => {
        DB.query(
            "SELECT u_no, u_id, u_mail, u_phone, u_google_id, u_status, u_zip_code, u_first_address, u_second_address, u_reg_date FROM TBL_USER WHERE u_no = ?",
            [req.query.u_no],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    res.json(result);
                }
            }
        );
    },
    modify_user: (req, res) => {
        let userInfo = req.body.data;
        console.log(userInfo);
        DB.query(
            "UPDATE TBL_USER SET u_mail =?, u_phone = ?, u_zip_code = ?, u_first_address = ?, u_second_address = ?, u_mod_date = NOW() WHERE u_no = ?",
            [
                userInfo.u_mail,
                userInfo.u_phone,
                userInfo.u_zip_code,
                userInfo.u_first_addr,
                userInfo.u_second_addr,
                userInfo.u_no,
            ],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    console.log(result);
                    res.json(result);
                }
            }
        );
    },
    get_all_orders: (req, res) => {
        DB.query(
            "SELECT o_id, pm_no, u_no, o_s_no, o_reg_date, o_mod_date FROM TBL_ORDER",
            [],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    let tmpList = {};

                    if (result) {
                        result.map((el) => {
                            tmpList[el.o_id] = el;
                        });
                    }

                    res.json(tmpList);
                }
            }
        );
    },
    get_order: (req, res) => {
        DB.query(
            "SELECT * FROM TBL_ORDER WHERE o_id = ?",
            [req.query.o_id],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {

                    let tmpList = {};

                    result.map((el) => {
                        tmpList[el.o_no] = el;
                    });
                    res.json(tmpList);
                }
            }
        );
    },
};

module.exports = adminService;
