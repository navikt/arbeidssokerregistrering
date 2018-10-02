'use strict';
let startsiden, sporsmal;
let WAIT_TIME;

module.exports = {
    before: (client) => {
        WAIT_TIME = client.globals.wait;

        startsiden = client.init().page.startsiden();
        sporsmal = client.init().page.sporsmal();

    },
    after: (client) => {
        client.end();
    },
    'gaa til spm 1': (client) => {

        const elements = startsiden.elements;
        startsiden.navigate();
        startsiden.expect.element('@start').to.be.visible.after(WAIT_TIME);

        // Til spm 1
        client.click(elements.startRegistrering.selector).pause(500);

        // Sjekk url todo console.log('client.url()', client.url())
        sporsmal.validerSpm();
        client.saveScreenshot('integration/reports/spm1.png');

    },
    'gaa til spm 2': (client) => {
        sporsmal.neste();
        client.saveScreenshot('integration/reports/spm2.png');
        sporsmal.validerSpm();

    },

    'gaa til neste spm 3': (client) => {
        sporsmal.neste();
        client.saveScreenshot('integration/reports/spm3.png');
        sporsmal.validerSpm();
    }
};
