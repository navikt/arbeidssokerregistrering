import { Svar } from './svar-utils';

export enum ActionTypes {
    AVGI_SVAR = 'AVGI_SVAR',
    AVGI_SVAR_RESET = 'AVGI_SVAR_RESET',
}

export enum SporsmalId {
    utdanning = 'utdanning',
    utdanningBestatt = 'utdanningBestatt',
    utdanningGodkjent = 'utdanningGodkjent',
    helseHinder = 'helseHinder',
    andreForhold = 'andreForhold',
    sisteStilling = 'sisteStilling',
    dinSituasjon = 'dinSituasjon',

    fremtidigSituasjon = 'fremtidigSituasjon',
    hvorLangTid = 'hvorLangTid',
    stillingsprosent = 'stillingsprosent',
    tilbakeIArbeid = 'tilbakeIArbeid',
}

export type State = Data[];

export interface Data {
    svar: Svar;
    sporsmalId: SporsmalId;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = [];

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.AVGI_SVAR: {
            const sporsmalsindeks = state.findIndex(data => data.sporsmalId === action.data.sporsmalId);
            if (sporsmalsindeks === -1) {
                return [...state, action.data];
            } else {
                const newState = [...state];
                newState[sporsmalsindeks] = action.data;
                return newState;
            }
        }
        case ActionTypes.AVGI_SVAR_RESET: {
            return initialState;
        }
        default : {
            return state;
        }
    }
}

export function endreSvarAction(sporsmalId: string, svar: Svar) {
    return {
        type: ActionTypes.AVGI_SVAR,
        data: {
            sporsmalId,
            svar,
        }
    };
}

export function setInitialState() {
    return {
        type: ActionTypes.AVGI_SVAR_RESET
    };
}
