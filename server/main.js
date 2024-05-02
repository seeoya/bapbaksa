const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const path = require("path");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const bcrypt = require("bcrypt");
const cors = require("cors");
const os = require("os");
const axios = require("axios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

let origin_addr = ['http://54.253.228.81:3000', 'http://52.62.249.221:3002'];
if (os.version().includes('Windows')) {
    origin_addr = ['http://localhost:3000', 'http://localhost:3002'];
}

app.use(cors({
    origin: origin_addr,
    credentials: true,
}));

app.get('/send-request', async (req, res) => {
    try {
        // 3002 서버에 HTTP GET 요청 보내기
        let response = await axios.get('http://localhost:3002/test');
        console.log(response);
        res.json(response.data);  // 응답 데이터 반환
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ error: 'Request failed' });
    }
});

app.get("/", (req, res) => {
    res.send("SERVICE SERVER 3001");
});

// routes
const userRouter = require("./routes/userRouter");
const marketRouter = require("./routes/marketRouter");

app.use("/user", userRouter);
app.use("/market", marketRouter);

app.listen(3001);
