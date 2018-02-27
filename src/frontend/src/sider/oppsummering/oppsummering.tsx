import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import { FormattedMessage } from 'react-intl';
import { selectInnloggingsinfo, State as InnloggingsInfoState } from '../../ducks/innloggingsinfo';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../reducer';
import { getIntlMessage, hentFornavn } from '../../utils/utils';
import EkspanderbartInfo from '../../komponenter/ekspanderbartinfo/ekspanderbartInfo';
import { SBLREG_PATH, SISTEARBFORHOLD_PATH } from '../../utils/konstanter';
import Tilbakeknapp from '../../komponenter/knapper/tilbakeknapp';
import { settOppsummering } from '../../ducks/oppsummering';

interface StateProps {
    innloggingsInfo: InnloggingsInfoState;
}

interface DispatchProps {
    settOppsummering: (data: string ) => void;
}

type OppsummeringProps = StateProps & null;

type EgenProps = OppsummeringProps & DispatchProps & InjectedIntlProps;

class Oppsummering extends React.Component<RouteComponentProps<MatchProps> & EgenProps> {

    componentWillMount() {
        const { intl } = this.props;
        const oppsummeringTekst = getIntlMessage(intl.messages, 'det-tyder-pa') + ' ' +
            getIntlMessage(intl.messages, 'oppgaver-som-skal') + ' ' +
            getIntlMessage(intl.messages, 'kartlegging-av-deg') + ' ' +
            getIntlMessage(intl.messages, 'en-digital-plan') + ' ' +
            getIntlMessage(intl.messages, 'informasjon-om-hva') + ' ' +
            getIntlMessage(intl.messages, 'du-kan-ta-kontakt');
        this.props.settOppsummering(oppsummeringTekst);
    }

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
                                onClick={() => history.push(`${SBLREG_PATH}`)}
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

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    settOppsummering: (tekst) => dispatch(settOppsummering(tekst)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(Oppsummering)
);
