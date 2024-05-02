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

const origin_addr = 'http://52.62.249.221:3000';
if (os.version().includes('Windows')) {
    origin_addr = 'http://localhost:3000';
} 
app.use(cors({
    origin: origin_addr,
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("REST SERVER 3002");
});

// app.get("/test", (req, res) => {
//     res.json({"abc": "red"})
// });

// app.use('/product', require('./routes/productRouter'));
// app.use('/refrigeator', require('./routes/refrigeratorRouter'));
// app.use('/recipe', require('./routes/recipeRouter'));

app.listen(3002);
