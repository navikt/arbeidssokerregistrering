const driver = require('./driver');
const mock = require('./mock');
module.exports = {
    default: {
        isLocal: true,
    },
    before: function(done) {
        if (this.isLocal) {
            mock.startMock();
            driver.start();
            setTimeout(function() {
                done();
            }, 5000);
        } else {
            done();

        }
    },

   /* beforeEach: function(client, done){
        if(!this.isLocal) {
            utils.getNetworkIp()
                .then(ip => {
                    client.baseUrl = `http://${ip}:5000/arbeidssokerregistrering`;
                    done();
                }).catch(error => {
                    done(error);
                });
        }
        else done();
    },*/


    after: function(done) {
        if (this.isLocal) {
            mock.stopMock();
            driver.stop();
            setTimeout(function () {
                done();
            }, 200);
        } else {
            done();
        }
    },
};
