import { Selector } from 'testcafe';

export default class Startside {
    side: Selector;
    btnStartRegistrering: Selector;

    constructor () {
        this.side = Selector('.registrering-arbeidssoker');
        this.btnStartRegistrering = Selector('[data-testid="start-registrering"]');
    }
}