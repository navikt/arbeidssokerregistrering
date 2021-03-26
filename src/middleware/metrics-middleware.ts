import { ActionTypes as RegistrerbrukerActionTypes } from "../ducks/registrerbruker";
import {
  ActionTypes as RegistreringStatusActionTypes,
  Data as RegStatus,
  RegistreringType,
} from "../ducks/registreringstatus";
import { amplitudeLogger } from "../metrikker/amplitude-utils";

type Action = any;

export const metricsMiddleWare = (store: any) => (next: any) => (action: Action) => {
  loggRegistreringInngangFraAAP(store, action);
  loggRegistreringInngang(store, action);
  next(action);
};

function loggRegistreringInngang(store: any, action: Action) {
  if (action.type === RegistreringStatusActionTypes.HENT_REG_STATUS_OK) {
    const { registreringType } = action.data as RegStatus;

    const erSykmeldt = registreringType === RegistreringType.SYKMELDT_REGISTRERING;

    if (erSykmeldt) {
      amplitudeLogger("registrering.aktivitet", {
        aktivitet: "Starter registrering",
        registreringType,
        kommerFra: "SYKEFRAVÆR",
      });
    }
  }
}

function loggRegistreringInngangFraAAP(store: any, action: Action) {
  if (action.type === RegistrerbrukerActionTypes.REG_BRUKER_STATUS_OK) {
    const registreringStatusData = store.getState().registreringStatus.data;
    const inngangFraAap = store.getState().logger.data.inngangFraAap;
    if (inngangFraAap) {
      const { registreringType } = registreringStatusData;
      amplitudeLogger("registrering.aktivitet", {
        aktivitet: "Starter registrering",
        registreringType,
        kommerFra: "AAP",
      });
    }
  }
}
