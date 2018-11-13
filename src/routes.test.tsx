/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {
    dispatchAlleSporsmal,
    dispatchFeaturestatus, dispatchNoenSporsmal,
    dispatchRegistreringstatus,
    mountWithStoreRouterAndIntl,
} from './test/test-utils';
import {create} from './store';
import Routes from './routes';
import { RegistreringType } from './ducks/registreringstatus';
import Fullfor from './sider/fullfor/fullfor';
import {
    DU_ER_NA_REGISTRERT_PATH,
    FULLFOR_PATH, INNGANGSSPORSMAL_PATH,
    OPPSUMMERING_PATH,
    REAKTIVERING_PATH,
    START_PATH
} from './utils/konstanter';
import SblRegistrering from './sider/sbl-registrering/sbl-registrering';
import InfoForIkkeArbeidssokerUtenOppfolging
    from './sider/info-for-ikke-arbeidssoker-uten-oppfolging/info-for-ikke-arbeidssoker-uten-oppfolging';
import AlleredeRegistrert from './sider/allerede-registrert/allerede-registrert';
import Oppsummering from './sider/oppsummering/oppsummering';
import DuErNaRegistrert from './sider/registrert/registrert';
import { ActionTypes as ReaktiverBrukerActionTypes } from './ducks/reaktiverbruker';
import KreverReaktivering from './sider/krever-reaktivering/krever-reaktivering';


enzyme.configure({adapter: new Adapter()});

describe('Routes', () => {

    it('Skal gå til KreverReaktivering hvis bruker kan reaktiveres, men er ikke reaktivert enda', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.REAKTIVERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        store.dispatch({ type: ReaktiverBrukerActionTypes.REAKTIVER_BRUKER_STATUS_PENDING, data: {} });

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [REAKTIVERING_PATH]);

        expect(wrapper.find(KreverReaktivering)).to.have.length(1);

    });

    it('Skal gå til fullfør side hvis alle spørsmål er besvart', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        dispatchAlleSporsmal(store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [FULLFOR_PATH]);

        expect(wrapper.find(Fullfor)).to.have.length(1);

    });

    it('Skal gå til første side istedenfor fullfør hvis spørsmål ikke er besvart', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        dispatchNoenSporsmal(store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [FULLFOR_PATH]);

        expect(wrapper.find({ to: START_PATH })).to.have.length(1);

    });

    it('Skal gå til oppsummering side hvis alle spørsmål er besvart', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        dispatchAlleSporsmal(store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [OPPSUMMERING_PATH]);

        expect(wrapper.find(Oppsummering)).to.have.length(1);

    });

    it('Skal gå til første side istedenfor oppsummering hvis spørsmål ikke er besvart', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        dispatchNoenSporsmal(store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [OPPSUMMERING_PATH]);
        expect(wrapper.find({ to: START_PATH })).to.have.length(1);

    });

    it('Skal gå til duernaregistrert-siden hvis alle spørsmål er besvart', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        dispatchAlleSporsmal(store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [DU_ER_NA_REGISTRERT_PATH]);

        expect(wrapper.find(DuErNaRegistrert)).to.have.length(1);

    });

    it('Skal gå til duernaregistrert-siden hvis bruker er reaktivert', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        store.dispatch({ type: ReaktiverBrukerActionTypes.REAKTIVER_BRUKER_STATUS_OK, data: {} });

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [DU_ER_NA_REGISTRERT_PATH]);

        expect(wrapper.find(DuErNaRegistrert)).to.have.length(1);

    });

    it('Skal gå til første side istedenfor duernaregistrert-siden hvis bruker ikke er reaktivert eller har besvart alle sporsmal', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [DU_ER_NA_REGISTRERT_PATH]);

        expect(wrapper.find({ to: START_PATH })).to.have.length(1);

    });

    it('Skal sende bruker til sbl om den ikke er under oppfølging og ny-registrering er avskrudd', () => {

        const store = create();
        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);

        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': false,
        }, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store);
        expect(wrapper.find(SblRegistrering)).to.have.length(1);

    });

    it('Skal ikke sende bruker til sbl om feature for ny-registrering er påskrudd', () => {
        const store = create();
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store);

        expect(wrapper.find(SblRegistrering)).to.have.length(0);

    });

    it('Skal sende bruker til AlleredeRegistrert om den er under oppfølging', () => {
        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.ALLEREDE_REGISTRERT }, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes/>, store);

        expect(wrapper.find(AlleredeRegistrert)).to.have.length(1);
    });

    it('Skal sende bruker til InfoForIkkeArbeidssokerUtenOppfolging når status er sperret', () => {
        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.SPERRET }, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes/>, store);

        expect(wrapper.find(InfoForIkkeArbeidssokerUtenOppfolging)).to.have.length(1);
    });

    it('Skal redirecte til startside dersom ny registrering er på og bruker ikke er under oppfølging', () => {
        const store = create();

        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store);

        expect(wrapper.find({ to: START_PATH })).to.have.length(1);

    });

    it('Skal redirecte til KreverReaktivering hvis registreringstype er REAKTIVERING', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.REAKTIVERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [START_PATH]);

        expect(wrapper.find(KreverReaktivering)).to.have.length(1);

    });

    it('Skal redirecte til Inngangssporsmal dersom ny registrering er på', () => {

        const store = create();

        dispatchRegistreringstatus({registreringType: RegistreringType.SYKMELDT_REGISTRERING, sykmeldtFraDato: "2018-10-21"}, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
        }, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [START_PATH]);
        expect(wrapper.find({ to: INNGANGSSPORSMAL_PATH })).to.have.length(1);

    });

});