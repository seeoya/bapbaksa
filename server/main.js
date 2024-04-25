const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const path = require("path");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("SERVICE SERVER 3001");
});

// routes
const userRouter = require("./routes/userRouter");
const marketRouter = require("./routes/marketRouter");

app.use("/user", userRouter);
app.use("/market", marketRouter);

app.listen(3001);
