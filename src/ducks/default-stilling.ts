import { Stilling, tomStilling } from './siste-stilling'

export enum ActionTypes {
  SETT_DEFAULT_STILLING = 'SETT_DEFAULT_STILLING',
}

export interface State {
  stilling: Stilling
}

export interface Data {
  stilling: Stilling
}

interface Action {
  type: ActionTypes
  data: Data
}

const initialState = { stilling: tomStilling }

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.SETT_DEFAULT_STILLING: {
      return { stilling: action.data.stilling }
    }
    default: {
      return state
    }
  }
}

export function settDefaultStilling (stilling: Stilling): Action {
  return {
    type: ActionTypes.SETT_DEFAULT_STILLING,
    data: { stilling }
  }
}
