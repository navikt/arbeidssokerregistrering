import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { Stilling } from './siste-stilling';
import {
    AndreForholdSvar,
    DinSituasjonSvar,
    HelseHinderSvar,
    SisteStillingSvar, UtdanningBestattSvar,
    UtdanningGodkjentSvar, UtdanningSvar
} from './svar-utils';

export enum ActionTypes {
    REG_BRUKER_STATUS_OK = 'REG_BRUKER_STATUS_OK',
    REG_BRUKER_STATUS_FEILET = 'REG_BRUKER_STATUS_FEILET',
    REG_BRUKER_STATUS_PENDING = 'REG_BRUKER_STATUS_PENDING'
}

export enum ErrorTypes {
    BRUKER_ER_UKJENT = 'BRUKER_ER_UKJENT',
    BRUKER_KAN_IKKE_REAKTIVERES = 'BRUKER_KAN_IKKE_REAKTIVERES',
    BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET = 'BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET',
    BRUKER_MANGLER_ARBEIDSTILLATELSE = 'BRUKER_MANGLER_ARBEIDSTILLATELSE',
}

export interface State {
    data: Data;
    status: string;
}

interface TekstForSvar {
    sporsmalId: string;
    sporsmal: string;
    svar: string;
}

export type TeksterForBesvarelse = TekstForSvar[];

export interface RegistreringBesvarelse {
    utdanning: UtdanningSvar;
    utdanningBestatt: UtdanningBestattSvar;
    utdanningGodkjent: UtdanningGodkjentSvar;
    helseHinder: HelseHinderSvar;
    andreForhold: AndreForholdSvar;
    sisteStilling: SisteStillingSvar;
    dinSituasjon: DinSituasjonSvar;
}

export interface RegistreringData {
    enigIOppsummering?: boolean;
    oppsummering?: string;
    sisteStilling?: Stilling;
    besvarelse?: RegistreringBesvarelse;
    teksterForBesvarelse?: TeksterForBesvarelse;
}

export interface ErrorData {
    data: {type: ErrorTypes | string};
}

export type Data = RegistreringData | ErrorData;

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    data: {},
    status: STATUS.OK
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.REG_BRUKER_STATUS_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.REG_BRUKER_STATUS_FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case ActionTypes.REG_BRUKER_STATUS_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function utforRegistrering(data: Data) {
    return doThenDispatch(() => Api.registrerBruker(data), {
        PENDING: ActionTypes.REG_BRUKER_STATUS_PENDING,
        OK: ActionTypes.REG_BRUKER_STATUS_OK,
        FEILET: ActionTypes.REG_BRUKER_STATUS_FEILET,
    });
}
