const express = require("express");
<<<<<<< HEAD
const {
    get_user,
    get_all_users,
    modify_user,
    delete_user,
    get_question,
    get_all_question,
    answer_question,
} = require("../lib/service/adminService");
=======
const { get_user, get_all_users, modify_user, get_all_orders, get_order } = require("../lib/service/adminService");
>>>>>>> ad

const router = express.Router();

router.get("/", (req, res) => {
    console.log("params", req.query);
});

router
    .get("/user", (req, res) => {
        if (req.query.u_no) {
            get_user(req, res);
        } else {
            get_all_users(req, res);
        }
    })
    .put("/user", (req, res) => {
        console.log("modify");
        modify_user(req, res);
    })
    .delete("/user", (req, res) => {
        console.log("delete", req.body);
        delete_user(req, res);
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
