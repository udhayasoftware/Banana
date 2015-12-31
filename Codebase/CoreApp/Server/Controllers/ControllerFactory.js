var Authentication = require("./API/Authentication");
var Multipart = require("./API/Multipart");
var Customer = require("./CRUD/Customer");
var User = require("./CRUD/User");


function ControllerFactory() {
    this.getController = function (controller) {
        switch (controller) {
            case "Authentication":
                return new Authentication();
                break;
            case "Multipart":
                return new Multipart();
                break;
            case "Customer":
                return new Customer();
                break;
            case "User":
                return new User();
                break;
            default :
                throw {"result": "failed", "message": "Method not found"};
        }
    }
}

module.exports = ControllerFactory;