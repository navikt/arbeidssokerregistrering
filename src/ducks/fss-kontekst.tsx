import { AppState } from '../reducer';

export enum ActionTypes {
    SETT_KONTEKST = 'SETT_KONTEKST',
}

export type Data = Partial<State>;

export interface State {
    aktivBruker: string | null;
    aktivEnhet: string | null;
}

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState: State = {
    aktivBruker: null,
    aktivEnhet: null
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.SETT_KONTEKST:
            return { ...state, ...action.data };
        default:
            return state;
    }
}

export function settFssKontekst(data: Data): Action {
    return {
        type: ActionTypes.SETT_KONTEKST,
        data
    };
}

export function selectBrukerFnr(state: AppState): string | null {
    return state.fssKontekst.aktivBruker;
}

export function selectVeilederEnhetId(state: AppState): string | null {
    return state.fssKontekst.aktivEnhet;
}
