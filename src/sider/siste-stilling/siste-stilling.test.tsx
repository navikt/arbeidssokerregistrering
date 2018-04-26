import * as React from 'react';
import {expect} from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {create} from '../../store';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import {lagreArbeidsforhold, selectSisteStillingFraAAReg} from '../../ducks/siste-stilling-fra-aareg';
import {
    FetchStub, mountWithStoreAndIntl, promiseWithSetTimeout, shallowwithStoreAndIntl,
    stubFetch
} from '../../test/test-utils';
import SisteStilling from './siste-stilling';
import oversettelseAvStillingFraAAReg from '../../mocks/oversettelse-av-stilling-fra-aareg'

enzyme.configure({adapter: new Adapter()});

afterEach(() => {
    if (fetch.restore) {
        fetch.restore();
    }
});

describe('<SisteStilling />', () => {
    it('skal ikke hente siste arbeidsforhold dersom state er populert', () => {
        const store = create();
        const fetchStub = new FetchStub().addResponse('sistearbeidsforhold', {});
        stubFetch(fetchStub);

        store.dispatch(lagreArbeidsforhold({}));

        mountWithStoreAndIntl(<SisteStilling/>, store);

        expect(fetchStub.getCallcount('sistearbeidsforhold')).to.equal(0);
    });
    it('skal hente siste arbeidsforhold og state', () => {
        const store = create();
        const state = {dummy: 'dummy'};
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', state)
            .addResponse('kryssklassifiser', {});

        stubFetch(fetchStub);

        mountWithStoreAndIntl(<SisteStilling/>, store);

        return promiseWithSetTimeout()
            .then(() => {
                expect(selectSisteStillingFraAAReg(store.getState()).data).to.equal(state);
                expect(fetchStub.getCallcount('sistearbeidsforhold')).to.equal(1);
            });
    });

    it('skal sette riktig sisteStilling i state etter fetch av oversettelsen', () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', {})
            .addResponse('kryssklassifiser', oversettelseAvStillingFraAAReg);

        stubFetch(fetchStub);

        mountWithStoreAndIntl(<SisteStilling/>, store);

        return promiseWithSetTimeout()
            .then(() => {
                expect(store.getState().sisteStilling.data.stilling).to.deep.equal({
                    label: 'IT-rådgiver',
                    styrk08: '2511.01',
                    konseptId: -1,
                });
            });
    });

    it('skal navigere til oppsummering ved klikk på neste knapp', () => {
        let pushedPath = '';
        const props = {
            history: {
                push: (path) => pushedPath = path
            },
        };

        const wrapper = shallowwithStoreAndIntl(<SisteStilling {...props} />);
        wrapper.find(KnappNeste).simulate('click');

        expect(pushedPath).to.equal('/oppsummering');

    });
});