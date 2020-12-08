import { AppState } from "../reducer";

export enum ActionTypes {
  ENDRE_SISTE_STILLING = "ENDRE_SISTE_STILLING",
}

export interface Data {
  stilling: Stilling;
}

export interface Stilling {
  label: string;
  konseptId: number;
  styrk08: string;
}

export interface State {
  data: Data;
}

interface Action {
  type: ActionTypes;
  data: Data;
}

export const tomStilling: Stilling = {
  label: "",
  styrk08: "-1",
  konseptId: -1,
};

export const ingenYrkesbakgrunn: Stilling = {
  label: "X",
  styrk08: "X",
  konseptId: -1,
};

export const annenStilling: Stilling = {
  label: "Annen stilling",
  styrk08: "-1",
  konseptId: -1,
};

const initialState = {
  data: {
    stilling: tomStilling,
  },
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.ENDRE_SISTE_STILLING: {
      return { ...state, data: action.data };
    }
    default:
      return state;
  }
}

export function velgSisteStilling(stilling: Stilling) {
  return {
    type: ActionTypes.ENDRE_SISTE_STILLING,
    data: {
      stilling: stilling,
    },
  };
}

export function selectSisteStilling(state: AppState): Stilling {
  return state.sisteStilling.data.stilling;
}
