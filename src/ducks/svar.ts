import {
    AndreForholdSvar, DinSituasjonSvar,
    HelseHinderSvar, SisteStillingSvar, Svar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from './svar-utils';

export enum ActionTypes {
    AVGI_SVAR = 'AVGI_SVAR',
    AVGI_SVAR_RESET = 'AVGI_SVAR_RESET'
}

export enum SporsmalId {
    utdanning = 'utdanning',
    utdanningBestatt = 'utdanningBestatt',
    utdanningGodkjent = 'utdanningGodkjent',
    helseHinder = 'helseHinder',
    andreForhold = 'andreForhold',
    sisteStilling = 'sisteStilling',
    dinSituasjon = 'dinSituasjon',
}

export type State = {
    utdanning?: UtdanningSvar;
    utdanningBestatt?: UtdanningBestattSvar;
    utdanningGodkjent?: UtdanningGodkjentSvar;
    helseHinder?: HelseHinderSvar;
    andreForhold?: AndreForholdSvar;
    sisteStilling?: SisteStillingSvar;
    dinSituasjon?: DinSituasjonSvar;
};

export interface Data {
    svar: Svar;
    sporsmalId: string;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.AVGI_SVAR: {
            let stateWithAddedProperty = {...state};
            stateWithAddedProperty[action.data.sporsmalId] = action.data.svar;
            return stateWithAddedProperty;
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
