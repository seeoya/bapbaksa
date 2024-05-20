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
    insert_stock,
<<<<<<< HEAD
    put_refund,
    put_reject,
=======
    monthChart,
    curCategoryChart,
    lastCategoryChart,
    getStock,
    insertStock,
    putStock,
>>>>>>> 4be6c950335a2060cc51a1b3e6e2c7966cb40c98
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

router.get("/get_refund_order", (req, res) => {
    console.log("params", req.query);

    if (req.query.o_no) {
        get_refund_order(req, res);
    } else {
        get_all_refund_orders(req, res);
    }
});

router.put("/put_refund", (req, res) => {
    console.log("params", req.body);

        put_refund(req, res);
});

router.put("/put_reject", (req, res) => {
    console.log("params", req.body);

        put_reject(req, res);
});


router.get("/monthChart", (req, res) => {
    console.log('monthChart');
    monthChart(req, res);
});

router.get("/curCategoryChart", (req, res) => {
    console.log('categoryChart');
    curCategoryChart(req, res);
});

router.get("/lastCategoryChart", (req, res) => {
    console.log('lastCategoryChart');
    lastCategoryChart(req, res);
});

module.exports = router;
