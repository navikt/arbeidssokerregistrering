import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { disableVerikalScrollingVedAnimasjon, MatchProps } from '../../utils/utils';
import { AppState } from '../../reducer';
import { DU_ER_NA_REGISTRERT_PATH, FULLFOR_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { erIE } from '../../utils/ie-test';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { RegistreringType } from '../../ducks/registreringstatus';
import OrdinaerOppsummeringBesvarelser from './ordinaer-oppsummering-besvarelser';
import SykmeldtOppsummeringBesvarelser from './sykmeldt-oppsummering-besvarelser';
import './oppsummering.less';
import { mapAvgitteSvarForBackend } from '../../ducks/registrerbruker-utils';
import { selectSisteStilling } from '../../ducks/siste-stilling';
import {
    Data as RegistrerBrukerData,
    State as RegistrerBrukerState,
    utforRegistrering
} from '../../ducks/registrerbruker';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import FullforFeilhandtering from '../fullfor/feilhandtering/fullfor-feilhandtering';
import Loader, { loaderTittelElement } from '../../komponenter/loader/loader';
import { STATUS } from '../../ducks/api-utils';

interface StateProps {
    registrerBrukerData: RegistrerBrukerState;
    state: AppState;
}

interface DispatchProps {
    onRegistrerBruker: (data: RegistrerBrukerData, registreringType: RegistreringType) => Promise<void | {}>;
}

type Props = StateProps & DispatchProps & RouteComponentProps<MatchProps> & InjectedIntlProps;

class Oppsummering extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.handleNesteBtnClicked = this.handleNesteBtnClicked.bind(this);
    }

    componentWillMount() {
        disableVerikalScrollingVedAnimasjon();
    }

    handleNesteBtnClicked() {

        const { history, state, intl } = this.props;
        const regType = this.props.state.registreringStatus.data.registreringType;

        if (regType === RegistreringType.SYKMELDT_REGISTRERING) {

            const svarTilBackend = mapAvgitteSvarForBackend(state.svar, selectSisteStilling(state),
                intl, RegistreringType.SYKMELDT_REGISTRERING);

            this.props.onRegistrerBruker(
                svarTilBackend,
                RegistreringType.SYKMELDT_REGISTRERING
            ).then(() => {

                const erRegistrert = this.props.state.registrerBruker.status
                    === STATUS.OK;

                if (erRegistrert) {
                    history.push(DU_ER_NA_REGISTRERT_PATH);
                }

            });

        } else {
            history.push(FULLFOR_PATH);
        }

    }

    render() {
        const { state } = this.props;
        let classnames = 'oppsummering ';
        classnames += erIE() ? 'erIE' : '';

        const visOrdinaerBesvarelser = state.registreringStatus.data.registreringType
            === RegistreringType.ORDINAER_REGISTRERING;

        let oppsummeringBesvarelser;
        let tekstPrefix;
        let knappTekstId;

        if (visOrdinaerBesvarelser) {
           oppsummeringBesvarelser = <OrdinaerOppsummeringBesvarelser/>;
           tekstPrefix = 'ordinaer-oppsummering';
           knappTekstId = 'knapp-riktig';
        } else {
            oppsummeringBesvarelser = <SykmeldtOppsummeringBesvarelser/>;
            tekstPrefix = 'sykmeldt-oppsummering';
            knappTekstId = 'knapp-fullfor';
        }

        return (
            <Innholdslaster
                feilmeldingKomponent={<FullforFeilhandtering/>}
                avhengigheter={[this.props.registrerBrukerData]}
                loaderKomponent={<Loader tittelElement={loaderTittelElement}/>}
            >
                <section className={classnames}>
                    <Innholdstittel tag="h1" className="oppsummering-tittel">
                        <FormattedMessage id={`${tekstPrefix}-tittel`}/>
                    </Innholdstittel>
                    <Normaltekst className="oppsummering-ingress">
                        <FormattedMessage id={`${tekstPrefix}-ingress`}/>
                    </Normaltekst>
                    {oppsummeringBesvarelser}
                    <div className="lenke-avbryt-wrapper">
                        <KnappBase type="hoved" onClick={this.handleNesteBtnClicked} data-testid="neste">
                            <FormattedMessage id={knappTekstId}/>
                        </KnappBase>
                    </div>
                    <LenkeTilbake onClick={() => this.props.history.goBack()}/>
                    <LenkeAvbryt wrapperClassname="wrapper-too"/>
                </section>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    registrerBrukerData: state.registrerBruker,
    state: state
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    onRegistrerBruker: (data, registreringType: RegistreringType) =>
        dispatch(utforRegistrering(data, registreringType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(Oppsummering)
);
