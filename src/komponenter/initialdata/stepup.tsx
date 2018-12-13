import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { VEILARBSTEPUP } from '../../ducks/api';
import './stepup.less';

function StepUp() {
    return (
        <section className="stepup">
            <div className="limit">
                <Innholdstittel className="tittel">
                    <FormattedMessage id="overskrift-stepup"/>
                </Innholdstittel>
                <Normaltekst className="beskrivelse"><FormattedMessage id="stepup-melding"/></Normaltekst>
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
            </div>
        </section>
    );
}

export default StepUp;
