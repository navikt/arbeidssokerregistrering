module.exports = {
    validerSpmSidenHarMinst2Checkbokser(){
        const WAIT_TIME = this.api.globals.wait;
        this.expect.element('@tittelSporsmal').to.be.visible.after(WAIT_TIME);
        this.validerMinst2Checkbokser();

    },
    validerMinst2Checkbokser(){
        this.api.elements('css selector', this.elements.radioAlternativ.selector, cb => {
            console.log('cb', cb.value.length);
            this.assert.equal(cb.value.length >= 2, true, 'Validerer antall checkbokser høyere eller lik enn 2');
        });
    },
    klikkSjekkboksFullfor(){
        this.api.click(this.elements.sjekkboksFullfor.selector).pause(500)
    },
    klikkNeste(){
        this.api.click(this.elements.knappNesteSpm.selector).pause(500)
    },
    validerStillingSpm(){
        const WAIT_TIME = this.api.globals.wait;
        this.expect.element('@sporsmal').to.be.visible.after(WAIT_TIME);
    },
    validerOppsummeringSiden(){
        const WAIT_TIME = this.api.globals.wait;
        this.expect.element('@tittelOppsummeringTittel').to.be.visible.after(WAIT_TIME);
        this.expect.element('@divOppsummeringBesvarelser').to.be.visible.after(WAIT_TIME);
    },
    validerFullforSiden(){
        const WAIT_TIME = this.api.globals.wait;
        this.expect.element('@tittelFullforTittel').to.be.visible.after(WAIT_TIME);
        this.expect.element('@divFullforSjekkliste').to.be.visible.after(WAIT_TIME);
    },
    validerSiden(tittel, body){
        const WAIT_TIME = this.api.globals.wait;
        this.expect.element(tittel).to.be.visible.after(WAIT_TIME);
        this.expect.element(body).to.be.visible.after(WAIT_TIME);
    }
};