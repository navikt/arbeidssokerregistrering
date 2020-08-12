import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import tekster from './tekster/tekster-nb.json'

const resources = {
    nb: {
        translation: tekster
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'nb',

    keySeparator: false,

    interpolation: {
        escapeValue: false
    }
});

export default i18n;
