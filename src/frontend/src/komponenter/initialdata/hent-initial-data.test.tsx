import * as React from 'react';
import { expect } from 'chai';
import {
    promiseWithSetTimeout,
    stubFetch,
    FetchStub,
    mountWithStoreAndIntl } from '../../test/test-utils';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { INNLOGGINGSINFO_URL } from '../../ducks/api';
import HentInitialData from './hent-initial-data';
import StepUp from './stepup';
import Feilmelding from './feilmelding';

enzyme.configure({adapter: new Adapter()});

afterEach(() => fetch.restore());

describe('<HentInitialData />', () => {
    it('skal rendre feilmelding dersom api-kall til registreringstatus feiler', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn', authenticated: true, securityLevel: '4'})
            .addErrorResponse('/startregistrering', 500));

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
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true}));

        const wrapper = mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.find('StepUp')).to.have.length(1);
            });
    });
    it('skal rendre <StepUp/> dersom bruker er innlogget på nivå 2', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn', authenticated: true, securityLevel: '2'})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true}));

        const wrapper = mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.find('StepUp')).to.have.length(1);
            });
    });
    it('skal rendre <StepUp/> dersom bruker ikke er innlogget', () => {
        stubFetch(new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { authenticated: false })
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true}));

        const wrapper = mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.find('StepUp')).to.have.length(1);
            });
    });
    it('skal ikke hente registreringstatus om bruker ikke er innlogget', () => {
        const fetchStub = new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { authenticated: false })
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true});

        stubFetch(fetchStub);

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(fetchStub.getCallcount(INNLOGGINGSINFO_URL)).to.equal(1);
                expect(fetchStub.getCallcount('/startregistrering')).to.equal(0);
            });
    });
    it('skal ikke hente registreringstatus om bruker er innlogget på nivå 3', () => {
        const fetchStub = new FetchStub()
            .addResponse(INNLOGGINGSINFO_URL, { name: 'navn', authenticated: true, securityLevel: '3' })
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true});

        stubFetch(fetchStub);

        mountWithStoreAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(fetchStub.getCallcount(INNLOGGINGSINFO_URL)).to.equal(1);
                expect(fetchStub.getCallcount('/startregistrering')).to.equal(0);
            });
    });
});