import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';
import { VEILARBOPPFOLGINGPROXY_URL, VEILARBREGISTRERING_URL } from './api';

export const backendToggle = 'arbeidssokerregistrering.ta-i-bruk-ny-backend';

export function getRegistreringBackendUrl(featureToggles: Data) {
    return (featureToggles[backendToggle]) ? VEILARBREGISTRERING_URL : VEILARBOPPFOLGINGPROXY_URL;
}

export enum ActionTypes {
    FEATURE_TOGGLES_PENDING = 'FEATURE_TOGGLES_PENDING',
    FEATURE_TOGGLES_OK = 'FEATURE_TOGGLES_OK',
    FEATURE_TOGGLES_FEILET = 'FEATURE_TOGGLES_FEILET',
}

export interface Data {
    'arbeidssokerregistrering.ta-i-bruk-ny-backend': boolean;
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
        'arbeidssokerregistrering.ta-i-bruk-ny-backend': false
    },
    status: STATUS.NOT_STARTED
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.FEATURE_TOGGLES_PENDING:
            if (state.status === STATUS.OK) {
                return { ...state, status: STATUS.RELOADING };
            }
            return { ...state, status: STATUS.PENDING };
        case ActionTypes.FEATURE_TOGGLES_FEILET:
            return { ...state, status: STATUS.ERROR };
        case ActionTypes.FEATURE_TOGGLES_OK: {
            return { ...state, status: STATUS.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentFeatureToggles() {
    return doThenDispatch(() => Api.hentFeatureToggles(), {
        PENDING: ActionTypes.FEATURE_TOGGLES_PENDING,
        OK : ActionTypes.FEATURE_TOGGLES_OK,
        FEILET: ActionTypes.FEATURE_TOGGLES_FEILET,
    });
}

export function selectFeatureToggles(state: AppState): Data {
    return state.featureToggles.data;
}