import { State as SvarState } from '../../ducks/svar';

export type SkjemaConfig = any; // tslint:disable-line no-any

export function getTekstIdForAlternativ(sporsmalId: string, alternativId: number) {
    return `${sporsmalId}-alternativ-${alternativId}`;
}

const defaultSkjemaConfig: SkjemaConfig = {
    'din-situasjon': {
        alternativId: 2,
        skip: ['siste-stilling'],
    },
    'utdanning': {
        alternativId: 1,
        skip: ['utdanningbestatt', 'utdanninggodkjent'],
    }
};

function getSporsmalSomIkkeSkalBesvares(
    sporsmalId: string,
    alternativId: number,
    skjemaConfig?: SkjemaConfig
): string[] {
    const config = skjemaConfig === undefined ? defaultSkjemaConfig : skjemaConfig;

    if (config[sporsmalId] === undefined || config[sporsmalId].alternativId !== alternativId) {
        return [];
    }  else {
        return config[sporsmalId].skip;
    }
}

export function getAlleSporsmalSomIkkeSkalBesvares(
    sporsmalIder: string[],
    svar: SvarState,
    config?: SkjemaConfig
): string[] {
    let sporsmal: string[] = [];
    sporsmalIder.forEach(sporsmalId =>
        sporsmal = [...sporsmal, ...getSporsmalSomIkkeSkalBesvares(sporsmalId, svar[sporsmalId], config)]);
    return sporsmal;
}