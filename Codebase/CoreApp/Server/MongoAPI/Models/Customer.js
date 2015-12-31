// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Connection = require("../Connection");
var Define = require("../../../Config/Define");

var CustomerSchema = {
    name: String,
    id: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    }
};

function Customer() {
    this.getModel = function () {
        var db = Connection.getConnection(Define.modelDBURI, {});
        var schemaObj = new Schema(CustomerSchema);
        return db.model('Customer', schemaObj, 'Customer');
    }
}

// make this available to our users in our Node applications
module.exports = Customer;