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
    get_all_refund_orders,
    get_refund_order,
    put_refund,
    put_reject,
    monthChart,
    curCategoryChart,
    lastCategoryChart,
    getStock,
    insertStock,
    putStock,
} = require("../lib/service/adminService");

const router = express.Router();

router.get("/", (req, res) => {});

router
    .get("/user", (req, res) => {
        if (req.query.u_no) {
            get_user(req, res);
        } else {
            get_all_users(req, res);
        }
    })
    .put("/user", (req, res) => {
        modify_user(req, res);
    })
    .delete("/user", (req, res) => {
        delete_user(req, res);
    });

router
    .get("/stock", (req, res) => {
        getStock(req, res);
    })
    .post("/stock", (req, res) => {
        insertStock(req, res);
    })
    .put("/stock", (req, res) => {
        putStock(req, res);
    });

router.get("/get_all_question", (req, res) => {
    get_all_question(req, res);
});

router.get("/get_question", (req, res) => {
    get_question(req, res);
});

router.put("/answer_question", (req, res) => {
    answer_question(req, res);
});

router.get("/get_order", (req, res) => {
    if (req.query.o_id) {
        get_order(req, res);
    } else {
        get_all_orders(req, res);
    }
});

router.get("/get_refund_order", (req, res) => {
    if (req.query.o_no) {
        get_refund_order(req, res);
    } else {
        get_all_refund_orders(req, res);
    }
});

router.put("/put_refund", (req, res) => {
    put_refund(req, res);
});

router.put("/put_reject", (req, res) => {
    put_reject(req, res);
});

router.get("/monthChart", (req, res) => {
    monthChart(req, res);
});

router.get("/curCategoryChart", (req, res) => {
    curCategoryChart(req, res);
});

router.get("/lastCategoryChart", (req, res) => {
    lastCategoryChart(req, res);
});

module.exports = router;
