import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_KRR_STATUS_PENDING = 'HENT_KRR_STATUS_PENDING',
    HENT_KRR_STATUS_OK = 'HENT_KRR_STATUS_OK',
    HENT_KRR_STATUS_FEILET = 'HENT_KRR_STATUS_FEILET',
}

export interface Data {
    reservertIKrr?: boolean;
}

export interface State {
    data: Data;
    status: string;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    data : {},
    status: STATUS.NOT_STARTED
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_KRR_STATUS_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionTypes.HENT_KRR_STATUS_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionTypes.HENT_KRR_STATUS_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentKrrStatus() {
    return doThenDispatch(() => Api.hentKrrStatus(), {
        PENDING: ActionTypes.HENT_KRR_STATUS_PENDING,
        OK : ActionTypes.HENT_KRR_STATUS_OK,
        FEILET: ActionTypes.HENT_KRR_STATUS_FEILET,
    });
}

export function selectKrr(state: AppState) {
    return state.krr;
}