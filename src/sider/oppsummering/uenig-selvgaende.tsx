import * as React from 'react';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import Knapperad from '../../komponenter/knapper/knapperad';
import { SBLREG_PATH } from '../../utils/konstanter';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';

function UenigSelvgaende({history}: RouteComponentProps<MatchProps>) {
    return(
        <ResponsivSide className="panel-blokk wrapper-uenig-selvgaende">
            <Sidetittel className="blokk-l text-align-center">
                <FormattedMessage id="uenig-selvgaende.tittel"/>
            </Sidetittel>
            <Normaltekst className="blokk-xl"><FormattedMessage id="uenig-selvgaende.innhold"/></Normaltekst>
            <Knapperad>
                <Knapp className="knapp-angre blokk-s" type="standard" onClick={() => history.goBack()}>
                    <FormattedMessage id="uenig-selvgaende.angre"/>
                </Knapp>
                <Knapp className="blokk-s" type="standard" onClick={() => history.push(SBLREG_PATH)}>
                    <FormattedMessage id="uenig-selvgaende.fortsett"/>
                </Knapp>
            </Knapperad>
            <div className="text-align-center">
                <LenkeAvbryt/>
            </div>
        </ResponsivSide >
    );
}

export default UenigSelvgaende;