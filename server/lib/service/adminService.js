const DB = require("../db/db");
const { default: axios } = require("axios");
const tokenUtils = require("../utils/token");

const adminService = {
    get_all_users: (req, res) => {
        DB.query(
            "SELECT u_no, u_id, u_mail, u_phone, u_status, u_reg_date FROM TBL_USER",
            [],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    res.json({ status: 400 });
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
                    res.json({ status: 400 });
                } else {
                    res.json(result);
                }
            }
        );
    },
    modify_user: (req, res) => {
        let userInfo = req.body.data;

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
                    res.json({ status: 400 });
                } else {
                    res.json(result);
                }
            }
        );
    },
    delete_user: (req, res) => {
        let post = req.body;

        if (req.headers.authorization) {
            const accessToken = req.headers.authorization.split(" ")[1];

            const verified = tokenUtils.verify(accessToken);

            if (verified.ok) {
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                month = "00" + month.toString();
                let date = now.getDate();
                date = "00" + date.toString();

                now = `${year}${month.slice(-2)}${date.slice(-2)}`;

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
                                if (user.length > 0) {
                                    let sql = `DELETE p, f, r, c FROM TBL_USER_PROFILE_IMG p, TBL_FRIDGE f, TBL_LIKE_RECIPE r, TBL_MARKET_CART c 
                                            WHERE p.u_no = ? AND f.u_no = ? AND r.u_no = ? AND c.u_no = ?`;
                                    let state = [post.u_no, post.u_no, post.u_no, post.u_no];

                                    DB.query(sql, state, (error, result) => {
                                        if (error) {
                                            res.json({ message: "회원탈퇴 처리 실패" });
                                        } else {
                                            //fs.rmSync(`C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}`, { recursive: true, force: true },
                                            fs.rmSync(
                                                `/home/ubuntu/user/upload/profile_imgs/${post.u_id}`,
                                                { recursive: true, force: true },
                                                (error) => {}
                                            );

                                            res.json({ result, message: "회원탈퇴 처리 성공" });
                                        }
                                    });
                                } else {
                                    let sql = `DELETE FROM f, r, c USING TBL_FRIDGE f, TBL_LIKE_RECIPE r, TBL_MARKET_CART c 
                                        WHERE f.u_no = r.u_no = c.u_no = ?`;
                                    let state = [post.u_no];

                                    DB.query(sql, state, (error, result) => {
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
                    res.json(quests);
                }
            }
        );
    },

    answer_question: (req, res) => {
        let params = req.body;

        DB.query(
            `UPDATE TBL_USER_QUESTIONS SET QUES_ANSWER = ?, QUES_STATE = 1, QUES_ANSWER_DATE = NOW() WHERE QUES_NO = ?`,
            [params.params.ques_answer, params.params.ques_no],
            (error, answer) => {
                if (error) {
                    res.json(null);
                } else {
                    res.json(answer);
                }
            }
        );
    },
    get_order: (req, res) => {
        DB.query(
            `SELECT * FROM TBL_ORDER o JOIN TBL_PAYMENT p ON o.pm_no = p.pm_no WHERE o.o_id = ?`,
            [req.query.o_id],
            async (error, orders) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    try {
                        const pNo = orders.map((item) => item.p_no);
                        const prodInfo = await axios_getProdName(pNo);

                        let tmp = {};

                        orders.map((order, index) => {
                            if (!tmp[order.o_id]) {
                                tmp[order.o_id] = {};
                            }

                            tmp[order.o_id][index] = {
                                ...order,
                                ...prodInfo[index],
                            };
                        });
                        res.json(tmp);
                    } catch (error) {
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
                    return { status: 400 };
                } else {
                    try {
                        const pNo = refund[0].p_no;

                        const prodInfo = await axios_getProdName(pNo);

                        res.json({ refund: refund[0], prod: prodInfo[0] });
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
                    res.json(result);
                }
            }
        );
    },
    put_refund: (req, res) => {
        let query = req.body.params;
        o_no = query.o_no;
        o_id = query.o_id;
        o_s_no = query.o_s_no;
        u_no = query.u_no;
        pm_price = -query.o_final_price;
        pm_method = query.pm_method;

        DB.query(
            `UPDATE TBL_ORDER SET o_s_no = ?, o_mod_date = now() WHERE o_no = ?`,
            [o_s_no, o_no],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    DB.query(
                        `INSERT INTO TBL_PAYMENT (o_id, u_no, pm_price, pm_method) values(?, ?, ?, ?)`,
                        [o_id, u_no, pm_price, pm_method],
                        (error, result) => {
                            if (error) {
                                console.log("error", error);
                                return { status: 400 };
                            } else {
                                res.json(result);
                            }
                        }
                    );
                }
            }
        );
    },
    put_reject: (req, res) => {
        let query = req.body.params;
        let o_no = query.o_no;
        let o_s_no = query.o_s_no;

        DB.query(
            `UPDATE TBL_ORDER SET o_s_no = ?, o_mod_date = now() WHERE o_no = ?`,
            [o_s_no, o_no],
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

    getStock: (req, res) => {
        if (req.query.p_code) {
            DB.query(
                "SELECT ps_count FROM TBL_PROD_STOCK WHERE p_code = ? AND ps_code = ?",
                [req.query.p_code, req.query.ps_code],
                (error, result) => {
                    if (error) {
                        return { status: 400 };
                    } else {
                        res.json(result[0].ps_count);
                    }
                }
            );
        } else {
            DB.query("SELECT * FROM TBL_PROD_STOCK", [], (error, result) => {
                if (error) {
                    console.log("error", error);
                    res.json({ status: 400 });
                } else {
                    let tmp = {};

                    result.map((el) => {
                        if (!tmp[el.p_code]) {
                            tmp[el.p_code] = {};
                        }

                        tmp[el.p_code][el.ps_code] = el.ps_count;
                    });

                    res.json(tmp);
                }
            });
        }
    },
    insertStock: (req, res) => {
        if (req.body.list) {
            DB.query("TRUNCATE TBL_PROD_STOCK", [], (error, result) => {
                if (error) {
                    console.log("error", error);
                    res.json({ status: 400 });
                } else {
                    let list = req.body.list;
                    let qs = "INSERT INTO TBL_PROD_STOCK(p_code, ps_code, ps_count) VALUES ";

                    list.map((el, idx) => {
                        if (idx != 0) {
                            qs += ", ";
                        }
                        qs += `(${el.p_code}, ${el.ps_code}, 100)`;
                    });

                    DB.query(qs, [], (error, result) => {
                        if (error) {
                            console.log("error", error);
                            res.json({ status: 400 });
                        } else {
                            res.json(result);
                        }
                    });
                }
            });
        } else {
            DB.query(
                "INSERT INTO TBL_PROD_STOCK(p_code, ps_code) VALUES(?, ?)",
                [req.body.p_code, req.body.ps_code],
                (error, result) => {
                    if (error) {
                        console.log("error", error);
                        res.json({ status: 400 });
                    } else {
                        res.json(result);
                    }
                }
            );
        }
    },
    putStock: (req, res) => {
        let p_code = req.body.p_code;
        let ps_code = req.body.ps_code;
        let ps_count = req.body.ps_count;

        DB.query(
            "SELECT * FROM TBL_PROD_STOCK WHERE p_code = ? AND ps_code = ?",
            [p_code, ps_code],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    res.json({ status: 400 });
                } else {
                    if (result.length > 0) {
                        let countSum = parseInt(result[0].ps_count) + parseInt(ps_count);

                        DB.query(
                            "UPDATE TBL_PROD_STOCK SET ps_count = ? WHERE p_code = ? AND ps_code = ?",
                            [countSum, p_code, ps_code],
                            (error, updateResult) => {
                                if (error) {
                                    console.log("error", error);
                                    res.json({ status: 400 });
                                } else {
                                    res.json(updateResult);
                                }
                            }
                        );
                    } else {
                        DB.query(
                            "INSERT INTO TBL_PROD_STOCK(p_code, ps_code, ps_count) VALUES(?, ?, ?)",
                            [p_code, ps_code, ps_count],
                            (error, insertResult) => {
                                if (error) {
                                    console.log("error", error);
                                    res.json({ status: 400 });
                                } else {
                                    res.json(insertResult);
                                }
                            }
                        );
                    }
                }
            }
        );
    },

    monthChart: (req, res) => {
        let data = [];
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() - 3;
        let formattedDate = `${year}-${String(month).padStart(2, "0")}`;

        DB.query(
            `SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 4 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 4 MONTH) AND O_S_NO = 5 GROUP BY formatted_date`,
            (error, cur) => {
                if (error) {
                    res.json(null);
                } else {
                    data.push(
                        cur.length > 0
                            ? cur[0]
                            : { total_final_price: 0, formatted_date: formattedDate }
                    );

                    DB.query(
                        `SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 3 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 3 MONTH) AND O_S_NO = 5 GROUP BY formatted_date`,
                        (error1, last) => {
                            if (error1) {
                                res.json(null);
                            } else {
                                month = currentDate.getMonth() - 2;
                                formattedDate = `${year}-${String(month).padStart(2, "0")}`;
                                data.push(
                                    last.length > 0
                                        ? last[0]
                                        : { total_final_price: 0, formatted_date: formattedDate }
                                );

                                DB.query(
                                    `SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 2 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 2 MONTH) AND O_S_NO = 5 GROUP BY formatted_date`,
                                    (error2, last2) => {
                                        if (error2) {
                                            res.json(null);
                                        } else {
                                            month = currentDate.getMonth() - 1;
                                            formattedDate = `${year}-${String(month).padStart(
                                                2,
                                                "0"
                                            )}`;
                                            data.push(
                                                last2.length > 0
                                                    ? last2[0]
                                                    : {
                                                          total_final_price: 0,
                                                          formatted_date: formattedDate,
                                                      }
                                            );

                                            DB.query(
                                                `SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND O_S_NO = 5 GROUP BY formatted_date`,
                                                (error3, last3) => {
                                                    if (error3) {
                                                        res.json(null);
                                                    } else {
                                                        month = currentDate.getMonth();
                                                        formattedDate = `${year}-${String(
                                                            month
                                                        ).padStart(2, "0")}`;
                                                        data.push(
                                                            last3.length > 0
                                                                ? last3[0]
                                                                : {
                                                                      total_final_price: 0,
                                                                      formatted_date: formattedDate,
                                                                  }
                                                        );

                                                        DB.query(
                                                            `SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE()) AND MONTH(O_REG_DATE) = MONTH(CURDATE()) AND O_S_NO = 5 GROUP BY formatted_date`,
                                                            (error4, last4) => {
                                                                if (error4) {
                                                                    res.json(null);
                                                                } else {
                                                                    month =
                                                                        currentDate.getMonth() + 1;
                                                                    formattedDate = `${year}-${String(
                                                                        month
                                                                    ).padStart(2, "0")}`;
                                                                    data.push(
                                                                        last4.length > 0
                                                                            ? last4[0]
                                                                            : {
                                                                                  total_final_price: 0,
                                                                                  formatted_date:
                                                                                      formattedDate,
                                                                              }
                                                                    );

                                                                    // 모든 쿼리가 완료되었으므로 데이터를 반환합니다.
                                                                    res.json(data);
                                                                }
                                                            }
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    },
    curCategoryChart: (req, res) => {
        DB.query(
            `
                SELECT 
                    '탄수화물' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 100 AND P.PROD_CODE < 200 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5 
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '채소' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 200 AND P.PROD_CODE < 400 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5 
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '과일' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 400 AND P.PROD_CODE < 500 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5 
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '육류' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 500 AND P.PROD_CODE < 600 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5 
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '어패류' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 600 AND P.PROD_CODE < 700 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5 
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '가공 육류' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 700 AND P.PROD_CODE < 800 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5 
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '가공 식품' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 800 AND P.PROD_CODE < 900 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5 
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
        `,
            (error, curCtg) => {
                if (error) {
                    res.json(null);
                } else {
                    const categories = curCtg.map((result) => ({
                        P_NO: result.P_NO,
                        total_final_price: result.total_final_price || 0,
                    }));
                    res.json(categories);
                }
            }
        );
    },
    lastCategoryChart: (req, res) => {
        DB.query(
            `
                SELECT 
                    '탄수화물' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 100 AND P.PROD_CODE < 200 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '채소' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 200 AND P.PROD_CODE < 400 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '과일' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 400 AND P.PROD_CODE < 500 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '육류' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 500 AND P.PROD_CODE < 600 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '어패류' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 600 AND P.PROD_CODE < 700 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '가공 육류' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 700 AND P.PROD_CODE < 800 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE())
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE())
                UNION ALL
                SELECT 
                    '가공 식품' AS P_NO,
                    SUM(CASE WHEN P.PROD_CODE >= 800 AND P.PROD_CODE < 900 THEN O.o_final_price ELSE 0 END) AS total_final_price
                FROM 
                    DB_BAPBAKSA.TBL_ORDER O
                JOIN 
                    REST.PRODUCT P 
                ON 
                    O.p_no = P.PROD_NO
                WHERE 
                    O.o_s_no = 5
                    AND YEAR(O.o_reg_date) = YEAR(CURDATE() - INTERVAL 1 MONTH)
                    AND MONTH(O.o_reg_date) = MONTH(CURDATE() - INTERVAL 1 MONTH)
        `,
            (error, lastCtg) => {
                if (error) {
                    res.json(null);
                } else {
                    const categories = lastCtg.map((result) => ({
                        P_NO: result.P_NO,
                        total_final_price: result.total_final_price || 0,
                    }));
                    res.json(categories);
                }
            }
        );
    },
};

async function axios_getProdName(p_no) {
    try {
        const response = await axios.post("http://localhost:3002/product/getProdName", {
            P_NO: p_no,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = adminService;
