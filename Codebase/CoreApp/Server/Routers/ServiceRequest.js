function ServiceRequest(request, response, isCRUD) {
    this.request = request;
    this.response = response;
    this.controller = request.params['Controller'];
    this.isCRUD = isCRUD;
}

module.exports = ServiceRequest;