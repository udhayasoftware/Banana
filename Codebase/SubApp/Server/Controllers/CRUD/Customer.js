var ParentController = require("./ParentController");
var CustomerAPI = require("../../MongoAPI/CustomerAPI");
var ResponseHandler = require("../../Handlers/ResponseHandler");

function Customer() {
    this.getData = function (svcReqObj) {
        var queryObj = {
            find: {id: svcReqObj.request.params.id},
            entity: svcReqObj.controller
        };
        new CustomerAPI().findData(queryObj, function (output) {
            new ResponseHandler().sendResponse(svcReqObj, output);
        })
    }
    this.postData = function (svcReqObj) {
        var queryObj = {
            body: svcReqObj.request.body,
            entity: svcReqObj.controller
        };
        new CustomerAPI().insertData(queryObj, function (output) {
            new ResponseHandler().sendResponse(svcReqObj, output);
        })
    }
}

Customer.prototype = new ParentController();

module.exports = Customer;