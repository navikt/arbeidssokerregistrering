import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Banner from './komponenter/banner/banner';
import ProgressBarContainer from './komponenter/progress-bar/progress-bar-container';
import Sideanimasjon from './komponenter/sideanimasjon/sideanimasjon';
import Inngangssporsmal from './sider/skjema-sykefravaer/inngangssporsmal';
import {
    AVBRYT_PATH, DUERNAREGISTRERT_PATH, FULLFOR_PATH,
    OPPSUMMERING_PATH,
    REAKTIVERING_PATH, SBLREG_PATH,
    SKJEMA_PATH,
    SKJEMA_SYKEFRAVAER_PATH,
    START_PATH
} from './utils/konstanter';
import StartRedirecter from './sider/start-redirecter';
import KreverReaktivering from './sider/krever-reaktivering/krever-reaktivering';
import SkjemaRegistrering from './sider/skjema-registrering/skjema-registrering';
import SkjemaSykefravaerBeholdeJobb from './sider/skjema-sykefravaer/skjema-sykefravaer-beholde-jobb';
import Oppsummering from './sider/oppsummering/oppsummering';
import SblRegistrering from './sider/sbl-registrering/sbl-registrering';
import Avbryt from './sider/avbryt/avbryt';
import Fullfor from './sider/fullfor/fullfor';
import DuErNaRegistrert from './sider/registrert/registrert';
import ToggleRoute from './komponenter/toggle-route';
import { AppState } from './reducer';
import { selectSykefravaerFeatureToggle } from './ducks/feature-toggles';
import { connect } from 'react-redux';

interface StateProps {
    visSykefravaerSkjema: boolean;
}

class Routes extends React.Component<StateProps> {

    render() {

        const isOn = this.props.visSykefravaerSkjema;

        return (
            <>
                <Route path="/" component={Banner}/>
                <Route path={'/:url'} component={ProgressBarContainer}/>
                <Sideanimasjon>
                    <Switch>
                        <ToggleRoute
                            path={'/bla'}
                            component={Inngangssporsmal}
                            isOn={isOn}
                            redirectTo={START_PATH}
                        />
                        <ToggleRoute
                            path={`${SKJEMA_SYKEFRAVAER_PATH}/1/:id`}
                            component={SkjemaSykefravaerBeholdeJobb}
                            isOn={isOn}
                            redirectTo={START_PATH}
                        />
                        <ToggleRoute
                            path={`${SKJEMA_SYKEFRAVAER_PATH}/2/:id`}
                            component={SkjemaSykefravaerBeholdeJobb}
                            isOn={isOn}
                            redirectTo={START_PATH}
                        />
                        <ToggleRoute
                            path={`${SKJEMA_SYKEFRAVAER_PATH}/3/:id`}
                            component={SkjemaSykefravaerBeholdeJobb}
                            isOn={isOn}
                            redirectTo={START_PATH}
                        />
                        <ToggleRoute
                            path={`${SKJEMA_SYKEFRAVAER_PATH}/4/:id`}
                            component={SkjemaSykefravaerBeholdeJobb}
                            isOn={isOn}
                            redirectTo={START_PATH}
                        />
                        <Route path={START_PATH} component={StartRedirecter}/>
                        <Route path={REAKTIVERING_PATH} component={KreverReaktivering}/>
                        <Route path={`${SKJEMA_PATH}/:id`} component={SkjemaRegistrering}/>
                        <Route path={OPPSUMMERING_PATH} component={Oppsummering}/>
                        <Route path={SBLREG_PATH} component={SblRegistrering}/>
                        <Route path={AVBRYT_PATH} component={Avbryt}/>
                        <Route path={FULLFOR_PATH} component={Fullfor}/>
                        <Route path={DUERNAREGISTRERT_PATH} component={DuErNaRegistrert}/>
                        <Redirect exact={true} from="*" to={START_PATH}/>
                    </Switch>
                </Sideanimasjon>
            </>);
    }

}

const mapStateToProps = (state: AppState) => ({
    visSykefravaerSkjema: selectSykefravaerFeatureToggle(state),
});

export default connect(mapStateToProps)(Routes);
