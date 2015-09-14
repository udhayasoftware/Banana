var Authentication = require("./API/Authentication");
var Customer = require("./CRUD/Customer");


function ControllerFactory() {
    this.getController = function (controller) {
        switch (controller) {
            case "Authentication":
                return new Authentication();
                break;
            case "Customer":
                return new Customer();
                break;
            default :
                throw {"result": "failed", "message": "Method not found"};
        }
    }
}

module.exports = ControllerFactory;