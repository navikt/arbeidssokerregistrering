const commands = require('../commands/sporsmal-commands');

module.exports = {
    url: function() {
        return this.api.globals.launch_url;
    },
    elements: {
        tittelSporsmal: '.spm-tittel',
        spmBody: '.spm-body',
        radioAlternativ: '.alternativ-wrapper',
        knappNesteSpm: "*[data-testid='neste']",
        divOppsummeringBesvarelser: '.oppsummering-besvarelser',
        tittelOppsummeringTittel: '.oppsummering-tittel',
        tittelFullforTittel: '.fullfor-tittel',
        divFullforSjekkliste: '.fullfor-sjekkliste',
        sjekkboksFullfor: ".inputPanel__label",
        tittelDuErRegTittel: '.registrert__tittel',
        divDuErReg: '.registrert__aksjonspanel'
    },
    commands: [commands]
};