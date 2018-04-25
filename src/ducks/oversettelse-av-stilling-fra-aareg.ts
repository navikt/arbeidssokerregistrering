import * as Api from './api';
import {doThenDispatch, STATUS} from './api-utils';
import {AppState} from '../reducer';

export enum ActionTypes {
    HENT_SISTE_STILLING_PENDING = 'HENT_SISTE_STILLING_PENDING',
    HENT_SISTE_STILLING_OK = 'HENT_SISTE_STILLING_OK',
    HENT_SISTE_STILLING_FEILET = 'HENT_SISTE_STILLING_FEILET',
}

export interface Data {
    koder: {
        label: string;
        kode: string;
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
    data: { koder: [{
        label: '',
        kode: '-1'
    }]},
    status: STATUS.NOT_STARTED
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.HENT_SISTE_STILLING_PENDING:
            if (state.status === STATUS.OK) {
                return {...state, status: STATUS.RELOADING};
            }
            return {...state, status: STATUS.PENDING};
        case ActionTypes.HENT_SISTE_STILLING_FEILET:
            return {...state, status: STATUS.ERROR};
        case ActionTypes.HENT_SISTE_STILLING_OK: {
            /*
            const forsteKode = action.data.koder[0];
            const data = {
                stilling: {
                    label: forsteKode.label,
                    konseptId: -1, // TODO Trenger ny tjeneste fra PAM
                    styrk08: forsteKode.kode,
                }
            };
            */
            return {...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentStillingFraPamGittStyrkkode(styrk: string) {
    return doThenDispatch(() => Api.hentStillingFraPamGittStyrkkode(styrk), {
        PENDING: ActionTypes.HENT_SISTE_STILLING_PENDING,
        OK: ActionTypes.HENT_SISTE_STILLING_OK,
        FEILET: ActionTypes.HENT_SISTE_STILLING_FEILET,
    });
}
export function selectOversettelseAvStillingFraAAReg(state: AppState): State {
    return state.oversettelseAvStillingFraAAReg;
}

export function selectSisteStillingNavnFraPam(state: AppState): string {
    const koder = state.oversettelseAvStillingFraAAReg.data.koder;
    return koder.length > 0 ? koder[0].label : '';
}

export function selectSisteStillingKodeFraPam(state: AppState): string {
    const koder = state.oversettelseAvStillingFraAAReg.data.koder;
    return koder.length > 0 ? koder[0].kode : '-1';
}
