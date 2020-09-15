import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { disableVertikalScrollingVedAnimasjon, MatchProps } from '../../utils/utils';
import { AppState } from '../../reducer';
import { DU_ER_NA_REGISTRERT_PATH, START_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { erIE } from '../../utils/ie-test';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { RegistreringType } from '../../ducks/registreringstatus';
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
import { erKlarForFullforing } from '../fullfor/fullfor-utils';

interface StateProps {
    registrerBrukerData: RegistrerBrukerState;
    state: AppState;
}

interface DispatchProps {
    onRegistrerBruker: (data: RegistrerBrukerData, registreringType: RegistreringType) => Promise<void | {}>;
}

type Props = StateProps & DispatchProps & RouteComponentProps<MatchProps> & InjectedIntlProps;

class OppsummeringSykmeldt extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.handleNesteBtnClicked = this.handleNesteBtnClicked.bind(this);
    }

    componentDidMount() {
        disableVertikalScrollingVedAnimasjon();
    }

    handleNesteBtnClicked() {

        const { history, state, intl } = this.props;

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
    }

    render() {
        if (!erKlarForFullforing(this.props.state)) {
            return <Redirect to={START_PATH} />;
        }

        let classnames = 'oppsummering ';
        classnames += erIE() ? 'erIE' : '';

        const oppsummeringBesvarelser = <SykmeldtOppsummeringBesvarelser/>;
        const tekstPrefix = 'sykmeldt-oppsummering';
        const knappTekstId = 'sykmeldt-oppsummering-knapp-fullfor';

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
    // @ts-ignore
    onRegistrerBruker: (data, registreringType: RegistreringType) =>
        dispatch(utforRegistrering(data, registreringType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(OppsummeringSykmeldt)
);
