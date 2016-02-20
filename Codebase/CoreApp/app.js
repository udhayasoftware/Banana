var express = require('express');

var app = express(); // the main app
var admin = express(); // the sub app
var another = express();

var Server = require("./Server/Routers/Server");
var Config = require("./Config/Config.json");

app.use('/Banana', admin); // mount the sub app
app.use("/", express.static(__dirname + "/Static"));

app.locals.appName = Config.AppName;

new Server().startServer(app);

var port = process.env.PORT || 3300;
app.listen(3300, function () {
    console.log("express has started on port 3300");
});