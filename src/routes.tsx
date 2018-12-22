import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import Banner from './komponenter/banner/banner';
import ProgressBarContainer from './komponenter/progress-bar/progress-bar-container';
import Sideanimasjon from './komponenter/sideanimasjon/sideanimasjon';
import AlleredeRegistrert from './sider/allerede-registrert/allerede-registrert';
import {
    ALLEREDE_REGISTRERT_PATH,
    DU_ER_NA_REGISTRERT_PATH,
    FULLFOR_PATH,
    IKKE_ARBEIDSSSOKER_UTENFOR_OPPFOLGING_PATH,
    INFOSIDE_PATH,
    INNGANGSSPORSMAL_PATH,
    OPPSUMMERING_PATH,
    REAKTIVERING_PATH,
    SKJEMA_PATH,
    SKJEMA_SYKEFRAVAER_PATH,
    START_PATH
} from './utils/konstanter';
import StartsideOrdinaer from './sider/startside/startside-ordinaer';
import StartsideSykmeldt from './sider/startside/startside-sykmeldt';
import Inngangssporsmal from './sider/skjema-sykefravaer/inngangssporsmal';
import Infoside from './sider/infoside/infoside';
import KreverReaktivering from './sider/krever-reaktivering/krever-reaktivering';
import SkjemaRegistrering from './sider/skjema-registrering/skjema-registrering';
import SkjemaSykefravaerNyArbeidsgiver from './sider/skjema-sykefravaer/skjema-sykefravaer-ny-arbeidsgiver';
import SkjemaSykefravaerSammeArbeidsgiver from './sider/skjema-sykefravaer/skjema-sykefravaer-samme-arbeidsgiver';
import SkjemaSykefravaerSammeArbeidsgiverNyStilling
    from './sider/skjema-sykefravaer/skjema-sykefravaer-samme-arbeidsgiver-ny-stilling';
import SkjemaSykefravaerUsikker from './sider/skjema-sykefravaer/skjema-sykefravaer-usikker';
import Oppsummering from './sider/oppsummering/oppsummering';
import Fullfor from './sider/fullfor/fullfor';
import DuErNaRegistrert from './sider/registrert/registrert';
import { AppState } from './reducer';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import {Data as RegistreringstatusData, RegistreringType, selectRegistreringstatus } from './ducks/registreringstatus';
import InfoForIkkeArbeidssokerUtenOppfolging
    from './sider/info-for-ikke-arbeidssoker-uten-oppfolging/info-for-ikke-arbeidssoker-uten-oppfolging';
import RedirectAll from './komponenter/redirect-all';
import { selectReaktiveringStatus } from './ducks/reaktiverbruker';
import { STATUS } from './ducks/api-utils';
import { erKlarForFullforing } from './sider/fullfor/fullfor-utils';
import {Data as FeatureToggleData, selectFeatureToggles } from './ducks/feature-toggles';
import TjenesteOppdateres from './sider/tjeneste-oppdateres';
import { RouteHerokuMock } from
        './mocks/HerokuappEndreMockRegistreringLoep/herokuapp-endre-mock-registrering-loep';

interface StateProps {
    registreringstatusData: RegistreringstatusData;
    reaktivertStatus: string;
    featureToggles: FeatureToggleData;
    state: AppState;
}

type AllProps = StateProps & RouteComponentProps<any>; // tslint:disable-line

class Routes extends React.Component<AllProps> {

    render() {

        const { registreringstatusData, reaktivertStatus, featureToggles, location } = this.props;
        const erNede = featureToggles['arbeidssokerregistrering.nedetid'];
        const registreringType = registreringstatusData.registreringType;
        const erFraSykefravaer = parse(location.search).fraSykefravaer;

        const visSykefravaerSkjema = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
        const visOrdinaerSkjema = !visSykefravaerSkjema;
        const klarForFullforing = erKlarForFullforing(this.props.state);
        const queryParams = location.search;

        if (registreringType === RegistreringType.ALLEREDE_REGISTRERT) {
            return <RedirectAll to={ALLEREDE_REGISTRERT_PATH} component={AlleredeRegistrert}/>;
        } else if (registreringType === RegistreringType.SPERRET) {
            return (
                <RedirectAll
                    to={IKKE_ARBEIDSSSOKER_UTENFOR_OPPFOLGING_PATH}
                    component={InfoForIkkeArbeidssokerUtenOppfolging}
                />
            );
        } else if (registreringType === RegistreringType.REAKTIVERING &&
            reaktivertStatus !== STATUS.OK) {
            if (erNede) {
                return <RedirectAll to={'/'} component={TjenesteOppdateres}/>;
            }
            return <RedirectAll to={REAKTIVERING_PATH} component={KreverReaktivering} />;
        } else if (registreringType === RegistreringType.SYKMELDT_REGISTRERING &&
            erFraSykefravaer && location.pathname === START_PATH) {
            return <RedirectAll to={INNGANGSSPORSMAL_PATH} component={Inngangssporsmal} />;
        }

        return (
            <>
                {RouteHerokuMock}

                <Route path="/" component={Banner}/>

                <Route path="/:url" component={ProgressBarContainer}/>

                <Sideanimasjon>

                    <Switch>

                        {erNede ? <RedirectAll to={'/'} component={TjenesteOppdateres}/> : null}
                        {klarForFullforing ? <Route path={OPPSUMMERING_PATH} component={Oppsummering} /> : null}
                        {(klarForFullforing || reaktivertStatus === STATUS.OK) ? <Route path={DU_ER_NA_REGISTRERT_PATH} component={DuErNaRegistrert} /> : null} {/*tslint:disable-line*/}

                        { visOrdinaerSkjema ? (
                            <Switch>
                                <Route
                                    path={START_PATH}
                                    component={StartsideOrdinaer}
                                />
                                <Route
                                    path={`${SKJEMA_PATH}/:id`}
                                    component={SkjemaRegistrering}
                                />
                                {klarForFullforing ?
                                    <Route path={FULLFOR_PATH} component={Fullfor} />
                                    :
                                    null
                                }
                                <Redirect
                                    to={START_PATH}
                                />
                            </Switch>
                        ) : null }

                        { visSykefravaerSkjema ? (
                            <Switch>
                                <Route
                                    path={START_PATH}
                                    component={StartsideSykmeldt}
                                />
                                {klarForFullforing ?
                                    <Route path={INFOSIDE_PATH} component={Infoside} />
                                    :
                                    null
                                }
                                <Route
                                    path={INNGANGSSPORSMAL_PATH}
                                    component={Inngangssporsmal}
                                />
                                <Route
                                    path={`${SKJEMA_SYKEFRAVAER_PATH}/1/:id`}
                                    component={SkjemaSykefravaerSammeArbeidsgiver}
                                />
                                <Route
                                    path={`${SKJEMA_SYKEFRAVAER_PATH}/2/:id`}
                                    component={SkjemaSykefravaerSammeArbeidsgiverNyStilling}
                                />
                                <Route
                                    path={`${SKJEMA_SYKEFRAVAER_PATH}/3/:id`}
                                    component={SkjemaSykefravaerNyArbeidsgiver}
                                />
                                <Route
                                    path={`${SKJEMA_SYKEFRAVAER_PATH}/4/:id`}
                                    component={SkjemaSykefravaerUsikker}
                                />
                                <Redirect
                                    to={START_PATH + queryParams}
                                />
                            </Switch>
                        ) : null }

                    </Switch>

                </Sideanimasjon>
            </>);
    }

}

const mapStateToProps = (state: AppState) => ({
    registreringstatusData: selectRegistreringstatus(state).data,
    reaktivertStatus: selectReaktiveringStatus(state),
    featureToggles: selectFeatureToggles(state),
    state: state,
});

export default connect(mapStateToProps, null, null, { pure: false })(withRouter(Routes));
