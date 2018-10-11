import { SporsmalId, State as SvarState } from '../../ducks/svar';
import { DinSituasjonSvar, hentSvar, IngenSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils';
import { InjectedIntl } from 'react-intl';

export type SkjemaConfig = Map<Svar, string[]>;

export function getTekstIdForSvar(sporsmalId: SporsmalId, svar: Svar) {
    return `${sporsmalId.toLowerCase()}-svar-${svarSuffiksTilTekstId(svar)}`;
}

export type TekstKontekst = 'tittel' | 'info' | 'ingress';
export function getIntlTekstForSporsmal(sporsmalId: string, kontekst: TekstKontekst, intl: InjectedIntl): string {
    return intl.messages[`${sporsmalId.toLowerCase()}-${kontekst}`];
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

export const defaultConfigForSporsmalsflyt: SkjemaConfig = new Map<Svar, string[]>([
    // Denne configgen sier noe om hvilke spørsmål man skal hoppe over, gitt brukerens svar.
    // For eksempel betyr [ALDRI_HATT_JOBB, ['sisteStilling']] at man skal hoppe over spørsmålet om sisteStilling
    // hvis man svarer ALDRI_HATT_JOBB på spørsmålet om dinSituasjon.

    [DinSituasjonSvar.ALDRI_HATT_JOBB, ['sisteStilling']],
    [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB, ['utdanning', 'utdanningBestatt', 'utdanningGodkjent']],
    [UtdanningSvar.INGEN_UTDANNING, ['utdanningBestatt', 'utdanningGodkjent']],
]);

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

/*
export const hentGjeldendeSporsmalId = (sporsmalIder: SporsmalId[], gjeldendeSpo): SporsmalId => {
    const sporsmalIder = this.getSporsmalIder();
    const gjeldendeSporsmalPlassering = this.finnGjeldendeSporsmalPlassering();
    return sporsmalIder[gjeldendeSporsmalPlassering];
};
*/

export function erSporsmalBesvart(svarState: SvarState, gjeldendeSporsmalId: SporsmalId): boolean {
    const svar = hentSvar(svarState, gjeldendeSporsmalId);
    return !!svar && svar.toString() !== IngenSvar.INGEN_SVAR.toString();
}

export function kanGaaTilNeste(svarState: SvarState, gjeldendeSporsmalId: SporsmalId): boolean {
    const sporsmalBesvart = erSporsmalBesvart(svarState, gjeldendeSporsmalId);
    return (gjeldendeSporsmalId === SporsmalId.sisteStilling) || sporsmalBesvart;
}