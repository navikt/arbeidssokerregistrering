import * as Api from './api';
import { doThenDispatch, STATUS } from './api-utils';
import { AppState } from '../reducer';

export enum ActionTypes {
    FEATURE_TOGGLES_PENDING = 'FEATURE_TOGGLES_PENDING',
    FEATURE_TOGGLES_OK = 'FEATURE_TOGGLES_OK',
    FEATURE_TOGGLES_FEILET = 'FEATURE_TOGGLES_FEILET',
}

export interface Data {
    'arbeidssokerregistrering.nedetid': boolean;
    'arbeidssokerregistrering.nedetid.nyttaar': boolean;
    'arbeidssokerregistrering.kunngjoring': boolean;
    'arbeidssokerregistrering.kontaktmeg.kontor-030102': boolean;
    'arbeidssokerregistrering.kontaktmeg.kontor-500101': boolean;
    'arbeidssokerregistrering.kontaktmeg.kontor-500102': boolean;
    'arbeidssokerregistrering.kontaktmeg.kontor-0412': boolean;
    'arbeidssokerregistrering.sperret.ny-versjon': boolean;
}

export interface State {
    data: Data;
    status: string;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

export const alleFeatureToggles = [
    'arbeidssokerregistrering.nedetid',
    'arbeidssokerregistrering.nedetid.nyttaar',
    'arbeidssokerregistrering.kunngjoring',
    'arbeidssokerregistrering.kontaktmeg.kontor-030102',
    'arbeidssokerregistrering.kontaktmeg.kontor-500101',
    'arbeidssokerregistrering.kontaktmeg.kontor-500102',
    'arbeidssokerregistrering.kontaktmeg.kontor-0412',
    'arbeidssokerregistrering.sperret.ny-versjon'
];

const initialState = {
    data : {
        'arbeidssokerregistrering.nedetid': false,
        'arbeidssokerregistrering.nedetid.nyttaar': false,
        'arbeidssokerregistrering.kunngjoring': false,
        'arbeidssokerregistrering.kontaktmeg.kontor-030102': false,
        'arbeidssokerregistrering.kontaktmeg.kontor-500101': false,
        'arbeidssokerregistrering.kontaktmeg.kontor-500102': false,
        'arbeidssokerregistrering.kontaktmeg.kontor-0412': false,
        'arbeidssokerregistrering.sperret.ny-versjon': false
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

export function selectFeatureTogglesState(state: AppState): State {
    return state.featureToggles;
}