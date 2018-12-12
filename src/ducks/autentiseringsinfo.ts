import * as Api from './api';
import { doThenDispatch, FetchState, initialFetchState, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_AUTENTISERINGSINFO_OK = 'HENT_AUTENTISERINGSINFO_OK',
    HENT_AUTENTISERINGSINFO_PENDING = 'HENT_AUTENTISERINGSINFO_PENDING',
    HENT_AUTENTISERINGSINFO_FEILET = 'HENT_AUTENTISERINGSINFO_FEILET'
}

export interface State extends FetchState {
    data: Data;
}

export interface Data {
    nivaOidc?: number;
    niva?: number;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

export default function (state: State = initialFetchState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_AUTENTISERINGSINFO_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_AUTENTISERINGSINFO_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_AUTENTISERINGSINFO_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentAutentiseringsInfo() {
    return doThenDispatch(() => Api.hentAutentiseringsInfo(), {
        PENDING: ActionTypes.HENT_AUTENTISERINGSINFO_PENDING,
        OK: ActionTypes.HENT_AUTENTISERINGSINFO_OK,
        FEILET: ActionTypes.HENT_AUTENTISERINGSINFO_FEILET,
    });
}

export function selectAutentiseringsinfo(state: AppState): State {
    return state.autentiseringsInfo;
}