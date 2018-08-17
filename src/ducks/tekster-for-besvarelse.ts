export enum ActionTypes {
    OPPDATER_TEKSTER = 'OPPDATER_TEKSTER',
}

interface TekstForSvar {
    sporsmalId: string;
    sporsmal: string;
    svar: string;
}

export type State = TekstForSvar[];

export type Data = TekstForSvar[];

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = [];

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.OPPDATER_TEKSTER: {
            return action.data;
        }
        default: {
            return state;
        }
    }
}

export function oppdaterTeksterAction(teksterForBesvarelse: TekstForSvar[]): Action {
    return {
        type: ActionTypes.OPPDATER_TEKSTER,
        data: teksterForBesvarelse,
    };
}