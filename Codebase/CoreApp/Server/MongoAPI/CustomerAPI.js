var CrudAPI = require("./CrudAPI");
var Customer = require("../MongoAPI/Models/Customer");
var ModelFactory = require("../MongoAPI/ModelFactory");

function CustomerAPI() {
    this.insertData = function (queryObj, callback) {
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.entity);
        var queryObj = new Model(queryObj.body);
        queryObj.save(function (err, data) {
            if (err)
                callback({"result": "failed", "error": err.errmsg});
            else
                callback({"result": "success", "message": "data saved"});
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
CustomerAPI.prototype = new CrudAPI();

module.exports = CustomerAPI;