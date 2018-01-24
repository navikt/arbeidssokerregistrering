/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Skjema from './skjema';
import {shallowwithStoreAndIntl, store} from '../test/test-utils';
import KnappNeste from '../komponenter/knapp-neste';
import {endreSvarAction, setInitalState} from "../ducks/svar";
import {configSpmPrSide} from "./skjema-utils";

enzyme.configure({adapter: new Adapter()});

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

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
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

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
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

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
        wrapper.find(KnappNeste).simulate('click');
        expect(push).to.have.property('callCount', 1);
    });

    /*
    * Neste knapp på siste side
    * */

    it('Neste knapp på siste side skal være enablet når alle svarene er besvart', () => {
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

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
        const knappNeste = wrapper.find(KnappNeste);
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

        shallowwithStoreAndIntl((<Skjema {...props} />));
        expect(push).to.have.property('callCount', 1);
    });
});

describe('<Skjema />', () => {
    describe('Neste knapp på siste side, skal sende selvgående brukere til oppsummering', () => {
            it('Basert på alle gyldige svaralternativ fra spørmål 1', () => {
                const lastId = Object.keys(configSpmPrSide).length.toString();
                const push = sinon.spy();

                const props = {
                    match: {
                        params: {
                            id: lastId
                        }
                    },
                    history: {
                        push
                    },
                    sporsmalErBesvart: (id) => true
                };

                store.dispatch(endreSvarAction('1', '1'));
                store.dispatch(endreSvarAction('2', '2'));
                store.dispatch(endreSvarAction('3', '1'));
                store.dispatch(endreSvarAction('4', '1'));
                store.dispatch(endreSvarAction('5', '2'));

                const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
                wrapper.find(KnappNeste).simulate('click');

                expect(push.firstCall.args[0]).to.be.equal('/oppsummering');
            });
    });

    describe('Neste knapp på siste side, skal sende ikke-selvgående brukere til sbl-registrering', () => {
        it('Basert på svaralterantiv fra spørsmål 1', () => {
            const lastId = Object.keys(configSpmPrSide).length.toString();
            const push = sinon.spy();

            const props = {
                match: {
                    params: {
                        id: lastId
                    }
                },
                history: {
                    push
                },
                sporsmalErBesvart: (id) => true
            };

            store.dispatch(endreSvarAction('1', '6'));
            store.dispatch(endreSvarAction('2', '2'));
            store.dispatch(endreSvarAction('3', '1'));
            store.dispatch(endreSvarAction('4', '1'));
            store.dispatch(endreSvarAction('5', '2'));

            const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
            wrapper.find(KnappNeste).simulate('click');

            expect(push.firstCall.args[0]).to.be.equal('/sblregistrering');
        });
    })
});