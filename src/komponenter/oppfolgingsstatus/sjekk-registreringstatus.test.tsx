/*tslint:disable:variable-name*/
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SjekkRegistreringstatus from './sjekk-registreringstatus';
import {
    dispatchRegistreringstatus,
    promiseWithSetTimeout, mountWithStoreRouterAndIntl, shallowwithStoreAndIntl, dispatchFeaturestatus
} from '../../test/test-utils';
import SblRegistrering from '../../sider/sbl-registrering/sbl-registrering';
import { create } from '../../store';
import AlleredeRegistrert from '../../sider/allerede-registrert/allerede-registrert';

enzyme.configure({adapter: new Adapter()});

let sandbox;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});
afterEach(() => {
    sandbox.restore();
});

describe('<SjekkRegistreringstatus />', () => {
    it('skal sende bruker til sbl om den ikke oppfyller krav og ikke er under oppfølging', () => {
        const store = create();
        dispatchRegistreringstatus({underOppfolging: false, oppfyllerKrav: false}, store);
        dispatchFeaturestatus({'arbeidssokerregistrering.bruk-ny-registrering': false}, store);

        const wrapper = shallowwithStoreAndIntl(<SjekkRegistreringstatus />, store);

        expect(wrapper.find(SblRegistrering)).to.have.length(1);

    });

    it('skal ikke sende bruker til sbl om feature for ny-registrering er påskrudd', () => {
        const store = create();
        dispatchFeaturestatus({'arbeidssokerregistrering.bruk-ny-registrering': true}, store);
        dispatchRegistreringstatus({underOppfolging: false, oppfyllerKrav: false}, store);

        const wrapper = shallowwithStoreAndIntl(<SjekkRegistreringstatus />, store);

        expect(wrapper.find(SblRegistrering)).to.have.length(0);

    });

    it('skal sende bruker til AlleredeRegistrert om den er under oppfølging', () => {
        const store = create();

        dispatchRegistreringstatus({underOppfolging: true, oppfyllerKrav: false}, store);

        const wrapper = mountWithStoreRouterAndIntl(<SjekkRegistreringstatus/>, store);

        expect(wrapper.find(AlleredeRegistrert)).to.have.length(1);
    });
    it('Skal rendre innhold dersom ny registrering er på og bruker ikke er under oppfølging', () => {
        const store = create();

        dispatchFeaturestatus({'arbeidssokerregistrering.bruk-ny-registrering': true}, store);
        dispatchRegistreringstatus({underOppfolging: false, oppfyllerKrav: true}, store);

        const component = (
            <SjekkRegistreringstatus >
                <div className="Dummy"/>
            </SjekkRegistreringstatus>
        );

        const wrapper = mountWithStoreRouterAndIntl(component, store);

        return promiseWithSetTimeout()
            .then(() => {
                expect(wrapper.html()).to.have.string('Dummy');
            });

    });
});