import { Selector } from 'testcafe';

export default class Startside {
    side: Selector;
    btnStartRegistrering: Selector;

    constructor () {
        this.side = Selector('.startside') ;
        this.btnStartRegistrering = Selector('[data-testid="start-registrering"]');
    }
}