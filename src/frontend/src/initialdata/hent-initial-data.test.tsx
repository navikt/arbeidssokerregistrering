import * as React from 'react';
import { expect } from 'chai';
import {
    promiseWithSetTimeout,
    stubFetch,
    FetchStub,
    mountWithStoreAndIntl,
    resetAndMakeHrefWritable } from '../test/test-utils';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { INNLOGGINGSINFO_URL, VEILARBSTEPUP } from '../ducks/api';
import HentInitialData from './hent-initial-data';
import getStore from '../store';
import { selectKrr } from '../ducks/krr';
import StepUp from './stepup';
import Feilmelding from './feilmelding';

enzyme.configure({adapter: new Adapter()});

afterEach(() => fetch.restore());

describe('<HentInitialData />', () => {
    it('skal populere krr-state med false om api-kall feiler med 500', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn', authenticated: true, securityLevel: '4'})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addErrorResponse('krr', 500));

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => expect(selectKrr(getStore().getState()).data.reservertIKrr).to.equal(false));
    });
    it('skal populere krr-state med true om api-kall feiler med 404', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn', authenticated: true, securityLevel: '4'})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addErrorResponse('krr', 404));

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => expect(selectKrr(getStore().getState()).data.reservertIKrr).to.equal(true));
    });
    it('skal rendre feilmelding dersom api-kall til registreringstatus feiler', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn', authenticated: true, securityLevel: '4'})
            .addErrorResponse('/startregistrering', 500)
            .addErrorResponse('krr', 404));

        const wrapper = mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.find(Feilmelding)).to.have.length(1);
            });
    });
    it('skal rendre <StepUp/> dersom bruker er innlogget på nivå 3', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn', authenticated: true, securityLevel: '3'})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addResponse('/krr', { reservertIKrr: false }));

        const wrapper = mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.find('StepUp')).to.have.length(1);
            });
    });
    it('skal sende bruker til veilarbstepup dersom den ikke er innlogget', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { authenticated: false })
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addResponse('/krr', { reservertIKrr: false }));

        resetAndMakeHrefWritable();

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => expect(document.location.href).to.equal(VEILARBSTEPUP));
    });
    it('skal ikke hente registreringstatus og krrstatus om bruker ikke er innlogget', () => {
        const fetchStub = new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { authenticated: false })
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addResponse('/krr', { reservertIKrr: false });

        stubFetch(fetchStub);

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(fetchStub.getCallcount(INNLOGGINGSINFO_URL)).to.equal(1);
                expect(fetchStub.getCallcount('/startregistrering')).to.equal(0);
                expect(fetchStub.getCallcount('/krr')).to.equal(0);
            });
    });
    it('skal ikke hente registreringstatus og krrstatus om bruker er innlogget på nivå 3', () => {
        const fetchStub = new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn', authenticated: true, securityLevel: '3' })
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addResponse('/krr', { reservertIKrr: false });

        stubFetch(fetchStub);

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(fetchStub.getCallcount(INNLOGGINGSINFO_URL)).to.equal(1);
                expect(fetchStub.getCallcount('/startregistrering')).to.equal(0);
                expect(fetchStub.getCallcount('/krr')).to.equal(0);
            });
    });
    it('skal sende bruker til veilarbstepup dersom bruker er innlogget på nivå 2', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, {  name: 'navn', authenticated: true, securityLevel: '2'  })
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true})
            .addResponse('/krr', { reservertIKrr: false }));

        resetAndMakeHrefWritable();

        const wrapper = mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(document.location.href).to.equal(VEILARBSTEPUP);
            });
    });
});