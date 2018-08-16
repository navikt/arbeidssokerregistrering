import { Data as RegistreringsDataMedError, RegistreringData } from '../../ducks/registrerbruker';
import { State as SvarState } from '../../ducks/svar';
import { getIntlTekstForSporsmal, getTekstIdForSvar } from '../skjema/skjema-utils';
import { InjectedIntl } from 'react-intl';

export type TeksterForBesvarelse = TekstForSvar[]; // tslint:disable-line no-any

interface TekstForSvar {
    sporsmalId: string;
    sporsmal: string;
    svar: string;
}

export function genererTeksterForBesvarelse(
    registreringData: RegistreringsDataMedError,
    intl: InjectedIntl
): RegistreringsDataMedError {
    const besvarelse: SvarState | undefined = (registreringData as RegistreringData).besvarelse;
    if (besvarelse === undefined) {
        return registreringData;
    }
    const tekster: TeksterForBesvarelse = Object.keys(besvarelse)
        .map(sporsmalId => ({
            sporsmalId: sporsmalId,
            sporsmal: getIntlTekstForSporsmal(sporsmalId, 'tittel', intl),
            svar: getIntlTekstForPotensieltUbesvartSporsmal(sporsmalId, besvarelse, intl),
        }));
    return {
        ...registreringData,
        teksterForBesvarelse: tekster,
    };
}

function getIntlTekstForPotensieltUbesvartSporsmal(sporsmalId: string, besvarelse: SvarState, intl: InjectedIntl) {
    const svar = besvarelse[sporsmalId];
    const tekstId = getTekstIdForSvar(sporsmalId, besvarelse[sporsmalId]);
    return intlHarTekstId(intl, tekstId) ? intl.messages[tekstId] : svar;
}

function intlHarTekstId(intl: InjectedIntl, tekstId: string): boolean {
    return Object.keys(intl.messages).includes(tekstId);
}