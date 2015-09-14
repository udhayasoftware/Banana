var connectionPool = {};
var mongoose = require("mongoose");
var define = require("../../Config/Define");

function getConnection(dbURL, options) {
    if (connectionPool[dbURL] == undefined) {
        connectionPool[dbURL] = mongoose.createConnection(dbURL, {server: {poolSize: define.connPoolSize}});
    }
    return connectionPool[dbURL];

}

exports.getConnection = getConnection;