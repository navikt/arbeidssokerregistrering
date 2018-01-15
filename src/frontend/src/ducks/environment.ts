import * as Api from './api';
import { doThenDispatch, STATUS } from './utils';
import {
    Action, ActionType
} from './actions';

export interface EnvironmentData {
    veilarboppfolgingproxy_url?: string;
}

export interface EnvironmentState {
    data: EnvironmentData;
    status: string;
}

const initialState: EnvironmentState = {
    data: {},
    status: STATUS.NOT_STARTED
};

export default function (state: EnvironmentState = initialState, action: Action): EnvironmentState {
    switch (action.type) {
        case ActionType.HENT_ENVIRONMENT_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_ENVIRONMENT_ERROR:
            return {...state, status: STATUS.ERROR};
        case ActionType.HENT_ENVIRONMENT_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentEnvironment() {
    return doThenDispatch(() => Api.hentEnvironment(), {
        PENDING: ActionType.HENT_ENVIRONMENT_PENDING,
        OK: ActionType.HENT_ENVIRONMENT_OK,
        FEILET: ActionType.HENT_ENVIRONMENT_ERROR,
    });
}