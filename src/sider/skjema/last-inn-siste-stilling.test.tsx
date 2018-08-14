/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {create} from '../../store';
import {
    ActionTypes as SisteStillingFraAARegActionTypes,
    selectSisteStillingFraAAReg
} from '../../ducks/siste-stilling-fra-aareg';
import {FetchStub, mountWithStoreRouterAndIntl, promiseWithSetTimeout, stubFetch} from '../../test/test-utils';
import LastInnSisteStilling from './last-inn-siste-stilling';
import oversettelseAvStillingFraAAReg from '../../mocks/oversettelse-av-stilling-fra-aareg';
import {ingenYrkesbakgrunn} from '../../ducks/siste-stilling';
import {brukerSomIkkeFinnesIAAReg} from '../../mocks/siste-stilling-fra-aareg';

enzyme.configure({adapter: new Adapter()});

afterEach(() => {
    if (fetch.restore) {
        fetch.restore();
    }
});

describe('<LastInnSisteStilling />', () => {
    it('skal ikke hente siste arbeidsforhold dersom sisteStillingFraAAReg.status ikke er STATUS.NOT_STARTED', () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', {});
        stubFetch(fetchStub);

        store.dispatch({
            type: SisteStillingFraAARegActionTypes.SISTE_ARBEIDSFORHOLD_FRA_AAREG_PENDING
        });

        mountWithStoreRouterAndIntl(<LastInnSisteStilling>dummy</LastInnSisteStilling>, store);

        expect(fetchStub.getCallcount('sistearbeidsforhold')).to.equal(0);
    });

    it('skal hente siste arbeidsforhold og state', () => {
        const store = create();
        const state = {dummy: 'dummy'};
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', state)
            .addResponse('kryssklassifiserMedKonsept', {});

        stubFetch(fetchStub);

        mountWithStoreRouterAndIntl(<LastInnSisteStilling>dummy</LastInnSisteStilling>, store);

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
            .addResponse('kryssklassifiserMedKonsept', oversettelseAvStillingFraAAReg);

        stubFetch(fetchStub);

        mountWithStoreRouterAndIntl(<LastInnSisteStilling>dummy</LastInnSisteStilling>, store);

        return promiseWithSetTimeout()
            .then(() => {
                expect(store.getState().sisteStilling.data.stilling).to.deep.equal({
                    label: 'Daglig leder',
                    styrk08: '1120',
                    konseptId: 313808,
                });
            });
    });

    it('Hvis AAreg ikke har informasjon om siste stilling, så skal ingenYrkesbakgrunn settes i state', () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', brukerSomIkkeFinnesIAAReg);
        stubFetch(fetchStub);

        mountWithStoreRouterAndIntl(<LastInnSisteStilling>dummy</LastInnSisteStilling>, store);

        return promiseWithSetTimeout()
            .then(() => {
                expect(store.getState().sisteStilling.data.stilling).to.deep.equal(ingenYrkesbakgrunn);
            });
    });

});