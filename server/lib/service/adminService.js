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
    get_all_question: (req, res) => {
        DB.query(`SELECT * FROM TBL_USER_QUESTIONS ORDER BY QUES_NO DESC`, 
        (error, quests) => {
            if (error) {
                res.json(null);
            } else {
                res.json(quests);
            }
        });
    },
    get_question: (req, res) => {
        let params = req.query;
        DB.query(`SELECT * FROM TBL_USER_QUESTIONS WHERE QUES_NO = ?`, 
        [params.ques_no]
        , (error, quests) => {
            if (error) {
                res.json(null);
            } else {
                console.log(quests);
                res.json(quests);
            }
        });
    },
    answer_question: (req, res) => {
        console.log('answer_question');
        let params = req.body;
        console.log("params.params : ", params.params);
        console.log("params.params : ", params.params.ques_answer);
        console.log("params.params : ", params.params.ques_no);
        DB.query(`UPDATE TBL_USER_QUESTIONS SET QUES_ANSWER = ?, QUES_STATE = 1, QUES_ANSWER_DATE = NOW() WHERE QUES_NO = ?`, 
        [params.params.ques_answer, params.params.ques_no], 
        (error, answer) => {
            if (error) {
                res.json(null);
            } else {
                res.json(answer);
            }
        });
    }
};

module.exports = adminService;
