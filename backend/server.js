var express = require('express');
var bodyparser = require('body-parser');
var cors =require("cors");
var User =require("./api/userModel");
var router = require('./api/routes');

var app = express();
app.use(bodyparser.urlencoded({extended: true})); //support x-www-form-urlencoded
app.use(bodyparser.json());
app.use(cors({origin:'*'}));
app.use('/',router);
User.createTable();

var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});

module.exports = app;