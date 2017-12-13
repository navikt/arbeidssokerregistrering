import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';

type Props =  RouteComponentProps<MatchProps>;

function Start({history}: Props) {
    return (
        <div>
            <Panel className="panel-info blokk-l">
                <Sidetittel className="overskrift-panel-info info-sirkel-bla">
                    <FormattedMessage id="overskrift-start"/>
                </Sidetittel>
                <Normaltekst className="beskrivelse-start">
                    <FormattedMessage id="beskrivelse-start"/>
                </Normaltekst>
            </Panel>
            <div className="panel-info__knapperad">
                <Knapp type="standard" className="knapp">
                    <FormattedMessage id="knapp-avbryt"/>
                </Knapp>
                <Knapp type="hoved" className="knapp knapp--hoved mml" onClick={() => history.push('/skjema/1')}>
                    <FormattedMessage id="knapp-neste"/>
                </Knapp>
            </div>
        </div>
    );
}

export default Start;