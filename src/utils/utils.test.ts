/*tslint:disable*/
import { expect } from 'chai';
import { State as SvarState } from '../ducks/svar';
import * as moment from 'moment';

import {
    getIntlMessage, hentFornavn, hentAlder
} from './utils';
import {
    YRKESPRAKSIS
} from './konstanter';
import {Stilling} from "../ducks/siste-stilling";
import {
    AndreForholdSvar, DinSituasjonSvar,
    HelseHinderSvar, SisteStillingSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from "../ducks/svar-utils";
import {mapAvgitteSvarForBackend} from "../ducks/registrerbruker-utils";

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

    it('test av hentAlder 18 år', () => {
        const fodselsdato = moment().subtract(18, 'years').format('DDMMYY')
        // parameter er fnr
        expect(hentAlder(`${fodselsdato}50105`)).to.equal(18);
        // parameter er d-nummer
        expect(hentAlder(`4${fodselsdato}56105`)).to.equal(18);
    });

    it('test av hentAlder 56 år', () => {
        const fodselsdato = moment().subtract(56, 'years').format('DDMMYY')
        // parameter er fnr
        expect(hentAlder(`${fodselsdato}30105`)).to.equal(56);
        // parameter er d-nummer
        expect(hentAlder(`4${fodselsdato}36105`)).to.equal(56);
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