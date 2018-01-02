import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Panel } from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<MatchProps>;

function RegistrerDeg({history}: Props) {
    return (
        <div>
            <Panel className="panel-info blokk-l">
                <Sidetittel className="overskrift-panel-info info-sirkel-bla">
                    <FormattedMessage id="overskrift-registrerdeg"/>
                </Sidetittel>
                <Normaltekst className="blokk-xs">
                    <FormattedMessage id="beskrivelse-registrerdeg"/>
                </Normaltekst>
                <ul className="typo-normal blokk-xs pml">
                    <li><FormattedMessage id="liste-dufarhjelp"/></li>
                    <li><FormattedMessage id="liste-dukansoke"/></li>
                    <li><FormattedMessage id="liste-arbeidsgiverefinner"/></li>
                    <li><FormattedMessage id="liste-dukanabonnere"/></li>
                </ul>
                <Normaltekst className="registrerdeg-tips">
                    <FormattedMessage id="tips-fullforregistrering"/>
                </Normaltekst>
            </Panel>
            <div className="panel-info__knapperad">
                <Knapp
                    type="hoved"
                    className="knapp knapp--hoved"
                    onClick={() => {
                        history.push('/start');
                    }}
                >
                    <FormattedMessage id="knapp-registrerdeg"/>
                </Knapp>
            </div>
        </div>
    );
}

export default RegistrerDeg;