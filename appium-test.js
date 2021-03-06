'use strict';

var webdriver = require('selenium-webdriver');

var LOCAL_APPIUM = 'http://localhost:4723/wd/hub';

var driver = new webdriver.Builder()
	.usingServer(LOCAL_APPIUM)
	.withCapabilities(webdriver.Capabilities.chrome().set('platformName', 'Android').set('platformVersion', '5.1.0')
		.set('deviceName', 'Nexus 5 - Android 5.1.0')).build();

var Eyes = require('eyes.selenium').Eyes;
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
// api key SU9r6H6KKJKo9OJntih4aZgugfqKiDoFC2JxVCO1ktk110

// Uncomment the following lines for logs.
var LogHandler = require('eyes.selenium').ConsoleLogHandler;
var handler = new LogHandler(true);
eyes.setLogHandler(handler);

eyes.open(driver, "Appium JS", "Applitools1").then(function (driver) {
    driver.get('https://applitools.com');
    eyes.checkWindow("applitools");
    return eyes.close();
}).then(function () {
    console.log("Test passed!");
}, function (testResultsWrapper) {
    // If we're here it's either a new test or a failed test.
    var results = testResultsWrapper.results;

    // If you want to see all the available attributes of the test results, uncomment the following lines.
    for (var attr in results) {
        console.log(attr, results[attr]);
    }

    console.log('# of steps:', results.steps);
    console.log('New test?', results.isNew);
    console.log(testResultsWrapper);
}).then(function () {
    driver.quit();
    eyes.abortIfNotClosed();
});