// /*tslint:disable*/
// import * as React from 'react';
// import * as sinon from 'sinon';
// import {expect} from 'chai';
// import * as enzyme from 'enzyme';
// import * as Adapter from 'enzyme-adapter-react-16';
// import SjekkRegistreringstatus from './sjekk-registreringstatus';
// import {
//     dispatchFeaturestatus,
//     dispatchRegistreringstatus,
//     mountWithStoreRouterAndIntl,
//     promiseWithSetTimeout,
//     shallowwithStoreAndIntl,
// } from '../../test/test-utils';
// import SblRegistrering from '../../sider/sbl-registrering/sbl-registrering';
// import {create} from '../../store';
// import AlleredeRegistrert from '../../sider/allerede-registrert/allerede-registrert';
// import InfoForIkkeArbeidssokerUtenOppfolging from "../../sider/info-for-ikke-arbeidssoker-uten-oppfolging/info-for-ikke-arbeidssoker-uten-oppfolging";
// import {Registreringstatus, RegistreringType} from "../../ducks/registreringstatus";
//
// enzyme.configure({adapter: new Adapter()});
//
// let sandbox;
// beforeEach(() => {
//     sandbox = sinon.createSandbox();
// });
// afterEach(() => {
//     sandbox.restore();
// });
//
// describe('<SjekkRegistreringstatus />', () => {
//     it('skal sende bruker til sbl om den ikke er under oppfølging og ny-registrering er avskrudd', () => {
//         const store = create();
//         dispatchRegistreringstatus({underOppfolging: false}, store);
//         dispatchFeaturestatus({
//             'arbeidssokerregistrering.gradual-rollout-ny-registrering': false,
//             'arbeidssokerregistrering.sykefravaer': false
//         },                    store);
//
//         const wrapper = shallowwithStoreAndIntl(<SjekkRegistreringstatus />, store);
//
//         expect(wrapper.find(SblRegistrering)).to.have.length(1);
//
//     });
//
//     it('skal ikke sende bruker til sbl om feature for ny-registrering er påskrudd', () => {
//         const store = create();
//         dispatchFeaturestatus({
//             'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
//             'arbeidssokerregistrering.sykefravaer': false
//         }, store);
//
//         dispatchRegistreringstatus({underOppfolging: false}, store);
//
//         const wrapper = shallowwithStoreAndIntl(<SjekkRegistreringstatus />, store);
//
//         expect(wrapper.find(SblRegistrering)).to.have.length(0);
//
//     });
//
//
//     it('skal sende bruker til AlleredeRegistrert om den er under oppfølging', () => {
//         const store = create();
//
//         dispatchRegistreringstatus({underOppfolging: true, registreringType: RegistreringType.ALLEREDE_REGISTRERT}, store);
//
//         const wrapper = mountWithStoreRouterAndIntl(<SjekkRegistreringstatus/>, store);
//
//         expect(wrapper.find(AlleredeRegistrert)).to.have.length(1);
//     });
//
//     it('skal sende bruker til InfoForIkkeArbeidssokerUtenOppfolging om status er erIkkeArbeidssokerUtenOppfolging', () => {
//         const store = create();
//
//         dispatchRegistreringstatus({erIkkeArbeidssokerUtenOppfolging: true, registreringType: RegistreringType.SPERRET}, store);
//
//         const wrapper = mountWithStoreRouterAndIntl(<SjekkRegistreringstatus/>, store);
//
//         expect(wrapper.find(InfoForIkkeArbeidssokerUtenOppfolging)).to.have.length(1);
//     });
//
//     it('Skal rendre innhold dersom ny registrering er på og bruker ikke er under oppfølging', () => {
//         const store = create();
//
//         dispatchFeaturestatus({
//             'arbeidssokerregistrering.gradual-rollout-ny-registrering': true,
//             'arbeidssokerregistrering.sykefravaer': false
//         }, store);
//
//         dispatchRegistreringstatus({underOppfolging: false}, store);
//
//         const component = (
//             <SjekkRegistreringstatus >
//                 <div className="Dummy"/>
//             </SjekkRegistreringstatus>
//         );
//
//         const wrapper = mountWithStoreRouterAndIntl(component, store);
//
//         return promiseWithSetTimeout()
//             .then(() => {
//                 expect(wrapper.html()).to.have.string('Dummy');
//             });
//
//     });
//
// });