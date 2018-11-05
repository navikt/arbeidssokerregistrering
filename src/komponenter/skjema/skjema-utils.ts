import { SporsmalId, State as SvarState } from '../../ducks/svar';
import { DinSituasjonSvar, hentSvar, IngenSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils';
import { InjectedIntl } from 'react-intl';
import {Props as SkjemaProps } from './skjema';
import { RegistreringType } from '../../ducks/registreringstatus';

export const INGEN_NESTE_SPORSMAL = -1;

export type SkjemaConfig = Map<Svar, string[]>;

export function getTekstIdForSvar(sporsmalId: SporsmalId, svar: Svar) {
    return `${sporsmalId.toLowerCase()}-svar-${svarSuffiksTilTekstId(svar)}`;
}

export type TekstKontekst = 'tittel' | 'info' | 'ingress';
export function getIntlTekstForSporsmal(sporsmalId: string, kontekst: TekstKontekst,
                                        intl: InjectedIntl, registreringType: RegistreringType): string {
    const registreringTypeId = (registreringType === RegistreringType.SYKMELDT_REGISTRERING)
        ? 'sykmeldt' : 'registrering';

    const idMedRegType = `${sporsmalId.toLowerCase()}-${kontekst}-${registreringTypeId}`;
    const idUtenRegType = `${sporsmalId.toLowerCase()}-${kontekst}`;

    if (intl.messages[idMedRegType]) {
        return intl.messages[idMedRegType];
    } else {
        return intl.messages[idUtenRegType];
    }

}

export function svarSuffiksTilTekstId(svar: Svar) {
    return svar.toString()
        .toLowerCase()
        .split('_')
        .join('-');
}

export function isNumber(n: number): boolean {
    return !(n === null || n === undefined || isNaN(n));
}

// TODO Flytte dette inn i skjemaet hvor det brukes?
export const defaultConfigForSporsmalsflyt: SkjemaConfig = new Map<Svar, string[]>([
    // Denne configgen sier noe om hvilke spørsmål man skal hoppe over, gitt brukerens svar.
    // For eksempel betyr [ALDRI_HATT_JOBB, ['sisteStilling']] at man skal hoppe over spørsmålet om sisteStilling
    // hvis man svarer ALDRI_HATT_JOBB på spørsmålet om dinSituasjon.

    [DinSituasjonSvar.ALDRI_HATT_JOBB, ['sisteStilling']],
    [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB, ['utdanning', 'utdanningBestatt', 'utdanningGodkjent']],
    [UtdanningSvar.INGEN_UTDANNING, ['utdanningBestatt', 'utdanningGodkjent']],
]);

export const vanligFlyt: SkjemaConfig = new Map<Svar, string[]>();

function getSporsmalSomIkkeSkalBesvares(svar: Svar | undefined, config: SkjemaConfig): string[] {
    if (!svar || !config.has(svar)) {
        return [];
    } else {
        return config.get(svar)!;
    }
}

export function getAlleSporsmalSomIkkeSkalBesvares(
    sporsmalIder: SporsmalId[],
    svarState: SvarState,
    config?: SkjemaConfig
): string[] {
    let sporsmal: string[] = [];
    const skjemaConfig = config ? config : defaultConfigForSporsmalsflyt;
    sporsmalIder.forEach(sporsmalId =>
        sporsmal = [...sporsmal, ...getSporsmalSomIkkeSkalBesvares(hentSvar(svarState, sporsmalId), skjemaConfig)]);
    return sporsmal;
}

export function erSporsmalBesvart(svarState: SvarState, gjeldendeSporsmalId: SporsmalId): boolean {
    const svar = hentSvar(svarState, gjeldendeSporsmalId);
    return !!svar && svar.toString() !== IngenSvar.INGEN_SVAR.toString();
}

export function kanGaaTilNeste(svarState: SvarState, gjeldendeSporsmalId: SporsmalId): boolean {
    const sporsmalBesvart = erSporsmalBesvart(svarState, gjeldendeSporsmalId);
    return (gjeldendeSporsmalId === SporsmalId.sisteStilling) || sporsmalBesvart;
}

export function getSporsmalIder(props: SkjemaProps): SporsmalId[] {
    return props.children.map(child => child.props.sporsmalId);
}

export function hentGjeldendeSporsmalId(props: SkjemaProps): SporsmalId {
    const sporsmalIder = getSporsmalIder(props);
    const gjeldendeSporsmalPlassering = finnGjeldendeSporsmalPlassering(props);
    return sporsmalIder[gjeldendeSporsmalPlassering];
}

export function finnGjeldendeSporsmalPlassering(props: SkjemaProps): number {
    const plassering = Number.parseInt(props.match.params.id, 10);
    return isNumber(plassering) ? plassering : -1;
}

export function finnNesteSporsmalPlassering(props: SkjemaProps): number {

    const gjeldendeSporsmalPlassering = finnGjeldendeSporsmalPlassering(props);

    const foregaendeSporsmalIder =
        getSporsmalIder(props).filter((sporsmalId, indeks) => indeks <= gjeldendeSporsmalPlassering);

    const sporsmalIderSomIkkeSkalBesvares =
        getAlleSporsmalSomIkkeSkalBesvares(foregaendeSporsmalIder, props.svarState, props.config);

    const sporsmalIder = getSporsmalIder(props);

    for (let i = gjeldendeSporsmalPlassering + 1; i < sporsmalIder.length; i++) {

        if (!sporsmalIderSomIkkeSkalBesvares.includes(sporsmalIder[i])) {
            return i;
        }

    }

    return INGEN_NESTE_SPORSMAL;

}

export function finnNesteHref(props: SkjemaProps): string {

    const nesteSporsmalPlassering = finnNesteSporsmalPlassering(props);

    if (nesteSporsmalPlassering === INGEN_NESTE_SPORSMAL) {
        return props.endUrl;
    }

    return props.baseUrl + '/' + nesteSporsmalPlassering;

}
