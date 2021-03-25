import { ActionTypes as AutentiseringsinfoActionTypes } from "../ducks/autentiseringsinfo";
import { ActionTypes as RegistrerbrukerActionTypes } from "../ducks/registrerbruker";
import {
  ActionTypes as RegistreringStatusActionTypes,
  Data as RegStatus,
  RegistreringType,
} from "../ducks/registreringstatus";
import { feilTyper } from "./metrics-middleware-util";
import { amplitudeLogger } from "../metrikker/amplitude-utils";

type Action = any;

export const metricsMiddleWare = (store: any) => (next: any) => (action: Action) => {
  loggAutentiseringsinfo(action);
  loggBesvarelse(store, action);
  loggRegistreringInngangFraAAP(store, action);
  loggFeil(action);
  loggRegistreringInngang(store, action);
  next(action);
};

function loggAutentiseringsinfo(action: Action) {
  if (action.type === AutentiseringsinfoActionTypes.HENT_AUTENTISERINGSINFO_OK) {
    const { securityLevel } = action.data;
  }
}

function loggBesvarelse(store: any, action: Action) {
  const stillingForslagFraAareg = store.getState().defaultStilling;
  const valgteStilling = store.getState().sisteStilling.data;
}

function loggRegistreringInngang(store: any, action: Action) {
  if (action.type === RegistreringStatusActionTypes.HENT_REG_STATUS_OK) {
    const inngangSykefravaer = store.getState().logger.data.inngangSykefravaer;
    const {
      registreringType,
      maksDato,
      erSykmeldtMedArbeidsgiver,
      underOppfolging,
      jobbetSeksAvTolvSisteManeder,
      servicegruppe,
      formidlingsgruppe,
      geografiskTilknytning,
      rettighetsgruppe,
    } = action.data as RegStatus;
    const maksDatoOrIngenVerdi = maksDato || "INGEN_VERDI";
    const underOppfolgingOrFalse = underOppfolging || false;
    const underOppfolgingJaNei = underOppfolging ? "ja" : "nei";
    const erSykmeldtMedArbeidsgiverOrFalse = erSykmeldtMedArbeidsgiver || false;
    const jobbetSeksAvTolvSisteManederOrFalse = jobbetSeksAvTolvSisteManeder || false;
    const servicegrupperOrIngenVerdi = servicegruppe || "INGEN_VERDI";
    const formidlingsgruppeOrIngenVerdi = formidlingsgruppe || "INGEN_VERDI";
    const erSykmeldt = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
    const erSperret = registreringType === RegistreringType.SPERRET;
    const geografiskTilknytningOrIngenVerdi = geografiskTilknytning || "INGEN_VERDI";
    const rettighetsgruppeOrIngenVerdi = rettighetsgruppe || "INGEN_VERDI";

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
      const {
        registreringType,
        servicegruppe,
        formidlingsgruppe,
        underOppfolging,
        geografiskTilknytning,
        rettighetsgruppe,
      } = registreringStatusData;
      const kommerFra = "AAP";
      amplitudeLogger("registrering.aktivitet", {
        aktivitet: "Starter registrering",
        registreringType,
        kommerFra: "AAP",
      });
    }
  }
}

function loggFeil(action: Action) {
  feilTyper.forEach((feil) => {
    if (action.type === feil.type) {
      if (action.data) {
        const response = action.data.response || {};
        const status = response.status;
        const statusText = response.statusText;
        const url = response.url;
        const apikall = feil.apikall;

        const data = action.data;

        if (typeof data === "object") {
          data.data = typeof data.data === "string" ? encodeURI(data.data) : data.data;
        }
      }
    }
  });
}
