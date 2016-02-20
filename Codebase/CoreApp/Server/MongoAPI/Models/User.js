// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Connection = require("../Connection");
var Define = require("../../../Config/Define");

var UserSchema = {
    firstName: String,
    lastName: String,
    id: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
    location: String,
    meta: {
        age: Number,
        website: String
    }
};

function User() {
    this.getModel = function () {
        var db = Connection.getConnection(Define.modelDBURI, {});
        var schemaObj = new Schema(UserSchema);
        return db.model('User', schemaObj, 'User');
    }
}

// make this available to our users in our Node applications
module.exports = User;