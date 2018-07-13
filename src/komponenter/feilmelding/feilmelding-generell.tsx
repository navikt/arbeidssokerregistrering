import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import Feilmelding from './feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';

function FeilmeldingGenerell() {
    return (
        <Feilmelding>
            <Normaltekst>
                <FormattedHTMLMessage id="feilmelding-generell"/>
            </Normaltekst>
        </Feilmelding>
    );
}

export default FeilmeldingGenerell;