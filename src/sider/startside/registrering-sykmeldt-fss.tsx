import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Element, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../../utils/utils';
import { INNGANGSSPORSMAL_PATH } from '../../utils/konstanter';
import InformasjonModal from './informasjon/informasjon-modal';
import { AppState } from '../../reducer';
import { Data as FeatureToggleData, selectFeatureToggles } from '../../ducks/feature-toggles';
import veilederSvg from './veileder-mann.svg';
import merVeiledningSvg from './mer-veiledning.svg';
import { selectBrukersNavn, State as BrukersNavnState } from '../../ducks/brukers-navn';
import './registrering-sykmeldt.less';

interface Props {
    featureToggles: FeatureToggleData;
    brukersNavn: BrukersNavnState;
}

type RegistreringArbeidssokerSykmeldtFssProps = Props & RouteComponentProps<MatchProps>;

interface State {
    isModalOpen: boolean;
}

class RegistreringArbeidssokerSykmeldtFss extends React.Component<RegistreringArbeidssokerSykmeldtFssProps, State> {

    state = {
        isModalOpen: false
    };

     Rad1 = () => {
        const { brukersNavn } = this.props;
        const veilederpanelKompakt = window.matchMedia('(min-width: 768px)').matches;
        const veilederpanelType = veilederpanelKompakt ? 'normal' : 'plakat';
        const { fornavn } = brukersNavn.data;

        return (
            <div className="registrering-sykmeldt__rad1 rad-even">
                <Veilederpanel
                    svg={<img src={veilederSvg} alt="" className="nav-veilederpanel-illustrasjon" />}
                    type={veilederpanelType}
                    kompakt={veilederpanelKompakt}
                >
                    <FormattedHTMLMessage
                        id="registrering-sykmeldt-snakkeboble"
                        values={{ fornavn }}
                    />
                </Veilederpanel>
            </div>
        );
    }

    Rad2 = () => {
        return (
            <div className="registrering-sykmeldt__rad2">
                <Innholdstittel tag="h2" className="rad__tittel">
                    <FormattedMessage id="registrering-sykmeldt.introtittel"/>
                </Innholdstittel>
                <div className="rad2__innhold">
                    <Normaltekst className="rad__innhold-tekst" tag="div">
                        <FormattedHTMLMessage
                            id="registrering-sykmeldt.argument1tekst"
                            tagName="ul"
                        />
                        <Knapp onClick={this.handleSeVideoBtnClicked}>
                            <FormattedMessage id="registrering-sykmeldt.argument1knapp"/>
                        </Knapp>
                    </Normaltekst>
                    <img className="rad2__ikon" src={merVeiledningSvg} alt="" />
                </div>
                <InformasjonModal
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.handleModalLukkeknappClicked}
                />
            </div>
        );
    }

    Rad3 = () => {
        return (
            <div className="registrering-sykmeldt__rad3">
                <Innholdstittel
                    tag="h2"
                    className="rad__tittel rad3__tittel"
                >
                    <FormattedMessage id="registrering-sykmeldt.argument3tittel"/>
                </Innholdstittel>
                <div className="rad3__tekst">
                    <Element tag="h3">
                        <FormattedMessage id="registrering-sykmeldt.rad3.del1-tittel-fss"/>
                    </Element>
                    <Normaltekst className="blokk-l" tag="div">
                        <FormattedHTMLMessage id="registrering-sykmeldt.rad3.del1-innhold-fss"/>
                    </Normaltekst>
                </div>
                <div className="rad3__knapperad">
                    <KnappBase
                        type="hoved"
                        onClick={() => this.props.history.push(INNGANGSSPORSMAL_PATH)}
                        data-testid="start-registrering"
                    >
                        <FormattedMessage id="registrering-sykmeldt-knapp-fss"/>
                    </KnappBase>
                </div>
            </div>
        );
    }

    handleSeVideoBtnClicked = () => {
        this.setState({isModalOpen: true});
    }

    handleModalLukkeknappClicked = () => {
        this.setState({isModalOpen: false});
    }

    render() {
        return (
            <div className="registrering-sykmeldt">
                <div className="registrering-banner">
                    <Systemtittel>
                        <FormattedMessage id="registrering-sykmeldt.tittel"/>
                    </Systemtittel>
                </div>
                <this.Rad1/>
                <this.Rad2/>
                <this.Rad3/>
            </div>
        );
    }

}

const mapStateToProps = (state: AppState) => ({
    featureToggles: selectFeatureToggles(state),
    brukersNavn: selectBrukersNavn(state),
});

export default connect(mapStateToProps)(withRouter(RegistreringArbeidssokerSykmeldtFss));
