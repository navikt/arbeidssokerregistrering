import { State as SvarState } from '../../ducks/svar';
import { DinSituasjonSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils';
import { InjectedIntl } from 'react-intl';

export type SkjemaConfig = Map<Svar, string[]>;

export function getTekstIdForSvar(sporsmalId: string, svar: Svar) {
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

const defaultConfigForSporsmalsflyt: SkjemaConfig = new Map<Svar, string[]>([
    // Denne configgen sier noe om hvilke spørsmål man skal hoppe over, gitt brukerens svar.
    // For eksempel betyr [ALDRI_HATT_JOBB, ['sisteStilling']] at man skal hoppe over spørsmålet om sisteStilling
    // hvis man svarer ALDRI_HATT_JOBB på spørsmålet om dinSituasjon.

    [DinSituasjonSvar.ALDRI_HATT_JOBB, ['sisteStilling']],
    [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB, ['utdanning', 'utdanningBestatt', 'utdanningGodkjent']],
    [UtdanningSvar.INGEN_UTDANNING, ['utdanningBestatt', 'utdanningGodkjent']],
]);

export function getSporsmalSomIkkeSkalBesvares(svar: Svar, config: SkjemaConfig): string[] {
    return config.has(svar) ? config.get(svar)! : [];
}

export function getAlleSporsmalSomIkkeSkalBesvares(
    sporsmalIder: string[],
    svarState: SvarState,
    config?: SkjemaConfig
): string[] {
    let sporsmal: string[] = [];
    const skjemaConfig = config ? config : defaultConfigForSporsmalsflyt;
    sporsmalIder.forEach(sporsmalId =>
        sporsmal = [...sporsmal, ...getSporsmalSomIkkeSkalBesvares(svarState[sporsmalId], skjemaConfig)]);
    return sporsmal;
}