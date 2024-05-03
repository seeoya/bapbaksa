const DB = require('../db/db');

const recipe = {
    getAllBasicRecipe: (req, res) => {
        console.log('/allBasicRecipe');
        DB.query(`SELECT * FROM RECIPE_BASIC`,
            (error, result) => {
                console.log('1234567');
                if (error) {
                    console.log(error);
                    res.json({
                        'RF_NO': "000",
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
    getAllRecipeIngredient: (req, res) => {
        console.log('/allRecipeIngredient');
        DB.query(`SELECT * FROM RECIPE_INGREDIENT`,
            (error, result) => {
                console.log('1234567');
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
    getAllRecipeProgress: (req, res) => {
        console.log('/allRecipeProgress');
        DB.query(`SELECT * FROM RECIPE_PROGRESS`,
            (error, result) => {
                console.log('1234567');
                if (error) {
                    console.log(error);
                    res.json({
                        'RECP_CODE': "000",
                    });
                } else {
                    console.log(result);

                    const recipeDict = {};

                    result.forEach(step => {
                        console.log(step);
                        const recpCode = step["RECP_CODE"];
                        //351 


                        if (!recipeDict[recpCode]) {
                            recipeDict[recpCode] = {};
                        }

                        recipeDict[recpCode][step.RECP_ORDER_NO] = step;
                    });

                    console.log(recipeDict);

                    res.json(recipeDict);
                    // res.json();
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
    view: (req, res) => {
        console.log('/view');
        let query = req.query;
        DB.query(`SELECT * FROM RECIPE_BASIC ORDER BY RECP_CODE BY ASC LIMIT 20 OFFSET (? - 1) * 20`,
            [query.no],
            (error, result) => {
                console.log('1234567');
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
        let filter = ""
        let state = [];

        let table = "RECIPE_BASIC";

        if (params.search) {
            search = `RECP_NAME LIKE '%?%'`;
            state.push(params.search);
        }

        if (params.food) {
            table = `(SELECT BASIC.*, COUNT(FOOD.RECP_INGRD_CODE) AS ingredient_count 
            FROM RECIPE_BASIC BASIC
            JOIN RECIPE_INGREDIENT FOOD 
            ON BASIC.RECP_CODE = FOOD.RECP_CODE
            WHERE FOOD.RECP_INGRD_CODE IN (?)
            GROUP BY BASIC.RECP_CODE
            HAVING ingredient_count = ?)`;
            state.push(params.food, params.food.length);
        }

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

        if (params.filter) {
            switch (params.filter) {
                case "한식":
                    filter = "WHERE RECP_REGION_CODE = 3020001";
                    break;
                case "서양":
                    filter = "WHERE RECP_REGION_CODE = 3020002";
                    break;
                case "일본":
                    filter = "WHERE RECP_REGION_CODE = 3010003";
                    break;
                case "중식":
                    filter = "WHERE RECP_REGION_CODE = 3010004";
                    break;
                case "동남아시아":
                    filter = "WHERE RECP_REGION_CODE = 3010005";
                    break;
                case "이탈리아":
                    filter = "WHERE RECP_REGION_CODE = 3010006";
                    break;
                case "퓨전":
                    filter = "WHERE RECP_REGION_CODE = 3010009";
                    break;
            }
        }

        let queryString = `SELECT * FROM ${table} ${search ? "WHERE " + search : ""} ${sort}`;
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
    loadView: (req, res) => {
        console.log("loadView");
        let params = req.query;
        DB.query(`SELECT * FROM RECIPE_BASIC`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.json({
                        'RECP_CODE': "000",
                    });
                } else {
                    // if (params.)
                }
            })
    }
}
module.exports = recipe;