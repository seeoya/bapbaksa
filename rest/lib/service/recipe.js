const DB = require('../db/db');

const recipe = {
    loadList: (req, res) => {
        console.log("loadList");
        let params = req.query;

        // 검색 v
        // 소트 v
        // 카테고리 필터 v 하나만
        // 재료 필터 // => 1. 이 중 하나라도 포함 or 2. 전부 다 포함
        // 재료 필터 // 1인지 2인지

        let search = "";
        let sort = "";
        let time = "";
        let limit = 0;
        let view = "";
        let offset = params.page * limit;
        let state = [];

        let table = "RECIPE_BASIC";

        // 선택한 항목이 모두 포함된 식재료
        if (params.food && params.foodinclu === 1) {
            table = `(SELECT BASIC.*, COUNT(FOOD.RECP_INGRD_CODE) AS ingredient_count 
            FROM RECIPE_BASIC BASIC
            JOIN RECIPE_INGREDIENT FOOD 
            ON BASIC.RECP_CODE = FOOD.RECP_CODE
            WHERE FOOD.RECP_INGRD_CODE IN (?)
            GROUP BY BASIC.RECP_CODE
            HAVING ingredient_count = ?)`;
            state.push(params.food, params.food.length);
        }

        // 선택한 항목이 하나라도 포함된 식재료
        if (params.food && params.foodinclu === 0) {
            if (params.food.length > 1) {
                // 여러 조건을 OR로 연결
                table = `SELECT * FROM RECIPE_BASIC WHERE ${params.food.map((_, i) => `RECP_INGRD_CODE = ?`).join(' OR ')}`;
                placeholders = params.food;  // 모든 값을 매개변수로 사용
            } else {
                // 단일 조건
                table = `SELECT * FROM RECIPE_BASIC WHERE RECP_INGRD_CODE = ?`;
                placeholders = params.food[0];
            }
        
            // 매개변수 추가
            state.push(...placeholders);
        }

        // 레시피 검색
        if (params.search) {
            search = `RECP_NAME LIKE '%?%'`;
            state.push(params.search);
        }

        // 걸리는 시간 분류
        if (params.time) {
            switch (params.time) {
                case "1":
                    time = "RECP_TIME < 10";
                    break;
                case "10":
                    time = "RECP_TIME >= 10 AND RECP_TIME < 20";
                    break;
                case "20":
                    time = "RECP_TIME >= 20 AND RECP_TIME < 30";
                    break;
                case "30":
                    time = "RECP_TIME >= 30 AND RECP_TIME < 40";
                    break;
                case "40":
                    time = "RECP_TIME >= 40 AND RECP_TIME < 50";
                    break;
                case "50":
                    time = "RECP_TIME >= 50 AND RECP_TIME < 60";
                    break;
                case "60":
                    time = "RECP_TIME >= 60";
                    break;
            }
        }

        // 지역 음식 분류
        if (params.region) {
            if (params.region.length > 1) {
                // 여러 조건을 OR로 연결
                query = `${params.food.map((_, i) => `RECP_REGION_NAME = ?`).join(' OR ')}`;
                placeholders = params.region;  // 모든 값을 매개변수로 사용
            } else {
                // 단일 조건
                query = "RECP_REGION_NAME = ?";
                placeholders = params.region[0];
            }

            // 매개변수 추가
            state.push(...placeholders);
        }

        // 요리 종류 분류
        if (params.category) {
            if (params.category.length > 1) {
                // 여러 조건을 OR로 연결
                query = `${params.food.map((_, i) => `RECP_CATEGORY_CODE = ?`).join(' OR ')}`;
                placeholders = params.category;  // 모든 값을 매개변수로 사용
            } else {
                // 단일 조건
                query = "RECP_CATEGORY_CODE = ?";
                placeholders = params.category[0];
            }

            // 매개변수 추가
            state.push(...placeholders);
        }

        // 난이도 분류
        if (params.difficult) {
            switch (params.difficult) {
                case "0":
                    time = "RECP_DIFFICULT = '초보환영'";
                    break;
                case "1":
                    time = "RECP_DIFFICULT = '보통'";
                    break;
                case "2":
                    time = "RECP_DIFFICULT = '어려움'";
                    break;
            }
        }

        // 최신순, 요리시간 분류
        // "sort" : "old", "new", "lesstime", "moretime", ...
        if (params.sort) {
            switch (params.sort) {
                case "old":
                    sort = "ORDER BY RECP_CODE ASC";
                    break;
                case "new":
                    sort = "ORDER BY RECP_CODE DESC";
                    break;
                case "lesstime":
                    sort = "ORDER BY RECP_TIME ASC";
                    break;
                case "moretime":
                    sort = "ORDER BY RECP_TIME DESC";
                    break;
            }
        }

        // 페이지 및 더보기
        if (params.page === 0) {
            if (params.select === 1) {
                limit = 30;
                view = `LIMIT ${limit}`;
            } else {
                limit = 20;
                view = `LIMIT ${limit}`;
            }
        } else {
            if (params.select === 1) {
                limit = 30;
                sql = `LIMIT ${limit} OFFSET ?`;
            } else {
                limit = 20;
                sql = `LIMIT ${limit} OFFSET ?`;
            }
            state.push(offset);
        }

        let queryString = `
        SELECT 
        * 
        FROM 
        ${table} 
        ${search ? "WHERE " + search : ""} 
        ${time ? (search ? "AND " + time : "WHERE " + time) : ""} 
        ${region ? (search || time ? "AND " + region : "WHERE " + region) : ""} 
        ${category ? (search || time || region ? "AND " + category : "WHERE " + category) : ""} 
        ${difficult ? (search || time || region || category ? "AND " + difficult : "WHERE " + difficult) : ""} 
        ${sort ? sort : ""} 
        ${sort ? view : "ORDERS " + view}`;
        console.log(queryString);

        DB.query(queryString, state, (error, result) => {
            if (error) {
                console.log(error);
                res.json({
                    'RECP_CODE': "000",
                });
            } else {
                console.log(result);

                let recpDict = {};
                result.forEach(function (item) {
                    recpDict[item.RECP_CODE] = item;
                });

                res.json(recpDict);
            }
        });
    },
    getSelectRecipeProgress: async (req, res) => {
        console.log('/allRecipeProgress');

        let query = req.query;

        console.log("query : ", query);

        DB.query(`
        SELECT * FROM 
        RECIPE_BASIC 
        WHERE RECP_CODE = ?`,
            [query.recipe],
            (error, basic) => {
                if (error) {
                    console.log(error);
                    res.json({
                        'RECP_CODE': "000",
                    });
                } else {
                    // 기본정보

                    // 재료

                    console.log("basic", basic);

                    DB.query("SELECT * FROM RECIPE_INGREDIENT WHERE RECP_CODE = ?", [query.recipe], (error2, ingreList) => {

                        console.log("ingre", ingreList);
                        DB.query("SELECT * FROM RECIPE_PROGRESS  WHERE RECP_CODE = ?", [query.recipe], (error3, progressList) => {

                            console.log("progress", progressList);

                            let ingreArr = [];
                            ingreList.map((ingre) => {
                                ingreArr.push({
                                    RECP_INGRD_NAME: ingre.RECP_INGRD_NAME,
                                    RECP_INGRD_CODE: ingre.RECP_INGRD_CODE,
                                    RECP_INGRD_PORTIONS: ingre.RECP_INGRD_PORTIONS,
                                    RECP_INGRD_TYPE: ingre.RECP_INGRD_TYPE,
                                    RECP_INGRED_TYPE_NAME: ingre.RECP_INGRED_TYPE_NAME,
                                })
                            })

                            let progressObj = {};
                            progressList.map((progress) => {
                                progressObj[progress.RECP_ORDER_NO] = progress
                            })

                            let basicObj = {}
                            console.log(basic[0].RECP_CODE);

                            basicObj = basic[0];

                            basicObj["RECP_INGRD"] = ingreArr;
                            basicObj["RECP_PROGRESS"] = progressObj;

                            // console.log(result);
                            res.json(basicObj);
                        })
                    })
                }
            });
    },
}
module.exports = recipe;