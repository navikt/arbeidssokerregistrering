import { State as SvarState } from '../../ducks/svar';
import { Svar } from '../../ducks/svar-utils';

export type SkjemaConfig = any; // tslint:disable-line no-any

export function getTekstIdForSvar(sporsmalId: string, svar: Svar) {
    return `${sporsmalId}-svar-${svarSuffiksTilTekstId(svar)}`;
}

function svarSuffiksTilTekstId(svar: Svar) {
    return svar.toString()
        .toLowerCase()
        .replace('_', '-');
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