/*tslint:disable*/
import * as React from 'react';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Fullfor from '../../../../../src/sider/fullfor/fullfor';
import KnappFullfor from '../../../../../src/sider/skjema-registrering/knapp-fullfor';
import {
    FetchStub, mountWithStoreRouterAndIntl, promiseWithSetTimeout, shallowwithStoreAndIntl,
    stubFetch
} from "../../../../../src/test/test-utils";
import { create } from "../../../../../src/store";
import { ActionTypes as SvarActionTypes } from "../../../../../src/ducks/svar";
import { DU_ER_NA_REGISTRERT_PATH, START_PATH } from "../../../../../src/utils/konstanter";
import svarMock from "../../../../../src/mocks/svar-mock";

enzyme.configure({ adapter: new Adapter() });
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
