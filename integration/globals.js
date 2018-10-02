const chromedriver = require('chromedriver');
const mock = require('./mock');
module.exports = {

    before: function(done) {
        mock.startMock();
        chromedriver.start();
        setTimeout(function() {
            done();
        }, 10000);
    },

    after: function(done) {
        mock.stopMock();
        chromedriver.stop();
        setTimeout(function() {
            done();
        }, 200);
    },
};
