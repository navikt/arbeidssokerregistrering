'use strict';
let startsiden;
let WAIT_TIME;

module.exports = {
    before: (client) => {
        WAIT_TIME = client.globals.wait;

        startsiden = client.init().page.startsiden();

    },
    after: (client) => {
        client.end();
    },
   'gaa til startsiden': (client) => {

       startsiden.navigate();
       startsiden.expect.element('@start').to.be.visible;
    }
};
