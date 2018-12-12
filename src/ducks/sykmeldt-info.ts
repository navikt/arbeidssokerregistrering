import * as Api from './api';
import { doThenDispatch, FetchState, initialFetchState, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    HENT_SYKMELDT_INFO_OK = 'HENT_SYKMELDT_INFO_OK',
    HENT_SYKMELDT_INFO_FEILET = 'HENT_SYKMELDT_INFO_FEILET',
    HENT_SYKMELDT_INFO_PENDING = 'HENT_SYKMELDT_INFO_PENDING'
}

export interface State extends FetchState {
    data: Data;
}

export interface Data {
    maksDato?: string;
    erArbeidsrettetOppfolgingSykmeldtInngangAktiv?: boolean;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

export default function (state: State = initialFetchState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_SYKMELDT_INFO_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionTypes.HENT_SYKMELDT_INFO_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionTypes.HENT_SYKMELDT_INFO_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentSykmeldtInfo() {
    return doThenDispatch(() => Api.hentSykmeldtInfo(), {
        PENDING: ActionTypes.HENT_SYKMELDT_INFO_PENDING,
        OK : ActionTypes.HENT_SYKMELDT_INFO_OK,
        FEILET: ActionTypes.HENT_SYKMELDT_INFO_FEILET,
    });
}

export function selectSykmeldtInfo(state: AppState): State {
    return state.sykmeldtInfo;
}