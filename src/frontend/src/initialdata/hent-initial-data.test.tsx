import * as React from 'react';
import { expect } from 'chai';
import { promiseWithSetTimeout, stubFetch, FetchStub, mountWithStoreAndIntl } from '../test/test-utils';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { INNLOGGINGSINFO_URL } from '../ducks/api';
import HentInitialData from './hent-initial-data';
import getStore from '../store';
import { selectKrr } from '../ducks/krr';
import { selectInnloggingsinfo } from '../ducks/innloggingsinfo';

enzyme.configure({adapter: new Adapter()});

afterEach(() => fetch.restore());

describe('<HentInitialData />', () => {
    it('skal populere krr-state med false om api-kall feiler med 500', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn'})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addErrorResponse('krr', 500));

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => expect(selectKrr(getStore().getState()).data.reservertIKrr).to.equal(false));
    });
    it('skal populere krr-state med true om api-kall feiler med 404', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn'})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addErrorResponse('krr', 404));

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => expect(selectKrr(getStore().getState()).data.reservertIKrr).to.equal(true));
    });
    it('skal populere innloggingsinfo med tomt navn dersom api-kall feiler', () => {
        stubFetch(new FetchStub()
            .addErrorResponse(INNLOGGINGSINFO_URL, 500)
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addErrorResponse('krr', 404));

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => expect(selectInnloggingsinfo(getStore().getState()).data.name).to.equal(''));
    });
    it('skal rendre feilmelding dersom api-kall til registreringstatus feiler', () => {
        stubFetch(new FetchStub()
            .addErrorResponse(INNLOGGINGSINFO_URL, 500)
            .addErrorResponse('/startregistrering', 500)
            .addErrorResponse('krr', 404));

        const wrapper = mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(wrapper.html()).to.include('innholdslaster-feilmelding');
            });
    });
});