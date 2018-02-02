import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    REG_BRUKER_STATUS_OK = 'REG_BRUKER_STATUS_OK',
    REG_BRUKER_STATUS_FEILET = 'REG_BRUKER_STATUS_FEILET',
    REG_BRUKER_STATUS_PENDING = 'REG_BRUKER_STATUS_PENDING'
}

export interface State {
    data: Data;
    status: string;
}

export interface Data {
    registrertOk?: boolean;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    data : {},
    status: STATUS.OK
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.REG_BRUKER_STATUS_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionTypes.REG_BRUKER_STATUS_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionTypes.REG_BRUKER_STATUS_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function utforRegistrering() {
    return doThenDispatch(() => Api.registrerBruker(), {
        PENDING: ActionTypes.REG_BRUKER_STATUS_PENDING,
        OK : ActionTypes.REG_BRUKER_STATUS_OK,
        FEILET: ActionTypes.REG_BRUKER_STATUS_FEILET,
    });
}

export function selectRegistrerBruker(state: AppState): State {
    return state.registrerBruker;
}