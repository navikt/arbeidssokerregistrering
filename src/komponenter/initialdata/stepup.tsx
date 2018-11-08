import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import NavAlertStripe from 'nav-frontend-alertstriper';
import { VEILARBSTEPUP } from '../../ducks/api';

import './stepup.less';

function StepUp() {
    return (
        <section className="stepup">
            <NavAlertStripe type="info">
                <FormattedHTMLMessage id="stepup-melding"/>
            </NavAlertStripe>
            <div className="knapperad">
                <button
                    className="knapp knapp--hoved stepup__knapp"
                    onClick={() => window.location.href = VEILARBSTEPUP}
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
