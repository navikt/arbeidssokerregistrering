import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_BRUKERINFO_OK = 'HENT_BRUKERINFO_OK',
    HENT_BRUKERINFO_PENDING = 'HENT_BRUKERINFO_PENDING',
    HENT_BRUKERINFO_FEILET = 'HENT_BRUKERINFO_FEILET'
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
        case ActionTypes.HENT_BRUKERINFO_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_BRUKERINFO_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_BRUKERINFO_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentBrukerInfo() {
    return doThenDispatch(() => Api.hentBrukerInfo(), {
        PENDING: ActionTypes.HENT_BRUKERINFO_PENDING,
        OK: ActionTypes.HENT_BRUKERINFO_OK,
        FEILET: ActionTypes.HENT_BRUKERINFO_FEILET,
    });
}

export function selectBrukerInfo(state: AppState): State {
    return state.brukerInfo;
}