const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const cors = require("cors");
const os = require("os");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let origin_addr = ['http://54.253.228.81:3000', 'http://3.105.139.117:3001'];
if (os.version().includes('Windows')) {
    origin_addr = ['http://localhost:3000', 'http://localhost:3001'];
}

app.use(cors({
    origin: origin_addr,
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("REST SERVER 3002");

});

app.get("/test", (req, res) => {
    res.json({"abc": "red"})
});

app.use('/product', require('./routes/productRouter'));
app.use('/refrigeator', require('./routes/refrigeratorRouter'));
app.use('/recipe', require('./routes/recipeRouter'));

app.listen(3002);
