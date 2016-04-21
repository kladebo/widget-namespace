exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //Example using protractor for end-to-end testing without AngularJS 
    onPrepare: function () {
        global.dv = global.browser.driver;
        global.browser.ignoreSynchronization = true;
    },

    specs: ['widget-spec.js'],

    framework: 'jasmine',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
