import * as Api from './api';
import { doThenDispatch, STATUS } from './utils';
import { ActionType } from './types';
import InnloggingsInfo from './innloggings-info-modell';

interface HentInnloggingsInfoAction {
    type: ActionType.HENT_INNLOGGINGSINFO;
}

interface HentInnloggingsInfoFeiletAction {
    type: ActionType.HENT_INNLOGGINGSINFO_FEILET;
    // error: Error
}

interface HentetInnloggingsInfoAction {
    type: ActionType.HENTET_INNLOGGINGSINFO;
    data: InnloggingsInfo;
}

type Action = HentInnloggingsInfoAction | HentetInnloggingsInfoAction | HentInnloggingsInfoFeiletAction;

export interface InnloggingsInfoState {
    data: InnloggingsInfo;
    status: string;
}

const initialState: InnloggingsInfoState = {
    data: {},
    status: STATUS.NOT_STARTED
};

export default function (state: InnloggingsInfoState = initialState, action: Action): InnloggingsInfoState {
    switch (action.type) {
        case ActionType.HENT_INNLOGGINGSINFO:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionType.HENT_INNLOGGINGSINFO_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionType.HENTET_INNLOGGINGSINFO: {
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentInnloggingsInfo() {
    return doThenDispatch(() => Api.hentInnloggingsInfo(), {
        PENDING: ActionType.HENT_INNLOGGINGSINFO,
        OK: ActionType.HENTET_INNLOGGINGSINFO,
        FEILET: ActionType.HENT_INNLOGGINGSINFO_FEILET,
    });
}