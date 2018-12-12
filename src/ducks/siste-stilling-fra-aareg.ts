import * as Api from './api';
import { doThenDispatch, FetchState, initialFetchState, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    SISTE_ARBEIDSFORHOLD_FRA_AAREG_PENDING = 'SISTE_ARBEIDSFORHOLD_FRA_AAREG_PENDING',
    SISTE_ARBEIDSFORHOLD_FRA_AAREG_OK = 'SISTE_ARBEIDSFORHOLD_FRA_AAREG_OK',
    SISTE_ARBEIDSFORHOLD_FRA_AAREG_FEILET = 'SISTE_ARBEIDSFORHOLD_FRA_AAREG_FEILET',
}

export interface Data {
    styrk?: string;
}

export interface State extends FetchState {
    data: Data;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

export default function (state: State = initialFetchState, action: Action): State {
    switch (action.type) {
        case ActionTypes.SISTE_ARBEIDSFORHOLD_FRA_AAREG_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionTypes.SISTE_ARBEIDSFORHOLD_FRA_AAREG_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionTypes.SISTE_ARBEIDSFORHOLD_FRA_AAREG_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentStyrkkodeForSisteStillingFraAAReg() {
    return doThenDispatch(() => Api.hentStyrkkodeForSisteStillingFraAAReg(), {
        PENDING: ActionTypes.SISTE_ARBEIDSFORHOLD_FRA_AAREG_PENDING,
        OK : ActionTypes.SISTE_ARBEIDSFORHOLD_FRA_AAREG_OK,
        FEILET: ActionTypes.SISTE_ARBEIDSFORHOLD_FRA_AAREG_FEILET,
    });
}

export function selectSisteStillingFraAAReg(state: AppState): State {
    return state.sisteStillingFraAAReg;
}