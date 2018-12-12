import * as Api from './api';
import { doThenDispatch, FetchState, initialFetchState, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_REG_STATUS_OK = 'HENT_REG_STATUS_OK',
    HENT_REG_STATUS_FEILET = 'HENT_REG_STATUS_FEILET',
    HENT_REG_STATUS_PENDING = 'HENT_REG_STATUS_PENDING'
}

export enum RegistreringType {
    REAKTIVERING = 'REAKTIVERING',
    SPERRET = 'SPERRET',
    ALLEREDE_REGISTRERT = 'ALLEREDE_REGISTRERT',
    SYKMELDT_REGISTRERING = 'SYKMELDT_REGISTRERING',
    ORDINAER_REGISTRERING = 'ORDINAER_REGISTRERING'
}

export interface State extends FetchState {
    data: Data;
}

export interface Data {
    underOppfolging?: boolean;
    jobbetSeksAvTolvSisteManeder?: boolean;
    maksDato?: string;
    registreringType?: RegistreringType;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

export default function (state: State = initialFetchState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_REG_STATUS_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionTypes.HENT_REG_STATUS_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionTypes.HENT_REG_STATUS_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentRegistreringStatus() {
    return doThenDispatch(() => Api.hentRegistreringStatus(), {
        PENDING: ActionTypes.HENT_REG_STATUS_PENDING,
        OK : ActionTypes.HENT_REG_STATUS_OK,
        FEILET: ActionTypes.HENT_REG_STATUS_FEILET,
    });
}

export function selectRegistreringstatus(state: AppState): State {
    return state.registreringStatus;
}