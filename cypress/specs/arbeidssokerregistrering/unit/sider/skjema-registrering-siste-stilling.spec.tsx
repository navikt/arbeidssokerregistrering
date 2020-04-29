//@ts-nocheck
import * as React from 'react';
import * as enzyme from 'enzyme';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { create } from '../../../../../src/store';
import { FetchStub, mountWithStoreRouterAndIntl, promiseWithSetTimeout, stubFetch } from '../../../../../src/test/test-utils';
import SisteStilling from '../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-siste-stilling/siste-stilling';
import { annenStilling, ingenYrkesbakgrunn, Stilling, velgSisteStilling, ActionTypes as SisteStillingActionTypes } from '../../../../../src/ducks/siste-stilling';
import { sisteStillingMock } from '../../../../../src/mocks/siste-stilling-mock';
import oversettelseAvStillingFraAAReg, { tomOversettelseAvStillingFraAAReg } from '../../../../../src/mocks/oversettelse-av-stilling-fra-aareg-mock';
import { hentOversattStillingFraAAReg, UTEN_STYRKKODE } from '../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-siste-stilling/siste-stilling-utils';
import { ActionTypes as OversettelseAvStillingActionTypes } from '../../../../../src/ducks/oversettelse-av-stilling-fra-aareg';
import { ActionTypes as SisteStillingFraAARegActionTypes } from '../../../../../src/ducks/siste-stilling-fra-aareg';
import { DinSituasjonSvar, IngenSvar, SisteStillingSvar, Svar } from "../../../../../src/ducks/svar-utils";
import { ActionTypes as DinSituasjonActionTypes } from "../../../../../src/ducks/svar";
import Alternativ from "../../../../../src/komponenter/skjema/alternativ";
import { SinonSandbox } from "sinon";

enzyme.configure({ adapter: new Adapter() });

let sandbox: SinonSandbox;
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
    endreSvar: (sporsmalId: string, svar: Svar) => { },
    hentAvgittSvar: (sporsmalId: string) => IngenSvar.INGEN_SVAR,
};

function dispatchSisteStillingFraAAReg(store, styrk) {
    store.dispatch({
        type: SisteStillingFraAARegActionTypes.SISTE_ARBEIDSFORHOLD_FRA_AAREG_OK,
        data: { styrk },
    });
}

describe('<SisteStilling />', () => {
    it('Hvis siste stilling fra state er ingenYrkesbakgrunn, så skal "Har ikke hatt jobb" være default svar.',
        () => {
            const store = create();
            store.dispatch(velgSisteStilling(ingenYrkesbakgrunn));

            const endreSvarSpy = sandbox.spy(dummyProps.endreSvar);
            const props = {
                ...dummyProps,
                endreSvar: endreSvarSpy,
            };

            mountWithStoreRouterAndIntl(<SisteStilling {...props} />, store);

            expect(endreSvarSpy.getCall(0).args[1]).to.be.equal(SisteStillingSvar.HAR_IKKE_HATT_JOBB);
        });

    it('Hvis siste stilling fra state _ikke_ er ingenYrkesbakgrunn, så skal "Har hatt jobb" være default svar.',
        () => {
            const store = create();
            store.dispatch(velgSisteStilling(sisteStillingMock));

            const endreSvarSpy = sandbox.spy(dummyProps.endreSvar);
            const props = {
                ...dummyProps,
                endreSvar: endreSvarSpy,
            };
            mountWithStoreRouterAndIntl(<SisteStilling {...props} />, store);

            expect(endreSvarSpy.getCall(0).args[1]).to.be.equal(SisteStillingSvar.HAR_HATT_JOBB);
        });

    it('Hvis bruker endrer svar til "Har ikke hatt jobb", så skal state.sisteStilling bli ingenYrkesbakgrunn',
        () => {
            const store = create();
            const fetchStub = new FetchStub()
                .addResponse('sistearbeidsforhold', {});
            stubFetch(fetchStub);

            store.dispatch(velgSisteStilling(sisteStillingMock));

            const wrapper = mountWithStoreRouterAndIntl(<SisteStilling {...dummyProps} />, store);

            wrapper.find(`.inputPanel__field`).at(1).simulate('change'); // klikk på "Har ikke hatt jobb"

            return promiseWithSetTimeout()
                .then(() => {
                    expect(store.getState().sisteStilling.data.stilling).to.deep.equal(ingenYrkesbakgrunn);
                });

        });

    it('Hvis bruker endrer svar til "Har hatt jobb", så skal state.sisteStilling endres til det som er hentet fra AAReg',
        () => {
            const store = create();
            const fetchStub = new FetchStub()
                .addResponse('sistearbeidsforhold', {});
            stubFetch(fetchStub);

            store.dispatch({
                type: OversettelseAvStillingActionTypes.HENT_SISTE_STILLING_OK,
                data: oversettelseAvStillingFraAAReg,
            });
            store.dispatch(velgSisteStilling(ingenYrkesbakgrunn));

            const wrapper = mountWithStoreRouterAndIntl(<SisteStilling {...dummyProps} />, store);

            wrapper.find(`.inputPanel__field`).at(0).simulate('change'); // klikk på "Har hatt jobb"

            return promiseWithSetTimeout()
                .then(() => {
                    expect(store.getState().sisteStilling.data.stilling).to.deep.equal(
                        hentOversattStillingFraAAReg(oversettelseAvStillingFraAAReg)
                    );
                });

        });

    it('Hvis bruker endrer svar til "Har hatt jobb" uten at dette står i AAReg, så skal state.sisteStilling endres til "Annen stilling".',
        () => {
            const store = create();
            const fetchStub = new FetchStub()
                .addResponse('sistearbeidsforhold', {});
            stubFetch(fetchStub);

            dispatchSisteStillingFraAAReg(store, UTEN_STYRKKODE);
            store.dispatch({
                type: OversettelseAvStillingActionTypes.HENT_SISTE_STILLING_OK,
                data: tomOversettelseAvStillingFraAAReg,
            });
            store.dispatch(velgSisteStilling(ingenYrkesbakgrunn));

            const wrapper = mountWithStoreRouterAndIntl(<SisteStilling {...dummyProps} />, store);

            wrapper.find(`.inputPanel__field`).at(0).simulate('change'); // klikk på "Har hatt jobb"

            return promiseWithSetTimeout()
                .then(() => {
                    expect(store.getState().sisteStilling.data.stilling).to.deep.equal(annenStilling);
                });

        });

    it('Skal skjule alternativene hvis (og bare hvis) man svarer visse alternativer på spm om din situasjon', () => {
        const svarDerAlternativeneSkalSkjules: (DinSituasjonSvar | undefined)[] = [
            DinSituasjonSvar.MISTET_JOBBEN,
            DinSituasjonSvar.HAR_SAGT_OPP,
            DinSituasjonSvar.ER_PERMITTERT,
            DinSituasjonSvar.DELTIDSJOBB_VIL_MER,
            DinSituasjonSvar.VIL_BYTTE_JOBB,
            DinSituasjonSvar.ALDRI_HATT_JOBB,
            DinSituasjonSvar.VIL_FORTSETTE_I_JOBB,
        ];
        const store = create();

        Object.keys(DinSituasjonSvar).forEach((svar: DinSituasjonSvar) => {
            store.dispatch({
                type: DinSituasjonActionTypes.AVGI_SVAR,
                data: {
                    sporsmalId: 'dinSituasjon',
                    svar: svar,
                }
            });
            const wrapper = mountWithStoreRouterAndIntl(<SisteStilling {...dummyProps} />, store);
            const expectedLength = svarDerAlternativeneSkalSkjules.includes(svar) ? 0 : 2;

            expect(wrapper.find(Alternativ)).to.have.length(expectedLength);
        });
    });

    it('Skal endre svar til INGEN_SVAR hvis alternativene er skjult', () => {
        const store = create();
        store.dispatch({
            type: DinSituasjonActionTypes.AVGI_SVAR,
            data: {
                sporsmalId: 'dinSituasjon',
                svar: DinSituasjonSvar.VIL_FORTSETTE_I_JOBB,
            }
        });
        const endreSvarSpy = sinon.spy();
        const sisteStillingProps = {
            ...dummyProps,
            sporsmalId: 'sisteStilling',
            endreSvar: endreSvarSpy,
        };
        mountWithStoreRouterAndIntl(<SisteStilling {...sisteStillingProps} />, store);

        expect(endreSvarSpy.getCall(0).args).to.deep.equal(['sisteStilling', SisteStillingSvar.INGEN_SVAR]);
    });
});
