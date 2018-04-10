import {
    ANNET,
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
import { State as OppsummeringState } from '../ducks/oppsummering';

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
    oppsummering: OppsummeringState,
    yrkesPraksis: string | undefined
) {
    const helse: number | undefined = svar.helse;
    const utdanning: number | undefined = svar.utdanning;

    let data = {};
    if (helse !== undefined && utdanning !== undefined) {
        data = {
            nusKode: mapTilNuskode(utdanning),
            yrkesPraksis: yrkesPraksis,
            enigIOppsummering: true,
            oppsummering: oppsummering.tekst,
            harHelseutfordringer: mapTilBoolean(helse),
        };
    }
    return data;
}

export interface MatchProps {
    id: string;
}

export function hentStillingsAlternativer (typeaheadYrkeList: {}[], sokestreng: string) {
    const alternativer = typeaheadYrkeList
        .sort((a: {label: string}, b: {label: string}) => a.label.localeCompare(b.label))
        .map((stilling: { label: string, styrk08NavListe: string[] }, index: number) => {
            const styrk08 = stilling.styrk08NavListe.length > 0 ? stilling.styrk08NavListe[0] : '';
            return {
                id: index,
                tittel: stilling.label,
                styrk08
            };
        });

    const blankSokestreng = sokestreng.length === 0;
    const alternativerMedAnnenStilling =
        [...alternativer, {id: alternativer.length, tittel: 'Annen stilling', styrk08: '-1'}];

    return blankSokestreng ? [] : alternativerMedAnnenStilling;
}