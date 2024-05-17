const express = require("express");
const { get_user, get_all_users, modify_user, get_question, get_all_question, answer_question } = require("../lib/service/adminService");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("params", req.query);
});

router.get("/get_user", (req, res) => {
    console.log("params", req.query);

    if (req.query.u_no) {
        get_user(req, res);
    } else {
        get_all_users(req, res);
    }
});

router.put("/user", (req, res) => {
    console.log("111param", req.body);
    modify_user(req, res);
});

router.get("/get_all_question", (req, res) => {
    console.log('get_all_question');
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

module.exports = router;
