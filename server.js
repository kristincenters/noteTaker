//dependencies 
var http = require("http");
var express = require("express");
var fs = require("fs");
//set up express app
var app = express();
var PORT = process.env.PORT || 3000;
//serve static files
app.use(express.static('public'));
//method to parse incoming requests with JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);
//start server
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
