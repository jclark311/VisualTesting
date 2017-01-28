var https = require('https');
var Eyes = require('eyes.images').Eyes;
// This example uses RSVP library for creating promises.
var RSVP = require('rsvp');

// Switch between the versions to generate test failure.
var version = "0.1";
//var version = "0.2";

var eyes = new Eyes();
// This is your api key, make sure you use it in all your tests.
eyes.setApiKey("SU9r6H6KKJKo9OJntih4aZgugfqKiDoFC2JxVCO1ktk110");
// Define the OS and hosting application to identify the baseline
eyes.setOs("Windows 7");
eyes.setHostingApp("My Maxthon browser");


// Start visual testing.
var testPromise = eyes.open("Applitools site", "Sanity Test", {width: 785, height: 1087})
    .then(function () {
        // Load page image and validate.
        return getImage("store.applitools.com","/download/contact_us.png/" + version).then(function (img) {
            // Visual validation point #1
            return eyes.checkImage(img, 'Contact-us page');
        });
    })
    .then(function () {
        // Load another page image and validate
        return getImage("store.applitools.com", "/download/resources.png/" + version).then(function (img) {
            // Visual validation point #2
            return eyes.checkImage(img);
        });
    })
    .then(function () {
        // End visual testing. Validate visual correctness.
        return eyes.close(false);
    }, function () {
        return eyes.abortIfNotClosed();
    }
);

// Handle test results.
testPromise.then(function (results) {
    console.log("results", results);
});

function getImage(host, path) {
    var options = {
        host: host,
        path: path
    };

    var deferred = RSVP.defer();

    https.request(options, function (res) {
        res.setEncoding('binary'); // this

        var data = "";
        res.on('data', function(chunk) {
            return data += chunk;
        });
        res.on('end', function() {
            return deferred.resolve(new Buffer(data, 'binary'));
        });
        res.on('error', function(err) {
            console.log("Error during HTTP request");
            console.log(err.message);
            deferred.reject();
        });
    }).end();

    return deferred.promise;
}
