import { Selector } from 'testcafe';
import { erIFSS } from '../src/utils/utils';

export default class Startside {
    side: Selector;
    btnStartRegistrering: Selector;

    constructor () {
        this.side = erIFSS() ? Selector('.registrering-arbeidssoker') : Selector('.startside') ;
        this.btnStartRegistrering = Selector('[data-testid="start-registrering"]');
    }
}