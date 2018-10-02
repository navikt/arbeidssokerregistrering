const commands = require('../commands/sporsmal-commands');

module.exports = {
    url: function() {
        return this.api.globals.launch_url;
    },
    elements: {
        tittelSporsmal: '.spm-tittel',
        spmBody: '.spm-body',
        radioAlternativ: '.alternativ-wrapper',
        knappNesteSpm: {
            selector: "*[data-testid='neste-spm']"
        }
    },
    commands: [commands]
};