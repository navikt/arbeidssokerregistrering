import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';
import { mapSvar } from '../utils/utils';
import { selectSisteStillingKodeFraPam } from './stilling-fra-pam';

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
    nusKode?: string;
    yrkesPraksis?: string;
    enigIOppsummering?: boolean;
    oppsummering?: string;
    utdanningBestatt?: boolean;
    utdanningGodkjentNorge?: boolean;
    harHelseutfordringer?: boolean;
}

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
        case ActionTypes.REG_BRUKER_STATUS_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.REG_BRUKER_STATUS_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.REG_BRUKER_STATUS_OK: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function utforRegistrering(data: Data) {
    return doThenDispatch(() => Api.registrerBruker(data), {
        PENDING: ActionTypes.REG_BRUKER_STATUS_PENDING,
        OK: ActionTypes.REG_BRUKER_STATUS_OK,
        FEILET: ActionTypes.REG_BRUKER_STATUS_FEILET,
    });
}

export function mapBrukerRegistreringsData(state: AppState): State {
    const yrkesPraksis = selectSisteStillingKodeFraPam(state);
    return {
        data: mapSvar(state.svar, state.oppsummering, yrkesPraksis),
        status: state.registrerBruker.status
    };
}