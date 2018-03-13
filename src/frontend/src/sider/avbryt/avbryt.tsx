import * as React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/nytt-skjema';
import { RouteComponentProps } from 'react-router';
import Lukknapp from 'nav-frontend-lukknapp';
import { DITTNAV_URL } from '../../ducks/api';

type Props = RouteComponentProps<MatchProps>;

function Avbryt({history}: Props) {
    return (
        <div className="avbryt-panel-wrapper">
            <div className="avbryt-panel__lukkknapperad">
                <Lukknapp onClick={() => history.goBack()}>
                    Lukk
                </Lukknapp>
            </div>
            <div className="avbryt-panel">
                <Sidetittel className="blokk">
                    <FormattedMessage id="overskrift-avbryt"/>
                </Sidetittel>
                <Normaltekst className="avbryt-fokus blokk-xs">
                    <span className="mmr"><Ikon kind="info-sirkel-fylt" size={32} className=""/></span>
                    <FormattedMessage id="beskrivelse-avbryt"/>
                </Normaltekst>
            </div>
            <div className="avbryt-panel__knapperad">
                <Knapp type="standard" className="knapp" onClick={() => document.location.href = DITTNAV_URL}>
                    <FormattedMessage id="knapp-ja-avbryt"/>
                </Knapp>
                <Knapp type="standard" className="knapp" onClick={() => history.goBack()}>
                    <FormattedMessage id="knapp-nei"/>
                </Knapp>
            </div>
        </div>
    );
}

export default Avbryt;