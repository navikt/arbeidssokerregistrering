import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import Veilederpanel from 'nav-frontend-veilederpanel';
import './registrering-sykmeldt.less';
import { Innholdstittel, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { Knapp } from 'nav-frontend-knapper';
import { formaterDato, MatchProps } from '../../utils/utils';
import { INNGANGSSPORSMAL_PATH } from '../../utils/konstanter';
import InformasjonModal from './informasjon/informasjon-modal';
import { AppState } from '../../reducer';
import { Data as FeatureToggleData, selectFeatureToggles } from '../../ducks/feature-toggles';
import veilederSvg from './veileder-mann.svg';
import merVeiledningSvg from './mer-veiledning.svg';
import { selectBrukersNavn, State as BrukersNavnState } from '../../ducks/brukers-navn';
import { selectRegistreringstatus, State as RegistreringStatusState } from '../../ducks/registreringstatus';
import { frontendLogger } from '../../metrikker/metrics-utils';

interface Props {
    featureToggles: FeatureToggleData;
    registreringStatus: RegistreringStatusState;
    brukersNavn: BrukersNavnState;
}

type RegistreringArbeidssokerSykmeldtProps = Props & RouteComponentProps<MatchProps>;

interface State {
    isModalOpen: boolean;
}

class RegistreringArbeidssokerSykmeldt extends React.Component<RegistreringArbeidssokerSykmeldtProps, State> {

    constructor(props: RegistreringArbeidssokerSykmeldtProps) {
        super(props);

        this.state = {
            isModalOpen: false
        };

    }

    handleSeVideoBtnClicked = () => {
        this.setState({isModalOpen: true});
    }

    handleModalLukkeknappClicked = () => {
        this.setState({isModalOpen: false});
    }

    render() {
        const { registreringStatus, brukersNavn, featureToggles } = this.props;
        const toggleRegistreringTekst = featureToggles['veiledearbeidssoker.registrering.tekst'];
        const veilederpanelKompakt = window.matchMedia('(min-width: 768px)').matches;
        const veilederpanelType = veilederpanelKompakt ? 'normal' : 'plakat';
        const { fornavn } = brukersNavn.data;
        const dato = formaterDato(registreringStatus.data.maksDato);

        const Rad1 = () => {
            return (
                <div className="registrering-sykmeldt__rad1 rad-even">
                    <Veilederpanel
                        svg={<img src={veilederSvg} alt="" className="nav-veilederpanel-illustrasjon" />}
                        type={veilederpanelType}
                        kompakt={veilederpanelKompakt}
                    >
                        <FormattedHTMLMessage
                            id="registrering-sykmeldt-snakkeboble"
                            values={{ fornavn, dato }}
                        />
                    </Veilederpanel>
                </div>
            );
        };

        const Rad2 = () => {
            const { isModalOpen } = this.state;
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
                    { isModalOpen &&
                        <InformasjonModal
                            isOpen={this.state.isModalOpen}
                            onRequestClose={this.handleModalLukkeknappClicked}
                        />
                    }
                </div>
            );
        };

        const Rad3 = () => {
            return (
                <div className="registrering-sykmeldt__rad3">
                    <Innholdstittel
                        tag="h2"
                        className="rad__tittel rad3__tittel"
                    >
                        <FormattedMessage id="registrering-sykmeldt.argument3tittel"/>
                    </Innholdstittel>
                    <div className="rad3__tekst">
                        <Normaltekst>
                            <FormattedHTMLMessage id="registrering-sykmeldt.rad3.del1"/>
                        </Normaltekst>
                        {
                            toggleRegistreringTekst
                                ?
                                    <div
                                        className="typo-normal"
                                        onClick={(e: any) => { // tslint:disable-line
                                            if (e.target.tagName === 'A') {
                                                frontendLogger('syfo.cv.lenke.klikk');
                                            }
                                        }}
                                    >
                                        <FormattedHTMLMessage id="registrering-sykmeldt.rad3.del2"/>
                                    </div>
                                :
                                null
                        }
                    </div>
                    <div className="rad3__knapperad">
                        <KnappBase
                            type="hoved"
                            onClick={() => this.props.history.push(INNGANGSSPORSMAL_PATH)}
                            data-testid="start-registrering"
                        >
                            <FormattedMessage id="registrering-sykmeldt-knapp"/>
                        </KnappBase>
                    </div>
                </div>
            );
        };

        const rader = [
            <Rad1 key={1} />,
            <Rad2 key={2} />,
            <Rad3 key={3} />
        ];

        return (
            <div className="registrering-sykmeldt">
                <div className="banner">
                    <Sidetittel>
                        <FormattedMessage id="registrering-sykmeldt.tittel"/>
                    </Sidetittel>
                </div>
                {rader}
            </div>
        );

    }

}

const mapStateToProps = (state: AppState) => ({
    featureToggles: selectFeatureToggles(state),
    registreringStatus: selectRegistreringstatus(state),
    brukersNavn: selectBrukersNavn(state),
});

export default connect(mapStateToProps)(withRouter(RegistreringArbeidssokerSykmeldt));
