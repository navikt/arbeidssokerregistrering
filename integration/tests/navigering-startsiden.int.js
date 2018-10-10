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
       const url = client.launch_url;
       client.url(url);
       startsiden.expect.element('@start').to.be.visible.after(1000);
    }
};
