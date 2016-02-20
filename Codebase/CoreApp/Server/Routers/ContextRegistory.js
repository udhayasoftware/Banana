var HTTPRouter = require('./HTTPRouter');

function contextRegistory(app, vendor) {
    var routerHandler = new HTTPRouter(app, vendor);
    var root = "/" + app.locals.appName;
    // CommonRouters
    routerHandler.registerCRUD(root + '/crud/:Controller', "NotUsed");

    routerHandler.registerGet(root + '/api/:Controller/:Action', false);
    routerHandler.registerPost(root + '/api/:Controller/:Action', false);
    routerHandler.registerPut(root + '/api/:Controller/:Action', false);
    routerHandler.registerOption(root + '/api/:Controller/:Action', false);
}


exports.contextRegistory = contextRegistory;

