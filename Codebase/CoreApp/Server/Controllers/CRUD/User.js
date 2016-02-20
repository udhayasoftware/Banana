var ParentController = require("./ParentController");


var UserAPI = require("../../MongoAPI/UserAPI");
var ResponseHandler = require("../../Handlers/ResponseHandler");

function User() {
    this.getData = function (svcReqObj) {
        var queryObj = {
            find: svcReqObj.request.params.id ? {id: svcReqObj.request.params.id} : {},
            entity: svcReqObj.controller
        };
        new UserAPI().findData(queryObj, function (output) {
            new ResponseHandler().sendResponse(svcReqObj, output);
        })
    }
    this.postData = function (svcReqObj) {
        var queryObj = {
            body: svcReqObj.request.body,
            entity: svcReqObj.controller
        };
        new UserAPI().insertData(queryObj, function (output) {
            new ResponseHandler().sendResponse(svcReqObj, output);
        })
    }
    this.putData = function (svcReqObj) {
        if (svcReqObj.request.params.id) {
            var queryObj = {
                find: {id: svcReqObj.request.params.id},
                body: svcReqObj.request.body,
                entity: svcReqObj.controller
            };
            new UserAPI().updateData(queryObj, function (output) {
                new ResponseHandler().sendResponse(svcReqObj, output);
            })
        } else {
            new ResponseHandler().sendResponse(svcReqObj, {"result": "failed", "message": "Enter primary key"});
        }
    }
    this.deleteData = function (svcReqObj) {
        var queryObj = {
            find: svcReqObj.request.params.id ? {id: svcReqObj.request.params.id} : {},
            body: svcReqObj.request.body,
            entity: svcReqObj.controller
        };
        new UserAPI().removeData(queryObj, function (output) {
            new ResponseHandler().sendResponse(svcReqObj, output);
        })
    }
}

User.prototype = new ParentController();

module.exports = User;