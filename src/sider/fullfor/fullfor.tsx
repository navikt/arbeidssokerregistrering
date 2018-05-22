import * as React from 'react';
import * as _ from 'lodash';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Element, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { getIntlMessage, MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import KnappFullfor from '../sporsmal/knapp-fullfor';
import EkspanderbartInfo from '../../komponenter/ekspanderbartinfo/ekspanderbartInfo';
import { AppState } from '../../reducer';
import {
    utforRegistrering,
    mapBrukerRegistreringsData,
    State as RegistrerBrukerState,
    Data as RegistrerBrukerData
} from '../../ducks/registrerbruker';
import Feilmelding from './fullfor-feilmelding';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import { registrerBrukerSBLArbeid  } from '../../ducks/api';
import { STATUS } from '../../ducks/api-utils';
import AvhuketLI from '../../komponenter/liste/avhuket-li';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import BekreftCheckboksPanel from '../../komponenter/godta-vilkar-panel/bekreft-checkboks-panel';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { DUERNAREGISTRERT_PATH, START_PATH } from '../../utils/konstanter';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';
import Loader from '../../komponenter/loader/loader';

interface StateProps {
    registrerBrukerData: RegistrerBrukerState;
}

interface DispatchProps {
    onRegistrerBruker: (data: RegistrerBrukerData) => Promise<void | {}>;
}

interface EgenStateProps {
    markert: boolean;
    sblArbeidRegistrerBrukerStatus: string;
}

type EgenProps = RouteComponentProps<MatchProps> & StateProps & DispatchProps & InjectedIntlProps;

class Fullfor extends React.PureComponent<EgenProps, EgenStateProps> {
    constructor(props: EgenProps) {
        super(props);
        this.state = {
            markert: false,
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

        this.props.onRegistrerBruker(this.props.registrerBrukerData.data)
            .then((res) => {
                if (!!res) {
                    registrerBrukerSBLArbeid(1000 * 130) // 130 sekunder
                        .then(
                            () => this.props.history.push(DUERNAREGISTRERT_PATH),
                            () => this.props.history.push(DUERNAREGISTRERT_PATH),
                        );
                }
            });
    }

    settMarkert() {
        this.setState({
            markert: !this.state.markert
        });
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

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl}/>}
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
                        <Knappervertikalt>
                            <KnappFullfor
                                intl={intl}
                                disabled={!this.state.markert}
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
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    onRegistrerBruker: (data) => dispatch(utforRegistrering(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(Fullfor)
);
