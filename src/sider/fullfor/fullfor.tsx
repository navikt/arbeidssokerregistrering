import * as React from 'react';
import * as _ from 'lodash';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Element, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { getIntlMessage, MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import KnappFullfor from '../skjema/knapp-fullfor';
import EkspanderbartInfo from '../../komponenter/ekspanderbartinfo/ekspanderbartInfo';
import { AppState } from '../../reducer';
import {
    utforRegistrering,
    mapBrukerRegistreringsData,
    State as RegistrerBrukerState,
    Data as RegistrerBrukerData
} from '../../ducks/registrerbruker';
import FeilmeldingGenerell from './feilhandtering/feilmelding-generell';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import { registrerBrukerSBLArbeid  } from '../../ducks/api';
import { STATUS } from '../../ducks/api-utils';
import AvhuketLI from '../../komponenter/liste/avhuket-li';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import BekreftCheckboksPanel from '../../komponenter/godta-vilkar-panel/bekreft-checkboks-panel';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { DUERNAREGISTRERT_PATH, FEIL_PATH, START_PATH } from '../../utils/konstanter';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';
import Loader from '../../komponenter/loader/loader';
import { Data as FeatureTogglesData, selectFeatureToggles } from '../../ducks/feature-toggles';
import NavAlertStripe from 'nav-frontend-alertstriper';

export enum RegistreringStatus {
    INGEN_STATUS = 'INGEN_STATUS',
    STATUS_SUKSESS = 'STATUS_SUKSESS',
    BRUKER_ER_UKJENT = 'BRUKER_ER_UKJENT',
    BRUKER_KAN_IKKE_REAKTIVERES = 'BRUKER_KAN_IKKE_REAKTIVERES',
    BRUKER_MANGLER_ARBEIDSTILLATELSE = 'BRUKER_MANGLER_ARBEIDSTILLATELSE',
    BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET = 'BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET',
}

interface StateProps {
    registrerBrukerData: RegistrerBrukerState;
    featureToggles: FeatureTogglesData;
}

interface DispatchProps {
    onRegistrerBruker: (data: RegistrerBrukerData, featureToggles: FeatureTogglesData) => Promise<void | {}>;
}

interface EgenStateProps {
    markert: boolean;
    visAdvarsel: boolean;
    sblArbeidRegistrerBrukerStatus: string;
}

type EgenProps = RouteComponentProps<MatchProps> & StateProps & DispatchProps & InjectedIntlProps;

class Fullfor extends React.PureComponent<EgenProps, EgenStateProps> {
    constructor(props: EgenProps) {
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
        const {registrerBrukerData, history} = this.props;
        if (_.isEmpty(registrerBrukerData.data)) {
            history.push(START_PATH);
        }
    }

    registrerBrukerOnClick() {
        this.setState((prevState) => ({...prevState, sblArbeidRegistrerBrukerStatus: STATUS.PENDING}));

        this.props.onRegistrerBruker(this.props.registrerBrukerData.data, this.props.featureToggles)
            .then((res: { brukerStatus: RegistreringStatus }) => {
                if (!!res && res.brukerStatus === RegistreringStatus.STATUS_SUKSESS) {
                    // Bruker må finnes i SBL arbeid for at nav.no skal forstå konteksten til bruker
                    registrerBrukerSBLArbeid(1000 * 130) // 130 sekunder
                        .then(
                            () => this.props.history.push(DUERNAREGISTRERT_PATH),
                            () => this.props.history.push(DUERNAREGISTRERT_PATH),
                        );
                } else {
                    this.giBrukerPassendeFeilmelding(res);
                }
            });

        const {markert} = this.state;
        if (!markert) {
            this.setState({ visAdvarsel: true });
        }
    }

    giBrukerPassendeFeilmelding(res?: { brukerStatus: RegistreringStatus }) {
        const goTo = this.props.history.push;
        if (!res) {
            goTo(FEIL_PATH);
        } else {
            goTo(`${FEIL_PATH}/${res.brukerStatus}`);
        }
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

        const loaderTittelElement = (
            <React.Fragment>
                <Innholdstittel className="blokk-s">
                    Registrering pågår.
                </Innholdstittel>
                <Normaltekst>
                    Vi setter opp tjenester til deg. Dette kan ta noen sekunder.
                </Normaltekst>
            </React.Fragment>
        );

        const advarselElement = this.state.visAdvarsel && (
            <NavAlertStripe type="advarsel">
                <Normaltekst>
                    <FormattedMessage id="fullfor-advarsel"/>
                </Normaltekst>
            </NavAlertStripe>
        );

        return (
            <Innholdslaster
                feilmeldingKomponent={<FeilmeldingGenerell intl={intl}/>}
                avhengigheter={[registrerBrukerData, {status: this.state.sblArbeidRegistrerBrukerStatus}]}
                loaderKomponent={<Loader tittelElement={loaderTittelElement} />}
            >
                <ResponsivSide>
                    <div className="fullfor">
                        <Systemtittel tag="h1" className="tittel"><FormattedMessage id="fullfor-header"/></Systemtittel>
                        <Element className="ingress"><FormattedMessage id="fullfor-ingress"/></Element>
                        <Element><FormattedMessage id="fullfor-overskrift-liste"/></Element>

                        <ul className="fullfor-liste">
                            <AvhuketLI><Normaltekst><FormattedMessage id="fullfor-liste-1"/></Normaltekst></AvhuketLI>
                            <AvhuketLI><Normaltekst><FormattedMessage id="fullfor-liste-2"/></Normaltekst></AvhuketLI>
                            <AvhuketLI><Normaltekst><FormattedMessage id="fullfor-liste-3"/></Normaltekst></AvhuketLI>
                            <AvhuketLI><Normaltekst><FormattedMessage id="fullfor-liste-4"/></Normaltekst></AvhuketLI>
                        </ul>

                        <EkspanderbartInfo tittelId="fullfor-les-mer" className="infopanel">
                            <Normaltekst><FormattedMessage id="fullfor-les-mer-beskrivelse"/></Normaltekst>
                        </EkspanderbartInfo>
                        <BekreftCheckboksPanel
                            onChange={this.settMarkert}
                            checked={this.state.markert}
                            label={getIntlMessage(intl.messages, 'fullfor-sjekkboks')}
                            className="bekreft-panel"
                        />
                        {advarselElement}
                        <Knappervertikalt>
                            <KnappFullfor
                                intl={intl}
                                onClick={this.registrerBrukerOnClick}
                            />
                            <LenkeAvbryt classname="avbryt"/>
                        </Knappervertikalt>
                    </div>
                </ResponsivSide>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state) => ({
    registrerBrukerData: mapBrukerRegistreringsData(state),
    featureToggles: selectFeatureToggles(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    onRegistrerBruker: (data, featureToggles) => dispatch(utforRegistrering(data, featureToggles)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(Fullfor)
);
