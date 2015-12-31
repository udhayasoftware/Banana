var ContextRegistory = require("./ContextRegistory");

var Connection = require("../MongoAPI/Connection");
var Define = require("../../Config/Define");

function Server() {
    this.startServer = function (app) {
        ContextRegistory.contextRegistory(app, "Admin");

        //Opening Single DB connection
        Connection.getConnection(Define.modelDBURI).once("open", function (err) {
            console.log("DB Connection Opened for :" + this.name);
        });
        Connection.getConnection(Define.fileDBURI).once("open", function () {
            console.log("DB Connection Opened for :" + this.name);
        });
    }
}

module.exports = Server;