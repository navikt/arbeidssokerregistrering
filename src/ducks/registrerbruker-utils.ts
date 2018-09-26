import {RegistreringBesvarelse, RegistreringData, TeksterForBesvarelse} from './registrerbruker';
import {SporsmalId, State as SvarState} from './svar';
import { ingenYrkesbakgrunn, Stilling, tomStilling } from './siste-stilling';
import { getIntlTekstForSporsmal, getTekstIdForSvar } from '../komponenter/skjema/skjema-utils';
import { InjectedIntl } from 'react-intl';
import {hentSvar, IngenSvar} from './svar-utils';

export function mapAvgitteSvarForBackend(
    svar: SvarState,
    sisteStilling: Stilling,
    intl: InjectedIntl,
): RegistreringData {
    return {
        enigIOppsummering: true,
        sisteStilling: sisteStilling,
        besvarelse: mapTilBesvarelse(svar),
        oppsummering: '', // TODO Dette tas i senere oppgave. Trenger kanskje oppklaring.
        teksterForBesvarelse: genererTeksterForBesvarelse(svar, intl, sisteStilling),
    };
}

export function mapTilBesvarelse(svarState: SvarState): RegistreringBesvarelse {
    const besvarelse = {};
    for (let i = 0; i < svarState.length; i++) {
        const sporsmalOgSvar = svarState[i];
        besvarelse[sporsmalOgSvar.sporsmalId] = sporsmalOgSvar.svar;
    }
    return besvarelse as RegistreringBesvarelse;
}

export function genererTeksterForBesvarelse(
    svarState: SvarState,
    intl: InjectedIntl,
    sisteStilling: Stilling,
): TeksterForBesvarelse {
    return svarState.map(sporsmalOgSvar => ({
        sporsmalId: sporsmalOgSvar.sporsmalId,
        sporsmal: getIntlTekstForSporsmal(sporsmalOgSvar.sporsmalId, 'tittel', intl),
        svar: getIntlTekstForPotensieltUbesvartSporsmal(sporsmalOgSvar.sporsmalId, svarState, intl, sisteStilling),
    }));
}

function getIntlTekstForPotensieltUbesvartSporsmal(
    sporsmalId: SporsmalId,
    svarState: SvarState,
    intl: InjectedIntl,
    sisteStilling: Stilling,
): string {
    if (sporsmalId === 'sisteStilling') {
        return hentAvgittSvarForSisteStilling(sisteStilling);
    }
    const svar = hentSvar(svarState, sporsmalId);
    if (svar === IngenSvar.INGEN_SVAR || !svar) {
        return 'Ikke aktuelt';
    }
    const tekstId = getTekstIdForSvar(sporsmalId, svar);
    return intlHarTekstId(intl, tekstId) ? intl.messages[tekstId] : svar.toString();
}

function hentAvgittSvarForSisteStilling(sisteStilling: Stilling): string {
    if (sisteStilling === ingenYrkesbakgrunn || sisteStilling === tomStilling) {
        return 'Ingen yrkeserfaring';
    }
    return sisteStilling.label;
}

function intlHarTekstId(intl: InjectedIntl, tekstId: string): boolean {
    return Object.keys(intl.messages).includes(tekstId);
}