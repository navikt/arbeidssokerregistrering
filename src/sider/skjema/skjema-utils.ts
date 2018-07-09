import { State as SvarState } from '../../ducks/svar';
import { DinSituasjonSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils';
import { InjectedIntl } from 'react-intl';

export type SkjemaConfig = Map<Svar, string[]>;

export function getTekstIdForSvar(sporsmalId: string, svar: Svar) {
    return `${sporsmalId.toLowerCase()}-svar-${svarSuffiksTilTekstId(svar)}`;
}

export function getIntlTekst(sporsmalId: string, kontekst: string, intl: InjectedIntl) {
    return intl.messages[`${sporsmalId.toLowerCase()}-${kontekst}`];
}

export function svarSuffiksTilTekstId(svar: Svar) {
    return svar.toString()
        .toLowerCase()
        .split('_')
        .join('-');
}

const defaultSkjemaConfig: SkjemaConfig = new Map<Svar, string[]>([
    [DinSituasjonSvar.ALDRI_HATT_JOBB, ['sisteStilling']],
    [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB, ['sisteStilling', 'utdanning', 'utdanningBestatt', 'utdanningGodkjent']],
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
    const skjemaConfig = config ? config : defaultSkjemaConfig;
    sporsmalIder.forEach(sporsmalId =>
        sporsmal = [...sporsmal, ...getSporsmalSomIkkeSkalBesvares(svarState[sporsmalId], skjemaConfig)]);
    return sporsmal;
}