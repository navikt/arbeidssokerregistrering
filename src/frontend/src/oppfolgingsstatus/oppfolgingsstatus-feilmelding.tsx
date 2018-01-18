import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

function OppfolgingsstatusFeilmelding() {
    return(
        <AlertStripe type="advarsel">
            <Normaltekst><FormattedMessage id="feil-i-systemene-beskrivelse"/></Normaltekst>
        </AlertStripe>
    );
}

export default OppfolgingsstatusFeilmelding;