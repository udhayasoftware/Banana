var Customer = require("./Models/Customer");

function ModelFactory() {
    this.getEntityModel = function (name) {
        switch (name) {
            case "Customer":
                return new Customer().getModel();
                break;
            case "User":
                return Customer;
                break;
        }
    }
}

module.exports = ModelFactory;