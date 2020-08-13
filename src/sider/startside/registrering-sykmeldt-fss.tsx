import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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
import { withTranslation, WithTranslation } from 'react-i18next';
import './registrering-sykmeldt.less';

interface Props {
    featureToggles: FeatureToggleData;
    brukersNavn: BrukersNavnState;
}

type RegistreringArbeidssokerSykmeldtFssProps = Props & RouteComponentProps<MatchProps> & WithTranslation;

interface State {
    isModalOpen: boolean;
}

class RegistreringArbeidssokerSykmeldtFss extends React.Component<RegistreringArbeidssokerSykmeldtFssProps, State> {

    state = {
        isModalOpen: false
    };

    Rad1 = () => {
        const { t } = this.props;
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
                    <strong>{t('registrering-sykmeldt-snakkeboble-del1', { fornavn })}</strong>
                    <br />
                    {t('registrering-sykmeldt-snakkeboble-del2')}
                </Veilederpanel>
            </div>
        );
    }

    Rad2 = () => {
        const { t } = this.props;

        return (
            <div className="registrering-sykmeldt__rad2">
                <Innholdstittel tag="h2" className="rad__tittel">
                    {t('registrering-sykmeldt.introtittel')}
                </Innholdstittel>
                <div className="rad2__innhold">
                    <Normaltekst className="rad__innhold-tekst" tag="div">
                        <ul>
                            <li>
                                {t('registrering-sykmeldt.argument1tekst-liste-del1')}
                            </li>
                            <li>
                                {t('registrering-sykmeldt.argument1tekst-liste-del2')}
                            </li>
                            <li>
                                {t('registrering-sykmeldt.argument1tekst-liste-del3')}
                            </li>
                            <li>
                                {t('registrering-sykmeldt.argument1tekst-liste-del4')}
                            </li>
                        </ul>
                        <Knapp onClick={this.handleSeVideoBtnClicked}>
                            {t('registrering-sykmeldt.argument1knapp')}
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
        const { t } = this.props;

        return (
            <div className="registrering-sykmeldt__rad3">
                <Innholdstittel
                    tag="h2"
                    className="rad__tittel rad3__tittel"
                >
                    {t('registrering-sykmeldt.argument3tittel')}
                </Innholdstittel>
                <div className="rad3__tekst">
                    <Element tag="h3">
                        {t('registrering-sykmeldt.rad3.del1-tittel-fss')}
                    </Element>
                    <Normaltekst className="blokk-l" tag="div">
                        {t('registrering-sykmeldt.rad3.del1')}
                        <a className="lenke"
                            href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten"
                        >
                            {t('registrering-sykmeldt.rad3.del1-lenke')}.
                        </a>.
                    </Normaltekst>
                </div>
                <div className="rad3__knapperad">
                    <KnappBase
                        type="hoved"
                        onClick={() => this.props.history.push(INNGANGSSPORSMAL_PATH)}
                        data-testid="start-registrering"
                    >
                        {t('registrering-sykmeldt-knapp-fss')}
                    </KnappBase>
                </div>
            </div>
        );
    }

    handleSeVideoBtnClicked = () => {
        this.setState({ isModalOpen: true });
    }

    handleModalLukkeknappClicked = () => {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { t } = this.props;

        return (
            <div className="registrering-sykmeldt">
                <div className="registrering-banner">
                    <Systemtittel>
                        {t('registrering-sykmeldt.tittel')}
                    </Systemtittel>
                </div>
                <this.Rad1 />
                <this.Rad2 />
                <this.Rad3 />
            </div>
        );
    }

}

const mapStateToProps = (state: AppState) => ({
    featureToggles: selectFeatureToggles(state),
    brukersNavn: selectBrukersNavn(state),
});

export default connect(mapStateToProps)(withRouter(withTranslation()(RegistreringArbeidssokerSykmeldtFss)));
