/**
 * Created by 324401 on 8/28/2015.
 */

var ResponseHandler = require('../../Handlers/ResponseHandler');
var fs = require('fs');
var mongoose = require('mongoose');
var formidable = require("formidable");

var Grid = mongoose.mongo.Grid;
var GridStore = mongoose.mongo.GridStore;

var Define = require("../../../Config/Define");
var Connection = require("../../MongoAPI/Connection");

function Multipart() {

    this.upload = function (svcReqObj) {
        var processCompleted = false;
        var responseObj = {"Files": []};
        var totalFiles = 0;
        var uploadedFiles = 0;
        var fields = svcReqObj.request.fields;
        var files = svcReqObj.request.files;
        var allFiles = Object.keys(files);
        totalFiles = allFiles.length;
        if (allFiles.length > 0) {
            var conn = Connection.getConnection(Define.fileDBURI, {})
            allFiles.forEach(function (key, index) {
                var file = files[key];
                var fileName = Date.now() + "-" + key + "-" + file.name;
                fileName = fileName.replace(/%20/g, "_");
                var gridStore = new GridStore(conn.db, fileName, 'w', {root: "FILE_COLLECTION"});
                gridStore.open(function (err, gridStore) {
                    if (!err) {
                        gridStore.writeFile(file.path, function (err, doc) {
                            if (!err) {
                                fs.unlink(file.path, function (err) {
                                    if (err) {
                                        console.log("Error Deleting Temporary file Uploaded");
                                    }
                                })
                                responseObj.Files.push({"FileID": fileName})
                                uploadedFiles = uploadedFiles + 1;
                                if ((totalFiles == uploadedFiles)) {
                                    new ResponseHandler().sendResponse(svcReqObj, responseObj);
                                }
                            }
                        });
                    }
                });
            })
        }

    }

    this.download = function (svcReqObj) {
        var fileId = svcReqObj.request.query["fileId"];
        var method = svcReqObj.request.query["method"];
        var conn = Connection.getConnection(Define.fileDBURI, {})
        var gridStore = new GridStore(conn.db, fileId, 'r', {root: "FILE_COLLECTION"});
        gridStore.open(function (err, gridStore) {
            if (!err) {
                if (method != "inline")
                    svcReqObj.response.setHeader('Content-disposition', 'attachment; filename=' + fileId);
                var readStream = gridStore.stream(true);
                readStream.pipe(svcReqObj.response);
            } else {
                new ResponseHandler().sendResponse(svcReqObj, {
                    "result": "failed",
                    "message": "Error Downloading file",
                    "error": err
                });
            }
        });
    }
}
module.exports = Multipart;
