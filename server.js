
var http = require("http");
var express = require("express");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});