import * as React from 'react';
import { AlertstripeTypes, AlertStripe as NavAlertStripe } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    type: AlertstripeTypes;
    tekst: string;
}

function Alertstripe({ type, tekst}: Props) {
    return(
        <NavAlertStripe type={type}>
            <Normaltekst>{tekst}</Normaltekst>
        </NavAlertStripe>
    );
}

export default Alertstripe;