import * as React from 'react';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import Knapperad from '../komponenter/knapper/knapperad';
import { SBLREG_PATH } from '../utils/konstanter';
import { DITTNAV_URL } from '../ducks/api';

function UenigSelvgaende({history}: RouteComponentProps<MatchProps>) {
    return(
        <div className="panel-blokk">
            <Sidetittel className="blokk-xl text-align-center">
                <FormattedMessage id="uenig-selvgaende.tittel"/>
            </Sidetittel>
            <Normaltekst className="blokk-xl"><FormattedMessage id="uenig-selvgaende.innhold"/></Normaltekst>
            <Knapperad>
                <Knapp className="mmr blokk-s" type="standard" onClick={() => history.goBack()}>
                    <FormattedMessage id="uenig-selvgaende.angre"/>
                </Knapp>
                <Knapp className="blokk-s" type="standard" onClick={() => history.push(SBLREG_PATH)}>
                    <FormattedMessage id="uenig-selvgaende.fortsett"/>
                </Knapp>
            </Knapperad>
            <div className="text-align-center">
                <button className="avbryt--knapp-understrek" onClick={() => document.location.href = DITTNAV_URL}>
                    <Element><FormattedMessage id="uenig-selvgaende.avbryt"/></Element>
                </button>
            </div>
        </div>
    );
}

export default UenigSelvgaende;