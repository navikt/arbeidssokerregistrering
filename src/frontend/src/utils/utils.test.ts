/*tslint:disable*/
import { expect } from 'chai';
import antallSporsmal from '../../src/sporsmal/alle-sporsmal';

import {getIntlMessage, getMapJaNeiKanskje, getMapNusKode, getMapSituasjon, hentFornavn, mapSvar} from './utils';
import {
    ANNET, JA, KANSKJE, MISTET_JOBBEN, NEI, NUSKODE_0, NUSKODE_2, NUSKODE_3, NUSKODE_4, NUSKODE_6, NUSKODE_7,
    OPPSUMMERING,
    PERMITTERT,
    SAGT_OPP,
    UNDER_UTDANNING,
    VIL_BYTTE_JOBB, YRKESPRAKSIS
} from './konstanter';

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

    it('test mapping av situasjon', () => {
        expect(getMapSituasjon('1')).to.equal(MISTET_JOBBEN);
        expect(getMapSituasjon('2')).to.equal(SAGT_OPP);
        expect(getMapSituasjon('3')).to.equal(PERMITTERT);
        expect(getMapSituasjon('4')).to.equal(VIL_BYTTE_JOBB);
        expect(getMapSituasjon('5')).to.equal(UNDER_UTDANNING);
        expect(getMapSituasjon('6')).to.equal(ANNET);
    });

    it('test mapping av nuskode', () => {
        expect(getMapNusKode('1')).to.equal(NUSKODE_0);
        expect(getMapNusKode('2')).to.equal(NUSKODE_2);
        expect(getMapNusKode('3')).to.equal(NUSKODE_3);
        expect(getMapNusKode('4')).to.equal(NUSKODE_4);
        expect(getMapNusKode('5')).to.equal(NUSKODE_6);
        expect(getMapNusKode('6')).to.equal(NUSKODE_7);
    });

    it('test mapping av Ja, Nei, Kanskje', () => {
        expect(getMapJaNeiKanskje('1')).to.equal(JA);
        expect(getMapJaNeiKanskje('2')).to.equal(NEI);
        expect(getMapJaNeiKanskje('3')).to.equal(KANSKJE);
    });

    it('test blank yrkespraksis', () => {
        expect(YRKESPRAKSIS).to.equal(' ');
    });
    it('test blank oppsummering', () => {
        expect(OPPSUMMERING).to.equal(' ');
    });

    it('test mapSvar', () => {
        let dummySvar = lagDummySvar(antallSporsmal.length);

        const expectData = {
            nusKode: getMapNusKode(dummySvar[1]),
            yrkesPraksis: YRKESPRAKSIS,
            enigIOppsummering: true,
            oppsummering: OPPSUMMERING,
            utdanningBestatt: getMapJaNeiKanskje(dummySvar[2]),
            utdanningGodkjentNorge: getMapJaNeiKanskje(dummySvar[3]),
            harHelseutfordringer: getMapJaNeiKanskje(dummySvar[4]),
        };
        expect(mapSvar(dummySvar)).to.deep.equal(expectData);
    });
});

function lagDummySvar(lengde) {
    let result = {};
    for (let i = 1; i <= lengde; i++) {
        result[i] = '1';
    }
    return result;
}