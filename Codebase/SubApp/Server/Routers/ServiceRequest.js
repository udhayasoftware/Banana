function ServiceRequest(request, response, controller, isCRUD) {
    this.request = request;
    this.response = response;
    this.controller = controller;
    this.isCRUD = isCRUD;
}

module.exports = ServiceRequest;