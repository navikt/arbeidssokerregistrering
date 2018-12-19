import { SporsmalId, State as SvarState } from '../../ducks/svar';
import {
    DinSituasjonSvar,
    hentSvar,
    IngenSvar,
    Svar,
    TilbakeIArbeidSvar,
    UtdanningSvar
} from '../../ducks/svar-utils';
import { InjectedIntl } from 'react-intl';
import {Props as SkjemaProps } from './skjema';
import { RegistreringType } from '../../ducks/registreringstatus';
import { INFOSIDE_PATH } from '../../utils/konstanter';
import {
    hoppOverAlleUtdanningSporsmalene,
    hoppOverSisteStillingSporsmal,
    hoppOverUtdanningBestattOgGodkjentSporsmalene, spmSomIkkeSkalBesvaresConfig
} from './skjema-config';

export const INGEN_NESTE_SPORSMAL = -1;

export type SkjemaConfig = Map<Svar, string[]>;

export function getTekstIdForSvar(sporsmalId: SporsmalId, svar: Svar | undefined) {
    if (!svar) {
        return '';
    }
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

    [DinSituasjonSvar.ALDRI_HATT_JOBB, hoppOverSisteStillingSporsmal],
    [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB, hoppOverAlleUtdanningSporsmalene],
    [UtdanningSvar.INGEN_UTDANNING, hoppOverUtdanningBestattOgGodkjentSporsmalene],
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

        const tilbakeIArbeidSvar = hentSvar(props.svarState, SporsmalId.tilbakeIArbeid);

        if (tilbakeIArbeidSvar && tilbakeIArbeidSvar === TilbakeIArbeidSvar.JA_FULL_STILLING) {
            return INFOSIDE_PATH;
        }

        return props.endUrl;
    }

    return props.baseUrl + '/' + nesteSporsmalPlassering;

}

export function nullStillSporsmalSomIkkeSkalBesvares(sporsmalId: SporsmalId, svar: Svar,
                                                     endreSvar: (spmId: SporsmalId, svar: Svar) => void,
                                                     resetSvar: (spmId: SporsmalId) => void) {

    console.log("nullstill", sporsmalId, svar); // tslint:disable-line

    spmSomIkkeSkalBesvaresConfig.forEach((config) => {
        if (config.id === sporsmalId && config.svar === svar) {
            config.spmHoppOver.forEach((spmId) => {
                endreSvar(spmId, IngenSvar.INGEN_SVAR);
            });
        } else if (config.id === sporsmalId) {
            config.spmHoppOver.forEach((spmId) => {
                resetSvar(spmId);
            });
        }

    });
}