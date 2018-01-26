import * as React from 'react';
import InjectedIntl = ReactIntl.InjectedIntl;
import PanelBlokk from '../felles/panel-blokk';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { getIntlMessage } from '../utils/utils';

interface FeilmeldingProps {
    intl: InjectedIntl;
}

function Feilmelding({intl}: FeilmeldingProps) {
    return (
        <div>
            <PanelBlokk
                tittelId="oops-feilmelding-header"
                tittelCssNavnVariant="oransje-variant"
                cssVariant="transparent-variant"
                beskrivelseId="oops-feilmelding-beskrivelse"
            />

            <div className="text-align-center blokk">
                <Knapp type="standard">
                    <Normaltekst>{getIntlMessage(intl.messages, 'knapp-tilbake')}</Normaltekst>
                </Knapp>
            </div>
            <div className="text-align-center">
                <Normaltekst>
                   <span
                       dangerouslySetInnerHTML={{
                           __html: getIntlMessage(intl.messages, 'oops-feilmelding-kontakt') }}
                   />
                </Normaltekst>
            </div>
        </div>);
}

export default Feilmelding;