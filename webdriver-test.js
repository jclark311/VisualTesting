var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

var Eyes = require('eyes.selenium').Eyes;
var eyes = new Eyes();
// This is your api key, make sure you use it in all your tests.
eyes.setApiKey('SU9r6H6KKJKo9OJntih4aZgugfqKiDoFC2JxVCO1ktk110');

// Start visual testing with browser viewport set to 1024x768.
// Make sure to use the driver returned through 'then' from this point on.
eyes.open(driver, 'Applitools', 'Test Web Page', {width: 1024, height: 768})
    .then(function(driver) {
        driver.get('http://applitools.com');

        // Visual validation point #1
        eyes.checkWindow('Main Page');

        driver.findElement(webdriver.By.css('.features>a')).click();

        // Visual validation point #2
        eyes.checkWindow('Features page');

        driver.quit();

        // End visual testing. Validate visual correctness.
        eyes.close();
    });