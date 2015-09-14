var apn = require('apn');
var options = require("./Config.json");

function APNService(app, feedbackEnabled) {
    this.appName = app.locals.appName;
    this.sendPushNotification = function (token, message) {
        var apnConnection = new apn.Connection(options);
        var myDevice = new apn.Device(token);
        var note = new apn.Notification();
        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 3;
        note.sound = "ping.aiff";
        note.alert = "You have a new message";
        note.payload = {'messageFrom': this.appName};
        apnConnection.pushNotification(note, myDevice);
    }
    if(feedbackEnabled){
        var options = {
            "batchFeedback": true,
            "interval": 300
        };

        var feedback = new apn.Feedback(options);
        feedback.on("feedback", function(devices) {
            devices.forEach(function(item) {
                // Do something with item.device and item.time;
            });
        });
    }
}
module.exports = APNService;