import { State as SvarState } from '../../ducks/svar';
import { DinSituasjonSvar, Svar, UtdanningSvar } from '../../ducks/svar-utils';
import { InjectedIntl } from 'react-intl';

export type SkjemaConfig = any; // tslint:disable-line no-any

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

const defaultSkjemaConfig: SkjemaConfig = {
    'dinSituasjon': {
        svar: DinSituasjonSvar.ALDRI_HATT_JOBB,
        skip: ['sisteStilling'],
    },
    'utdanning': {
        svar: UtdanningSvar.INGEN_UTDANNING,
        skip: ['utdanningBestatt', 'utdanningGodkjent'],
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