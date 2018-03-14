import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    STILLING_FRA_PAM_PENDING = 'STILLING_FRA_PAM_PENDING',
    STILLING_FRA_PAM_OK = 'STILLING_FRA_PAM_OK',
    STILLING_FRA_PAM_FEILET = 'STILLING_FRA_PAM_FEILET',
}

export interface Data {
    koder: {
        label: string,
        kode: string
    }[];
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
    data : {
        koder: [{
            label: '',
            kode: '9999'
        }]
    },
    status: STATUS.NOT_STARTED
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.STILLING_FRA_PAM_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionTypes.STILLING_FRA_PAM_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionTypes.STILLING_FRA_PAM_OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentStillingFraPamGittStyrkkode(styrk: string) {
    return doThenDispatch(() => Api.hentStillingFraPamGittStyrkkode(styrk), {
        PENDING: ActionTypes.STILLING_FRA_PAM_PENDING,
        OK : ActionTypes.STILLING_FRA_PAM_OK,
        FEILET: ActionTypes.STILLING_FRA_PAM_FEILET,
    });
}

export function selectStillingFraPam(state: AppState): State {
    return state.stillingFraPam;
}

export function selectSisteStillingNavnFraPam(state: AppState): string {
    const koder = state.stillingFraPam.data.koder;
    return koder.length > 0 ? koder[0].label : '';
}

export function selectSisteStillingKodeFraPam(state: AppState): string {
    const koder = state.stillingFraPam.data.koder;
    return koder.length > 0 ? koder[0].kode : '9999';
}
