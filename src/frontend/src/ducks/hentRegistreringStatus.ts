import * as Api from './api';
import { doThenDispatch, STATUS } from './utils';
import {
    Action, ActionType } from './actions';
import RegistreringStatus from './registrering-status-modell';

export interface RegStatusState {
    data: RegistreringStatus;
    status: string;
}

const initialState: RegStatusState = {
    data : {},
    status: STATUS.NOT_STARTED
};

export default function (state: RegStatusState = initialState, action: Action): RegStatusState {
    switch (action.type) {
        case ActionType.HENT_REGISTRERINGSTATUS:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionType.HENT_REGISTRERINGSTATUS_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionType.HENTET_REGISTRERINGSTATUS: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentRegistreringStatus(baseUrl: string) {
    return doThenDispatch(() => Api.hentRegistreringStatus(baseUrl), {
        PENDING: ActionType.HENT_REGISTRERINGSTATUS,
        OK : ActionType.HENTET_REGISTRERINGSTATUS,
        FEILET: ActionType.HENT_REGISTRERINGSTATUS_FEILET,
    });
}