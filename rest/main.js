const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("REST SERVER");
});

app.listen(3002);
