const DB = require('../db/db');

const product = {
    // getAllProduct: (req, res) => {
    //     console.log("getAllProduct");
    //     DB.query(`SELECT * FROM PRODUCT`, (error, result) => {
    //         if(error) {
    //             console.log(error);
    //             console.log("여긴 에러");
    //             res.json({
    //                 'PROD_NO': "000",
    //             });
    //         } else {
    //             console.log("여긴 성공");
    //             res.json(result);
    //         }
    //     });
    // },

    getAllProduct: (req, res) => {
        DB.query(`SELECT * FROM PRODUCT`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            }
        )
    },

    getNewDate: (req, res) => {
        DB.query(`SELECT PROD_YMD FROM PRODUCT ORDER BY PROD_YMD DESC LIMIT 1`,
            (error, data) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    DB.query(`SELECT * FROM PRODUCT WHERE PROD_YMD = ?`,
                        [data[0].PROD_YMD], (error, prod) => {
                            if (error) {
                                console.log(error);
                                res.json(null);
                            } else {
                                res.json(prod);
                            }
                        }
                    )
                }
            }
        )
    },

    getTwelveProduct: (req, res) => {
        console.log('getTwelveProduct');
        let params = req.query;
        console.log('loadList params : ', params);
        let moreList = req.query.moreList;
        let newProdDate = req.query.newProdDate;

        DB.query(`SELECT * FROM PRODUCT WHERE PROD_YMD = ? LIMIT 12 OFFSET ?`,
            [newProdDate, parseInt(moreList)],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            });
    },
    loadList: (req, res) => {
        console.log('loadList');
        let params = req.query;
        console.log("params : ", params)
        /* 
        params = {
            filterNumber    : 탄수, 채소 등 필터
            searchValue     : 검색어
            page            : 현재 페이지
        }
        */
        let view = "";
        let filter = "";
        let search = "";

        let limit = 12;               // 기본 12개
        let offset = params.page ? params.page * limit : 0; // params.page 가 있으면 params.page * limit, 없다면 처음부터 출력

        let state = [];

        DB.query(`SELECT PROD_YMD FROM PRODUCT ORDER BY PROD_YMD DESC LIMIT 10`,
            (error, data) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    state.push(data[0].PROD_YMD);
                    console.log("+_+_+_+_+_+_+_+_+_+_+_+_+", state);

                    if (params.searchValue) {
                        search = `AND PROD_NAME LIKE ? `;
                        state.push("%" + params.searchValue + "%");
                    }
                    console.log("params.filterNumber : ", params.filterNumber);
                    if (params.filterNumber) {
                        switch (parseInt(params.filterNumber)) {
                            case 1:
                                filter = "";
                                break;
                            // 탄수화물
                            case 2:
                                filter = " (PROD_CODE >= 100 AND PROD_CODE < 200)";
                                break;
                            // 채소
                            case 3:
                                filter = " (PROD_CODE >= 200 AND PROD_CODE < 400)";
                                break;
                            // 육류
                            case 4:
                                filter = " (PROD_CODE >= 500 AND PROD_CODE < 600)";
                                break;
                            // 어류 및 해조류
                            case 5:
                                filter = " (PROD_CODE >= 600 AND PROD_CODE < 700)";
                                break;
                            // 가공 육품
                            case 6:
                                filter = " (PROD_CODE >= 700 AND PROD_CODE < 800)";
                                break;
                            // 가공 식품
                            case 7:
                                filter = " (PROD_CODE >= 800 AND PROD_CODE < 900)";
                                break;
                        }
                    }
                    console.log("filter ::::::::::::::::", filter);
                    // 
                    if (params.page === 0) {
                        view = `LIMIT ${limit} OFFSET 0`;
                    } else {
                        view = `LIMIT ${limit} OFFSET ?`;
                        state.push(offset);
                    }

                    let queryString = `SELECT * FROM PRODUCT WHERE PROD_YMD = ? ${search ? search : ""} ${filter ? "AND" + filter : ""} ${view}`;
                    console.log("queryString : ", queryString);
                    console.log("state : ", state);
                    DB.query(queryString, state, (error, result) => {
                        // let prodObj = {};
                        // result.forEach(function (item) {
                        //     prodObj[item.PROD_NO] = item;
                        // });
                        // res.json(prodObj);
                        // console.log("prodObj : ", prodObj);
                        res.json(result);
                        // console.log("result : ", result);
                    });
                }
            }
        )


    },
    postSelectedProduct: (req, res) => {
        console.log('postSelectedProduct');
        let prodNo = req.body.PROD_NO;
        let spcsCode = req.body.PROD_SPCS_CODE;

        DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE = ? AND PROD_SPCS_CODE = ?`,
            [prodNo, spcsCode],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            });
    },
    // loadView: (req, res) => {
    //     console.log('loadView');
    //     let params = req.body;
    //     let code = params.PROD_CODE;
    //     let spcs_code = params.PROD_SPCS_CODE;
    //     DB.query(`SELECT * FROM PRODUCT WHERE PROD_SPCS_CODE = ? AND PROD_CODE = ? ORDER BY PROD_YMD ASC`,
    //     [spcs_code, code], (error, data) => {
    //         if(error) {
    //             console.log(error);
    //             res.json(null);
    //         } else {
    //             // res.json(data);
    //             console.log("data : ", data);
    //             let prodNo = req.body.PROD_NO;
    //             let spcsCode = req.body.PROD_SPCS_CODE;

    //             DB.query(`SELECT * FROM PRODUCT WHERE PROD_NO = ? AND PROD_SPCS_CODE = ?`, 
    //             [prodNo, spcsCode], 
    //             (error, result) => {
    //                 if(error) {
    //                     console.log(error);
    //                     res.json(null);
    //                 } else {
    //                     res.json(result);
    //                 }
    //             });
    //         }
    //     })
    // },
    // getSelectedProduct: (req, res) => {
    //     console.log("getSelectedProduct");
    //     let query = req.query;
    //     let prodNO = query[0].prod_no;
    //     if (prodNO >= 100 && prodNO < 200) {

    //         DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 100 AND PROD_CODE < 200`, 
    //         (error, result) => {
    //             if(error) {
    //                 console.log(error);
    //                 res.json(null);
    //             } else {
    //                 console.log(result);
    //                 res.json(result);
    //             }
    //         });

    //     } else if (prodNO >= 200 && prodNO < 400) {

    //         DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 200 AND PROD_CODE < 400`, 
    //         (error, result) => {
    //             if(error) {
    //                 console.log(error);
    //                 res.json(null);
    //             } else {
    //                 console.log(result);
    //                 res.json(result);
    //             }
    //         });

    //     } else if (prodNO >= 400 && prodNO < 500) {

    //          DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 400 AND PROD_CODE < 500`, 
    //         (error, result) => {
    //             if(error) {
    //                 console.log(error);
    //                 res.json(null);
    //             } else {
    //                 console.log(result);
    //                 res.json(result);
    //             }
    //         });

    //     } else if (prodNO >= 500 && prodNO < 600) {

    //          DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 500 AND PROD_CODE < 600`, 
    //         (error, result) => {
    //             if(error) {
    //                 console.log(error);
    //                 res.json(null);
    //             } else {
    //                 console.log(result);
    //                 res.json(result);
    //             }
    //         });

    //     } else if (prodNO >= 600 && prodNO < 700) {

    //         DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 600 AND PROD_CODE < 700`, 
    //         (error, result) => {
    //             if(error) {
    //                 console.log(error);
    //                 res.json(null);
    //             } else {
    //                 console.log(result);
    //                 res.json(result);
    //             }
    //         });

    //     } else if (prodNO >= 700 && prodNO < 800) {

    //         DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 700 AND PROD_CODE < 800`, 
    //         (error, result) => {
    //             if(error) {
    //                 console.log(error);
    //                 res.json(null);
    //             } else {
    //                 console.log(result);
    //                 res.json(result);
    //             }
    //         });

    //     } else if (prodNO >= 800 && prodNO < 900) {

    //         DB.query(`SELECT * FROM PRODUCT WHERE PROD_CODE >= 800 AND PROD_CODE < 900`, 
    //         (error, result) => {
    //             if(error) {
    //                 console.log(error);
    //                 res.json(null);
    //             } else {
    //                 console.log(result);
    //                 res.json(result);
    //             }
    //         });

    //     } else {
    //         res.json(null);
    //     }
    // },
    // getSearchedProduct: (req, res) => {
    //     let post = req.body;
    //     let prodName = post[0].prod_name;
    //     DB.query(`SELECT * FROM PRODUCT WHERE PROD_NAME LIKE '%?%`, 
    //     [prodName], 
    //     (error, result) => {
    //         if(error) {
    //             console.log(error);
    //             res.json(null);
    //         } else {
    //             res.json(result);
    //         }
    //     });
    // },
    getChartData: (req, res) => {
        let code = req.body.PROD_CODE;
        let spcs_code = req.body.PROD_SPCS_CODE;

        DB.query(`SELECT * FROM PRODUCT WHERE PROD_SPCS_CODE = ? AND PROD_CODE = ? ORDER BY PROD_YMD ASC`,
            [spcs_code, code], (error, data) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(data);
                }
            })
    },
    getProduct: (req, res) => {
        console.log("123", req.body.I_NO);
        let i_no = req.body.I_NO;
        DB.query(
            `SELECT PROD_YMD, PROD_CODE, PROD_SPCS_CODE, PROD_IMG, PROD_NAME, PROD_SPCS_NAME, PROD_AVRG_PRCE, DSBN_STEP_ACTO_WT, DSBN_STEP_ACTO_UNIT_NM FROM PRODUCT WHERE PROD_NO = ?`,
            [i_no],
            (error, data) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    if (data.length > 0) {
                        const productData = {
                            PROD_YMD: data[0].PROD_YMD,
                            PROD_CODE: data[0].PROD_CODE,
                            PROD_SPCS_CODE: data[0].PROD_SPCS_CODE,
                            PROD_IMG: data[0].PROD_IMG,
                            PROD_NAME: data[0].PROD_NAME,
                            PROD_SPCS_NAME: data[0].PROD_SPCS_NAME,
                            PROD_AVRG_PRCE: data[0].PROD_AVRG_PRCE,
                            DSBN_STEP_ACTO_WT: data[0].DSBN_STEP_ACTO_WT,
                            DSBN_STEP_ACTO_UNIT_NM: data[0].DSBN_STEP_ACTO_UNIT_NM
                        };
                        console.log("💟💟💟💟💟", productData);
                        res.json(productData);
                    } else {
                        res.json(null);
                    }
                }
            }
        );
    },
    paymentGetProd: (req, res) => {
        let post = req.body;
        console.log("❤❤❤❤❤💘💘💘💘", post);
        // ❤❤❤❤❤💘💘💘💘 { PROD_CODE: [ 296, 303 ], PROD_SPCS_CODE: [ 1, 0 ] }
        // 초기 쿼리 문자열
        let query = `SELECT * FROM PRODUCT WHERE `;

        // 바인딩 값들을 저장할 배열
        let queryValues = [];

        if (post.PROD_NO.length === 1) {
            // post.PROD_CODE의 길이가 1인 경우
            query += `PROD_NO = ?`;
            queryValues.push(post.PROD_NO);
        } else {
            // post.PROD_CODE의 길이가 1보다 큰 경우
            let conditions = post.PROD_NO.map((item, index) => {
                queryValues.push(post.PROD_NO[index]);
                return `PROD_NO = ?`;
            });
            query += conditions.join(" OR ");
        }

        // 디버그를 위한 쿼리와 값 출력
        console.log("쿼리:", query);
        console.log("바인딩 값:", queryValues);

        // 데이터베이스 쿼리 실행
        DB.query(query, queryValues, (error, result) => {
            if (error) {
                console.log(error);
                res.json(null);
            } else {
                console.log("💘💘💘", result);
                res.json(result);
            }
        });
    },
    getProductInfo: (req, res) => {
        let p_no = req.body.P_NO;
        console.log('🎀🎀', p_no);

        if (Array.isArray(p_no)) {
            const pNo = p_no.map(() => '?').join(', ');
            console.log("💘💘💘💘💘", pNo); // 💘💘💘💘💘 ?, ?, ?, ?, ?, ?, ?
            const sql = `SELECT * FROM PRODUCT WHERE PROD_NO IN (${pNo})`;

            DB.query(sql, p_no, (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log("❤❤❤❤❤💘💘💘💘💘", result);
                    res.json(result);
                }
            });
        } else {
            DB.query(`SELECT * FROM PRODUCT WHERE PROD_NO = ?`, [p_no], (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            });
        }
    },

    getProdName: async (req, res) => {
        let p_no = req.body.P_NO;
        console.log('p_no: ', p_no);

        if (Array.isArray(p_no)) {
            // p_no가 배열인 경우
            const placeholders = p_no.map(() => '?').join(', ');
            const sql = `SELECT PROD_NAME, PROD_SPCS_NAME FROM PRODUCT WHERE PROD_NO IN (${placeholders})`;

            await DB.query(sql, p_no, (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            });
        } else {

            // p_no가 단일 값인 경우
            await DB.query(`SELECT PROD_NAME, PROD_SPCS_NAME FROM PRODUCT WHERE PROD_NO = ?`, [p_no], (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            });
        }
    },
    random: (req, res) => {
        console.log("random");
        let cur_date = "";
        DB.query(`SELECT PROD_YMD FROM PRODUCT GROUP BY PROD_YMD ORDER BY PROD_YMD DESC LIMIT 1`,
            (error, date) => {
                if (error) {
                    res.json(null);
                } else {
                    cur_date = date[0].PROD_YMD;
                    DB.query(`SELECT * FROM PRODUCT WHERE PROD_YMD = ${cur_date} ORDER BY RAND() LIMIT 9`,
                        (error, random) => {
                            if (error) {
                                res.json(null);
                            } else {
                                console.log('random success return json');
                                res.json(random);
                            }
                        });
                }
            });

    },
    compareprice: (req, res) => {
        console.log("compareprice");
        let cur_date = "";
        let last_date = "";
        DB.query(`SELECT PROD_YMD FROM PRODUCT GROUP BY PROD_YMD ORDER BY PROD_YMD DESC LIMIT 2`,
            (error, date) => {
                if (error) {
                    res.json(null);
                } else {
                    cur_date = date[0].PROD_YMD;
                    last_date = date[1].PROD_YMD;
                    console.log("cur_date : ", cur_date);
                    console.log("last_date : ", last_date);
                    DB.query(`
                SELECT 
                    * 
                FROM 
                (SELECT * FROM PRODUCT WHERE PROD_YMD = ${last_date}) las 
                INNER JOIN 
                (SELECT * FROM PRODUCT WHERE PROD_YMD = ${cur_date}) cur 
                ON 
                    cur.PROD_CODE = las.PROD_CODE 
                    AND cur.PROD_SPCS_CODE = las.PROD_SPCS_CODE 
                    AND cur.PROD_GRAD_CODE = las.PROD_GRAD_CODE 
                WHERE 
                    cur.PROD_YMD = ${cur_date} 
                    AND cur.PROD_AVRG_PRCE < (las.PROD_AVRG_PRCE * 0.9) ORDER BY RAND()
                `, (error, cheep) => {
                        if (error) {
                            res.json(null);
                        } else {
                            res.json(cheep);
                        }
                    });
                }
            })
    },
    axiosGetProduct: (req, res) => {
        let pNo = req.body.pNo;
        console.log("❤❤❤❤❤💘💘💘💘", pNo);
        // ❤❤❤❤❤💘💘💘💘 [
        //     1|main  |   292, 287, 152,
        //     1|main  |   143, 142, 141,
        //     1|main  |   112, 111, 110
        //     1|main  | ]
        const promises = pNo.map((item) => {
            return new Promise((resolve, reject) => {
                DB.query(`SELECT * FROM PRODUCT WHERE PROD_NO = ?`, [item], (error, products) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve(products);
                    }
                });
            });
        });
        Promise.all(promises)
            .then(results => {
                const mergedResults = results.reduce((acc, curr) => acc.concat(curr), []);
                res.json(mergedResults);
            })
            .catch(error => {
                console.log(error);
                res.json(null);
            });

    }
}
// 10퍼센트 이상 더 싼 물품을 찾을 때 : 현재가격 / 전달 가격 * 100
module.exports = product;