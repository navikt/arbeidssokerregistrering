import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_BRUKERS_FNR_OK = 'HENT_BRUKERS_FNR_OK',
    HENT_BRUKERS_FNR_PENDING = 'HENT_BRUKERS_FNR_PENDING',
    HENT_BRUKERS_FNR_FEILET = 'HENT_BRUKERS_FNR_FEILET'
}

export interface State {
    data: Data;
    status: string;
}

export interface Data {
    id?: string;
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
        case ActionTypes.HENT_BRUKERS_FNR_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_BRUKERS_FNR_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_BRUKERS_FNR_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentBrukersFnr() {
    return doThenDispatch(() => Api.hentBrukersFnr(), {
        PENDING: ActionTypes.HENT_BRUKERS_FNR_PENDING,
        OK: ActionTypes.HENT_BRUKERS_FNR_OK,
        FEILET: ActionTypes.HENT_BRUKERS_FNR_FEILET,
    });
}

export function selectBrukersFnr(state: AppState): State {
    return state.brukersFnr;
}