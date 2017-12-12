import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';

export const sblUrl = '/sbl/arbeid/registrering';

function SblRegistrering() {
    if (window.innerWidth > 768) {
        document.location.href = sblUrl;
        return null;
    }
    return (
        <div>
            <Panel className="blokk-s sbl-registrering__panel">
                <Systemtittel className="overskrift-sbl-registrering">
                    <FormattedMessage id="overskrift-registrering-pc"/>
                </Systemtittel>
                <Normaltekst className="beskrivelse-sbl-registrering blokk-xl">
                    <FormattedMessage id="beskrivelse-registrering-pc"/>
                </Normaltekst>
            </Panel>
            <div className="sbl-registrering__knapperad blokk-m">
                <Knapp type="standard">
                    <FormattedMessage id="knapp-sbl-registrering-avbryt"/>
                </Knapp>
                <Knapp type="hoved" onClick={() => document.location.href = sblUrl}>
                    <FormattedMessage id="knapp-sbl-registrering-neste"/>
                </Knapp>
            </div>
        </div>
    );
}

export default SblRegistrering;