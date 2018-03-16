import { expect } from 'chai';
import { erIkkeSelvgaende } from './skjema-utils';
import {erSelvgaende} from "./skjema-utils";

/*
sett state, gjør noe, sjekk resultat TODO
 */

const config = {
    helse: [1, 2, 3],
    utdanning: [4, 5]
};

describe('sporsmal-utils', () => {
    it('test at erSelvgaende fungerer som forventet gitt config', () => {
        expect(erSelvgaende('helse', 1, config)).to.equal(true);
        expect(erSelvgaende('helse', 4, config)).to.equal(false);
        expect(erSelvgaende('helse', undefined, config)).to.equal(false);
        expect(erSelvgaende('utdanning', 1, config)).to.equal(false);
        expect(erSelvgaende('utdanning', 4, config)).to.equal(true);
    });

    it('test at erSelvgaende returnerer false hvis sporsmalsId ikke finnes', () => {
        expect(erSelvgaende('finnes ikke', 4, config)).to.equal(false);
    });
});
