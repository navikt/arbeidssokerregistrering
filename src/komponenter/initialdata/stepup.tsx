import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { getIntlMessage } from '../../utils/utils';
import { VEILARBSTEPUP } from '../../ducks/api';
import ResponsivSide from '../side/responsiv-side';
import NavAlertStripe from 'nav-frontend-alertstriper';

function StepUp({intl}: InjectedIntlProps) {
    return (
        <div className="limit">
            <ResponsivSide className="stepup">
                <NavAlertStripe type="info">
                    <div dangerouslySetInnerHTML={{__html: getIntlMessage(intl.messages, 'stepup-melding')}}/>
                </NavAlertStripe>
                <div className="knapperad">
                    <button
                        className="knapp knapp--hoved stepup__knapp"
                        onClick={() => document.location.href = VEILARBSTEPUP}
                    >
                        <Normaltekst>{getIntlMessage(intl.messages, 'knapp-logg-inn')}</Normaltekst>
                    </button>
                </div>
            </ResponsivSide>
        </div>
    );
}

export default StepUp;
