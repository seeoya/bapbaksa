const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const os = require("os");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('/home/ubuntu/user/upload/profile_imgs/'));

app.get("/", (req, res) => {
    res.send("SERVICE SERVER 3001");
});

let origin_addr = ["http://54.253.228.81:3000", "http://52.62.249.221:3002"];
if (os.version().includes("Windows")) {
    origin_addr = [
        "http://localhost:3000",
        "http://localhost:3002",
        "https://oauth2.googleapis.com/token",
        "https://kauth.kakao.com/oauth/token",
    ];
}

app.use(
    cors({
        origin: origin_addr,
        credentials: true,
    })
);

// routes
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const marketRouter = require("./routes/marketRouter");
const fridgeRouter = require("./routes/fridgeRouter");
const mypageRouter = require("./routes/mypageRouter");
const commonRouter = require("./routes/commonRouter");

app.use("/auth", userRouter);
app.use("/oauth", userRouter);
app.use("/api/auth", userRouter);
app.use("/api/oauth", userRouter);
app.use("/api/user", userRouter);
app.use("/admin", adminRouter);
app.use("/market", marketRouter);
app.use("/fridge", fridgeRouter);
app.use("/mypage", mypageRouter);
app.use("/common", commonRouter);

// payment
const paymentRouter = require("./lib/payment/payments.router");
app.use("/sandbox-dev/api/v1/payments", paymentRouter);

app.listen(3001);
