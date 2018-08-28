import { RegistreringData, TeksterForBesvarelse } from './registrerbruker';
import { State as SvarState } from './svar';
import { ingenYrkesbakgrunn, Stilling, tomStilling } from './siste-stilling';
import { getIntlTekstForSporsmal, getTekstIdForSvar } from '../sider/skjema/skjema-utils';
import { InjectedIntl } from 'react-intl';
import { IngenSvar } from './svar-utils';

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
            teksterForBesvarelse: genererTeksterForBesvarelse(svar, intl, sisteStilling),
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
    intl: InjectedIntl,
    sisteStilling: Stilling,
): TeksterForBesvarelse {
    return Object.keys(besvarelse)
        .map(sporsmalId => ({
            sporsmalId: sporsmalId,
            sporsmal: getIntlTekstForSporsmal(sporsmalId, 'tittel', intl),
            svar: getIntlTekstForPotensieltUbesvartSporsmal(sporsmalId, besvarelse, intl, sisteStilling),
        }));
}

function getIntlTekstForPotensieltUbesvartSporsmal(
    sporsmalId: string,
    besvarelse: SvarState,
    intl: InjectedIntl,
    sisteStilling: Stilling,
): string {
    if (sporsmalId === 'sisteStilling') {
        return hentAvgittSvarForSisteStilling(sisteStilling);
    }
    const svar = besvarelse[sporsmalId];
    if (svar === IngenSvar.INGEN_SVAR) {
        return 'Ikke aktuelt';
    }
    const tekstId = getTekstIdForSvar(sporsmalId, besvarelse[sporsmalId]);
    return intlHarTekstId(intl, tekstId) ? intl.messages[tekstId] : svar;
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