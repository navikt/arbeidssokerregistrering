/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {shallowWithIntl} from 'enzyme-react-intl';
import Fullfor from './fullfor';
import KnappFullfor from '../skjema/knapp-fullfor';
import {
    FetchStub, mountWithStoreAndIntl, promiseWithSetTimeout, shallowwithStoreAndIntl,
    stubFetch
} from "../../test/test-utils";
import {create} from "../../store";
import {endreSvarAction} from "../../ducks/svar";
import {DUERNAREGISTRERT_PATH} from "../../utils/konstanter";

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


        const wrapper = shallowwithStoreAndIntl(<Fullfor {...props} />);
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
        const input = wrapper.find('input[type="checkbox"]');

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

        const input = wrapper.find('input[type="checkbox"]');
        input.simulate('change');

        wrapper.find(KnappFullfor).simulate('click');

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.html()).to.include('innholdslaster-feilmelding');
            });
    });

    it('Skal gå til neste side hvis registrering fullføres', () => {
        const store = create();

        let pushedPath = '';
        const props = {
            history: {
                push: (path) => pushedPath = path
            },
        };

        dispatchTilfeldigeSvar(store);

        stubFetch(new FetchStub().addResponse('/startregistrering', {}));

        const wrapper = mountWithStoreAndIntl(<Fullfor {...props} />, store);

        const input = wrapper.find('input[type="checkbox"]');
        input.simulate('change');

        wrapper.find(KnappFullfor).simulate('click');

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(pushedPath.includes(DUERNAREGISTRERT_PATH)).to.equal(true);
            });
    });

    function dispatchTilfeldigeSvar(store) {
        store.dispatch(endreSvarAction('helse', 1));
        store.dispatch(endreSvarAction('utdanning', 1));
        store.dispatch(endreSvarAction('test', 1));
        store.dispatch(endreSvarAction('test2', 1));
        store.dispatch(endreSvarAction('test3', 1));
    }

});