import { basename } from './app';
import getStore from './store';
import { dispatchEnvironment } from './test/test-utils';

// For å slippe waning fra react-router
Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value: basename
});

// Midlertig hack for å fikse error:
// https://github.com/facebookincubator/create-react-app/issues/3199
window.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
    return 0;
};

export const environmentTestData = {
    veilarboppfolgingproxy_url: 'https://test.no/veilarboppfolgingproxy',
    sblarbeid_url: 'https://test.no/sblarbeid',
    veientilarbeid_url: 'https://test.no/veientilarbeid',
    dittnav_url: 'https://test.no/veientilarbeid'
};

dispatchEnvironment(getStore().dispatch, environmentTestData);