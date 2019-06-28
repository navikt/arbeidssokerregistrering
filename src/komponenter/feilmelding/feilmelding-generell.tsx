import * as React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import Feilmelding from './feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';

function FeilmeldingGenerell({ tekstId }: { tekstId?: string }) {
    const id = tekstId ? tekstId : 'feilmelding-generell';
    return (
        <Feilmelding>
            <Normaltekst>
                <FormattedHTMLMessage id={id}/>
            </Normaltekst>
        </Feilmelding>
    );
}

export default FeilmeldingGenerell;
