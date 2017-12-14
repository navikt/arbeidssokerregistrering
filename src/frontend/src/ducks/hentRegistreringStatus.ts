import * as Api from './api';
import { doThenDispatch, STATUS } from './utils';

export const OK = 'hentRegistreringStatus/OK';
export const FEILET = 'hentRegistreringStatus/FEILET';
export const PENDING = 'hentRegistreringStatus/PENDING';

export interface RegStatusState {
    data: {
        erUnderOppfolging?: boolean;
        oppfyllerKrav?: boolean;
    };
    status?: string;
}

interface Action {
    type: string;
    data: {
        erUnderOppfolging: string;
        oppfyllerKrav: string;
    };
}

const initialState: RegStatusState = {
    data : {
        erUnderOppfolging: false,
        oppfyllerKrav: true,
    }
};

export default function (state: RegStatusState = initialState, action: Action) {
    switch (action.type) {
        case PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK: {
            return { ...state, status: STATUS.OK, data: action.data };
        }
        default:
            return state;
    }
}

export function hentRegistreringStatus(fnr: string) {
    return doThenDispatch(() => Api.hentRegistreringStatus(fnr), {
        OK,
        FEILET,
        PENDING
    });
}