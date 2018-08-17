import { State as SvarState } from './svar';
import {getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst} from '../sider/skjema/skjema-utils';
import { InjectedIntl } from 'react-intl';
import { State as TeksterForBesvarelse } from '../ducks/tekster-for-besvarelse';

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