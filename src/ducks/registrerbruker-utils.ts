import {
    OrdinaerBesvarelse,
    OrdinaerRegistreringData,
    SykmeldtBesvarelse,
    SykmeldtRegistreringData,
    TeksterForBesvarelse
} from './registrerbruker';
import { SporsmalId, State as SvarState } from './svar';
import { ingenYrkesbakgrunn, Stilling, tomStilling } from './siste-stilling';
import { getIntlTekstForSporsmal, getTekstIdForSvar } from '../komponenter/skjema/skjema-utils';
import { InjectedIntl } from 'react-intl';
import { hentSvar, IngenSvar } from './svar-utils';
import { RegistreringType } from './registreringstatus';

export function mapAvgitteSvarForBackend(
    svar: SvarState,
    sisteStilling: Stilling,
    intl: InjectedIntl,
    registreringType: RegistreringType
): OrdinaerRegistreringData | SykmeldtRegistreringData {

    const besvarelse = mapTilBesvarelse(svar);
    const teksterForBesvarelse = genererTeksterForBesvarelse(svar, intl, sisteStilling, registreringType);

    if (registreringType === RegistreringType.SYKMELDT_REGISTRERING) {

        return {
            besvarelse,
            teksterForBesvarelse
        };

    } else {

        return {
            enigIOppsummering: true,
            sisteStilling: sisteStilling,
            oppsummering: '', // TODO Dette tas i senere oppgave. Trenger kanskje oppklaring.
            besvarelse,
            teksterForBesvarelse
        };

    }
}

export function mapTilBesvarelse(svarState: SvarState): OrdinaerBesvarelse | SykmeldtBesvarelse {

    const besvarelse = {};

    for (let i = 0; i < svarState.length; i++) {
        const sporsmalOgSvar = svarState[i];
        besvarelse[sporsmalOgSvar.sporsmalId] = sporsmalOgSvar.svar;
    }

    return besvarelse;

}

export function mapTilSvarState(besvarelse: OrdinaerBesvarelse | SykmeldtBesvarelse): SvarState {
    return Object.keys(besvarelse).map((sporsmalId) => ({
        sporsmalId: sporsmalId,
        svar: besvarelse[sporsmalId]
    })) as SvarState;
}

export function genererTeksterForBesvarelse(
    svarState: SvarState,
    intl: InjectedIntl,
    sisteStilling: Stilling,
    registreringType: RegistreringType
): TeksterForBesvarelse {
    return svarState.map(sporsmalOgSvar => ({
        sporsmalId: sporsmalOgSvar.sporsmalId,
        sporsmal: getIntlTekstForSporsmal(sporsmalOgSvar.sporsmalId, 'tittel', intl, registreringType),
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