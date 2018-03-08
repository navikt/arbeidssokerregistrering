import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { create } from '../../store';
import { lagreArbeidsforhold, selectSisteArbeidsforhold } from '../../ducks/siste-arbeidsforhold';
import { FetchStub, mountWithStoreAndIntl, promiseWithSetTimeout, stubFetch } from '../../test/test-utils';
import SisteArbeidsforhold from './siste-arbeidsforhold';

enzyme.configure({adapter: new Adapter()});

afterEach(() => fetch.restore());

describe('<SisteArbeidsforhold />', () => {
    it('skal ikke hente siste arbeidsforhold dersom state er populert', () => {
        const store = create();
        const fetchStub = new FetchStub().addResponse('sistearbeidsforhold', {});
        stubFetch( fetchStub);

        store.dispatch(lagreArbeidsforhold({}));

        mountWithStoreAndIntl(<SisteArbeidsforhold />, store);

        expect(fetchStub.getCallcount('sistearbeidsforhold')).to.equal(0);
    });
    it('skal hente siste arbeidsforhold og state', () => {
        const store = create();
        const state = {dummy: 'dummy'};
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', state)
            .addResponse('kryssklassifiser', {});

        stubFetch( fetchStub);

        mountWithStoreAndIntl(<SisteArbeidsforhold />, store);

        return promiseWithSetTimeout()
            .then(() => {
                expect(selectSisteArbeidsforhold(store.getState()).data).to.equal(state);
                expect(fetchStub.getCallcount('sistearbeidsforhold')).to.equal(1);
            });
    });
});