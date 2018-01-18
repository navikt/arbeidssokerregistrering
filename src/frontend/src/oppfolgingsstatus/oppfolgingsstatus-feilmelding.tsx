import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    feilmelding: string;
}

function OppfolgingsstatusFeilmelding({feilmelding}: Props) {
    return(
        <AlertStripe type="advarsel">
            <Normaltekst>{feilmelding}</Normaltekst>
        </AlertStripe>
    );
}

export default OppfolgingsstatusFeilmelding;