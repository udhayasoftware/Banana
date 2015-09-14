var ControllerFactory = require("./ControllerFactory");

function BaseController() {
    this.execute = function (svcReqObj) {
        if (svcReqObj.isCRUD) {
            this.executeCRUD(svcReqObj);
        } else {
            this.executeAPI(svcReqObj);
        }
    }
    this.executeAPI = function (svcReqObj) {
        var controller = new ControllerFactory().getController(svcReqObj.controller);
        var action = controller[svcReqObj.request.params.Action];
        if (action != undefined) {
            action(svcReqObj);
        }else{
            throw {"result": "failed", "message": "Action Not Implemented"};
        }
    }
    this.executeCRUD = function (svcReqObj) {
        var controller = new ControllerFactory().getController(svcReqObj.controller);
        switch (svcReqObj.request.method) {
            case "GET":
                controller.getData(svcReqObj);
                break;
            case "POST":
                controller.postData(svcReqObj);
                break;
            case "PUT":
                controller.putData(svcReqObj);
                break;
            case "DELETE":
                controller.deleteData(svcReqObj);
                break;

        }
    }
}
module.exports = BaseController;