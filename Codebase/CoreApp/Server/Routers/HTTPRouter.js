var BaseController = require("../Controllers/BaseController");
var ServiceRequest = require("../Routers/ServiceRequest");
var ResponseHandler = require("../Handlers/ResponseHandler");

var formidable = require("formidable");

function HTTPRouter(appObj, vendor) {

    // to register GET router
    this.registerCRUD = function (contextPath) {
        this.registerGet(contextPath, true);
        this.registerGet(contextPath + "/:id", true);
        this.registerPost(contextPath, true);
        this.registerPut(contextPath + "/:id", true);
        this.registerDelete(contextPath + "/:id", true);
    };

    // to register GET router
    this.registerGet = function (contextPath, isCRUD) {
        isCRUD = isCRUD || false;
        appObj.get(contextPath, function (req, res, next) {
            var svcReqObj = new ServiceRequest(req, res, isCRUD);
            try {
                new BaseController().execute(svcReqObj);
            } catch (message) {
                new ResponseHandler().sendResponse(svcReqObj, message)
            }
        });
    };

    // to register POST router
    this.registerPost = function (contextPath, isCRUD) {
        isCRUD = isCRUD || false;
        appObj.post(contextPath, function (req, res, next) {
            var svcReqObj = new ServiceRequest(req, res, isCRUD);
            var form = new formidable.IncomingForm();
            //form.uploadDir = __dirname + "/uploadTemp";
            form.keepExtensions = true;
            form.parse(svcReqObj.request, function (err, fields, files) {
                if (!err) {
                    svcReqObj.request.body = fields;
                    svcReqObj.request.files = files;
                    try {
                        new BaseController().execute(svcReqObj);
                    } catch (message) {
                        new ResponseHandler().sendResponse(svcReqObj, message)
                    }
                } else {
                    if (req.headers["content-type"] != undefined && req.headers["content-type"].indexOf("multipart/form-data") == -1) {
                        var postData = new Buffer('');
                        req.on('data', function (chunk) {
                            postData = Buffer.concat([postData, chunk]);
                        });
                        req.on('end', function () {

                            try {
                                req.body = JSON.parse(postData.toString());
                            } catch (e) {
                                new ResponseHandler().sendResponse(svcReqObj, {
                                    "result": "failed",
                                    "message": "PostData is not valid JSON" + postData
                                })
                            }

                            try {
                                new BaseController().execute(svcReqObj);
                            } catch (message) {
                                new ResponseHandler().sendResponse(svcReqObj, message)
                            }
                        });
                    } else {
                        new ResponseHandler().sendResponse(svcReqObj, {
                            "result": "failed",
                            "message": "Request " + err
                        })
                    }
                }
            });
            form.on('progress', function (bytesReceived, bytesExpected) {
                var percent_complete = (bytesReceived / bytesExpected) * 100;
                // console.log(percent_complete.toFixed(2));
            });
            form.on('error', function (err) {
                new ResponseHandler().sendResponse(svcReqObj, {
                    "result": "failed",
                    "message": "Invalid Form",
                    "error": err
                });
            });
        });
    };

    // to register PUT router
    this.registerPut = function (contextPath, isCRUD) {
        isCRUD = isCRUD || false;
        appObj.put(contextPath, function (req, res, next) {
            var postData = new Buffer('');
            req.on('data', function (chunk) {
                postData = Buffer.concat([postData, chunk]);
            });
            req.on('end', function () {
                var svcReqObj = new ServiceRequest(req, res, isCRUD);
                try {
                    req.body = JSON.parse(postData);
                    try {
                        new BaseController().execute(svcReqObj);
                    } catch (message) {
                        new ResponseHandler().sendResponse(svcReqObj, message)
                    }
                } catch (e) {
                    new ResponseHandler().sendResponse(svcReqObj, {
                        "result": "failed",
                        "message": "PostData is not valid JSON"
                    })
                }
            });
        });
    };

    // to register Delete router
    this.registerDelete = function (contextPath, isCRUD) {
        isCRUD = isCRUD || false;
        appObj.delete(contextPath, function (req, res, next) {
            var svcReqObj = new ServiceRequest(req, res, isCRUD);
            try {
                new BaseController().execute(svcReqObj);
            } catch (message) {
                new ResponseHandler().sendResponse(svcReqObj, message)
            }
        });
    };

    // to register Options router
    this.registerOption = function (contextPath) {
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

