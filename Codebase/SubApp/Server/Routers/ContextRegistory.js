var HTTPRouter = require('./HTTPRouter');

function contextRegistory(app, vendor) {
    var routerHandler = new HTTPRouter(app, vendor);
    var root = "/" + app.locals.appName;
    // CommonRouters
    routerHandler.registerCRUD(root + '/crud/:Controller', "Customer");

    routerHandler.registerGet(root + '/api/:Controller/:Action', "Authentication");
    routerHandler.registerPost(root + '/api/:Controller/:Action', "DashBoard");
    routerHandler.registerPut(root + '/api/:Controller/:Action', "Email");
    routerHandler.registerOption(root + '/api/:Controller/:Action', "Comments");
}

exports.contextRegistory = contextRegistory;

