import * as React from 'react';
import {Panel} from 'nav-frontend-paneler';
import {Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import {FormattedMessage} from 'react-intl';
import {Knapp} from 'nav-frontend-knapper';

function Start() {
    return (
        <div>
            <Panel className="panel-info blokk-l">
                <Systemtittel className="overskrift-panel-info info-bla">
                    <FormattedMessage id="overskrift-start"/>
                </Systemtittel>
                <Normaltekst className="blokk-xs">
                    <FormattedMessage id="beskrivelse-start"/>
                </Normaltekst>
            </Panel>
            <div className="panel-info__knapperad">
                <Knapp type="standard" className="knapp">
                    <FormattedMessage id="knapp-avbryt"/>
                </Knapp>
                <Knapp type="hoved" className="knapp knapp--hoved">
                    <FormattedMessage id="knapp-neste"/>
                </Knapp>
            </div>
        </div>
    );
}

export default Start;