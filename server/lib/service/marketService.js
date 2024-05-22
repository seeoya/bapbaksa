const { json } = require("body-parser");
const DB = require("../db/db");
const { default: axios } = require("axios");

const marketService = {
    goToMarketCart: (req, res) => {
        let post = req.body;
        console.log("회원 번호 = ", post.U_NO);
        console.log("상품 번호 = ", post.P_CODE, post.PS_CODE);
        console.log("상품 갯수 = ", post.MC_COUNT);

        DB.query(
            `SELECT * FROM TBL_MARKET_CART WHERE u_no = ? AND p_code = ? AND ps_code = ?`,
            [post.U_NO, post.P_CODE, post.PS_CODE],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    if (result.length > 0) {
                        let updatedCount = result[0].mc_count + post.MC_COUNT;
                        DB.query(
                            `UPDATE TBL_MARKET_CART SET mc_count = ? WHERE u_no = ? AND p_code = ? AND ps_code = ?`,
                            [updatedCount, post.U_NO, post.P_CODE, post.PS_CODE],
                            (updateError, updateResult) => {
                                if (updateError) {
                                    console.log(updateError);
                                    res.json(null);
                                } else {
                                    console.log("개수 업데이트 완료:", updateResult);
                                    res.json({ updateResult: updateResult });
                                }
                            }
                        );
                    } else {
                        DB.query(
                            `INSERT INTO TBL_MARKET_CART(u_no, p_code, ps_code, mc_count) VALUES (?, ?, ?, ?)`,
                            [post.U_NO, post.P_CODE, post.PS_CODE, post.MC_COUNT],
                            (insertError, insertResult) => {
                                if (insertError) {
                                    console.log(insertError);
                                    res.json(null);
                                } else {
                                    console.log("새로운 상품 추가 완료:", insertResult);
                                    res.json({ insertResult: insertResult });
                                }
                            }
                        );
                    }
                }
            }
        );
    },
    getMarketCart: async (req, res) => {
        let post = req.body;

        console.log(post);

        try {
            const cartItems = await new Promise((resolve, reject) => {
                DB.query(
                    `SELECT * FROM TBL_MARKET_CART WHERE U_NO = ?`,
                    [post.U_NO],
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            reject(null);
                        } else {
                            console.log("마켓 카트", result);
                            resolve(result);
                        }
                    }
                );
            });

            const productPromises = cartItems.map((item) => axios_getCartInfo(item.i_no));
            const productInfos = await Promise.all(productPromises);
            const mergedResult = cartItems.map((item, index) => ({
                ...item,
                productInfo: productInfos[index],
            }));

            res.json(mergedResult);
        } catch (error) {
            console.log(error);
            res.json(null);
        }
    },
    deleteInCart: (req, res) => {
        let mc_nos = req.body.MC_NO; // 여러 개의 MC_NO 값들을 배열로 받음
        DB.query(`DELETE FROM TBL_MARKET_CART WHERE MC_NO IN (?)`, [mc_nos], (error, result) => {
            if (error) {
                console.log(error);
                res.json(null);
            } else {
                res.json(result);
            }
        });
    },

    insertPayment: (req, res) => {
        let u_no = req.body.u_no;
        let o_count = req.body.o_count;
        let o_price = req.body.o_price;
        let p_no = req.body.p_no;
        let p_code = req.body.postcode;
        let updatedRoadAddress = req.body.updatedRoadAddress;
        let detailAddress = req.body.detailAddress;
        function formatDate(date) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let milliseconds = date.getMilliseconds();

            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (milliseconds < 10) {
                milliseconds = "00" + milliseconds;
            } else if (milliseconds < 100) {
                milliseconds = "0" + milliseconds;
            }

            return "" + year + month + day + hours + minutes + seconds + milliseconds;
        }

        let currentDate = new Date();
        let formattedDate = formatDate(currentDate);
        let flag = true;
        for (let i = 0; i < o_count.length; i++) {
            DB.query(
                "INSERT INTO TBL_ORDER(" +
                "O_ID, U_NO, O_COUNT, O_PRICE, P_NO, O_FINAL_PRICE, O_S_NO, P_ZIP_CODE , P_FIRST_ADDRESS, P_SECOND_ADDRESS) " +
                "VALUES(?, ?, ?, ?, ?, ?, -1, ? , ? , ?)",
                [
                    `${formattedDate}${u_no}`,
                    u_no,
                    o_count[i],
                    o_price[i],
                    p_no[i],
                    o_count[i] * o_price[i],
                    p_code,
                    updatedRoadAddress,
                    detailAddress
                ],
                (error, result) => {
                    if (error) {
                        console.log(error);
                        flag = false;
                        return;
                    } else {
                        flag = true;
                    }
                }
            );
        }

        if (flag) {
            res.json({ status: 200, orderId: formattedDate + u_no });
        } else {
            res.json({ status: 400 });
        }
    },
    getPaymentHistory: (req, res) => {
        let post = req.body;
        DB.query(
            `SELECT * FROM TBL_ORDER O 
            JOIN TBL_ORDER_STATUS OS ON O.o_s_no = OS.o_s_no
            WHERE U_NO = ? AND O.o_s_no != -1`,
            [post.u_no],
            async (error, orders) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    try {
                        const pNo = orders.map((item) => item.p_no);
                        const prodInfo = await axios_get_product(pNo);

                        let tmp = {};

                        orders.map((order, index) => {
                            if (!tmp[order.o_id]) {
                                tmp[order.o_id] = {};
                            }
                            tmp[order.o_id][order.p_no] = {
                                ...order,
                                ...prodInfo[index],
                            };
                        });
                        res.json({ orders: tmp });
                    } catch (error) {
                        console.log(error);
                        res.json(null);
                    }
                }
            }
        );
    },

    getPaymentDetail: (req, res) => {
        let oId = req.body.O_ID;
        DB.query(`SELECT * FROM TBL_ORDER O JOIN TBL_ORDER_STATUS OS ON O.o_s_no = OS.o_s_no WHERE O.o_id = ?`, [oId], async (error, orders) => {
            if (error) {
                console.log(error);
                return res.json(null);
            } else {
                try {
                    const pNo = orders.map((item) => item.p_no);
                    const productInfoResults = await axios_getProductInfo(pNo);

                    const groupedOrders = orders.reduce((acc, order) => {
                        if (!acc[order.o_id]) {
                            acc[order.o_id] = {
                                o_id: order.o_id,
                                orders: [],
                            };
                        }
                        const productInfo = productInfoResults.find(
                            (product) => product.PROD_NO === order.p_no
                        );
                        acc[order.o_id].orders.push({
                            ...order,
                            productInfo: productInfo ? [productInfo] : [],
                        });
                        return acc;
                    }, {});

                    const groupedOrdersArray = Object.values(groupedOrders);
                    res.json(groupedOrdersArray);
                } catch (error) {
                    console.log(error);
                    res.json(null);
                }
            }
        });
    },
    refundOrder: (req, res) => {
        let p_no = Number(req.body.refundInfo.p_no);
        let o_id = Number(req.body.refundInfo.o_id);
        DB.query(
            `UPDATE TBL_ORDER SET O_S_NO = 2 WHERE P_NO = ? AND O_ID = ?`,
            [p_no, o_id],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            }
        );
    },
    acceptOrder: (req, res) => {
        let o_id = Number(req.body.acceptInfo.o_id);
        DB.query(
            `UPDATE TBL_ORDER SET O_S_NO = 5 WHERE O_ID = ?`,
            [o_id],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            }
        );
    },

    cancelOrder: (req, res) => {
        let o_id = Number(req.body.cancelInfo.o_id);
        DB.query(
            `UPDATE TBL_ORDER SET O_S_NO = 4 WHERE O_ID = ?`,
            [o_id],
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    res.json(result);
                }
            }
        );
    },

    insertTossPayment: (req, res) => {
        let post = req.body
        console.log("❣❣❣❣💕💕", post.o_no);
        DB.query(`INSERT INTO TBL_PAYMENT(O_ID, U_NO, PM_PRICE, PM_METHOD) 
        VALUES(?,?,?,?)`, [post.o_id, post.u_no, post.pm_price, post.pm_method], (error, result) => {
            if (error) {
                console.log(error);
                res.json(null);
            } else {
                res.json(result);
            }
        })

    },

    deleteCart: (req, res) => {
        let post = req.body
        DB.query(`SELECT * FROM TBL_ORDER WHERE O_ID = ?`, [post.p_no], (error, info) => {
            if (error) {
                console.log(error);
            } else {
                const oId = info.map((item) => item.o_id);
                DB.query(
                    `UPDATE TBL_ORDER SET O_S_NO = 0, PM_NO = ? WHERE O_ID = ?`, [post.pm_no, oId[0]], (error, result) => {
                        if (error) {
                            console.log(error)
                        } else {
                            const pNo = info.map((item) => item.p_no); // [ 283, 289, 293 ] 이렇게 들어옴
                            const pNoString = pNo.join(','); //283,289,293 이렇게 들어옴
                            DB.query(
                                `DELETE FROM TBL_MARKET_CART WHERE U_NO = ? AND P_CODE IN (${pNoString})`,
                                [post.u_no],
                                (error, result) => {
                                    if (error) {
                                        console.log(error);
                                        res.json(null);
                                    } else {
                                        res.json(result);
                                    }
                                }
                            );
                        }
                    }
                )
            }
        })

    },

};

async function axios_getCartInfo(i_no) {
    try {
        const response = await axios.post("http://localhost:3002/product/getProduct", {
            I_NO: i_no,
        });
        console.log("🤍🤍🤍🤍", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

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

async function axios_get_product(pNo) {
    try {
        const response = await axios.post("http://localhost:3002/product/axios_get_product", {
            pNo
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
module.exports = marketService;
