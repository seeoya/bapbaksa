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
    getTwelveProduct: (req, res) => {
        console.log('getTwelveProduct');
        let moreList = req.query.moreList;
        let newProdDate = req.query.newProdDate;

        DB.query(`SELECT * FROM PRODUCT WHERE PROD_YMD = ? LIMIT 12 OFFSET ?`,
            [newProdDate ,parseInt(moreList)],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            });
    },
    postSelectedProduct: (req, res) => {
        console.log('postSelectedProduct');
        let prodNo = req.body.PROD_NO;
        let spcsCode = req.body.PROD_SPCS_CODE;

        DB.query(`SELECT * FROM PRODUCT WHERE PROD_NO = ? AND PROD_SPCS_CODE = ?`, 
        [prodNo, spcsCode], 
        (error, result) => {
            if(error) {
                console.log(error);
                res.json(null);
            } else {
                res.json(result);
            }
        });
    },
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
    getChartData: (req , res) => {
        let code = req.body.PROD_CODE;
        let spcs_code = req.body.PROD_SPCS_CODE;

        DB.query(`SELECT * FROM PRODUCT WHERE PROD_SPCS_CODE = ? AND PROD_CODE = ? ORDER BY PROD_YMD ASC`,
        [spcs_code, code], (error, data) => {
            if(error) {
                console.log(error);
                res.json(null);
            } else {
                res.json(data);
            }
        })
    },
    getNewDate: (req,res) => {
        DB.query(`SELECT PROD_YMD FROM PRODUCT ORDER BY PROD_YMD DESC LIMIT 10`,
            (error,data) => {
                if(error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(data);
                }
            }
        )
    },
    getProduct: (req, res) => {
        console.log("123", req.body.I_NO);
        let i_no = req.body.I_NO;
        DB.query(
            `SELECT PROD_IMG, PROD_NAME, PROD_SPCS_NAME, PROD_AVRG_PRCE, DSBN_STEP_ACTO_WT, DSBN_STEP_ACTO_UNIT_NM FROM PRODUCT WHERE PROD_NO = ?`,
            [i_no],
            (error, data) => {
                if (error) {
                console.log(error);
                res.json(null);
                } else {
                if (data.length > 0) {
                    const productData = {
                    PROD_IMG: data[0].PROD_IMG,
                    PROD_NAME: data[0].PROD_NAME,
                    PROD_SPCS_NAME: data[0].PROD_SPCS_NAME,
                    PROD_AVRG_PRCE: data[0].PROD_AVRG_PRCE,
                    DSBN_STEP_ACTO_WT: data[0].DSBN_STEP_ACTO_WT,
                    DSBN_STEP_ACTO_UNIT_NM: data[0].DSBN_STEP_ACTO_UNIT_NM
                    };
                    res.json(productData);
                } else {
                    res.json(null);
                }
                }
            }
            );
        }
}

module.exports = product;