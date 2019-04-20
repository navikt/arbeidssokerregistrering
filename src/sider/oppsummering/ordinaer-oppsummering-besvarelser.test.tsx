/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    dispatchAlleSporsmal,
    mountWithStoreRouterAndIntl,
} from '../../test/test-utils';
import {create} from '../../store';
import OrdinaerOppsummeringBesvarelser from './ordinaer-oppsummering-besvarelser';
import {ActionTypes as SisteStillingActionTypes} from "../../ducks/siste-stilling";
import {sisteStillingMock} from "../../mocks/siste-stilling-mock";

enzyme.configure({adapter: new Adapter()});

describe('Ordinaer Oppsummering siden', () => {

    it('Skal vise siste stilling på Oppsummering siden hvis yrkesbakgrunn finnes', () => {

        const store = create();
        dispatchAlleSporsmal(store);

        store.dispatch({
            type: SisteStillingActionTypes.ENDRE_SISTE_STILLING,
            data: { stilling: sisteStillingMock }
        });


        const wrapper = mountWithStoreRouterAndIntl(<OrdinaerOppsummeringBesvarelser/>, store);

        expect(wrapper.contains([
            sisteStillingMock.label
        ])).to.equal(true);
    });

    it('Skal skjule siste stilling på Oppsummering siden hvis ingenyrkesbakgrunn', () => {

    });

});
