var express = require("express");
var rota = express.Router();

rota.get("/", (req, res) => {
    res.send("index");
});

module.exports = rota;