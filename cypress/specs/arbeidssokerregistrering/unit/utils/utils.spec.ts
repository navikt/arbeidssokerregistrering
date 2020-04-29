import { getIntlMessage, hentFornavn } from '../../../../../src/utils/utils';
import { YRKESPRAKSIS } from '../../../../../src/utils/konstanter';


describe('utils test', () => {
    it('skal hente ut intl', () => {
        const id = 'ID';
        const tekst = 'tekst';
        const finnesIkke = 'finnesIkke';

        expect(getIntlMessage({ [id]: tekst }, id)).to.equal(tekst);
        expect(getIntlMessage({ [id]: tekst }, finnesIkke)).to.equal(finnesIkke);
    });

    it('test av hentFornavn', () => {
        expect(hentFornavn(undefined)).to.equal('');
        expect(hentFornavn('Test testesen')).to.equal('Test');
        expect(hentFornavn('TEST TESTESEN')).to.equal('Test');
        expect(hentFornavn('test testesen')).to.equal('Test');
        expect(hentFornavn('tEST TESTESEN')).to.equal('Test');

        expect(hentFornavn('Test-Test TESTESEN')).to.equal('Test-Test');
        expect(hentFornavn('TEST-TEST TESTESEN')).to.equal('Test-Test');
        expect(hentFornavn('tEST-tEST testesen')).to.equal('Test-Test');
        expect(hentFornavn('tEST-TEST testesen mcTestesen test')).to.equal('Test-Test');
    });

    it('test hardkodet yrkespraksis', () => {
        expect(YRKESPRAKSIS).to.equal('5120.14');
    });
});