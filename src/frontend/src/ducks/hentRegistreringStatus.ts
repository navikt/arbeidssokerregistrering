import * as Api from './api';
import { doThenDispatch, STATUS } from './utils';
import RegistreringStatus from './registrering-status-modell';
import { ActionType } from './types';

interface HentRegisteringStatusAction {
    type: ActionType.HENT_REGISTRERINGSTATUS;
}

interface HentRegisteringStatusFeiletAction {
    type: ActionType.HENT_REGISTRERINGSTATUS_FEILET;
    // error: Error
}

interface HentetRegisteringStatusAction {
    type: ActionType.HENTET_REGISTRERINGSTATUS;
    data: RegistreringStatus;
}

type Action = HentRegisteringStatusAction | HentetRegisteringStatusAction | HentRegisteringStatusFeiletAction;

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

export function hentRegistreringStatus() {
    return doThenDispatch(() => Api.hentRegistreringStatus(), {
        PENDING: ActionType.HENT_REGISTRERINGSTATUS,
        OK : ActionType.HENTET_REGISTRERINGSTATUS,
        FEILET: ActionType.HENT_REGISTRERINGSTATUS_FEILET,
    });
}