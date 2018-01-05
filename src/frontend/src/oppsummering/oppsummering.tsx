import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { RouterProps } from 'react-router';
import { Normaltekst } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import PanelBlokk from '../felles/panel-blokk';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import { FormattedMessage } from 'react-intl';

interface EgenProps {
    visSkjul: boolean;
}

class ExpanderBarInfo extends React.PureComponent<Readonly<{}>, EgenProps> {
    constructor(props: EgenProps) {
        super(props);
        this.state = {
            visSkjul: false,
        };
        this.onVisSkjul = this.onVisSkjul.bind(this);
    }

    onVisSkjul() {
        this.setState({
            visSkjul: !this.state.visSkjul
        });
    }

    render() {
        return (
            <div className="expander-bar-info">
                <button
                    className="blokk-xs knapp-reset"
                    onClick={this.onVisSkjul}
                    aria-expanded={this.state.visSkjul}
                >
                    <Normaltekst className="flex-align-items-start">
                        <span className="mmr"><Ikon kind="help-circle" size={25} className=""/></span>
                        <FormattedMessage id="hva-betyr-dette"/>
                    </Normaltekst>
                </button>
                <div className="expander-bar-vis-skjul">
                    {
                        this.state.visSkjul
                            ?
                            <div>
                                <Normaltekst className="blokk-xs">
                                    <FormattedMessage id="vi-har-basert"/>
                                </Normaltekst>
                                <Normaltekst className="blokk-xs">
                                    <FormattedMessage id="hvis-du-er-enig"/>
                                </Normaltekst>
                                <Normaltekst className="blokk-xs">
                                    <FormattedMessage id="svaret-ditt-har-ingen-betydning"/>
                                </Normaltekst>
                            </div>
                            : null
                    }
                </div>
            </div>
        );
    }
}

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
                    <ExpanderBarInfo/>
                    <Normaltekst>
                        <FormattedMessage id="vi-ber-deg-ta"/>
                    </Normaltekst>
                </PanelBlokk>
            </PanelBlokkGruppe>
        </div>
    );
}

export default Oppsummering;