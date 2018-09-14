const driver = require('./driver');
const mock = require('./mock');
module.exports = {

    before: function(done) {
        mock.startMock();
        driver.start();
        setTimeout(function() {
            done();
        }, 5000);
    },

    after: function(done) {
        mock.stopMock();
        driver.stop();
        setTimeout(function() {
            done();
        }, 200);
    },
};
