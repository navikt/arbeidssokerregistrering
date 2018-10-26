/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Fullfor from './fullfor';
import KnappFullfor from '../skjema-registrering/knapp-fullfor';
import {
    FetchStub, mountWithStoreRouterAndIntl, promiseWithSetTimeout, shallowwithStoreAndIntl,
    stubFetch
} from "../../test/test-utils";
import {create} from "../../store";
import {ActionTypes as SvarActionTypes} from "../../ducks/svar";
import {DU_ER_NA_REGISTRERT_PATH, START_PATH} from "../../utils/konstanter";
import svarMock from "../../mocks/svar-mock";

enzyme.configure({adapter: new Adapter()});
afterEach(() => {
    if (fetch.restore) {
        fetch.restore()
    }
});

describe('<Fullfor />', () => {
    it('Skal ha fullfor knapp som er aktiv', () => {
        const store = create();
        dispatchTilfeldigeSvar(store);

        const push = sinon.spy();
        const props = {
            history: {
                push
            }
        };


        const wrapper = shallowwithStoreAndIntl(<Fullfor {...props} />, store);
        expect(wrapper.find(KnappFullfor)).to.be.have.length(1);
    });

    it('Skal vise advarsel når sjekkboks ikke er marker, når fullknapp klikkes', () => {
        const store = create();
        dispatchTilfeldigeSvar(store);

        const push = sinon.spy();
        const props = {
            history: {
                push
            }
        };

        const wrapper = mountWithStoreRouterAndIntl((<Fullfor {...props} />), store);

        // Klikk på fullfør knapp
        wrapper.find(KnappFullfor).simulate('click');

        // Forvent advarsel
        expect(wrapper.html()).to.include('advarsel');
    });

    it('Skal vise feilmelding dersom fullfor feiler', () => {
        const store = create();
        dispatchTilfeldigeSvar(store);
        const push = sinon.spy();
        const props = {
            history: {
                push
            }
        };

        stubFetch(new FetchStub().addErrorResponse('/startregistrering', 500));

        const wrapper = mountWithStoreRouterAndIntl(<Fullfor {...props} />, store);

        const input = wrapper.find('input[type="checkbox"]');
        input.simulate('change');

        wrapper.find(KnappFullfor).simulate('click');

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.html()).to.include('feilmelding');
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

        const wrapper = mountWithStoreRouterAndIntl(<Fullfor {...props} />, store);

        const input = wrapper.find('input[type="checkbox"]');
        input.simulate('change');

        wrapper.find(KnappFullfor).simulate('click');

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(pushedPath.includes(DU_ER_NA_REGISTRERT_PATH)).to.equal(true);
            });
    });

    it('Skal gå til første side hvis spørsmål ikke er besvart', () => {
        const store = create();

        let pushedPath = '';
        const props = {
            history: {
                push: (path) => pushedPath = path
            },
        };

        [
            'utdanningBestatt',
            'utdanningGodkjent',
            'helseHinder',
            'andreForhold',
            'sisteStilling',
            'dinSituasjon',
        ].forEach(sporsmalId => store.dispatch({
            type: SvarActionTypes.AVGI_SVAR,
            data: {
                sporsmalId,
                svar: svarMock[sporsmalId],
            }
        }));

        stubFetch(new FetchStub().addResponse('/startregistrering', {}));

        mountWithStoreRouterAndIntl(<Fullfor {...props} />, store);

        expect(pushedPath.includes(START_PATH)).to.equal(true);
    });

    function dispatchTilfeldigeSvar(store) {
        [
            'utdanning',
            'utdanningBestatt',
            'utdanningGodkjent',
            'helseHinder',
            'andreForhold',
            'sisteStilling',
            'dinSituasjon',
        ].forEach(sporsmalId => store.dispatch({
            type: SvarActionTypes.AVGI_SVAR,
            data: {
                sporsmalId,
                svar: svarMock[sporsmalId],
            }
        }));
    }

});