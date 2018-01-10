import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { RouterProps } from 'react-router';
import { Normaltekst } from 'nav-frontend-typografi';
import PanelBlokk from '../felles/panel-blokk';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import { FormattedMessage } from 'react-intl';
import EkspanderbartInfo from '../komponenter/ekspanderbartinfo/ekspanderbartInfo';

function Oppsummering({history}: RouterProps) {
    return (
        <div>
            <PanelBlokkGruppe
                knappAksjoner={
                    [
                        <Knapp
                            key="1"
                            type="standard"
                            onClick={() => history.push('/sblregistrering')}
                        >
                            <FormattedMessage id="knapp-uenig"/>
                        </Knapp>,
                        <Knapp
                            key="2"
                            type="hoved"
                            onClick={() => history.push('/sistearbforhold')}
                            className="mml"
                        >
                            <FormattedMessage id="knapp-enig"/>
                        </Knapp>
                    ]
                }
            >
                <PanelBlokk
                    tittelId="du-har-gode-muligheter"
                    beskrivelseId="utfra-informasjon"
                    tittelCssNavnVariant="gronn-variant"
                />
                <PanelBlokk cssVariant="bla-variant">
                    <Normaltekst className="blokk-xs">
                        <FormattedMessage id="det-tyder-pa"/>
                    </Normaltekst>
                    <ul className="typo-normal blokk-xs pml">
                        <li><FormattedMessage id="oppgaver-som-skal"/></li>
                        <li><FormattedMessage id="kartlegging-av-deg"/></li>
                        <li><FormattedMessage id="en-digital-plan"/></li>
                        <li><FormattedMessage id="informasjon-om-hva"/></li>
                    </ul>
                    <Normaltekst>
                        <FormattedMessage id="du-kan-ta-kontakt"/>
                    </Normaltekst>
                </PanelBlokk>
                <PanelBlokk cssVariant="transparent-variant">
                    <EkspanderbartInfo tittelId="hva-betyr-dette">
                        <Normaltekst className="blokk-xs">
                            <FormattedMessage id="vi-har-basert"/>
                        </Normaltekst>
                        <Normaltekst className="blokk-xs">
                            <FormattedMessage id="hvis-du-er-enig"/>
                        </Normaltekst>
                        <Normaltekst className="blokk-xs">
                            <FormattedMessage id="svaret-ditt-har-ingen-betydning"/>
                        </Normaltekst>
                    </EkspanderbartInfo>
                    <Normaltekst>
                        <FormattedMessage id="vi-ber-deg-ta"/>
                    </Normaltekst>
                </PanelBlokk>
            </PanelBlokkGruppe>
        </div>
    );
}

export default Oppsummering;