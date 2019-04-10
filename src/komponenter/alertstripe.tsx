import * as React from 'react';
import NavAlertStripe, { AlertStripeType } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

import './alertstripe.less';

interface Props {
    type: AlertStripeType;
    tekst: string;
}

function Alertstripe({type, tekst}: Props) {
    return (
        <div className="alertstripe-container">
            <NavAlertStripe type={type}>
                <Normaltekst><span dangerouslySetInnerHTML={{__html: tekst}}/></Normaltekst>
            </NavAlertStripe>
        </div>
    );
}

export default Alertstripe;
