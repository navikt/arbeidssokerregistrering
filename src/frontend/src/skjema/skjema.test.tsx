/*tslint:disable*/
import '../test/test-setup';
import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Skjema from './skjema';
import { shallowwithStoreAndIntl, store } from '../test/test-utils';
import KnappNeste from '../komponenter/knapp-neste';
import KnappFullfor from './knapp-fullfor';
import {endreSvarAction, setInitalState } from "../ducks/svar";
import {configSpmPrSide} from "./skjema-utils";

enzyme.configure({ adapter: new Adapter()});

beforeEach(() => store.dispatch(setInitalState()));

describe('<Skjema />', () => {

    /*
    * Navigering til neste side
    * */
    it('Neste skal ikke være disabled når spørsmål er besvart', () => {
        store.dispatch(endreSvarAction('1', '1'));
        const props = {
            match: {
                params: {
                    id: '1'
                }
            }
        };

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />)).dive().dive();
        const knappNeste = wrapper.find(KnappNeste);
        expect(knappNeste.props().disabled).to.be.false;
    });

    it('Neste skal være disabled når spørsmål ikke er besvart', () => {
        const props = {
            match: {
                params: {
                    id: '1'
                }
            }
        };

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />)).dive().dive();
        const knappNeste = wrapper.find(KnappNeste);
        expect(knappNeste.props().disabled).to.be.true;
    });

    it('Skal navigere til neste side', () => {
        const push = sinon.spy();
        const props = {
            match: {
                params: {
                    id: '1'
                }
            },
            history: {
                push
            },
            sporsmalErBesvart: (id) => true,
        };

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />)).dive().dive();
        wrapper.find(KnappNeste).simulate('click');
        expect(push).to.have.property('callCount', 1);
    });

    /*
    * Fullfør knapp
    * */
    it('Fullfør skal ikke være synlig på første side', () => {
        const props = {
            match: {
                params: {
                    id: '1'
                }
            },
            sporsmalErBesvart: (id) => true
        };

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />)).dive().dive();
        const knappNeste = wrapper.find(KnappFullfor);
        expect(knappNeste.length).to.be.equal(0);
    });

    it('Fullfør skal være synlig på siste side', () => {
        const lastId = Object.keys(configSpmPrSide).length.toString();
        const props = {
            match: {
                params: {
                    id: lastId
                }
            },
            sporsmalErBesvart: (id) => true
        };

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />)).dive().dive();
        const knappNeste = wrapper.find(KnappFullfor);
        expect(knappNeste.length).to.be.equal(1);
    });

    it('Fullfør skal være enablet når alle svarene er besvart', () => {
        const lastId = Object.keys(configSpmPrSide).length.toString();
        const props = {
            match: {
                params: {
                    id: lastId
                }
            },
            sporsmalErBesvart: (id) => true
        };

        store.dispatch(endreSvarAction('1', '1'));
        store.dispatch(endreSvarAction('2', '1'));
        store.dispatch(endreSvarAction('3', '1'));
        store.dispatch(endreSvarAction('4', '1'));
        store.dispatch(endreSvarAction('5', '1'));

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />)).dive().dive();
        const knappNeste = wrapper.find(KnappFullfor);
        expect(knappNeste.props().disabled).to.be.false;
    });

    /*
    * Navigering til skjema/1 - dersom id ikke finnes - f.eks skjema/finnesIkke
    * */
    it('Skal navigere til første side (skjema/1), dersom id ikke finnes (f.eks skjema/finnesIkke)', () => {
        const push = sinon.spy();
        const props = {
            match: {
                params: {
                    id: 'finnesIkke'
                }
            },
            history: {
                push
            },
        };

        shallowwithStoreAndIntl((<Skjema {...props} />)).dive().dive();
        expect(push).to.have.property('callCount', 1);
    });
});