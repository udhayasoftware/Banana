var BaseController = require("../Controllers/BaseController");
var ServiceRequest = require("../Routers/ServiceRequest");
var ResponseHandler = require("../Handlers/ResponseHandler");

function HTTPRouter(appObj, vendor) {

    // to register GET router
    this.registerCRUD = function (contextPath, controller) {
        this.registerGet(contextPath, controller, true);
        this.registerGet(contextPath + "/:id", controller, true);
        this.registerPost(contextPath, controller, true);
        this.registerPut(contextPath + "/:id", controller, true);
        this.registerDelete(contextPath, controller, true);
    };

    // to register GET router
    this.registerGet = function (contextPath, controller, isCRUD) {
        isCRUD = isCRUD || false;
        appObj.get(contextPath, function (req, res, next) {
            var svcReqObj = new ServiceRequest(req, res, controller, isCRUD);
            try {
                new BaseController().execute(svcReqObj);
            } catch (message) {
                new ResponseHandler().sendResponse(svcReqObj, message)
            }
        });
    };

    // to register POST router
    this.registerPost = function (contextPath, controller, isCRUD) {
        isCRUD = isCRUD || false;
        appObj.post(contextPath, function (req, res, next) {
            var postData = "";
            req.on('data', function (data) {
                postData = postData + data;
            });
            req.on('end', function () {
                req.body = JSON.parse(postData);
                var svcReqObj = new ServiceRequest(req, res, controller, isCRUD);
                try {
                    new BaseController().execute(svcReqObj);
                } catch (message) {
                    new ResponseHandler().sendResponse(svcReqObj, message)
                }
            })

        });
    };

    // to register PUT router
    this.registerPut = function (contextPath, controller, isCRUD) {
        isCRUD = isCRUD || false;
        appObj.put(contextPath, function (req, res, next) {
            var postData = "";
            req.on('data', function (data) {
                postData = postData + data;
            });
            req.on('end', function () {
                req.body = JSON.parse(postData);
                var svcReqObj = new ServiceRequest(req, res, controller, isCRUD);
                try {
                    new BaseController().execute(svcReqObj);
                } catch (message) {
                    new ResponseHandler().sendResponse(svcReqObj, message)
                }
            });
        });
    };

    // to register Delete router
    this.registerDelete = function (contextPath, controller, isCRUD) {
        isCRUD = isCRUD || false;
        appObj.delete(contextPath, function (req, res, next) {
            var svcReqObj = new ServiceRequest(req, res, controller, isCRUD);
            try {
                new BaseController().execute(svcReqObj);
            } catch (message) {
                new ResponseHandler().sendResponse(svcReqObj, message)
            }
        });
    };

    // to register Options router
    this.registerOption = function (contextPath, controller) {
        appObj.options(contextPath, function (req, res, next) {
            res.setHeader("Status-Code", 200);
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override,Content-Type, Accept ,appid, companyid, controller, token, client, userid");
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
            res.end();
        });
    }
};

module.exports = HTTPRouter;

