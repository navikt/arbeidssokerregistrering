import { Svar } from "./svar-utils";
import { uniLogger } from "../metrikker/uni-logger";

export enum ActionTypes {
  AVGI_SVAR = "AVGI_SVAR",
  AVGI_SVAR_INIT = "AVGI_SVAR_INIT",
}

export enum SporsmalId {
  utdanning = "utdanning",
  utdanningBestatt = "utdanningBestatt",
  utdanningGodkjent = "utdanningGodkjent",
  helseHinder = "helseHinder",
  andreForhold = "andreForhold",
  sisteStilling = "sisteStilling",
  dinSituasjon = "dinSituasjon",

  fremtidigSituasjon = "fremtidigSituasjon",
  hvorLangTid = "hvorLangTid",
  stillingsprosent = "stillingsprosent",
  tilbakeIArbeid = "tilbakeIArbeid",
}

export type State = Data[];

export interface Data {
  svar: Svar | undefined;
  sporsmalId: SporsmalId;
}

interface Action {
  type: ActionTypes;
  data: Data;
}

const initialState: State = [];

function doLog(sporsmalId: string, svar: string) {
  if (sporsmalId && svar && svar !== "INGEN_SVAR") {
    const key = `arbeidssokerregistrering.svar.${sporsmalId}`;
    uniLogger(key, { svar: svar });
  }
}

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.AVGI_SVAR: {
      const sporsmalsindeks = state.findIndex((data) => data.sporsmalId === action.data.sporsmalId);
      if (sporsmalsindeks === -1) {
        return [...state, action.data];
      } else {
        const newState = [...state];
        newState[sporsmalsindeks] = action.data;
        return newState;
      }
    }
    case ActionTypes.AVGI_SVAR_INIT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export function endreSvarAction(sporsmalId: string, svar: Svar) {
  doLog(sporsmalId, svar);
  return {
    type: ActionTypes.AVGI_SVAR,
    data: {
      sporsmalId,
      svar,
    },
  };
}

export function resetSvarAction(sporsmalId: string) {
  return {
    type: ActionTypes.AVGI_SVAR,
    data: {
      sporsmalId,
      undefined,
    },
  };
}

export function setInitialState() {
  return {
    type: ActionTypes.AVGI_SVAR_INIT,
  };
}
