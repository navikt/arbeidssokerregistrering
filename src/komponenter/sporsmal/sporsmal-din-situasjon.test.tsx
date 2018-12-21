/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as enzyme from 'enzyme';
import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import {create} from '../../store';
import {mountWithStoreRouterAndIntl, promiseWithSetTimeout} from '../../test/test-utils';
import SporsmalDinSituasjon from './sporsmal-din-situasjon';
import {annenStilling, ingenYrkesbakgrunn} from '../../ducks/siste-stilling';
import {SporsmalId} from "../../ducks/svar";
import {sisteStillingMock} from "../../mocks/siste-stilling-mock";
import {hentOversattStillingFraAAReg, UTEN_STYRKKODE} from "./siste-stilling-utils";
import {settDefaultStilling} from "../../ducks/default-stilling";

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

describe('<SporsmalDinSituasjon />', () => {

    it('Hvis bruker endrer svar til "Har aldri vært i jobb", så skal state.sisteStilling bli ingenYrkesbakgrunn',
        () => {
        const store = create();

        const wrapper = mountWithStoreRouterAndIntl(  <SporsmalDinSituasjon sporsmalId={SporsmalId.dinSituasjon}/>, store);

        wrapper.find(`.inputPanel__field`).at(3).simulate('change'); // klikk på "Har aldri vært i jobb"

        return promiseWithSetTimeout()
            .then(() => {
                expect(store.getState().sisteStilling.data.stilling).to.deep.equal(ingenYrkesbakgrunn);
            });

    });

    it('Hvis bruker først endrer svar til "Har aldri vært i jobb", ' +
        'og deretter endrer til "Har akkurat fullført utdanning, militærtjeneste eller annet"' +
        'og defaultStilling er sisteStillingMock"' +
        'så skal state.sisteStilling bli sisteStillingMock',
        () => {
            const store = create();

            store.dispatch(settDefaultStilling(sisteStillingMock));

            const wrapper = mountWithStoreRouterAndIntl(  <SporsmalDinSituasjon sporsmalId={SporsmalId.dinSituasjon}/>, store);

            // Klikk på "Har aldri vært i jobb" -> state.sisteStilling === 'ingenYrkesbakgrunn'
            wrapper.find(`.inputPanel__field`).at(3).simulate('change');

            // klikk på "Har akkurat fullført utdanning, militærtjeneste eller annet" -> state.sisteStilling === 'sisteStillingMock'
            wrapper.find(`.inputPanel__field`).at(8).simulate('change');

            return promiseWithSetTimeout()
                .then(() => {
                    expect(store.getState().sisteStilling.data.stilling).to.deep.equal(sisteStillingMock);
                });

        });

    it('Hvis bruker først endrer svar til "Har aldri vært i jobb", ' +
        'og deretter endrer til "Har jobb og ønsker å fortsette i den jobben jeg er i"' +
        'og defaultStilling er ingenYrkesbakgrunn"' +
        'så skal state.sisteStilling bli annenStilling',
        () => {
            const store = create();

            store.dispatch(settDefaultStilling(ingenYrkesbakgrunn));

            const wrapper = mountWithStoreRouterAndIntl(  <SporsmalDinSituasjon sporsmalId={SporsmalId.dinSituasjon}/>, store);

            // Klikk på "Har aldri vært i jobb" -> state.sisteStilling === 'ingenYrkesbakgrunn'
            wrapper.find(`.inputPanel__field`).at(3).simulate('change');

            // klikk på "Har jobb og ønsker å fortsette i den jobben jeg er i" -> state.sisteStilling === 'annenStilling'
            wrapper.find(`.inputPanel__field`).at(9).simulate('change');

            return promiseWithSetTimeout()
                .then(() => {
                    expect(store.getState().sisteStilling.data.stilling).to.deep.equal(annenStilling);
                });

        });

});