import * as chai from 'chai';
import { erSelvgaende } from './skjema-utils';

const expect = chai.expect;

describe('Test erSelvgående', () => {
    it('skal gi ingen utslag', () => {
        const svar = {
            1: '1',
            2: '2',
            3: '1',
            4: '1',
            5: '2',
        };
        const svarVurdertSomSelvaende = erSelvgaende(svar);
        expect(svarVurdertSomSelvaende).to.equal(true);
    });
});

describe('Test ikke selvgående', () => {
    it('skal gi utslag på spørsmål 1', () => {
        const svar = {
            1: '6', // svar: annet
            2: '2',
            3: '1',
            4: '1',
            5: '2',
        };

        const svarVurdertSomSelvaende = erSelvgaende(svar);
        expect(svarVurdertSomSelvaende).to.equal(false);
    });
    it('skal gi utslag på spørsmål 2', () => {
        const svar = {
            1: '1',
            2: '1', // svar: Grunnskole
            3: '1',
            4: '1',
            5: '2',
        };
        const svarVurdertSomSelvaende = erSelvgaende(svar);
        expect(svarVurdertSomSelvaende).to.equal(false);
    });
    it('skal gi utslag på spørsmål 3', () => {
        const svar = {
            1: '1',
            2: '2',
            3: '2', // svar: Nei
            4: '1',
            5: '2',
        };
        const svarVurdertSomSelvaende = erSelvgaende(svar);
        expect(svarVurdertSomSelvaende).to.equal(false);
    });
    it('skal gi utslag på spørsmål 4', () => {
        const svar = {
            1: '1',
            2: '2',
            3: '1',
            4: '2', // svar: Nei
            5: '2',
        };
        const svarVurdertSomSelvaende = erSelvgaende(svar);
        expect(svarVurdertSomSelvaende).to.equal(false);
    });
    it('skal gi utslag på spørsmål 5', () => {
        const svar = {
            1: '1',
            2: '2',
            3: '1',
            4: '1',
            5: '1', // svar: Ja
        };
        const svarVurdertSomSelvaende = erSelvgaende(svar);
        expect(svarVurdertSomSelvaende).to.equal(false);
    });
    it('skal gi utslag på spørsmål 3, 4, 5', () => {
        const svar = {
            1: '1',
            2: '2',
            3: '2', // svar: Nei
            4: '2', // svar: Nei
            5: '1', // svar: Ja
        };
        const svarVurdertSomSelvaende = erSelvgaende(svar);
        expect(svarVurdertSomSelvaende).to.equal(false);
    });
});
