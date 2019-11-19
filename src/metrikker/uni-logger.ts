import { amplitudeLogger } from './amplitude-utils';
import { frontendLogger } from './metrics-utils';

export function uniLogger(name: string, values?: object) {
  const data = values || {};
  amplitudeLogger(name, data);
  frontendLogger(name, {}, data);
}
