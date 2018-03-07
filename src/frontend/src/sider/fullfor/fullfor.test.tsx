/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Knapp} from 'nav-frontend-knapper';
import {shallowWithIntl} from 'enzyme-react-intl';
import Fullfor from './fullfor';
import KnappFullfor from '../skjema/knapp-fullfor';
import {Checkbox} from "nav-frontend-skjema";
import {
    FetchStub, mountWithStoreAndIntl, promiseWithSetTimeout,
    stubFetch
} from "../../test/test-utils";
import {create} from "../../store";
import {endreSvarAction} from "../../ducks/svar";
import {SBLARBEID_URL, VEIENTILARBEID_MED_OVERLAY_URL} from "../../ducks/api";

enzyme.configure({adapter: new Adapter()});
afterEach(() => {
    if (fetch.restore) {
        fetch.restore()
    }
});

describe('<Fullfor />', () => {
    it('Skal ha fullfor knapp som er inaktiv', () => {
        const push = sinon.spy();
        const props = {
            history: {
                push
            }
        };


        const wrapper = mountWithStoreAndIntl(<Fullfor {...props} />);
        const knappFullfor = wrapper.find(KnappFullfor);
        expect(knappFullfor.props().disabled).to.be.true;
    });

    it('Skal enable fullfor knappen når sjekkboks markeres', () => {
        const push = sinon.spy();
        const props = {
            history: {
                push
            }
        };


        const wrapper = mountWithStoreAndIntl((<Fullfor {...props} />));
        const sjekkboks = wrapper.find(Checkbox);
        const input = sjekkboks.find('input[type="checkbox"]');

        input.simulate('change');

        const knappFullfor = wrapper.find(KnappFullfor);
        expect(knappFullfor.props().disabled).to.be.false;
    });

    it('Skal vise feilmelding dersom fullfor feiler', () => {
        const store = create();
        const push = sinon.spy();
        const props = {
            history: {
                push
            }
        };

        stubFetch(new FetchStub().addErrorResponse('/startregistrering', 500));

        const wrapper = mountWithStoreAndIntl(<Fullfor {...props} />, store);

        // marker sjekkboks
        const sjekkboks = wrapper.find(Checkbox);
        const input = sjekkboks.find('input[type="checkbox"]');
        input.simulate('change');

        // simuler klikk
        wrapper.find(KnappFullfor).simulate('click');

        // forventet resultat
        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update()
                expect(wrapper.html()).to.include('innholdslaster-feilmelding');
            });
    });

    it('Skal gå til veientilarbeid med overlay hvis registrering fullføres', () => {
        const store = create();

        Object.defineProperty(document.location, 'href', {
            writable: true,
        });

        dispatchTilfeldigeSvar(store);

        stubFetch(new FetchStub().addResponse('/startregistrering', {}));

        const wrapper = mountWithStoreAndIntl(<Fullfor />, store);

        // marker sjekkboks
        const sjekkboks = wrapper.find(Checkbox);
        const input = sjekkboks.find('input[type="checkbox"]');
        input.simulate('change');

        // simuler klikk
        wrapper.find(KnappFullfor).simulate('click');

        // forventet resultat
        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(document.location.href).to.equal(VEIENTILARBEID_MED_OVERLAY_URL);
            });
    });

    function dispatchTilfeldigeSvar(store) {
        store.dispatch(endreSvarAction('1', '1'));
        store.dispatch(endreSvarAction('2', '1'));
        store.dispatch(endreSvarAction('3', '1'));
        store.dispatch(endreSvarAction('4', '1'));
        store.dispatch(endreSvarAction('5', '1'));
    }

});