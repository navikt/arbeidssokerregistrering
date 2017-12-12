import * as React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<MatchProps>;

function Avbryt({history}: Props) {
    return (
        <div>
            <div className="avbryt-panel blokk-l">
                <Sidetittel className="overskrift-panel-info info-sirkel-bla blokk-xs">
                    <FormattedMessage id="overskrift-avbryt"/>
                </Sidetittel>
                <Normaltekst className="avbryt-fokus blokk-xs">
                    <span className="mmr"><Ikon kind="info-sirkel-fylt" size={32} className=""/></span>
                    <FormattedMessage id="beskrivelse-avbryt"/>
                </Normaltekst>
            </div>
            <div className="panel-info__knapperad">
                <Knapp type="standard" className="knapp">
                    <FormattedMessage id="knapp-ja-avbryt"/>
                </Knapp>
                <Knapp type="standard" className="knapp mml" onClick={() => history.push('/skjema/1')}>
                    <FormattedMessage id="knapp-nei"/>
                </Knapp>
            </div>
        </div>
    );
}

export default Avbryt;