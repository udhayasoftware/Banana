var CrudAPI = require("./CrudAPI");
var Customer = require("../MongoAPI/Models/Customer");
var ModelFactory = require("../MongoAPI/ModelFactory");

function CustomerAPI() {
    this.insertData = function (queryObj, callback) {
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.entity);
        console.log(queryObj.body)
        var queryObj = new Model(queryObj.body);
        console.log("hahahaha")
        queryObj.save(function (err) {
            if (err)
                throw err;
            else
                callback({"result": "success", "msg": "data saved"});
        });
    }
}
CustomerAPI.prototype = new CrudAPI();

module.exports = CustomerAPI;