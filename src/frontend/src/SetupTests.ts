import { basename } from './app';
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