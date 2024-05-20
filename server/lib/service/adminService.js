const DB = require("../db/db");
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
                                                (error) => {}
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
        );
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
        DB.query("SELECT * FROM TBL_ORDER WHERE o_id = ?", [req.query.o_id], (error, result) => {
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
        });
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
                    return { status: 400 };
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
                    return { status: 400 };
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
                            return { status: 400 };
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
                        return { status: 400 };
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

        console.log(p_code, ps_code, ps_count);

        DB.query(
            "SELECT * FROM TBL_PROD_STOCK WHERE p_code = ? AND ps_code = ?",
            [p_code, ps_code],
            (error, result) => {
                if (error) {
                    console.log("error", error);
                    return { status: 400 };
                } else {
                    if (result.length > 0) {
                        let countSum = parseInt(result[0].ps_count) + parseInt(ps_count);

                        DB.query(
                            "UPDATE TBL_PROD_STOCK SET ps_count = ? WHERE p_code = ? AND ps_code = ?",
                            [countSum, p_code, ps_code],
                            (error, updateResult) => {
                                if (error) {
                                    console.log("error", error);
                                    return { status: 400 };
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
                                    return { status: 400 };
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
    insert_stock: (req, res) => {},
    monthChart: (req, res) => {
        console.log('monthChart');
        let data = [];
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() - 3;
        let formattedDate = `${year}-${String(month).padStart(2, '0')}`;
        console.log('formattedDate : ', formattedDate);
        
        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 4 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 4 MONTH) AND O_S_NO = 5 GROUP BY formatted_date`, 
        (error, cur) => {
            if (error) {
                res.json(null);
            } else {
                data.push(cur.length > 0 ? cur[0] : {"total_final_price": 0, "formatted_date": formattedDate});
                
                DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 3 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 3 MONTH) AND O_S_NO = 5 GROUP BY formatted_date`, 
                (error1, last) => {
                    if (error1) {
                        res.json(null);
                    } else {
                        month = currentDate.getMonth() - 2;
                        formattedDate = `${year}-${String(month).padStart(2, '0')}`;
                        data.push(last.length > 0 ? last[0] : {"total_final_price": 0, "formatted_date": formattedDate});
                        
                        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 2 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 2 MONTH) AND O_S_NO = 5 GROUP BY formatted_date`, 
                        (error2, last2) => {
                            if (error2) {
                                res.json(null);
                            } else {
                                month = currentDate.getMonth() - 1;
                                formattedDate = `${year}-${String(month).padStart(2, '0')}`;
                                data.push(last2.length > 0 ? last2[0] : {"total_final_price": 0, "formatted_date": formattedDate});
                                
                                DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND O_S_NO = 5 GROUP BY formatted_date`, 
                                (error3, last3) => {
                                    if (error3) {
                                        res.json(null);
                                    } else {
                                        month = currentDate.getMonth();
                                        formattedDate = `${year}-${String(month).padStart(2, '0')}`;
                                        data.push(last3.length > 0 ? last3[0] : {"total_final_price": 0, "formatted_date": formattedDate});
                                        
                                        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE()) AND MONTH(O_REG_DATE) = MONTH(CURDATE()) AND O_S_NO = 5 GROUP BY formatted_date`, 
                                        (error4, last4) => {
                                            if (error4) {
                                                res.json(null);
                                            } else {
                                                month = currentDate.getMonth() + 1;
                                                formattedDate = `${year}-${String(month).padStart(2, '0')}`;
                                                data.push(last4.length > 0 ? last4[0] : {"total_final_price": 0, "formatted_date": formattedDate});
                                                
                                                // 모든 쿼리가 완료되었으므로 데이터를 반환합니다.
                                                res.json(data);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    curCategoryChart: (req, res) => {
        console.log('categoryChart');
        let data = [];
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let formattedDate = `${year}-${String(month).padStart(2, '0')}`;
        console.log('formattedDate : ', formattedDate);

        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE()) AND MONTH(O_REG_DATE) = MONTH(CURDATE()) AND O_S_NO = 5 AND P_NO < 200 AND P_NO >= 100 GROUP BY formatted_date`, 
        (error, curCar) => {
            if (error) {
                res.json(null);
            } else {
                data.push(curCar.length > 0 ? curCar[0] : {"total_final_price": 0, "P_NO": 100, "formatted_date": formattedDate});
                DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE()) AND MONTH(O_REG_DATE) = MONTH(CURDATE()) AND O_S_NO = 5 AND P_NO < 400 AND P_NO >= 200 GROUP BY formatted_date`, 
                (error1, curVeg) => {
                    if (error1) {
                        res.json(null);
                    } else {
                        data.push(curVeg.length > 0 ? curVeg[0] : {"total_final_price": 0, "P_NO": 200, "formatted_date": formattedDate});
                        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE()) AND MONTH(O_REG_DATE) = MONTH(CURDATE()) AND O_S_NO = 5 AND P_NO < 500 AND P_NO >= 400 GROUP BY formatted_date`, 
                        (error2, curfru) => {
                            if (error2) {
                                res.json(null);
                            } else {
                                data.push(curfru.length > 0 ? curfru[0] : {"total_final_price": 0, "P_NO": 400, "formatted_date": formattedDate});
                                DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE()) AND MONTH(O_REG_DATE) = MONTH(CURDATE()) AND O_S_NO = 5 AND P_NO < 600 AND P_NO >= 500 GROUP BY formatted_date`, 
                                (error3, curMeat) => {
                                    if (error3) {
                                        res.json(null);
                                    } else {
                                        data.push(curMeat.length > 0 ? curMeat[0] : {"total_final_price": 0, "P_NO": 500, "formatted_date": formattedDate});
                                        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE()) AND MONTH(O_REG_DATE) = MONTH(CURDATE()) AND O_S_NO = 5 AND P_NO < 700 AND P_NO >= 600 GROUP BY formatted_date`, 
                                        (error4, curFish) => {
                                            if (error4) {
                                                res.json(null);
                                            } else {
                                                data.push(curFish.length > 0 ? curFish[0] : {"total_final_price": 0, "P_NO": 600, "formatted_date": formattedDate});
                                                DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE()) AND MONTH(O_REG_DATE) = MONTH(CURDATE()) AND O_S_NO = 5 AND P_NO < 800 AND P_NO >= 700 GROUP BY formatted_date`, 
                                                (error5, curProm) => {
                                                    if (error5) {
                                                        res.json(null);
                                                    } else {
                                                        data.push(curProm.length > 0 ? curProm[0] : {"total_final_price": 0, "P_NO": 700, "formatted_date": formattedDate});
                                                        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE()) AND MONTH(O_REG_DATE) = MONTH(CURDATE()) AND O_S_NO = 5 AND P_NO < 900 AND P_NO >= 800 GROUP BY formatted_date`, 
                                                        (error6, curProc) => {
                                                            if (error6) {
                                                                res.json(null);
                                                            } else {
                                                                data.push(curProc.length > 0 ? curProc[0] : {"total_final_price": 0, "P_NO": 800, "formatted_date": formattedDate});
                                                                data[0].P_NO = '탄수화물';
                                                                data[1].P_NO = '채소';
                                                                data[2].P_NO = '과일';
                                                                data[3].P_NO = '육류';
                                                                data[4].P_NO = '어패류';
                                                                data[5].P_NO = '가공 육류';
                                                                data[6].P_NO = '가공 식품';
                                                                res.json(data);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    lastCategoryChart: (req, res) => {
        console.log('lastCategoryChart');
        let data = [];
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let formattedDate = `${year}-${String(month).padStart(2, '0')}`;
        console.log('formattedDate : ', formattedDate);

        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND O_S_NO = 5 AND P_NO < 200 AND P_NO >= 100 GROUP BY formatted_date`, 
        (error, lastCar) => {
            if (error) {
                res.json(null);
            } else {
                data.push(lastCar.length > 0 ? lastCar[0] : {"total_final_price": 0, "P_NO": 100, "formatted_date": formattedDate});
                DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND O_S_NO = 5 AND P_NO < 400 AND P_NO >= 200 GROUP BY formatted_date`, 
                (error1, lastVeg) => {
                    if (error1) {
                        res.json(null);
                    } else {
                        data.push(lastVeg.length > 0 ? lastVeg[0] : {"total_final_price": 0, "P_NO": 200, "formatted_date": formattedDate});
                        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND O_S_NO = 5 AND P_NO < 500 AND P_NO >= 400 GROUP BY formatted_date`, 
                        (error2, lastfru) => {
                            if (error2) {
                                res.json(null);
                            } else {
                                data.push(lastfru.length > 0 ? lastfru[0] : {"total_final_price": 0, "P_NO": 400, "formatted_date": formattedDate});
                                DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND O_S_NO = 5 AND P_NO < 600 AND P_NO >= 500 GROUP BY formatted_date`, 
                                (error3, lastMeat) => {
                                    if (error3) {
                                        res.json(null);
                                    } else {
                                        data.push(lastMeat.length > 0 ? lastMeat[0] : {"total_final_price": 0, "P_NO": 500, "formatted_date": formattedDate});
                                        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND O_S_NO = 5 AND P_NO < 700 AND P_NO >= 600 GROUP BY formatted_date`, 
                                        (error4, lastFish) => {
                                            if (error4) {
                                                res.json(null);
                                            } else {
                                                data.push(lastFish.length > 0 ? lastFish[0] : {"total_final_price": 0, "P_NO": 600, "formatted_date": formattedDate});
                                                DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND O_S_NO = 5 AND P_NO < 800 AND P_NO >= 700 GROUP BY formatted_date`, 
                                                (error5, lastProm) => {
                                                    if (error5) {
                                                        res.json(null);
                                                    } else {
                                                        data.push(lastProm.length > 0 ? lastProm[0] : {"total_final_price": 0, "P_NO": 700, "formatted_date": formattedDate});
                                                        DB.query(`SELECT SUM(O_FINAL_PRICE) AS total_final_price, P_NO, DATE_FORMAT(O_REG_DATE, '%Y-%m') AS formatted_date FROM TBL_ORDER WHERE YEAR(O_REG_DATE) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND MONTH(O_REG_DATE) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND O_S_NO = 5 AND P_NO < 900 AND P_NO >= 800 GROUP BY formatted_date`, 
                                                        (error6, lastProc) => {
                                                            if (error6) {
                                                                res.json(null);
                                                            } else {
                                                                data.push(lastProc.length > 0 ? lastProc[0] : {"total_final_price": 0, "P_NO": 800, "formatted_date": formattedDate});
                                                                data[0].P_NO = '탄수화물';
                                                                data[1].P_NO = '채소';
                                                                data[2].P_NO = '과일';
                                                                data[3].P_NO = '육류';
                                                                data[4].P_NO = '어패류';
                                                                data[5].P_NO = '가공 육류';
                                                                data[6].P_NO = '가공 식품';
                                                                res.json(data);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
};

module.exports = adminService;
