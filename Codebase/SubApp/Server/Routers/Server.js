var ContextRegistory = require("./ContextRegistory");

function Server(){
    this.startServer = function(app){
        ContextRegistory.contextRegistory(app, "Admin");
    }
}

module.exports = Server;