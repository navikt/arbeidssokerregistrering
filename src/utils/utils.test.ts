/*tslint:disable*/
import {expect} from 'chai';
import {State as SvarState} from '../ducks/svar';

import {getIntlMessage, hentFornavn, mapAvgitteSvarForBackend,} from './utils';
import {YRKESPRAKSIS} from './konstanter';
import {Stilling} from "../ducks/siste-stilling";
import {
    AndreForholdSvar,
    DinSituasjonSvar,
    HelseHinderSvar,
    SisteStillingSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from "../ducks/svar-utils";

describe('utils test', () => {
    it('skal hente ut intl', () => {
        const id = 'ID';
        const tekst = 'tekst';
        const finnesIkke = 'finnesIkke';

        expect(getIntlMessage({[id]: tekst}, id )).to.equal(tekst);
        expect(getIntlMessage({[id]: tekst}, finnesIkke )).to.equal(finnesIkke);
    });
    
    it('test av hentFornavn', () => {
        expect(hentFornavn(undefined)).to.equal('');
        expect(hentFornavn('Test testesen')).to.equal('Test');
        expect(hentFornavn('TEST TESTESEN')).to.equal('Test');
        expect(hentFornavn('test testesen')).to.equal('Test');
        expect(hentFornavn('tEST TESTESEN')).to.equal('Test');
    });

    it('test hardkodet yrkespraksis', () => {
        expect(YRKESPRAKSIS).to.equal('5120.14');
    });

    it('test mapAvgitteSvarForBackend', () => {

        const stilling: Stilling = {
            styrk08: '6236',
            label: 'stilling :)',
            konseptId: 62352672,
        };

        const dummySvar: SvarState = {
            helseHinder: HelseHinderSvar.JA,
            utdanning: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER,
            utdanningBestatt: UtdanningBestattSvar.INGEN_SVAR,
            utdanningGodkjent: UtdanningGodkjentSvar.NEI,
            andreForhold: AndreForholdSvar.NEI,
            sisteStilling: SisteStillingSvar.HAR_HATT_JOBB,
            dinSituasjon: DinSituasjonSvar.ER_PERMITTERT,
        };

        const expectData = {
            sisteStilling: stilling,
            enigIOppsummering: true,
            oppsummering: '',
            besvarelse: dummySvar,
        };
        const mappet = mapAvgitteSvarForBackend(dummySvar, stilling);
        expect(mappet).to.deep.equal(expectData);
    });
});