var ModelFactory = require("../MongoAPI/ModelFactory");
var mongoose = require("mongoose");

function ParentAPI() {
    this.findData = function (queryObj, callback) {
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.entity);
        if (JSON.stringify(queryObj.find) == "{}") {
            var query = Model.find(queryObj.find);
        } else {
            var query = Model.findOne(queryObj.find);
        }
        query.select("-_id -__v");
        query.exec(function (err, data) {
            if (err)
                callback({"result": "failed", "error": err});
            else if (data == null)
                callback({"result": "failed", "message": "Not Found"});
            else
                callback({"result": "success", "data": data});
        });

    }
    this.insertData = function (queryObj, callback) {
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.entity);
        var query = new Model(queryObj.body);
        query.save(function (err) {
            if (err)
                callback({"result": "failed", "error": err});
            else
                callback({"result": "success", "message": "data saved"});
        });
    }
    this.updateData = function (queryObj, callback) {
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.entity);
        var query = Model.update(queryObj.find, {$set: queryObj.body}, {});
        query.exec(function (err, data) {
            if (err)
                callback({"result": "failed", "error": err});
            else if (data.n == 0)
                callback({"result": "failed", "message": "Not Found"});
            else if (data.nModified == 1)
                callback({"result": "success", "message": "Record Updated"});
            else if (data.n == 1 && data.nModified == 0)
                callback({"result": "success", "message": "Already Updated"});
            else
                callback({"result": "unknown", "message": data});
        });
    }
    this.removeData = function (queryObj, callback) {
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.entity);
        var query = Model.remove(queryObj.find);
        query.exec(function (err, data) {
            if (err)
                callback({"result": "failed", "error": err});
            else if (data.result.n == 1 && data.result.ok == 1)
                callback({"result": "success", "message": "Record Removed"});
            else if (data.result.n == 0 && data.result.ok == 1)
                callback({"result": "success", "message": "Not Found"});
            else
                callback({"result": "unknown", "message": data});
        });
    }
}

module.exports = ParentAPI;