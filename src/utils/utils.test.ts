/*tslint:disable*/
import { expect } from 'chai';
import { State as SvarState } from '../ducks/svar';
import * as moment from 'moment';

import {
    getIntlMessage, getMapJaNeiKanskje, mapTilNuskode, getMapSituasjon, hentFornavn, mapAvgitteSvarForBackend,
    hentAlder
} from './utils';
import {
    ANNET, BLANK, JA, KANSKJE, MISTET_JOBBEN, NEI,
    PERMITTERT,
    SAGT_OPP,
    UNDER_UTDANNING,
    VIL_BYTTE_JOBB, YRKESPRAKSIS
} from './konstanter';
import {Stilling} from "../ducks/siste-stilling";
import {HelseHinderSvar, UtdanningSvar} from "../ducks/svar-utils";

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

    it('test mapping av situasjon', () => {
        expect(getMapSituasjon('1')).to.equal(MISTET_JOBBEN);
        expect(getMapSituasjon('2')).to.equal(SAGT_OPP);
        expect(getMapSituasjon('3')).to.equal(PERMITTERT);
        expect(getMapSituasjon('4')).to.equal(VIL_BYTTE_JOBB);
        expect(getMapSituasjon('5')).to.equal(UNDER_UTDANNING);
        expect(getMapSituasjon('6')).to.equal(ANNET);
    });

    it('test mapping av Ja, Nei, Kanskje', () => {
        expect(getMapJaNeiKanskje('1')).to.equal(JA);
        expect(getMapJaNeiKanskje('2')).to.equal(NEI);
        expect(getMapJaNeiKanskje('3')).to.equal(KANSKJE);
    });

    it('test hardkodet yrkespraksis', () => {
        expect(YRKESPRAKSIS).to.equal('5120.14');
    });

    it('test mapAvgitteSvarForBackend', () => {

        const dummySvar: SvarState = {
            helsehinder: HelseHinderSvar.JA,
            utdanning: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER,
        };
        const stilling: Stilling = {
            styrk08: '6236',
            label: 'stilling :)',
            konseptId: 62352672,
        };

        const expectData = {
            nusKode: mapTilNuskode(dummySvar.utdanning!),
            yrkesPraksis: stilling.styrk08,
            enigIOppsummering: true,
            oppsummering: BLANK,
            harHelseutfordringer: dummySvar.helsehinder,
            yrkesbeskrivelse: stilling.label,
            konseptId: stilling.konseptId,
        };
        expect(mapAvgitteSvarForBackend(dummySvar, stilling)).to.deep.equal(expectData);
    });
});