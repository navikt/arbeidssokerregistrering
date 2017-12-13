import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
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
            <Panel className="panel-info blokk-l">
                <Sidetittel className="overskrift-panel-info info-rod">
                    <FormattedMessage id="overskrift-registrering-pc"/>
                </Sidetittel>
                <Normaltekst>
                    <FormattedMessage id="beskrivelse-registrering-pc"/>
                </Normaltekst>
            </Panel>
            <div className="panel-info__knapperad">
                <Knapp type="standard">
                    <FormattedMessage id="knapp-sbl-registrering-avbryt"/>
                </Knapp>
                <Knapp type="hoved" className="mml" onClick={() => document.location.href = sblUrl}>
                    <FormattedMessage id="knapp-sbl-registrering-neste"/>
                </Knapp>
            </div>
        </div>
    );
}

export default SblRegistrering;