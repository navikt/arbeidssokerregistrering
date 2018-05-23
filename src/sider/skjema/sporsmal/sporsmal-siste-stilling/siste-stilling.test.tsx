import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import { create } from '../../../../store';
import {
    FetchStub, mountWithStoreAndIntl, promiseWithSetTimeout,
    stubFetch
} from '../../../../test/test-utils';
import SisteStilling from './siste-stilling';
import { ingenYrkesbakgrunn, velgSisteStilling } from '../../../../ducks/siste-stilling';
import sisteStillingFraAAReg from '../../../../mocks/siste-stilling-fra-aareg';

enzyme.configure({adapter: new Adapter()});

let sandbox;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});

afterEach(() => {
    sandbox.restore();
    if (fetch.restore) {
        fetch.restore();
    }
});

const dummyProps = {
    sporsmalId: '',
    endreSvar: (sporsmalId: string, svar: number) => {},
    hentAvgittSvar: (sporsmalId: string) => 0,
};

describe('<SisteStilling />', () => {
    it('Hvis bruker ikke er i AAreg, så skal "Har ikke hatt jobb" være default svar.', () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', {});
        stubFetch(fetchStub);

        store.dispatch(velgSisteStilling(ingenYrkesbakgrunn));

        const endreSvarSpy = sandbox.spy(dummyProps.endreSvar);
        const props = {
            ...dummyProps,
            endreSvar: endreSvarSpy,
        };

        mountWithStoreAndIntl(<SisteStilling {...props}/>, store);

        expect(endreSvarSpy.getCall(0).args[1]).to.be.equal(2);
    });

    it('Hvis bruker har stilling i AAReg, så skal "Har hatt jobb" være default svar.', () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', {});
        stubFetch(fetchStub);

        store.dispatch(velgSisteStilling(sisteStillingFraAAReg));

        const endreSvarSpy = sandbox.spy(dummyProps.endreSvar);
        const props = {
            ...dummyProps,
            endreSvar: endreSvarSpy,
        };
        mountWithStoreAndIntl(<SisteStilling {...props}/>, store);

        expect(endreSvarSpy.getCall(0).args[1]).to.be.equal(1);
    });

    it('Hvis bruker endrer svar til "Har ikke hatt jobb", så skal state.sisteStilling bli ingenYrkesbakgrunn', () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', {});
        stubFetch(fetchStub);

        store.dispatch(velgSisteStilling(sisteStillingFraAAReg));

        const wrapper = mountWithStoreAndIntl(<SisteStilling {...dummyProps}/>, store);

        wrapper.find(Alternativ);

        expect(endreSvarSpy.getCall(0).args[1]).to.be.equal(1);
    });
});