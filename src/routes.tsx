import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Banner from './komponenter/banner/banner';
import ProgressBarContainer from './komponenter/progress-bar/progress-bar-container';
import Sideanimasjon from './komponenter/sideanimasjon/sideanimasjon';
import Inngangssporsmal from './sider/skjema-sykefravaer/inngangssporsmal';
import AlleredeRegistrert from './sider/allerede-registrert/allerede-registrert';
import {
    ALLEREDE_REGISTRERT_PATH,
    DU_ER_NA_REGISTRERT_PATH,
    FULLFOR_PATH,
    IKKE_ARBEIDSSSOKER_UTENFOR_OPPFOLGING_PATH, INFOSIDE_PATH,
    INNGANGSSPORSMAL_PATH,
    OPPSUMMERING_PATH,
    REAKTIVERING_PATH,
    SBLREG_PATH,
    SKJEMA_PATH,
    SKJEMA_SYKEFRAVAER_PATH,
    START_PATH
} from './utils/konstanter';
import Startside from './sider/start/startside';
import KreverReaktivering from './sider/krever-reaktivering/krever-reaktivering';
import SkjemaRegistrering from './sider/skjema-registrering/skjema-registrering';
import SkjemaSykefravaerNyArbeidsgiver from './sider/skjema-sykefravaer/skjema-sykefravaer-ny-arbeidsgiver';
import SkjemaSykefravaerSammeArbeidsgiver from './sider/skjema-sykefravaer/skjema-sykefravaer-samme-arbeidsgiver';
import SkjemaSykefravaerUsikker from './sider/skjema-sykefravaer/skjema-sykefravaer-usikker';
import SkjemaSykefravaerIngenPasser from './sider/skjema-sykefravaer/skjema-sykefravaer-ingen-passer';
import Oppsummering from './sider/oppsummering/oppsummering';
import SblRegistrering from './sider/sbl-registrering/sbl-registrering';
import Fullfor from './sider/fullfor/fullfor';
import Infoside from './sider/infoside/infoside';
import DuErNaRegistrert from './sider/registrert/registrert';
import { AppState } from './reducer';
import { selectGradualRolloutNyRegistreringFeatureToggle,
    selectSykefravaerFeatureToggle } from './ducks/feature-toggles';
import { connect } from 'react-redux';
import {
    Data as RegistreringstatusData,
    RegistreringType,
    selectRegistreringstatus
} from './ducks/registreringstatus';
import InfoForIkkeArbeidssokerUtenOppfolging
    from './sider/info-for-ikke-arbeidssoker-uten-oppfolging/info-for-ikke-arbeidssoker-uten-oppfolging';
import RedirectAll from './komponenter/redirect-all';
import { selectReaktiveringStatus } from './ducks/reaktiverbruker';
import { STATUS } from './ducks/api-utils';
import { alleSporsmalErBesvarte, sisteStillingErSatt } from './sider/fullfor/fullfor-utils';
import { State as SvarState } from './ducks/svar';
import { Stilling } from './ducks/siste-stilling';

interface StateProps {
    visSykefravaerSkjemaToggle: boolean;
    registreringstatusData: RegistreringstatusData;
    gradualRolloutNyRegistrering: boolean;
    reaktivertStatus: string;
    svar: SvarState;
    sisteStilling: Stilling;
}

class Routes extends React.Component<StateProps> {

    beregnBrukNyRegistrering(): boolean {
        const { gradualRolloutNyRegistrering, registreringstatusData } = this.props;

        if (registreringstatusData.registreringType === RegistreringType.SPERRET) {
            return false;
        }

        return gradualRolloutNyRegistrering;
    }

    render() {

        const { svar, sisteStilling, registreringstatusData, reaktivertStatus } = this.props;
        const registreringType = registreringstatusData.registreringType;

        if (registreringType === RegistreringType.ALLEREDE_REGISTRERT) {
            return <RedirectAll to={ALLEREDE_REGISTRERT_PATH} component={AlleredeRegistrert}/>;
        } else if (!this.beregnBrukNyRegistrering()) {

            if (registreringType === RegistreringType.SPERRET) {
                return (
                    <RedirectAll
                        to={IKKE_ARBEIDSSSOKER_UTENFOR_OPPFOLGING_PATH}
                        component={InfoForIkkeArbeidssokerUtenOppfolging}
                    />
                );
            } else {
                return <RedirectAll to={SBLREG_PATH} component={SblRegistrering} />;
            }

        } else if (registreringType === RegistreringType.REAKTIVERING &&
                reaktivertStatus !== STATUS.OK) {
            return <RedirectAll to={REAKTIVERING_PATH} component={KreverReaktivering} />;
        }

        const visSykefravaerSkjema = registreringType === RegistreringType.SYKMELDT_REGISTRERING
            && this.props.visSykefravaerSkjemaToggle;

        const visOrdinaerSkjema = !visSykefravaerSkjema;

        const alleSporsmalBesvart = alleSporsmalErBesvarte(svar) && sisteStillingErSatt(sisteStilling)
            || (registreringType === RegistreringType.SYKMELDT_REGISTRERING); // TODO: midlertidig

        return (
            <>
                <Route path="/" component={Banner}/>
                <Route path="/:url" component={ProgressBarContainer}/>

                <Sideanimasjon>

                    <Switch>

                        {alleSporsmalBesvart ? <Route path={OPPSUMMERING_PATH} component={Oppsummering} /> : null}
                        {alleSporsmalBesvart ? <Route path={FULLFOR_PATH} component={Fullfor} /> : null}
                        {(alleSporsmalBesvart || reaktivertStatus === STATUS.OK) ? <Route path={DU_ER_NA_REGISTRERT_PATH} component={DuErNaRegistrert} /> : null} {/*tslint:disable-line*/}

                        { visOrdinaerSkjema ? (
                            <Switch>
                                <Route
                                    path={START_PATH}
                                    component={Startside}
                                />
                                <Route
                                    path={`${SKJEMA_PATH}/:id`}
                                    component={SkjemaRegistrering}
                                />
                                <Redirect
                                    to={START_PATH}
                                />
                            </Switch>
                        ) : null }

                        { visSykefravaerSkjema ? (
                            <Switch>
                                <Route
                                    path={INNGANGSSPORSMAL_PATH}
                                    component={Inngangssporsmal}
                                />
                                <Route
                                    path={INFOSIDE_PATH}
                                    component={Infoside}
                                />
                                <Route
                                    path={`${SKJEMA_SYKEFRAVAER_PATH}/1/:id`}
                                    component={SkjemaSykefravaerNyArbeidsgiver}
                                />
                                <Route
                                    path={`${SKJEMA_SYKEFRAVAER_PATH}/2/:id`}
                                    component={SkjemaSykefravaerSammeArbeidsgiver}
                                />
                                <Route
                                    path={`${SKJEMA_SYKEFRAVAER_PATH}/3/:id`}
                                    component={SkjemaSykefravaerUsikker}
                                />
                                <Route
                                    path={`${SKJEMA_SYKEFRAVAER_PATH}/4/:id`}
                                    component={SkjemaSykefravaerIngenPasser}
                                />
                                <Redirect
                                    to={INNGANGSSPORSMAL_PATH}
                                />
                            </Switch>
                        ) : null }

                    </Switch>

                </Sideanimasjon>
            </>);
    }

}

const mapStateToProps = (state: AppState) => ({
    visSykefravaerSkjemaToggle: selectSykefravaerFeatureToggle(state),
    registreringstatusData: selectRegistreringstatus(state).data,
    gradualRolloutNyRegistrering: selectGradualRolloutNyRegistreringFeatureToggle(state),
    reaktivertStatus: selectReaktiveringStatus(state),
    svar: state.svar,
    sisteStilling: state.sisteStilling.data.stilling
});

export default connect(mapStateToProps, null, null, { pure: false })(Routes);
