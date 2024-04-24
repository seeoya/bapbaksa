const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("REST SERVER 3002");
});

app.listen(3002);
