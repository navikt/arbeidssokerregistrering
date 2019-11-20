import { name as appname, version as appversion } from '../../package.json';
import { amplitudeLogger, getDeviceId } from './amplitude-utils';
import { frontendLogger } from './metrics-utils';

const deviceId = getDeviceId();

const prefix = {
  appname,
  appversion,
  deviceId
};

export function uniLogger(name: string, values?: object) {
  const data = values || {};
  amplitudeLogger(name, {...prefix, ...data});
  frontendLogger(name, {}, {...prefix, ...data});
}
