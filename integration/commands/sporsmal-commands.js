module.exports = {
    validerMinst2Checkbokser(){
        this.api.elements('css selector', this.elements.radioAlternativ.selector, cb => {
            this.assert.equal(cb.status, 0);
            this.assert.equal(cb.value.length >= 2, true, 'Validerer antall checkbokser høyere eller lik enn 2');
        });
    },
    klikkSjekkboksFullfor(){
        const WAIT_TIME = this.api.globals.wait;
        this.expect.element(this.elements.sjekkboksFullfor.selector).to.be.visible.after(WAIT_TIME);
        this.moveToElement(this.elements.sjekkboksFullfor.selector, 10, 10);
        this.api.click(this.elements.sjekkboksFullfor.selector).pause(500)
    },
    klikkNeste(){
        const WAIT_TIME = this.api.globals.wait;
        const browser = this.api;
        let forrigeUrl;

        this.api.url(function(result) {
            forrigeUrl = result.value;
        }).perform(() => {
            this.expect.element(this.elements.knappNesteSpm.selector).to.be.visible.after(WAIT_TIME);
            this.api.click(this.elements.knappNesteSpm.selector).pause(500);
            this.api.url(function(result) {
                browser.expect(forrigeUrl).to.not.equal(result.value);
            })
        });

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
    validerSiden(tittel, body, WAIT_TIME = this.api.globals.wait){
        this.expect.element(tittel).to.be.present.after(WAIT_TIME);
        this.expect.element(tittel).to.be.visible.after(WAIT_TIME);
        this.expect.element(body).to.be.visible.after(WAIT_TIME);
    }
};