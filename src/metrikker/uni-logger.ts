import { name as appname, version as appversion } from "../../package.json";
import { amplitudeLogger } from "./amplitude-utils";

const prefix = {
  appname,
  appversion,
};

export function uniLogger(name: string, values?: Record<string, unknown>) {
  const data = values || {};
  amplitudeLogger(name, { ...prefix, ...data });
  return true;
}
