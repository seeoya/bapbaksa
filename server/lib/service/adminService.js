const DB = require("../db/db");
const { default: axios } = require("axios");
const { verify } = require("../utils/token");

const adminService = {
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
            "UPDATE TBL_USER SET u_mail =?, u_phone = ?, u_zip_code = ?, u_first_address = ?, u_second_address = ?, u_status = ?, u_mod_date = NOW() WHERE u_no = ?",
            [
                userInfo.u_mail,
                userInfo.u_phone,
                userInfo.u_zip_code,
                userInfo.u_first_addr,
                userInfo.u_second_addr,
                userInfo.u_status,
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
    delete_user: (req, res) => {
        let post = req.body;

        console.log("post:", post);
        console.log("post.u_id: ", post.u_id);
        console.log("post.u_no: ", post.u_no);

        if (req.headers.authorization) {
            const accessToken = req.headers.authorization.split(" ")[1];
            const verified = verify(accessToken);

            console.log("verified: ", verified);

            if (verified.ok) {
                let now = new Date();
                now = now.toLocaleString();

                let sql = `UPDATE TBL_USER SET u_id = ?, u_mail = ?, u_phone = ?, u_google_id = ?, u_kakao_id = ?, 
                            u_naver_id = ?, u_status = ?, u_zip_code = ?, u_first_address= ?, u_second_address = ?,
                            pi_name = ?, u_refresh_token = ?, u_mod_date = now() WHERE u_id = ?`;
                let state = [post.u_id + now, "", "", "", "", "", 0, "", "", "", "", "", post.u_id];

                DB.query(sql, state, (error, result) => {
                    if (error) {
                        res.json({ message: "회원정보 삭제 에러!" });
                    } else {
                        DB.query(
                            `SELECT * FROM  TBL_USER_PROFILE_IMG WHERE u_no = ?`,
                            [post.u_no],
                            (error, user) => {
                                console.log("🎄", user.length);

                                if (user.length > 0) {
                                    let sql = `DELETE p, f, r, c FROM TBL_USER_PROFILE_IMG p, TBL_FRIDGE f, TBL_LIKE_RECIPE r, TBL_MARKET_CART c 
                                            WHERE p.u_no = ? AND f.u_no = ? AND r.u_no = ? AND c.u_no = ?`;
                                    let state = [post.u_no, post.u_no, post.u_no, post.u_no];

                                    DB.query(sql, state, (error, result) => {
                                        console.log("🎆", result);

                                        if (error) {
                                            res.json({ message: "회원탈퇴 처리 실패" });
                                        } else {
                                            fs.rmSync(
                                                `C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}`,
                                                { recursive: true, force: true },
                                                (error) => { }
                                            );

                                            console.log(`${post.u_id} directory deleted!`);
                                            res.json({ result, message: "회원탈퇴 처리 성공" });
                                        }
                                    });
                                } else {
                                    let sql = `DELETE FROM f, r, c USING TBL_FRIDGE f, TBL_LIKE_RECIPE r, TBL_MARKET_CART c 
                                        WHERE f.u_no = r.u_no = c.u_no = ?`;
                                    let state = [post.u_no];

                                    DB.query(sql, state, (error, result) => {
                                        console.log("👓", result);

                                        if (error) {
                                            res.json({ message: "회원탈퇴 처리 실패" });
                                        } else {
                                            res.json({ result, message: "회원탈퇴 처리 성공" });
                                        }
                                    });
                                }
                            }
                        );
                    }
                });
            } else {
                res.status(401).send({ message: verified.message });
            }
        } else {
            res.json({ message: "No accessToken!" });
        }
    },
    get_all_question: (req, res) => {
        DB.query(`SELECT * FROM TBL_USER_QUESTIONS ORDER BY QUES_NO DESC`, (error, quests) => {
            if (error) {
                res.json(null);
            } else {
                res.json(quests);
            }
        });
    },
    get_question: (req, res) => {
        let params = req.query;
        DB.query(
            `SELECT * FROM TBL_USER_QUESTIONS WHERE QUES_NO = ?`,
            [params.ques_no],
            (error, quests) => {
                if (error) {
                    res.json(null);
                } else {
                    console.log(quests);
                    res.json(quests);
                }
            }
        )
    },

    answer_question: (req, res) => {
        console.log("answer_question");
        let params = req.body;
        console.log("params.params : ", params.params);
        console.log("params.params : ", params.params.ques_answer);
        console.log("params.params : ", params.params.ques_no);
        DB.query(
            `UPDATE TBL_USER_QUESTIONS SET QUES_ANSWER = ?, QUES_STATE = 1, QUES_ANSWER_DATE = NOW() WHERE QUES_NO = ?`,
            [params.params.ques_answer, params.params.ques_no],
            (error, answer) => {
                if (error) {
                    res.json(null);
                } else {
                    res.json(answer);
                }
            });
    },
    get_order: (req, res) => {
        console.log('get_order()');

        DB.query(
            `SELECT * FROM TBL_ORDER o JOIN TBL_PAYMENT p ON o.pm_no = p.pm_no WHERE o.o_id = ?`,
            [req.query.o_id],
            async (error, orders) => {
                console.log('🎃🎃', orders[0]);
                console.log('🎃🎃', orders[1]);
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    
                    try {
                        const pNo = orders.map((item) => item.p_no);
                        const prodInfo = await axios_getProductInfo(pNo);
                                console.log('🎃', prodInfo);
                        let tmp = {};
                        orders.map((order, index) => {
                            if (!tmp[order.o_id]){
                                tmp[order.o_id] = {};
                            }

                            tmp[order.o_id][index] = {
                                ...order,
                                ...prodInfo[index]
                            };                            

                        });
                        console.log('tmp:', tmp);
                        res.json(tmp);

                    } catch (error) {
                        console.log(error);
                        res.json(null);
                    }

                    
                }
            }
        );
    },
    get_all_orders: (req, res) => {
        DB.query(
            "SELECT o_id, pm_no, u_no, o_s_no, o_reg_date, o_mod_date FROM TBL_ORDER ORDER BY o_reg_date DESC",
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
    get_refund_order: (req, res) => {
        DB.query(
            `SELECT * FROM TBL_ORDER o JOIN TBL_PAYMENT p ON o.pm_no = p.pm_no WHERE o.o_no = ?`,
            [req.query.o_no],
            async (error, refund) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    try {
                        const pNo = refund[0].p_no;
                        console.log("pNo: ", pNo);

                        const prodInfo = await axios_getProductInfo(pNo);
                                console.log('🎃', prodInfo);
                        let tmp = {};
                        refund.map((order, index) => {
                            if (!tmp[order.o_no]){
                                tmp[order.o_no] = {};
                            }

                            tmp[order.o_no] = {
                                ...order,
                                ...prodInfo,
                            };                            

                        });
                        console.log('tmp:', tmp);
                        res.json(tmp);

                    } catch (error) {
                        console.log(error);
                        res.json(null);
                    }
                }
            }
        );
    },
    get_all_refund_orders: (req, res) => {
        DB.query(
            `SELECT o_no, o_id, pm_no, u_no, o_s_no, o_reg_date, o_mod_date FROM TBL_ORDER WHERE o_s_no = 2 or o_s_no = 3 ORDER BY o_s_no ASC, o_id ASC, o_mod_date DESC`,
            [],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {                    

                    if (result) {
                        res.json(result);    
                    }
                }

            }
        );
    },
    put_refund: async (req, res) => {
        let query = req.body.params;
        o_no = query.o_no;
        o_id = query.o_id;
        o_s_no = query.o_s_no;
        u_no = query.u_no;        
        pm_price = -query.o_final_price;
        pm_method = query.pm_method;               

        DB.query(`UPDATE TBL_ORDER SET o_s_no = ?, o_mod_date = now() WHERE o_no = ?`,
                    [o_s_no, o_no], (error, result) => {

                        if (error) {
                            console.log("error", error);
                            return { status: 400 };
                        } else {                           

                            DB.query(`INSERT INTO TBL_PAYMENT (o_id, u_no, pm_price, pm_method) values(?, ?, ?, ?)`,
                                [o_id, u_no, pm_price, pm_method], (error, result) => {

                                    if (error) {
                                        console.log("error", error);
                                        return { status: 400 };
                                    } else {
                                        res.json(result);
                                    }
                                }
                            );
                              
                        }

                    });
   },

    put_reject: async (req, res) => {
        let query = req.body.params;
        o_no = query.o_no;    
        o_s_no = query.o_s_no;          

        DB.query(`UPDATE TBL_ORDER SET o_s_no = ?, o_mod_date = now() WHERE o_no = ?`,
                    [o_s_no, o_no], (error, result) => {

                        if (error) {
                            console.log("error", error);
                            return { status: 400 };
                        } else {                           
                            res.json(result);
                        }
                    }
                );
                              
    },  
    
    insert_stock: (req, res) => { },
};

async function axios_getProductInfo(p_no) {
    try {
        const response = await axios.post("http://localhost:3002/product/getProductInfo", {
            P_NO: p_no,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
    

module.exports = adminService;