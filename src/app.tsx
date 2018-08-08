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
    DUERNAREGISTRERT_PATH, FULLFOR_PATH,
    OPPSUMMERING_PATH,
    SBLREG_PATH,
    SKJEMA_PATH,
    START_PATH } from './utils/konstanter';
import ProgressBarContainer from './komponenter/progress-bar/progress-bar-container';
import Banner from './komponenter/banner/banner';
import Sideanimasjon from './komponenter/sideanimasjon/sideanimasjon';
import StartRegistrering from './sider/start/start';
import Skjema from './sider/skjema/skjema-container';
import Oppsummering from './sider/oppsummering/oppsummering';
import DuErNaRegistrert from './sider/registrert/registrert';
import Avbryt from './sider/avbryt/avbryt';
import SblRegistrering from './sider/sbl-registrering/sbl-registrering';
import Fullfor from './sider/fullfor/fullfor';
import { Redirect, Switch } from 'react-router';

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
                                            <Route path={START_PATH} component={StartRegistrering}/>
                                            <Route path={`${SKJEMA_PATH}/:id`} component={Skjema}/>
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
        )
        ;
    }
}

export default App;
