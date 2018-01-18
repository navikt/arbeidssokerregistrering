import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import IntlProvider from '../Intl-provider';

function OppfolgingsstatusFeilmelding() {
    return (
        <IntlProvider>
            <AlertStripe type="advarsel">
                <Normaltekst><FormattedMessage id="feil-i-systemene-beskrivelse"/></Normaltekst>
            </AlertStripe>
        </IntlProvider>
    );
}

export default OppfolgingsstatusFeilmelding;