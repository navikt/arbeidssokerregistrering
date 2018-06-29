import {
    NUSKODE_0,
    NUSKODE_2,
    NUSKODE_3,
    NUSKODE_4,
    NUSKODE_6,
    NUSKODE_7, NUSKODE_9,
} from './konstanter';
import { State as SvarState } from '../ducks/svar';
import { Stilling } from '../ducks/siste-stilling';
import * as moment from 'moment';
import { UtdanningSvar } from '../ducks/svar-utils';
import { RegistreringData } from '../ducks/registrerbruker';

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

export const mapTilNuskode = (svar: UtdanningSvar) => {
    switch (svar) {
        case (UtdanningSvar.INGEN_UTDANNING): return NUSKODE_0;
        case (UtdanningSvar.GRUNNSKOLE): return NUSKODE_2;
        case (UtdanningSvar.VIDEREGAENDE_GRUNNUTDANNING): return NUSKODE_3;
        case (UtdanningSvar.VIDEREGAENDE_FAGBREV_SVENNEBREV): return NUSKODE_4;
        case (UtdanningSvar.HOYERE_UTDANNING_1_TIL_4): return NUSKODE_6;
        case (UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER): return NUSKODE_7;
        case (UtdanningSvar.INGEN_SVAR): return NUSKODE_9;
        default: return NUSKODE_9;
    }
};

export function mapAvgitteSvarForBackend(
    svar: SvarState,
    sisteStilling: Stilling
): RegistreringData {
    if (besvarelseErGyldig(svar)) {
        return {
            nusKode: mapTilNuskode(svar.utdanning!),
            enigIOppsummering: true,
            sisteStilling: sisteStilling,
            besvarelse: svar,
            oppsummering: '', // TODO Dette tas i senere oppgave. Trenger kanskje oppklaring.
        };
    } else {
        throw new Error('Besvarelsen er ikke gyldig.');
    }
}

export function besvarelseErGyldig(svar: SvarState) {
    return (
        svar['din-situasjon'] &&
        svar['siste-stilling'] &&
        svar.utdanning &&
        svar.utdanninggodkjent &&
        svar.utdanningbestatt &&
        svar.helsehinder &&
        svar.andreforhold
    );
}

export interface MatchProps {
    id: string;
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