import * as React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';
import Lukknapp from 'nav-frontend-lukknapp';

type Props = RouteComponentProps<MatchProps>;

function Avbryt({history}: Props) {
    return (
        <div className="avbryt-panel-wrapper">
            <div className="avbryt-panel__lukkknapperad">
                <Lukknapp onClick={() => history.push('/start')}>
                    Lukk
                </Lukknapp>
            </div>
            <div className="avbryt-panel">
                <Sidetittel className="overskrift-panel-info info-sirkel-bla blokk-xs">
                    <FormattedMessage id="overskrift-avbryt"/>
                </Sidetittel>
                <Normaltekst className="avbryt-fokus blokk-xs">
                    <span className="mmr"><Ikon kind="info-sirkel-fylt" size={32} className=""/></span>
                    <FormattedMessage id="beskrivelse-avbryt"/>
                </Normaltekst>
            </div>
            <div className="avbryt-panel__knapperad">
                <Knapp type="standard" className="knapp mmr" onClick={() => history.push('/dittnav/innlogget')}>
                    <FormattedMessage id="knapp-ja-avbryt"/>
                </Knapp>
                <Knapp type="standard" className="knapp" onClick={() => history.push('/start')}>
                    <FormattedMessage id="knapp-nei"/>
                </Knapp>
            </div>
        </div>
    );
}

export default Avbryt;