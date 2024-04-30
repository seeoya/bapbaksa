const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

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
