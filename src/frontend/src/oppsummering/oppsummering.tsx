import * as React from 'react';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import PanelBlokk from '../felles/panel-blokk';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import { FormattedMessage } from 'react-intl';
import { selectInnloggingsinfo, State as InnloggingsInfoState } from '../ducks/innloggingsinfo';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../reducer';
import { hentFornavn } from '../utils/utils';
import EkspanderbartInfo from '../komponenter/ekspanderbartinfo/ekspanderbartInfo';
import { SISTEARBFORHOLD_PATH, UENIG_PATH } from '../utils/konstanter';
import Tilbakeknapp from '../komponenter/knapper/tilbakeknapp';

interface StateProps {
    innloggingsInfo: InnloggingsInfoState;
}

type OppsummeringProps = StateProps & null;

class Oppsummering extends React.Component<RouteComponentProps<MatchProps> & OppsummeringProps> {
    render() {
        const { history, innloggingsInfo } = this.props;
        const { name } = innloggingsInfo.data;
        return (
            <div>
                <Tilbakeknapp onClick={() => history.goBack()}/>
                <PanelBlokkGruppe
                    knappAksjoner={
                        [
                            <Knapp
                                key="1"
                                type="standard"
                                onClick={() => history.push(UENIG_PATH)}
                            >
                                <FormattedMessage id="knapp-uenig"/>
                            </Knapp>,
                            <Knapp
                                key="2"
                                type="hoved"
                                onClick={() => history.push(`${SISTEARBFORHOLD_PATH}`)}
                                className="mml"
                            >
                                <FormattedMessage id="knapp-enig"/>
                            </Knapp>
                        ]
                    }
                >
                    <PanelBlokk
                        tittelId="du-har-gode-muligheter"
                        tittelVerdier={{fornavn: hentFornavn(name)}}
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
                    <PanelBlokk cssVariant="transparent-variant padding-vertikalt-xsmall ">
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
                    </PanelBlokk>
                    <PanelBlokk cssVariant="transparent-variant no-margin-padding-vertikalt">
                        <Normaltekst>
                            <FormattedMessage id="vi-ber-deg-ta"/>
                        </Normaltekst>
                    </PanelBlokk>
                </PanelBlokkGruppe>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    innloggingsInfo: selectInnloggingsinfo(state)
});

export default connect(mapStateToProps, null)(Oppsummering);
