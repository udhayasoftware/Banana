var ModelFactory = require("./ModelFactory");
function MongoManager() {
    this.execute = function (queryObj, callback) {
        var api = new ModelFactory(queryObj);
    };
}

module.exports = MongoManager;