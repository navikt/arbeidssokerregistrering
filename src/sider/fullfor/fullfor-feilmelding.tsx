import * as React from 'react';
import InjectedIntl = ReactIntl.InjectedIntl;
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { getIntlMessage } from '../../utils/utils';
import { DITTNAV_URL, FORSIDENAV_URL } from '../../ducks/api';

interface FeilmeldingProps {
    intl: InjectedIntl;
}

function Feilmelding({intl}: FeilmeldingProps) {
    return (
        <div className="fullfor-feilmelding">
            <PanelBlokk
                tittelId="oops-feilmelding-header"
                tittelCssNavnVariant="oops-feilmelding-variant"
                cssVariant="transparent-variant padding-vertikalt-small"
                beskrivelseId="oops-feilmelding-beskrivelse"
            />

            <div className="text-align-center blokk">
                <Knapp
                    type="standard"
                    onClick={() => window.location.reload()}
                >
                    <Normaltekst>{getIntlMessage(intl.messages, 'knapp-tilbake')}</Normaltekst>
                </Knapp>
            </div>
            <div className="text-align-center blokk">
                <ul className="nav ">
                    <li>
                        <a href={FORSIDENAV_URL} className="lenke">
                            {getIntlMessage(intl.messages, 'tekst-gaatilforside')}
                        </a>
                    </li>
                    <li>
                        <a href={DITTNAV_URL} className="lenke">
                            {getIntlMessage(intl.messages, 'tekst-dittnav')}
                        </a>
                    </li>
                </ul>
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