import {
    ANNET, BLANK,
    JA,
    KANSKJE,
    MISTET_JOBBEN,
    NEI,
    NUSKODE_0,
    NUSKODE_2,
    NUSKODE_3,
    NUSKODE_4,
    NUSKODE_6,
    NUSKODE_7,
    PERMITTERT,
    SAGT_OPP,
    UNDER_UTDANNING, VIL_BYTTE_JOBB,
} from './konstanter';
import { State as SvarState } from '../ducks/svar';
import { Stilling } from '../ducks/siste-stilling';
import * as moment from 'moment';
import { RegistreringStatus } from '../sider/fullfor/fullfor';

export function hentFornavn(name: string | undefined) {
    return name ? forsteTegnStorBokstav(name).split(' ')[0] : '';
}

function forsteTegnStorBokstav(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function getIntlMessage(messages: { [id: string]: string }, id: string): string {
    return messages[id] || id;
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString().substring(1);
}

export function guid() {
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export const getMapSituasjon = (svarAlternativ: string) => {
    const mapSituasjon = {
        '1': MISTET_JOBBEN,
        '2': SAGT_OPP,
        '3': PERMITTERT,
        '4': VIL_BYTTE_JOBB,
        '5': UNDER_UTDANNING,
        '6': ANNET,
    };

    return mapSituasjon[svarAlternativ];
};
export const mapTilNuskode = (svarAlternativ: number) => {
    const mapNusKode = {
        1: NUSKODE_0,
        2: NUSKODE_2,
        3: NUSKODE_3,
        4: NUSKODE_4,
        5: NUSKODE_6,
        6: NUSKODE_7,
    };
    return mapNusKode[svarAlternativ];
};
export const getMapJaNeiKanskje = (svarAlternativ: string) => {
    const map = {
        '1': JA,
        '2': NEI,
        '3': KANSKJE,
    };
    return map[svarAlternativ];
};
export const mapTilBoolean = (alternativId: number | undefined) => {
    return alternativId === 1;
};

export function mapAvgitteSvarForBackend(
    svar: SvarState,
    sisteStilling: Stilling
) {
    const helse: number | undefined = svar.helsehinder;
    const utdanning: number | undefined = svar.utdanning;

    let data = {};
    if (helse !== undefined && utdanning !== undefined) { // Hvorfor tar vi denne sjekken?
        data = {
            nusKode: mapTilNuskode(utdanning),
            yrkesPraksis: sisteStilling.styrk08,
            enigIOppsummering: true,
            oppsummering: BLANK, // TODO slettes samtidig med backend endringer
            harHelseutfordringer: mapTilBoolean(helse),
            yrkesbeskrivelse: sisteStilling.label,
            konseptId: sisteStilling.konseptId,
        };
    }
    return data;
}

export interface MatchProps {
    id: string;
    status: RegistreringStatus;
}

/*
* Regn ut alder basert på fnr som kommer fra `veilarboppfolging/api/me`
* Senere kan koden under bli erstattes med at backend regner ut alder istenfor
* */

function erDNummer (personId: string) {
    const forsteSiffer = Number(personId.substring(0, 1));
    return forsteSiffer > 3 && forsteSiffer < 8;
}

function parseDNummer (personId: string) {
    return !erDNummer(personId) ? personId : personId.substring(1);
}

function toSifferFodselsAar (personId: string) {
    return personId.substring(4, 6);
}

function hentAarhundre (personId: string) {
    let result;
    const individNummer = Number(personId.substring(6, 9));
    const fodselsAar = Number(personId.substring(4, 6));

    if (individNummer <= 499) {
        result = '19';
    } else if (individNummer >= 500 && fodselsAar < 40) {
        result = '20';
    } else if (individNummer >= 500 && individNummer <= 749 && fodselsAar >= 54) {
        result = '18';
    } else if (individNummer >= 900 && fodselsAar > 39) {
        result = '19';
    }

    return result;
}
export function hentAlder(personId: string) {

    const fnr = parseDNummer(personId);

    const aarhundre = hentAarhundre(fnr);
    const fnrForsteFireSiffer = fnr.substring(0, 4);
    const toSifferFAar = toSifferFodselsAar(fnr);

    const fodselsdato = moment(`${fnrForsteFireSiffer}${aarhundre}${toSifferFAar}`, 'DDMMYYYY');

    return moment().diff(fodselsdato, 'years');
}