module.exports = {

    validerSpm(){
        const WAIT_TIME = this.api.globals.wait;
        this.expect.element('@tittelSporsmal').to.be.visible.after(WAIT_TIME);
        this.validerCheckbokser();

    },
    neste(){
        this.api.click(this.elements.knappNesteSpm.selector).pause(500)
    },

    validerStillingSpm(){
        const WAIT_TIME = this.api.globals.wait;
        this.expect.element('@sporsmal').to.be.visible.after(WAIT_TIME);
    },

    validerCheckbokser(){
        this.api.elements('css selector', this.elements.radioAlternativ.selector, cb => {
            console.log('cb', cb.value.length)
            this.assert.equal(cb.value.length >= 2, true, 'Validerer antall checkbokser høyere eller lik enn 2');
            //valider tekst på alle alternativer
        });
    },

    validerTittel(){

    }
}