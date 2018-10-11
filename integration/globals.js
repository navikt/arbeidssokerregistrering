const chromedriver = require('chromedriver');
const mock = require('./mock');
module.exports = {
    default: {
        isLocal: true,
    },
    before: function(done) {
        if (this.isLocal) {mock.startMock();
        chromedriver.start();
        setTimeout(function() {
            done();
        }, 10000);
    }else {
            done();

        }
    },
    after: function(done) {
        if (this.isLocal) {mock.stopMock();
        chromedriver.stop();
        setTimeout(function() {
            done();
        }, 200);} else {
            done();
        }
    },
};