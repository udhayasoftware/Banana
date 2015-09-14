function ParentController() {
    this.getData = function (info) {
        throw {"result": "failed", "message": "Method Not Implemented"};
    }
    this.postData = function (info) {
        throw {"result": "failed", "message": "Method Not Implemented"};
    }
    this.putData = function (info) {
        throw {"result": "failed", "message": "Method Not Implemented"};
    }
    this.deleteData = function (info) {
        throw {"result": "failed", "message": "Method Not Implemented"};
    }
}

module.exports = ParentController;