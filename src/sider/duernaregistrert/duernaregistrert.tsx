import * as React from 'react';
import { Normaltekst, Innholdstittel, Systemtittel, UndertekstBold } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import { VEIENTILARBEID_URL } from '../../ducks/api';

const handinfoSvg = require('./handinfo.svg');
const avsjekkSvg = require('./avsjekk.svg');

function DuErNaRegistrert() {
    return (
        <ResponsivSide className="du-er-na-registrert-wrapper">
            <div className="du-er-na-registrert__avsjekk-ikon">
                <img src={avsjekkSvg} alt="Avsjekk"/>
            </div>
            <Innholdstittel className="du-er-na-registrert__avsjekk-tittel">
                <FormattedMessage id="duernaregistrert-innholdstittel"/>
            </Innholdstittel>

            <div className="du-er-na-registrert__aksjonspanel">
                <div className="du-er-na-registrert__handinfo-ikon">
                    <img src={handinfoSvg} alt="Hånd med info skilt" className="illustrasjon"/>
                </div>
                <div className="du-er-na-registrert__tekster">
                    <Systemtittel className="blokk-xs">
                        <FormattedMessage id="duernaregistrert-systemtittel"/>
                    </Systemtittel>
                    <Normaltekst className="blokk">
                        <FormattedMessage id="duernaregistrert-normaltekst"/>
                    </Normaltekst>

                    <UndertekstBold className="blokk-xxs">
                        <FormattedMessage id="duernaregistrert-undertekstbold"/>

                    </UndertekstBold>
                    <div className="du-er-na-registrert__knapperad">
                        <Knapp
                            type="standard"
                            className="knapp"
                            onClick={() => document.location.href = VEIENTILARBEID_URL}
                        >
                            <FormattedMessage id="knapp-ikke-na"/>
                        </Knapp>
                        <Knapp
                            type="hoved"
                            className="knapp"
                            onClick={() => document.location.href = VEIENTILARBEID_URL}
                        >
                            <FormattedMessage id="knapp-ja-vis-meg"/>
                        </Knapp>
                    </div>
                </div>
            </div>
        </ResponsivSide>
    );
}

export default DuErNaRegistrert;