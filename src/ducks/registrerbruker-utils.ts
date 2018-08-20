import { RegistreringData, State, TeksterForBesvarelse } from './registrerbruker';
import { State as SvarState } from './svar';
import { selectSisteStilling, Stilling } from './siste-stilling';
import { getIntlTekstForSporsmal, getTekstIdForSvar } from '../sider/skjema/skjema-utils';
import { InjectedIntl } from 'react-intl';
import { AppState } from '../reducer';

export function mapAvgitteSvarForBackend(
    svar: SvarState,
    sisteStilling: Stilling,
    intl: InjectedIntl,
): RegistreringData {
    if (besvarelseErGyldig(svar)) {
        return {
            enigIOppsummering: true,
            sisteStilling: sisteStilling,
            besvarelse: svar,
            oppsummering: '', // TODO Dette tas i senere oppgave. Trenger kanskje oppklaring.
            teksterForBesvarelse: genererTeksterForBesvarelse(svar, intl),
        };
    } else {
        return {};
    }
}

export function besvarelseErGyldig(svar: SvarState) {
    return (
        svar.dinSituasjon &&
        svar.sisteStilling &&
        svar.utdanning &&
        svar.utdanningGodkjent &&
        svar.utdanningBestatt &&
        svar.helseHinder &&
        svar.andreForhold
    );
}

export function genererTeksterForBesvarelse(
    besvarelse: SvarState,
    intl: InjectedIntl
): TeksterForBesvarelse {
    return Object.keys(besvarelse)
        .map(sporsmalId => ({
            sporsmalId: sporsmalId,
            sporsmal: getTekstForSporsmalDerManHarTattHoydeForStilling(sporsmalId, intl),
            svar: getIntlTekstForPotensieltUbesvartSporsmal(sporsmalId, besvarelse, intl),
        }));
}

function getTekstForSporsmalDerManHarTattHoydeForStilling(
    sporsmalId: string,
    intl: InjectedIntl
): string {
    if (sporsmalId === 'sisteStilling') {
        // gjør noe spesielt
    }
    return getIntlTekstForSporsmal(sporsmalId, 'tittel', intl);
}

function getIntlTekstForPotensieltUbesvartSporsmal(sporsmalId: string, besvarelse: SvarState, intl: InjectedIntl) {
    const svar = besvarelse[sporsmalId];
    const tekstId = getTekstIdForSvar(sporsmalId, besvarelse[sporsmalId]);
    return intlHarTekstId(intl, tekstId) ? intl.messages[tekstId] : svar;
}

function intlHarTekstId(intl: InjectedIntl, tekstId: string): boolean {
    return Object.keys(intl.messages).includes(tekstId);
}

export function mapBrukerRegistreringsData(state: AppState, intl: InjectedIntl): State {
    return {
        data: mapAvgitteSvarForBackend(state.svar, selectSisteStilling(state), intl),
        status: state.registrerBruker.status
    };
}