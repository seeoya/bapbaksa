const express = require("express");
const {
    get_user,
    get_all_users,
    modify_user,
    delete_user,
    get_question,
    get_all_question,
    answer_question,
    get_all_orders,
    get_order,
    insert_stock,
} = require("../lib/service/adminService");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("params", req.query);
});

router.get("/get_user", (req, res) => {
    console.log("get_all_question");
    get_user(req, res);
});

router
    .get("/stock", (req, res) => {
        console.log(req.params);
        insert_stock(req, res);
    })
    .post("/stock", (req, res) => {
        console.log(req.body);
        insert_stock(req, res);
    })
    .put("/stock", (req, res) => {
        console.log(req.body);
        insert_stock(req, res);
    })
    .delete("/stock", (req, res) => {
        console.log(req.body);
        insert_stock(req, res);
    });

router.get("/get_all_question", (req, res) => {
    console.log("get_all_question");
    get_all_question(req, res);
});

router.get("/get_question", (req, res) => {
    console.log("get_one_question");
    get_question(req, res);
});

router.put("/answer_question", (req, res) => {
    console.log("answer_question");
    answer_question(req, res);
});

router.get("/get_order", (req, res) => {
    console.log("params", req.query);

    if (req.query.o_id) {
        get_order(req, res);
    } else {
        get_all_orders(req, res);
    }
});

module.exports = router;
