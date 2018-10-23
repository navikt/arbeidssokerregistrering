import { AppState } from '../reducer';

export enum ActionTypes {
    OPPDATER_SPORSMAL_LOP = 'OPPDATER_SPORSMAL_LOP'
}

export enum SporsmalLop {
    ORDINAER_REGISTRERING = 'ORDINAER_REGISTRERING',
    SYKEFRAVAER_REGISTRERING = 'SYKEFRAVAER_REGISTRERING'
}

export interface State {
    sporsmalLop: SporsmalLop;
}

export type Data = State;

interface Action {
    type: ActionTypes;
    data: Data;
}

const initialState = {
    sporsmalLop: SporsmalLop.ORDINAER_REGISTRERING
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.OPPDATER_SPORSMAL_LOP:
            return { sporsmalLop: action.data.sporsmalLop };
        default:
            return state;
    }
}

export function oppdaterSporsmalLop(sporsmalLop: SporsmalLop): Action {
   return {
       type: ActionTypes.OPPDATER_SPORSMAL_LOP,
       data: { sporsmalLop }
   };
}

export function selectSporsmalLop(state: AppState): SporsmalLop {
    return state.sporsmalLop.sporsmalLop;
}
