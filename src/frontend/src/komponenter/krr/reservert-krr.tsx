import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { AlertStripeInfoSolid } from 'nav-frontend-alertstriper';
import { getIntlMessage } from '../../utils/utils';

function ReservertKrr({intl}: InjectedIntlProps) {
    const infotekst = getIntlMessage(intl.messages, 'reservert-krr.infotekst');

    return(
        <AlertStripeInfoSolid className="reserver-krr__alertstripe" >
            <span dangerouslySetInnerHTML={{__html: infotekst}}/>
        </AlertStripeInfoSolid>
    );
}

export default injectIntl(ReservertKrr);