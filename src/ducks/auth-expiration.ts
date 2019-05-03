import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_AUTHEXPIRATION_OK = 'HENT_AUTHEXPIRATION_OK',
    HENT_AUTHEXPIRATION_PENDING = 'HENT_AUTHEXPIRATION_PENDING',
    HENT_AUTHEXPIRATION_FEILET = 'HENT_AUTHEXPIRATION_FEILET'
}

export interface State {
    data: Data;
    status: string;
}

export interface Data {
    remainingSeconds?: number;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    data: {},
    status: STATUS.NOT_STARTED
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_AUTHEXPIRATION_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_AUTHEXPIRATION_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_AUTHEXPIRATION_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentAuthExpiration() {
    return doThenDispatch(() => {
        return Api.hentAuthExpiration();
    }, {
        PENDING: ActionTypes.HENT_AUTHEXPIRATION_PENDING,
        OK: ActionTypes.HENT_AUTHEXPIRATION_OK,
        FEILET: ActionTypes.HENT_AUTHEXPIRATION_FEILET,
    });
}

export function selectAutentiseringsinfo(state: AppState): State {
    return state.authExpiration;
}
