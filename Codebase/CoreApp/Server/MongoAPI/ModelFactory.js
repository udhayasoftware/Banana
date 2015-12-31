var Customer = require("./Models/Customer");
var User = require("./Models/User");

function ModelFactory() {
    this.getEntityModel = function (name) {
        switch (name) {
            case "Customer":
                return new Customer().getModel();
                break;
            case "User":
                return new User().getModel();
                break;
            case "Authentication":
                return new User().getModel();
                break;
            default :
                break;
        }
    }
}

module.exports = ModelFactory;