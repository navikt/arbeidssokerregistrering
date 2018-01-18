import { expect } from 'chai';

import { getIntlMessage } from './utils';
describe('utils test', () => {
    it('skal hente ut intl', () => {
        const id = 'ID';
        const tekst = 'tekst';
        const finnesIkke = 'finnesIkke';

        expect(getIntlMessage({[id]: tekst}, id )).to.equal(tekst);
        expect(getIntlMessage({[id]: tekst}, finnesIkke )).to.equal(finnesIkke);
    });
});