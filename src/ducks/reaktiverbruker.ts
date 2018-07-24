import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';

export enum ActionTypes {
    REAKTIVER_BRUKER_STATUS_OK = 'REAKTIVER_BRUKER_STATUS_OK',
    REAKTIVER_BRUKER_STATUS_FEILET = 'REAKTIVER_BRUKER_STATUS_FEILET',
    REAKTIVER_BRUKER_STATUS_PENDING = 'REAKTIVER_BRUKER_STATUS_PENDING'
}

export interface State {
    data: Data;
    status: string;
}

export interface ReaktiveringData {
}

export type Data = ReaktiveringData;

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
        case ActionTypes.REAKTIVER_BRUKER_STATUS_PENDING:
            return {...state, status: STATUS.PENDING};
        case ActionTypes.REAKTIVER_BRUKER_STATUS_FEILET:
            return {...state, status: STATUS.ERROR, data: action.data};
        case ActionTypes.REAKTIVER_BRUKER_STATUS_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function reaktiverBruker() {
    return doThenDispatch(() => Api.startReaktivering(), {
        PENDING: ActionTypes.REAKTIVER_BRUKER_STATUS_PENDING,
        OK: ActionTypes.REAKTIVER_BRUKER_STATUS_OK,
        FEILET: ActionTypes.REAKTIVER_BRUKER_STATUS_FEILET,
    });
}
