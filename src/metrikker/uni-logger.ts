import { name as appname, version as appversion } from '../../package.json';
import { amplitudeLogger } from './amplitude-utils';
import { frontendLogger } from './metrics-utils';

const prefix = {
  appname,
  appversion
};

export function uniLogger(name: string, values?: object) {
  const data = values || {};
  amplitudeLogger(name, {...prefix, ...data});
  frontendLogger(name, {}, {...prefix, ...data});
}
