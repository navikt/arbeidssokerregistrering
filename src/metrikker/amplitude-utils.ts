// tslint:disable align no-any
import amplitude from 'amplitude-js';
const API_KEY = '';
const config = {
  apiEndpoint: 'amplitude.nav.no/collect',
  saveEvents: true,
  includeUtm: true,
  includeReferrer: true,
  trackingOptions: {
     city: false,
     ip_address: false, 
  }
};

amplitude.getInstance().init(API_KEY, null, config);

export type AmplitudeLogger = (name: string, values?: object) => void;

export function amplitudeLogger(name: string, values?: object) {
  amplitude.logEvent(name, values);
}
