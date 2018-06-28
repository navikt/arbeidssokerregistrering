import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import { create } from '../../../../store';
import {
    FetchStub, mountWithStoreAndIntl, promiseWithSetTimeout,
    stubFetch
} from '../../../../test/test-utils';
import SisteStilling from './siste-stilling';
import { ingenYrkesbakgrunn, velgSisteStilling } from '../../../../ducks/siste-stilling';
import { sisteStillingMock } from '../../../../mocks/siste-stilling';
import oversettelseAvStillingFraAAReg from '../../../../mocks/oversettelse-av-stilling-fra-aareg';
import { hentOversattStillingFraAAReg } from './siste-stilling-utils';
import { ActionTypes } from '../../../../ducks/oversettelse-av-stilling-fra-aareg';
import {IngenSvar, SisteStillingSvar, Svar} from "../../../../ducks/svar-utils";

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

//tslint:disable
const dummyProps = {
    sporsmalId: '',
    endreSvar: (sporsmalId: string, svar: Svar) => {},
    hentAvgittSvar: (sporsmalId: string) => IngenSvar.INGEN_SVAR,
};

describe('<SisteStilling />', () => {
    it('Hvis bruker ikke er i AAreg (som medfører at sisteStilling er ingenYrkespraksis), ' +
        'så skal "Har ikke hatt jobb" være default svar.',
        () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', {});
        stubFetch(fetchStub);

        store.dispatch(velgSisteStilling(ingenYrkesbakgrunn));

        const endreSvarSpy = sandbox.spy(dummyProps.endreSvar);
        const props = {
            ...dummyProps,
            endreSvar: endreSvarSpy,
        };

        mountWithStoreAndIntl(<SisteStilling {...props}/>, store);

        expect(endreSvarSpy.getCall(0).args[1]).to.be.equal(SisteStillingSvar.HAR_IKKE_HATT_JOBB);
    });

    it('Hvis bruker har stilling i AAReg (som medfører at sisteStilling _ikke_ er ingenYrkespraksis),' +
        'så skal "Har hatt jobb" være default svar.',
        () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', {});
        stubFetch(fetchStub);

        store.dispatch(velgSisteStilling(sisteStillingMock));

        const endreSvarSpy = sandbox.spy(dummyProps.endreSvar);
        const props = {
            ...dummyProps,
            endreSvar: endreSvarSpy,
        };
        mountWithStoreAndIntl(<SisteStilling {...props}/>, store);

        expect(endreSvarSpy.getCall(0).args[1]).to.be.equal(SisteStillingSvar.HAR_HATT_JOBB);
    });

    it('Hvis bruker endrer svar til "Har ikke hatt jobb", ' +
        'så skal state.sisteStilling bli ingenYrkesbakgrunn',
        () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', {});
        stubFetch(fetchStub);

        store.dispatch(velgSisteStilling(sisteStillingMock));

        const wrapper = mountWithStoreAndIntl(<SisteStilling {...dummyProps}/>, store);

        wrapper.find(`.inputPanel__field`).at(1).simulate('change'); // klikk på "Har ikke hatt jobb"

        return promiseWithSetTimeout()
            .then(() => {
                expect(store.getState().sisteStilling.data.stilling).to.deep.equal(ingenYrkesbakgrunn);
            });

    });

    it('Hvis bruker endrer svar til "Har hatt jobb", ' +
        'så skal state.sisteStilling endres til det som er hentet fra AAReg',
        () => {
        const store = create();
        const fetchStub = new FetchStub()
            .addResponse('sistearbeidsforhold', {});
        stubFetch(fetchStub);

        store.dispatch({
            type: ActionTypes.HENT_SISTE_STILLING_OK,
            data: oversettelseAvStillingFraAAReg,
        });
        store.dispatch(velgSisteStilling(ingenYrkesbakgrunn));

        const wrapper = mountWithStoreAndIntl(<SisteStilling {...dummyProps}/>, store);

        wrapper.find(`.inputPanel__field`).at(0).simulate('change'); // klikk på "Har hatt jobb"

        return promiseWithSetTimeout()
            .then(() => {
                expect(store.getState().sisteStilling.data.stilling).to.deep.equal(
                    hentOversattStillingFraAAReg(oversettelseAvStillingFraAAReg)
                );
            });

    });
});