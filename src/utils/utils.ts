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
    const helse: number | undefined = svar.helse;
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
}
