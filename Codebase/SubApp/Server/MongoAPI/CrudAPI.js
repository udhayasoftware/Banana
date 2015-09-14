var ModelFactory = require("../MongoAPI/ModelFactory");
var mongoose = require("mongoose");

function ParentAPI() {
    this.findData = function (queryObj, callback) {
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.entity);
        var query = Model.find(queryObj.find ? queryObj.find : {});
        query.exec(function (err, data) {
            if (err)
                throw err;
            else
                callback({"result": "success", "data": data});
        });

    }
    this.insertData = function (queryObj, callback) {
        console.log("comgin............CRUD-."+queryObj.entity);
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.entity);
        var query = new Model(queryObj.data);
        query.save(function (err) {
            if (err)
                throw err;
            else
                callback({"result": "success", "msg": "data saved"});
        });
    }
    this.updateData = function (queryObj, callback) {
        if (typeof(queryObj) == 'function') {
            callback = queryObj;
        }
        var Model = new ModelFactory().getEntityModel(queryObj.Entity);
        Model.find(queryObj.find, function (err, user) {
            if (err) throw err;
            user = MergeRecursive(user, queryObj.data);
            user.save(function (err) {
                if (err) throw err;
                console.log('User successfully updated!');
            });
        });
    }
    this.deleteData = function (queryObj, callback) {
        console.log("default deleteData")
    }

    function MergeRecursive(obj1, obj2) {
        for (var p in obj2) {
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = MergeRecursive(obj1[p], obj2[p]);

                } else {
                    obj1[p] = obj2[p];
                }

            } catch (e) {
                obj1[p] = obj2[p];

            }
        }
        return obj1;
    }
}

module.exports = ParentAPI;