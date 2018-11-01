import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import NavAlertStripe from 'nav-frontend-alertstriper';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { disableVerikalScrollingVedAnimasjon, getIntlMessage, MatchProps } from '../../utils/utils';
import KnappFullfor from '../skjema-registrering/knapp-fullfor';
import { AppState } from '../../reducer';
import { utforRegistrering, State as RegistrerBrukerState, Data as RegistrerBrukerData }
    from '../../ducks/registrerbruker';
import FullforFeilhandtering from './feilhandtering/fullfor-feilhandtering';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import { registrerBrukerSBLArbeid } from '../../ducks/api';
import { STATUS } from '../../ducks/api-utils';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { DU_ER_NA_REGISTRERT_PATH, START_PATH } from '../../utils/konstanter';
import Loader, { loaderTittelElement } from '../../komponenter/loader/loader';
import { Data as FeatureTogglesData, selectFeatureToggles } from '../../ducks/feature-toggles';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { erIE } from '../../utils/ie-test';
import { mapAvgitteSvarForBackend } from '../../ducks/registrerbruker-utils';
import { selectSisteStilling } from '../../ducks/siste-stilling';
import { erKlarForFullforing } from './fullfor-utils';

import utropstegnSvg from './utropstegn.svg';
import kalenderSvg from './kalender.svg';
import filnySvg from './fil-ny.svg';
import epostSvg from './epost.svg';
import ikonytelserSvg from './ikon-ytelser.svg';

import './fullfor.less';

interface StateProps {
    registrerBrukerData: RegistrerBrukerState;
    featureToggles: FeatureTogglesData;
    state: AppState;
}

interface DispatchProps {
    onRegistrerBruker: (data: RegistrerBrukerData, featureToggles: FeatureTogglesData) => Promise<void | {}>;
}

interface EgenState {
    markert: boolean;
    visAdvarsel: boolean;
    sblArbeidRegistrerBrukerStatus: string;
}

type Props = RouteComponentProps<MatchProps> & StateProps & DispatchProps & InjectedIntlProps;

class Fullfor extends React.PureComponent<Props, EgenState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            markert: false,
            visAdvarsel: false,
            sblArbeidRegistrerBrukerStatus: STATUS.OK
        };
        this.settMarkert = this.settMarkert.bind(this);
        this.registrerBrukerOnClick = this.registrerBrukerOnClick.bind(this);
    }

    componentWillMount() {
      
        if (!erKlarForFullforing(this.props.state)) {
            this.props.history.push(START_PATH);
        }

        disableVerikalScrollingVedAnimasjon();

    }

    registrerBrukerOnClick() {
        if (!this.state.markert) {
            this.setState({visAdvarsel: true});
            return;
        }
        this.setState((prevState) => ({...prevState, sblArbeidRegistrerBrukerStatus: STATUS.PENDING}));

        this.props.onRegistrerBruker(
            this.getSvarMappetForBackend(),
            this.props.featureToggles
        ).then((res) => {
            if (!!res) {
                // Bruker må finnes i SBL arbeid for at nav.no skal forstå konteksten til bruker
                registrerBrukerSBLArbeid(1000 * 130) // 130 sekunder
                    .then(
                        () => this.props.history.push(DU_ER_NA_REGISTRERT_PATH),
                        () => this.props.history.push(DU_ER_NA_REGISTRERT_PATH),
                    );
            }
        });
    }

    getSvarMappetForBackend() {
        const {state, intl} = this.props;
        return mapAvgitteSvarForBackend(state.svar, selectSisteStilling(state), intl);
    }

    settMarkert() {
        this.setState({
            markert: !this.state.markert
        });

        const {markert} = this.state;
        if (!markert) {
            this.setState({
                visAdvarsel: false
            });
        }
    }

    render() {
        const {registrerBrukerData, intl} = this.props;

        const advarselElement = this.state.visAdvarsel && (
            <NavAlertStripe type="advarsel">
                <Normaltekst>
                    <FormattedMessage id="fullfor-advarsel"/>
                </Normaltekst>
            </NavAlertStripe>
        );

        return (
            <Innholdslaster
                feilmeldingKomponent={<FullforFeilhandtering/>}
                avhengigheter={[registrerBrukerData, {status: this.state.sblArbeidRegistrerBrukerStatus}]}
                loaderKomponent={<Loader tittelElement={loaderTittelElement}/>}
            >
                <section className={`fullfor ${erIE() && 'erIE'}`}>
                    <Innholdstittel tag="h1" className="fullfor-tittel">
                        <FormattedMessage id="fullfor-header"/>
                    </Innholdstittel>
                    <Normaltekst className="fullfor-ingress">
                        <FormattedMessage id="fullfor-ingress"/>
                    </Normaltekst>

                    <div className="fullfor-sjekkliste">
                        <img
                            src={utropstegnSvg}
                            alt="Fullfør sjekkliste"
                            className="fullfor-sjekkliste__illustrasjon"
                        />

                        <Element tag="h2" className="fullfor-sjekkliste__heading">
                            <FormattedMessage id="fullfor-overskrift-liste"/>
                        </Element>

                        <ul className="fullfor-sjekkliste__liste">
                            <li className="typo-normal">
                                <FormattedMessage id="fullfor-liste-1"/>
                            </li>
                            <li className="typo-normal">
                                <FormattedMessage id="fullfor-liste-2"/>
                            </li>
                            <li className="typo-normal">
                                <FormattedMessage id="fullfor-liste-3"/>
                            </li>
                            <li className="typo-normal">
                                <FormattedMessage id="fullfor-liste-4"/>
                            </li>
                        </ul>
                    </div>

                    <div className="fullfor-info">
                        <Ekspanderbartpanel
                            tittel={getIntlMessage(intl.messages, 'fullfor-les-mer')}
                            tittelProps="normaltekst"
                            border={true}
                        >
                            <ul className="fullfor-info-liste">
                                <li className="fullfor-info-liste__element">
                                    <img
                                        src={epostSvg}
                                        alt="Meldekort"
                                        className="illustrasjon"
                                    />
                                    <Element className="tittel">Meldekort</Element>
                                    <Normaltekst><FormattedMessage id="fullfor-les-mer-meldekort"/></Normaltekst>
                                </li>
                                <li className="fullfor-info-liste__element">
                                    <img
                                        src={filnySvg}
                                        alt="CV"
                                        className="illustrasjon"
                                    />
                                    <Element className="tittel">CV</Element>
                                    <Normaltekst><FormattedMessage id="fullfor-les-mer-CV"/></Normaltekst>
                                </li>
                                <li className="fullfor-info-liste__element">
                                    <img
                                        src={kalenderSvg}
                                        alt="Aktivitetsplan"
                                        className="illustrasjon"
                                    />
                                    <Element className="tittel">Aktivitetsplanen</Element>
                                    <Normaltekst>
                                        <FormattedMessage id="fullfor-les-mer-aktivitetsplan"/>
                                    </Normaltekst>
                                </li>
                                <li className="fullfor-info-liste__element">
                                    <img
                                        src={ikonytelserSvg}
                                        alt="Ytelser"
                                        className="illustrasjon"
                                    />
                                    <Element className="tittel">Ytelser</Element>
                                    <Normaltekst><FormattedMessage id="fullfor-les-mer-ytelser"/></Normaltekst>
                                </li>
                            </ul>

                        </Ekspanderbartpanel>
                    </div>

                    <BekreftCheckboksPanel
                        onChange={this.settMarkert}
                        checked={this.state.markert}
                        label={getIntlMessage(intl.messages, 'fullfor-sjekkboks')}
                        className="fullfor-bekreft"
                    />
                    {advarselElement}
                    <div className={'knapper-vertikalt'}>
                        <KnappFullfor
                            intl={intl}
                            onClick={this.registrerBrukerOnClick}
                        />
                        <LenkeTilbake onClick={() => this.props.history.goBack()}/>
                        <LenkeAvbryt wrapperClassname="no-anim"/>
                    </div>
                </section>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    registrerBrukerData: state.registrerBruker,
    featureToggles: selectFeatureToggles(state),
    state: state,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    onRegistrerBruker: (data) => dispatch(utforRegistrering(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(Fullfor)
);
