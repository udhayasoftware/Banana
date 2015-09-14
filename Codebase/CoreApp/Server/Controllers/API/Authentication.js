/**
 * Created by 324401 on 8/28/2015.
 */

var ResponseHandler = require('../../Handlers/ResponseHandler');

function Authentication() {

    this.login = function (svcReqObj) {
        var responseHandler = new ResponseHandler();
        var user = svcReqObj.request.query["user"];
        var pass = svcReqObj.request.query["pass"];
        if (user == "udhay" && pass == "super") {
            responseHandler.sendResponse(svcReqObj, {"result": "success", "message": "login success"});
        } else {
            responseHandler.sendResponse(svcReqObj, {"result": "failed", "message": "Invalid credentials"});
        }
    }

    this.logout = function (svcReqObj) {
        var responseHandler = new ResponseHandler();
        responseHandler.sendResponse(svcReqObj, {"result": "success", "message": "Get out idiot"});
    }
}

module.exports = Authentication;
