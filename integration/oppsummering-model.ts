import { Selector, t } from 'testcafe';

//Felles for Oppsummering, fullfor, duernaregistrert
export default class Oppsummering {
    sideOppsummering: Selector;
    sideRegistrert: Selector;
    sideFullfor: Selector;
    btnNeste: Selector;
    tittelOppsummering: Selector;
    besvarelserOppsummering: Selector;
    checkboxKrav: Selector;
    tittelRegistrert: Selector;

    constructor () {
        this.sideOppsummering = Selector('.oppsummering');
        this.sideFullfor = Selector('.fullfor');
        this.sideRegistrert = Selector('.registrert__aksjonspanel');
        this.tittelRegistrert = Selector('.registrert__tittel');
        this.btnNeste = Selector('[data-testid="neste"]');
        this.tittelOppsummering = Selector('.oppsummering-tittel');
        this.besvarelserOppsummering = Selector('.ordinaer-oppsummering-besvarelser');
        this.checkboxKrav = Selector('.bekreftCheckboksPanel > .skjemaelement > label');

    }

    async fullforRegistrering(){
        await t
            .expect(this.sideFullfor.exists).ok()
            .click(this.checkboxKrav)
            .click(this.btnNeste)
            .expect(this.sideRegistrert.exists).ok()
            .expect(this.tittelRegistrert.visible).ok();

        return this;
    }

    async fullforOppsummering() {
        await t
            .expect(this.tittelOppsummering.visible).ok()
            .expect(this.besvarelserOppsummering.visible).ok()
            .click(this.btnNeste)
            .expect(this.sideFullfor.visible).ok();

        return this;
    }
}


