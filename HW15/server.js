let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

let server = express();

server.use(express.static('dist'));

server.use(bodyParser.urlencoded({extended: true}));

let quant = 0;

let logger = function(req, res, next) {
    quant = req.method === "POST" ? req.body.name2.length : req.query.name1.length;
    next();
};

server.post("/", logger, function(req, res) {
    quant < 5 ? res.send("Error! Insufficient quantity of symbols!") : res.send("Post request");
});

server.get("/", logger, function(req, res) {
    quant < 2 ? res.send("Error! Insufficient quantity of symbols!") : res.send("Get request");
});

server.listen(8010);