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

        // Ga til spm 1
        client.click(elements.startRegistrering.selector).pause(500);

        // todo legg til validering av urlen
        sporsmal.validerSiden('@tittelSporsmal', '@spmBody');
        sporsmal.validerMinst2Checkbokser();
        client.saveScreenshot('integration/reports/spm1.png');

        sporsmal.klikkNeste();
    },
    'gaa gjennom alle spm med radioknapper og valider at det finnes minst 2 radioknapper på siden': (client) => {
        [2,3,4,5,6,7].map((spm) => {
            const png = `integration/reports/spm${spm}.png`
            client.saveScreenshot(png);

            sporsmal.validerSiden('@tittelSporsmal', '@spmBody');
            sporsmal.validerMinst2Checkbokser();
            sporsmal.klikkNeste();
        });
    },
    'oppsummering-siden skal besta av tittel og oppsummering infoboks': (client) => {
        client.waitForElementPresent('.oppsummering-tittel', WAIT_TIME);

        client.saveScreenshot(`integration/reports/oppsummering.png`);
        sporsmal.validerSiden('@tittelOppsummeringTittel', '@divOppsummeringBesvarelser');
        sporsmal.klikkNeste();
    },
    'fullfor-siden skal besta av tittel og sjekkliste infoboks': (client) => {
        client.waitForElementPresent('.fullfor-tittel', WAIT_TIME);

        client.saveScreenshot(`integration/reports/fullfor.png`);
        sporsmal.validerSiden('@tittelFullforTittel', '@divFullforSjekkliste');
        sporsmal.klikkSjekkboksFullfor();
        sporsmal.klikkNeste();
    },
    'duernaregistert-siden skal besta av tittel og infoboks': (client) => {
        client.waitForElementPresent('.registrert__tittel', WAIT_TIME);

        client.saveScreenshot(`integration/reports/duernaregistrert.png`);
        sporsmal.validerSiden('@tittelDuErRegTittel', '@divDuErReg');
    }

};
