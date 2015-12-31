/**
 * Created by 324401 on 8/28/2015.
 */

var ResponseHandler = require('../../Handlers/ResponseHandler');
var UserAPI = require("../../MongoAPI/UserAPI");

function Authentication() {

    this.login = function (svcReqObj) {
        var responseHandler = new ResponseHandler();

        var queryObj = {
            find: svcReqObj.request.body ? svcReqObj.request.body : {},
            entity: svcReqObj.controller
        };
        new UserAPI().findData(queryObj, function (output) {
            responseHandler.sendResponse(svcReqObj, output);
        })
    }

    this.logout = function (svcReqObj) {
        var responseHandler = new ResponseHandler();
        responseHandler.sendResponse(svcReqObj, {"result": "success", "message": "Get out idiot"});
    }
}

module.exports = Authentication;
