var CrudAPI = require("./CrudAPI");
var User = require("../MongoAPI/Models/User");
var ModelFactory = require("../MongoAPI/ModelFactory");

var mongoose = require("mongoose");
ObjectId = mongoose.Types.ObjectId;

function UserAPI() {
    this.insertData = function (queryObj, callback) {
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.entity);
        queryObj.body.id = (new ObjectId).toString();
        var dbQueryObj = new Model(queryObj.body);
        dbQueryObj.save(function (err, data) {
            if (err)
                callback({"result": "failed", "error": err.errmsg});
            else
                callback({"result": "success", "message": "data saved", "id": data.id});
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
UserAPI.prototype = new CrudAPI();

module.exports = UserAPI;