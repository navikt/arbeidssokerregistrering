import { State as SvarState } from '../../ducks/svar';
import { DinSituasjonSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils';

export type SkjemaConfig = any; // tslint:disable-line no-any

export function getTekstIdForSvar(sporsmalId: string, svar: Svar) {
    return `${sporsmalId}-svar-${svarSuffiksTilTekstId(svar)}`;
}

export function svarSuffiksTilTekstId(svar: Svar) {
    return svar.toString()
        .toLowerCase()
        .split('_')
        .join('-');
}

const defaultSkjemaConfig: SkjemaConfig = {
    'din-situasjon': {
        svar: DinSituasjonSvar.ALDRI_HATT_JOBB,
        skip: ['siste-stilling'],
    },
    'utdanning': {
        svar: UtdanningSvar.INGEN_UTDANNING,
        skip: ['utdanningbestatt', 'utdanninggodkjent'],
    }
};

function getSporsmalSomIkkeSkalBesvares(
    sporsmalId: string,
    svar: Svar,
    skjemaConfig?: SkjemaConfig
): string[] {
    const config = skjemaConfig === undefined ? defaultSkjemaConfig : skjemaConfig;

    if (config[sporsmalId] === undefined || config[sporsmalId].svar !== svar) {
        return [];
    }  else {
        return config[sporsmalId].skip;
    }
}

export function getAlleSporsmalSomIkkeSkalBesvares(
    sporsmalIder: string[],
    svarState: SvarState,
    config?: SkjemaConfig
): string[] {
    let sporsmal: string[] = [];
    sporsmalIder.forEach(sporsmalId =>
        sporsmal = [...sporsmal, ...getSporsmalSomIkkeSkalBesvares(sporsmalId, svarState[sporsmalId], config)]);
    return sporsmal;
}