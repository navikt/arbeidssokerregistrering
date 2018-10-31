import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Banner from './komponenter/banner/banner';
import ProgressBarContainer from './komponenter/progress-bar/progress-bar-container';
import Sideanimasjon from './komponenter/sideanimasjon/sideanimasjon';
import Inngangssporsmal from './sider/skjema-sykefravaer/inngangssporsmal';
import {
    DUERNAREGISTRERT_PATH,
    FULLFOR_PATH,
    INNGANGSSPORSMAL,
    OPPSUMMERING_PATH,
    REAKTIVERING_PATH,
    SBLREG_PATH,
    SKJEMA_PATH,
    SKJEMA_SYKEFRAVAER_PATH,
    START_PATH
} from './utils/konstanter';
import StartRedirecter from './sider/start-redirecter';
import KreverReaktivering from './sider/krever-reaktivering/krever-reaktivering';
import SkjemaRegistrering from './sider/skjema-registrering/skjema-registrering';
import SkjemaSykefravaerNyArbeidsgiver from './sider/skjema-sykefravaer/skjema-sykefravaer-ny-arbeidsgiver';
import SkjemaSykefravaerSammeArbeidsgiver from './sider/skjema-sykefravaer/skjema-sykefravaer-samme-arbeidsgiver';
import SkjemaSykefravaerUsikker from './sider/skjema-sykefravaer/skjema-sykefravaer-usikker';
import SkjemaSykefravaerIngenPasser from './sider/skjema-sykefravaer/skjema-sykefravaer-ingen-passer';
import Oppsummering from './sider/oppsummering/oppsummering';
import SblRegistrering from './sider/sbl-registrering/sbl-registrering';
import Fullfor from './sider/fullfor/fullfor';
import DuErNaRegistrert from './sider/registrert/registrert';
import { AppState } from './reducer';
import { selectSykefravaerFeatureToggle } from './ducks/feature-toggles';
import { connect } from 'react-redux';
import { Data as RegistreringstatusData, RegistreringType, selectRegistreringstatus } from './ducks/registreringstatus';

interface StateProps {
    visSykefravaerSkjema: boolean;
    registreringstatusData: RegistreringstatusData;
}

class Routes extends React.Component<StateProps> {

    render() {

        const registreringType = this.props.registreringstatusData.registreringType;

        const visSykefravaerSkjema = registreringType === RegistreringType.SYKMELDT_REGISTRERING
            && this.props.visSykefravaerSkjema;

        const visOrdinaerSkjema = !visSykefravaerSkjema;

        return (
            <>
                <Route path="/" component={Banner}/>
                <Route path={'/:url'} component={ProgressBarContainer}/>

                <Sideanimasjon>

                    <Switch>

                        <Route path={REAKTIVERING_PATH} component={KreverReaktivering} />
                        <Route path={OPPSUMMERING_PATH} component={Oppsummering} />
                        <Route path={SBLREG_PATH} component={SblRegistrering} />
                        <Route path={FULLFOR_PATH} component={Fullfor} />
                        <Route path={DUERNAREGISTRERT_PATH} component={DuErNaRegistrert} />

                        { visOrdinaerSkjema ? (
                            <Switch>
                                <Route
                                    path={START_PATH}
                                    component={StartRedirecter}
                                />
                                <Route
                                    path={`${SKJEMA_PATH}/:id`}
                                    component={SkjemaRegistrering}
                                />
                                <Redirect
                                    from="*"
                                    to={START_PATH}
                                />
                            </Switch>
                        ) : null }

                        { visSykefravaerSkjema ? (
                            <Switch>
                                <Route
                                    path={INNGANGSSPORSMAL}
                                    component={Inngangssporsmal}
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
                                    from="*"
                                    to={INNGANGSSPORSMAL}
                                />
                            </Switch>
                        ) : null }

                    </Switch>

                </Sideanimasjon>
            </>);
    }

}

const mapStateToProps = (state: AppState) => ({
    visSykefravaerSkjema: selectSykefravaerFeatureToggle(state),
    registreringstatusData: selectRegistreringstatus(state).data,
});

export default connect(mapStateToProps, null, null, { pure: false })(Routes);
