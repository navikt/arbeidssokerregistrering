import * as React from 'react';
import * as _ from 'lodash';
import { connect, Dispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
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
import Feilmelding from './fullfor-feilmelding';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import Tilbakeknapp from '../../komponenter/knapper/tilbakeknapp';
import { registrerBrukerSBLArbeid, VEIENTILARBEID_MED_NY_REGISTRERING_URL } from '../../ducks/api';
import { STATUS } from '../../ducks/api-utils';
import AvhuketLI from '../../komponenter/liste/avhuket-li';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import BekreftCheckboksPanel from '../../komponenter/godta-vilkar-panel/bekreft-checkboks-panel';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { START_PATH } from '../../utils/konstanter';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';

interface StateProps {
    registrerBruker: RegistrerBrukerState;
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
        const {registrerBruker, history} = this.props;
        if (_.isEmpty(registrerBruker.data)) {
            history.push(START_PATH);
        }
    }

    sendBrukerTilSblMedOverlay() {
        document.location.href = VEIENTILARBEID_MED_NY_REGISTRERING_URL;
    }

    registrerBrukerOnClick() {
        this.setState((prevState) => ({...prevState, sblArbeidRegistrerBrukerStatus: STATUS.PENDING}));

        this.props.onRegistrerBruker(this.props.registrerBruker.data)
            .then((res) => {
                if (!!res) {
                    registrerBrukerSBLArbeid(2500)
                        .then(this.sendBrukerTilSblMedOverlay, this.sendBrukerTilSblMedOverlay);
                }
            });
    }

    settMarkert() {
        this.setState({
            markert: !this.state.markert
        });
    }

    render() {
        const {registrerBruker, history, intl} = this.props;
        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding intl={intl}/>}
                avhengigheter={[registrerBruker, {status: this.state.sblArbeidRegistrerBrukerStatus}]}
                storrelse="XXL"
            >
                <ResponsivSide>
                    <div className="fullfor">
                        <Tilbakeknapp onClick={() => history.goBack()}/>
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
    registrerBruker: mapBrukerRegistreringsData(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    onRegistrerBruker: (data) => dispatch(utforRegistrering(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(Fullfor)
);
