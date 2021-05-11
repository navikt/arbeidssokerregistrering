import { RegistreringType, Servicegruppe, Formidlingsgruppe } from "../ducks/registreringstatus";
import { Data as RegStatusData } from "../ducks/registreringstatus";
import { JSONObject } from "yet-another-fetch-mock/dist/types/types";

export default {
  underOppfolging: false,
  jobbetSeksAvTolvSisteManeder: false,
  //registreringType: RegistreringType.ORDINAER_REGISTRERING,
  registreringType: RegistreringType.SPERRET,
  servicegruppe: Servicegruppe.IVURD,
  formidlingsgruppe: Formidlingsgruppe.IARBS,
  geografiskTilknytning: "0807",
  rettighetsgruppe: "IYT",
} as RegStatusData & JSONObject;
