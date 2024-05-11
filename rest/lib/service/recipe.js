const DB = require("../db/db");

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
        let region = "";
        let category = "";
        let difficult = "";
        let sort = "";
        let view = "";

        let limit = params.pagePerItem ?? 20;
        let offset = params.page ? params.page * limit : 0;

        let state = [];

        let table = "RECIPE_BASIC";

        // 선택한 항목이 모두 포함된 식재료
        if (params.food && params.foodinclu == 1) {
            table = `(SELECT BASIC.*, COUNT(FOOD.RECP_INGRD_CODE) AS ingredient_count 
            FROM RECIPE_BASIC BASIC
            JOIN RECIPE_INGREDIENT FOOD 
            ON BASIC.RECP_CODE = FOOD.RECP_CODE
            WHERE FOOD.RECP_INGRD_CODE IN (?)
            GROUP BY BASIC.RECP_CODE
            HAVING COUNT(DISTINCT FOOD.RECP_INGRD_CODE) = ?) FI`;
            state.push(params.food, params.food.length);
        }

        // 선택한 항목이 하나라도 포함된 식재료

        // #TODO -재작업-
        if (params.food && params.foodinclu == 0) {
            if (params.food.length > 1) {
                // 여러 조건을 OR로 연결
                table = `(SELECT BASIC.* `;
                table += `FROM RECIPE_BASIC BASIC JOIN RECIPE_INGREDIENT FOOD `;
                table += `ON BASIC.RECP_CODE = FOOD.RECP_CODE WHERE `;
                table += `${params.food
                    .map((_, i) => `FOOD.RECP_INGRD_CODE = ?`)
                    .join(" OR ")} GROUP BY BASIC.RECP_CODE) FI `;
                // table = `(SELECT * FROM (SELECT BASIC.* FROM
                //     RECIPE_BASIC BASIC
                //     JOIN RECIPE_INGREDIENT FOOD
                //     ON BASIC.RECP_CODE = FOOD.RECP_CODE ${params.food.map((_, i) => `FOOD.RECP_INGRD_CODE = ?`).join(" OR ")} GROUP BY BASIC.RECP_CODE) FI`;
                placeholders = params.food; // 모든 값을 매개변수로 사용
                state.push(...placeholders);
            } else {
                // 단일 조건
                table = `(SELECT BASIC.* `;
                table += `FROM RECIPE_BASIC BASIC JOIN RECIPE_INGREDIENT FOOD `;
                table += `ON BASIC.RECP_CODE = FOOD.RECP_CODE WHERE `;
                table += `FOOD.RECP_INGRD_CODE = ? GROUP BY BASIC.RECP_CODE) FI `;
                // table = `(SELECT * FROM (SELECT BASIC.*
                //     FROM RECIPE_BASIC BASIC
                //     JOIN RECIPE_INGREDIENT FOOD
                //     ON BASIC.RECP_CODE = FOOD.RECP_CODE WHERE BASIC.RECP_CODE = ? GROUP BY BASIC.RECP_CODE) FI`;
                placeholders = params.food[0];
                state.push(placeholders);
            }

            // 매개변수 추가
        }
        // #TODO -여기까지-

        // 레시피 검색
        if (params.search) {
            search = `RECP_NAME LIKE ? `;
            state.push("%" + params.search + "%");
        }

        // 지역 음식 분류
        if (params.region) {
            if (params.region.length > 1) {
                // 여러 조건을 OR로 연결
                region = `(${params.region.map((_, i) => `RECP_REGION_CODE = ?`).join(" OR ")})`;
                console.log("region : ", region);
                placeholders = params.region; // 모든 값을 매개변수로 사용
                state.push(...placeholders);
            } else {
                // 단일 조건
                region = `(RECP_REGION_CODE = ?)`;
                placeholders = params.region[0];
                state.push(placeholders);
            }

            // 매개변수 추가
        }

        // 요리 종류 분류
        if (params.category) {
            if (params.category.length > 1) {
                // 여러 조건을 OR로 연결
                category = `(${params.category
                    .map((_, i) => `RECP_CATEGORY_CODE = ?`)
                    .join(" OR ")})`;
                placeholders = params.category; // 모든 값을 매개변수로 사용
                state.push(...placeholders);
            } else {
                // 단일 조건
                category = `(RECP_CATEGORY_CODE = ?)`;
                placeholders = params.category[0];
                state.push(placeholders);
            }
        }

        // 난이도 분류
        if (params.difficult) {
            if (params.difficult.length > 1) {
                // 여러 조건을 OR로 연결
                difficult = `(${params.difficult
                    .map((_, i) => `RECP_DIFFICULT = ?`)
                    .join(" OR ")})`;
                placeholders = params.difficult; // 모든 값을 매개변수로 사용
                state.push(...placeholders);
            } else {
                // 단일 조건
                difficult = `(RECP_DIFFICULT = ?)`;
                placeholders = params.difficult[0];
                state.push(placeholders);
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
            view = `LIMIT ${limit} OFFSET 0`;
        } else {
            view = `LIMIT ${limit} OFFSET ?`;
            state.push(offset);
        }

        let queryString = `SELECT * FROM ${table} `;
        queryString += `${search ? "WHERE " + search : ""} `;
        queryString += `${region ? (search ? "AND " + region : "WHERE " + region) : ""} `;
        queryString += `${
            category ? (search || region ? "AND " + category : "WHERE " + category) : ""
        } `;
        queryString += `${
            difficult
                ? search || region || category
                    ? "AND " + difficult
                    : "WHERE " + difficult
                : ""
        } `;
        queryString += `${sort ? sort : ""} `;
        // sort가 들어가게 되면 ORDER BY제거, sort가 없으면 ORDER BY 추가 (FI 추가)
        queryString += `${
            sort ? view : "ORDER BY " + params.food ? "FI." : "" + "RECP_CODE " + view
        }`;
        console.log("queryString : ", queryString);
        console.log("state : ", state);

        DB.query(queryString, state, (error, result) => {
            if (error) {
                console.log(error);
                res.json({
                    RECP_CODE: "000",
                });
            } else {
                console.log(result);

                let countQuery = `SELECT COUNT(DISTINCT RECP_CODE) FROM ${table} `;
                countQuery += `${search ? "WHERE " + search : ""} `;
                countQuery += `${region ? (search ? "AND " + region : "WHERE " + region) : ""} `;
                countQuery += `${
                    category ? (search || region ? "AND " + category : "WHERE " + category) : ""
                } `;
                countQuery += `${
                    difficult
                        ? search || region || category
                            ? "AND " + difficult
                            : "WHERE " + difficult
                        : ""
                } `;

                DB.query(countQuery, state, (error2, recipeCount) => {
                    let recpDict = {};
                    let sortNo = [];
                    result.forEach(function (item) {
                        recpDict[item.RECP_CODE] = item;
                        sortNo.push(item.RECP_CODE);
                    });
                    recpDict.count = recipeCount[0]["COUNT(DISTINCT RECP_CODE)"];
                    recpDict.sortNo = sortNo;
                    console.log("==========================> ", recpDict);
                    res.json(recpDict);
                });
            }
        });
    },

    getSelectRecipeProgress: async (req, res) => {
        console.log("/allRecipeProgress");

        let query = req.query;

        console.log("query : ", query);

        DB.query(
            `
        SELECT * FROM 
        RECIPE_BASIC 
        WHERE RECP_CODE = ?`,
            [query.recipe],
            (error, basic) => {
                if (error) {
                    console.log(error);
                    res.json({
                        RECP_CODE: "000",
                    });
                } else {
                    // 기본정보

                    // 재료

                    console.log("basic", basic);

                    DB.query(
                        "SELECT * FROM RECIPE_INGREDIENT WHERE RECP_CODE = ?",
                        [query.recipe],
                        (error2, ingreList) => {
                            console.log("ingre", ingreList);
                            DB.query(
                                "SELECT * FROM RECIPE_PROGRESS  WHERE RECP_CODE = ?",
                                [query.recipe],
                                (error3, progressList) => {
                                    console.log("progress", progressList);

                                    let ingreArr = [];
                                    ingreList.map((ingre) => {
                                        ingreArr.push({
                                            RECP_INGRD_NAME: ingre.RECP_INGRD_NAME,
                                            RECP_INGRD_CODE: ingre.RECP_INGRD_CODE,
                                            RECP_INGRD_PORTIONS: ingre.RECP_INGRD_PORTIONS,
                                            RECP_INGRD_TYPE: ingre.RECP_INGRD_TYPE,
                                            RECP_INGRED_TYPE_NAME: ingre.RECP_INGRED_TYPE_NAME,
                                        });
                                    });

                                    let progressObj = {};
                                    progressList.map((progress) => {
                                        progressObj[progress.RECP_ORDER_NO] = progress;
                                    });

                                    let basicObj = {};
                                    console.log(basic[0].RECP_CODE);

                                    basicObj = basic[0];

                                    basicObj["RECP_INGRD"] = ingreArr;
                                    basicObj["RECP_PROGRESS"] = progressObj;

                                    // console.log(result);
                                    res.json(basicObj);
                                }
                            );
                        }
                    );
                }
            }
        );
    },

    getCategoryList: (req, res) => {
        DB.query(`SELECT * FROM RECIPE_CATEGORY`, (error, result) => {
            if (error) {
                console.log(error);
                res.json();
            } else {
                res.json(result);
            }
        });
    },
    getRegionList: (req, res) => {
        DB.query(`SELECT * FROM RECIPE_REGION`, (error, result) => {
            if (error) {
                console.log(error);
                res.json();
            } else {
                res.json(result);
            }
        });
    },
    getRandomRecipe: (req, res) => {
        DB.query(`SELECT * FROM RECIPE_BASIC ORDER BY RAND() LIMIT 5`, 
        (error, random) => {
            if (error) {
                console.log(error);
                res.json(null);
            } else {
                res.json(random);
            }
        });
    }
};
module.exports = recipe;
