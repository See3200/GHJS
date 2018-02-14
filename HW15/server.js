let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

let server = express();

server.use(express.static('dist'));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

let quant = 0;

let logger = function(req, res, next) {
    console.log(req.body);
    console.log(req.query.value);
    quant = req.method === "POST" ? req.body.value.length : req.query.value.length;
    next();
};

server.post("/", logger, function(req, res) {
    quant < 5 ? res.send("Error! Insufficient quantity of symbols!") : res.send("Post request");
});

server.get("/get", logger, function(req, res) {
    quant < 2 ? res.send("Error! Insufficient quantity of symbols!") : res.send("Get request");
});

server.listen(8010);