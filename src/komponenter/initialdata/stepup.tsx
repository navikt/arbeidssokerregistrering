import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { VEILARBSTEPUP } from '../../ducks/api';
import NavAlertStripe from 'nav-frontend-alertstriper';

function StepUp() {
    return (
        <section className="stepup">
            <NavAlertStripe type="info">
                <FormattedHTMLMessage id="stepup-melding"/>
            </NavAlertStripe>
            <div className="knapperad">
                <button
                    className="knapp knapp--hoved stepup__knapp"
                    onClick={() => document.location.href = VEILARBSTEPUP}
                >
                    <Normaltekst>
                        <FormattedHTMLMessage id="knapp-logg-inn"/>
                    </Normaltekst>
                </button>
            </div>
        </section>
    );
}

export default StepUp;
