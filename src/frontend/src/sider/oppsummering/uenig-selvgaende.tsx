import * as React from 'react';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { Element, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import Knapperad from '../../komponenter/knapper/knapperad';
import { AVBRYT_PATH, SBLREG_PATH } from '../../utils/konstanter';
import { Link } from 'react-router-dom';

function UenigSelvgaende({history}: RouteComponentProps<MatchProps>) {
    return(
        <div className="panel-blokk wrapper-uenig-selvgaende">
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
                <Link className="lenke-avbryt" to={AVBRYT_PATH}>
                    <Element tag="span"><FormattedMessage  id="uenig-selvgaende.avbryt"/></Element>
                </Link>
            </div>
        </div >
    );
}

export default UenigSelvgaende;