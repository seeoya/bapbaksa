const express = require("express");
const {
    get_user,
    get_all_users,
    modify_user,
    delete_user,
} = require("../lib/service/adminService");

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

module.exports = router;
