function ResponseHandler() {
    this.sendResponse = function (svcReqObj, responseObj) {
        svcReqObj.response.setHeader("Content-Type", "application/json")
        svcReqObj.response.end(JSON.stringify(responseObj));
    }
}
module.exports = ResponseHandler;