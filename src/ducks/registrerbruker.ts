import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';
import { mapAvgitteSvarForBackend } from '../utils/utils';
import { selectSisteStilling, Stilling } from './siste-stilling';
import { State as SvarState } from './svar';

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

export enum EnigIOppsummering {
    JA = 'JA',
    NEI = 'NEI',
}

export interface State {
    data: Data;
    status: string;
}

export interface RegistreringData {
    enigIOppsummering?: EnigIOppsummering;
    oppsummering?: string;
    sisteStilling?: Stilling;
    besvarelse?: SvarState;
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

export function mapBrukerRegistreringsData(state: AppState): State {
    return {
        data: mapAvgitteSvarForBackend(state.svar, selectSisteStilling(state)),
        status: state.registrerBruker.status
    };
}