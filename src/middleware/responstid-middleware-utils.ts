import ActionTypes from "../ducks/actions";
import { AmplitudeLogger } from "../metrikker/amplitude-utils";

interface StartTiderType {
  [propName: string]: number;
}

const starttider: StartTiderType = {};

export function loggResponstid(actionType: ActionTypes, logger: AmplitudeLogger) {
  const type = actionType.toString();
  if (type.includes("_PENDING")) {
    const prefix = getPrefix(type);
    starttider[prefix] = Date.now();
  }

  if (type.includes("_OK") || type.includes("_FEILET")) {
    const prefix = getPrefix(type);
    if (starttider[prefix] !== undefined) {
      logger(getEventString(prefix), {
        responstid: Date.now() - starttider[prefix],
      });
    }
  }
}

function getEventString(prefix: string) {
  return "registrering.responstid." + prefix;
}

function getPrefix(type: string) {
  return type.toLowerCase().split("_").slice(0, -1).join("-");
}
