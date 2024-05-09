const { json } = require('body-parser');
const DB = require('../db/db');
const { default: axios } = require('axios');

const marketService = {    


    

    // getAllProduct: (req, res) => {
    //     console.log("getAllProduct");
    //     DB.query(`SELECT * FROM PRODUCT`, (error, result) => {
    //         if(error) {
    //             console.log(error);
    //             console.log('여기로 들어오면 안 되는데?');
    //             res.json({
    //                 'PROD_NO': "000",
    //             });
    //         } else {
    //             console.log(result);
    //             console.log('여기로 와야해!');
    //             res.json(result);
    //         }
    //     });
    // },
    goToMarketCart: (req, res) => {
        let post = req.body;
        console.log("회원 번호 = ", post.U_NO);
        console.log("상품 번호 = ", post.I_NO);
        console.log("상품 갯수 = ", post.MC_COUNT);
    
        DB.query(`SELECT * FROM TBL_MARKET_CART WHERE u_no = ? AND i_no = ?`, [post.U_NO, post.I_NO], (error, result) => {
            if (error) {
                console.log(error);
                res.json(null);
            } else {
                if (result.length > 0) {
                    let updatedCount = result[0].mc_count + post.MC_COUNT;
                    DB.query(`UPDATE TBL_MARKET_CART SET mc_count = ? WHERE u_no = ? AND i_no = ?`,
                        [updatedCount, post.U_NO, post.I_NO],
                        (updateError, updateResult) => {
                            if (updateError) {
                                console.log(updateError);
                                res.json(null);
                            } else {
                                console.log('개수 업데이트 완료:', updateResult);
                                res.json({ updateResult: updateResult });
                            }
                        });
                } else {
                    DB.query(`INSERT INTO TBL_MARKET_CART(u_no, i_no, mc_count) VALUES (?, ?, ?)`,
                        [post.U_NO, post.I_NO, post.MC_COUNT],
                        (insertError, insertResult) => {
                            if (insertError) {
                                console.log(insertError);
                                res.json(null);
                            } else {
                                console.log('새로운 상품 추가 완료:', insertResult);
                                res.json({ insertResult: insertResult });
                            }
                        });
                }
            }
        });
    },
    getMarketCart: async (req, res) => {
        let post = req.body;
        try {
            const cartItems = await new Promise((resolve, reject) => {
                DB.query(`SELECT * FROM TBL_MARKET_CART WHERE U_NO = ?`, [post.U_NO], (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(null);
                    } else {
                        console.log('마켓 카트', result);
                        resolve(result);
                    }
                });
            });
    
            const productPromises = cartItems.map(item => axios_getCartInfo(item.i_no));
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
    deleteCart: (req, res) => {
        let mc_nos = req.body.MC_NO; // 여러 개의 MC_NO 값들을 배열로 받음
        console.log("💘💘💘", mc_nos);
        // 💘💘💘 [ 4, 6 ] 이렇게 들어와
    
        DB.query(`DELETE FROM TBL_MARKET_CART WHERE MC_NO IN (?)`, // IN 연산자 사용
            [mc_nos], // 배열을 직접 넣음
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json(null);
                } else {
                    console.log('💘💘💘삭제 성공');
                    res.json(result);
                }
            }
        );
    }
}


async function axios_getCartInfo(i_no) {
    try {
        const response = await axios.post("http://localhost:3002/product/getProduct", {
            'I_NO' : i_no,
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}                

module.exports = marketService;