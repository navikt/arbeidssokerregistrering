/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {
    dispatchFeaturestatus,
    dispatchRegistreringstatus,
    mountWithStoreRouterAndIntl,
} from './test/test-utils';
import {create} from './store';
import {ActionTypes as SvarActionTypes} from './ducks/svar';
import {SporsmalId} from './ducks/svar';
import Routes from './routes';
import { RegistreringType } from './ducks/registreringstatus';
import Fullfor from './sider/fullfor/fullfor';
import { FULLFOR_PATH, START_PATH} from './utils/konstanter';
import {ActionTypes as SisteStillingActionTypes, annenStilling} from './ducks/siste-stilling';
import {IngenSvar} from './ducks/svar-utils';
import SblRegistrering from './sider/sbl-registrering/sbl-registrering';
import InfoForIkkeArbeidssokerUtenOppfolging
    from './sider/info-for-ikke-arbeidssoker-uten-oppfolging/info-for-ikke-arbeidssoker-uten-oppfolging';
import AlleredeRegistrert from './sider/allerede-registrert/allerede-registrert';

enzyme.configure({adapter: new Adapter()});

describe('Routes', () => {

    it('Skal gå til første side hvis spørsmål ikke er besvart', () => {

        const store = create();

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING }, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
            'arbeidssokerregistrering.sykefravaer': true
        }, store);

        store.dispatch({
            type: SisteStillingActionTypes.ENDRE_SISTE_STILLING,
            data: { stilling: annenStilling }
        });

        [
            SporsmalId.dinSituasjon,
            SporsmalId.sisteStilling,
            SporsmalId.utdanning,
            SporsmalId.utdanningGodkjent,
            SporsmalId.utdanningBestatt,
            SporsmalId.helseHinder,
            SporsmalId.andreForhold,
        ].forEach(sporsmalId => store.dispatch({
            type: SvarActionTypes.AVGI_SVAR,
            data: {
                sporsmalId,
                svar: IngenSvar.INGEN_SVAR,
            }
        }));

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store, [FULLFOR_PATH]);

        expect(wrapper.find(Fullfor)).to.have.length(1);

    });

    it('skal sende bruker til sbl om den ikke er under oppfølging og ny-registrering er avskrudd', () => {

        const store = create();

        dispatchRegistreringstatus({underOppfolging: false}, store);
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': false,
            'arbeidssokerregistrering.sykefravaer': false
        }, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store);

        expect(wrapper.find(SblRegistrering)).to.have.length(1);

    });

    it('skal ikke sende bruker til sbl om feature for ny-registrering er påskrudd', () => {
        const store = create();
        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
            'arbeidssokerregistrering.sykefravaer': false
        }, store);

        dispatchRegistreringstatus({underOppfolging: false}, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store);

        expect(wrapper.find(SblRegistrering)).to.have.length(0);

    });


    it('skal sende bruker til AlleredeRegistrert om den er under oppfølging', () => {
        const store = create();

        dispatchRegistreringstatus({underOppfolging: true, registreringType: RegistreringType.ALLEREDE_REGISTRERT}, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes/>, store);

        expect(wrapper.find(AlleredeRegistrert)).to.have.length(1);
    });

    it('skal sende bruker til InfoForIkkeArbeidssokerUtenOppfolging om status er erIkkeArbeidssokerUtenOppfolging', () => {
        const store = create();

        dispatchRegistreringstatus({erIkkeArbeidssokerUtenOppfolging: true, registreringType: RegistreringType.SPERRET}, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes/>, store);

        expect(wrapper.find(InfoForIkkeArbeidssokerUtenOppfolging)).to.have.length(1);
    });

    it('Skal redirecte til startside dersom ny registrering er på og bruker ikke er under oppfølging', () => {
        const store = create();

        dispatchFeaturestatus({
            'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
            'arbeidssokerregistrering.sykefravaer': false
        }, store);

        dispatchRegistreringstatus({ registreringType: RegistreringType.ORDINAER_REGISTRERING,
            underOppfolging: false}, store);

        const wrapper = mountWithStoreRouterAndIntl(<Routes />, store);

        expect(wrapper.find({ to: START_PATH })).to.have.length(1);

    });

});