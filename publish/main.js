const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("PUBLISH SERVER 3003");
});

app.listen(3003);
