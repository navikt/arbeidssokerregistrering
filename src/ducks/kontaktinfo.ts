import * as Api from './api'
import { doThenDispatch, STATUS } from './api-utils'
import { AppState } from '../reducer'

export enum ActionTypes {
  HENT_KONTAKTINFO_OK = 'HENT_KONTAKTINFO_OK',
  HENT_KONTAKTINFO_PENDING = 'HENT_KONTAKTINFO_PENDING',
  HENT_KONTAKTINFO_FEILET = 'HENT_KONTAKTINFO_FEILET'
}

export interface State {
  data: Data
  status: string
}

export interface Data {
  telefonnummerHosKrr?: string
  telefonnummerHosNav?: string
}

interface Action {
  type: ActionTypes
  data: Data
}

const initialState = {
  data: {},
  status: STATUS.NOT_STARTED
}

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.HENT_KONTAKTINFO_PENDING:
      if (state.status === STATUS.OK) {
        return { ...state, status: STATUS.RELOADING }
      }
      return { ...state, status: STATUS.PENDING }
    case ActionTypes.HENT_KONTAKTINFO_FEILET:
      return { ...state, status: STATUS.ERROR }
    case ActionTypes.HENT_KONTAKTINFO_OK: {
      return { ...state, status: STATUS.OK, data: action.data }
    }
    default:
      return state
  }
}

export function hentKontaktinfo () {
  return doThenDispatch(() => Api.hentKontaktinfo(), {
    PENDING: ActionTypes.HENT_KONTAKTINFO_PENDING,
    OK: ActionTypes.HENT_KONTAKTINFO_OK,
    FEILET: ActionTypes.HENT_KONTAKTINFO_FEILET
  })
}

export function selectKontaktinfo (state: AppState): State {
  return state.kontaktinfo
}
