import * as React from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './decorator/decorator-mock';
import SjekkRegistreringstatus from './komponenter/oppfolgingsstatus/sjekk-registreringstatus';
import HentInitialData from './komponenter/initialdata/hent-initial-data';
import {
    AVBRYT_PATH,
    basename,
    DUERNAREGISTRERT_PATH,
    FULLFOR_PATH,
    OPPSUMMERING_PATH,
    REAKTIVERING_PATH,
    SBLREG_PATH,
    SKJEMA_PATH, SKJEMA_SYKEFRAVAER_PATH,
    START_PATH
} from './utils/konstanter';
import ProgressBarContainer from './komponenter/progress-bar/progress-bar-container';
import Banner from './komponenter/banner/banner';
import Sideanimasjon from './komponenter/sideanimasjon/sideanimasjon';
import StartRedirecter from './sider/start-redirecter';
import SkjemaSykefravaerBeholdeJobb from './sider/skjema-sykefravaer/skjema-sykefravaer-beholde-jobb';
import Inngangssporsmal from './sider/skjema-sykefravaer/inngangssporsmal';
import SkjemaRegistrering from './sider/skjema-registrering/skjema-registrering';
import Oppsummering from './sider/oppsummering/oppsummering';
import DuErNaRegistrert from './sider/registrert/registrert';
import Avbryt from './sider/avbryt/avbryt';
import SblRegistrering from './sider/sbl-registrering/sbl-registrering';
import Fullfor from './sider/fullfor/fullfor';
import { Redirect, Switch } from 'react-router';
import KreverReaktivering from './sider/krever-reaktivering/krever-reaktivering';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <HentInitialData>
                        <SjekkRegistreringstatus>
                            <Router basename={basename}>
                                <>
                                    <Route path="/" component={Banner}/>
                                    <Route path={'/:url'} component={ProgressBarContainer}/>
                                    <Sideanimasjon>
                                        <Switch>
                                            <Route path={'/bla'} component={Inngangssporsmal}/>
                                            <Route path={START_PATH} component={StartRedirecter}/>
                                            <Route path={REAKTIVERING_PATH} component={KreverReaktivering}/>
                                            <Route path={`${SKJEMA_PATH}/:id`} component={SkjemaRegistrering}/>
                                            <Route
                                                path={`${SKJEMA_SYKEFRAVAER_PATH}/1/:id`}
                                                component={SkjemaSykefravaerBeholdeJobb}
                                            />
                                            <Route
                                                path={`${SKJEMA_SYKEFRAVAER_PATH}/2/:id`}
                                                component={SkjemaSykefravaerBeholdeJobb}
                                            />
                                            <Route
                                                path={`${SKJEMA_SYKEFRAVAER_PATH}/3/:id`}
                                                component={SkjemaSykefravaerBeholdeJobb}
                                            />
                                            <Route
                                                path={`${SKJEMA_SYKEFRAVAER_PATH}/4/:id`}
                                                component={SkjemaSykefravaerBeholdeJobb}
                                            />
                                            <Route path={OPPSUMMERING_PATH} component={Oppsummering}/>
                                            <Route path={SBLREG_PATH} component={SblRegistrering}/>
                                            <Route path={AVBRYT_PATH} component={Avbryt}/>
                                            <Route path={FULLFOR_PATH} component={Fullfor}/>
                                            <Route path={DUERNAREGISTRERT_PATH} component={DuErNaRegistrert}/>
                                            <Redirect exact={true} from="/" to={START_PATH}/>
                                        </Switch>
                                    </Sideanimasjon>
                                </>
                            </Router>
                        </SjekkRegistreringstatus>
                    </HentInitialData>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
