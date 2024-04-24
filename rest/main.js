const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("오타 수정");
    res.send("REST SERVER");
});

app.listen(3002);
