import * as React from 'react';
import { expect } from 'chai';
import {
    promiseWithSetTimeout,
    stubFetch,
    FetchStub,
    mountWithStoreRouterAndIntl } from '../../test/test-utils';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { AUTENTISERINGSINFO_URL } from '../../ducks/api';
import HentInitialData from './hent-initial-data';
import StepUp from './stepup';
import FeilmeldingGenerell from '../feilmelding/feilmelding-generell';

enzyme.configure({adapter: new Adapter()});

afterEach(() => fetch.restore());

describe('<HentInitialData />', () => {
    it('skal rendre feilmelding dersom api-kall til registreringstatus feiler', () => {
        stubFetch(new FetchStub()
            .addResponse(AUTENTISERINGSINFO_URL, { harGyldigOidcToken: true, niva: 4})
            .addErrorResponse('/startregistrering', 500));

        const wrapper = mountWithStoreRouterAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.find(FeilmeldingGenerell)).to.have.length(1);
            });
    });
    it('skal rendre <StepUp/> dersom bruker ikke har gyldig oidc-token og ikke er på nivå 4', () => {
        stubFetch(new FetchStub()
            .addResponse(AUTENTISERINGSINFO_URL, { harGyldigOidcToken: false, niva: 3})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true}));

        const wrapper = mountWithStoreRouterAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.find('StepUp')).to.have.length(1);
            });
    });
    it('skal rendre <StepUp/> dersom bruker ikke er innlogget', () => {
        stubFetch(new FetchStub()
            .addResponse(AUTENTISERINGSINFO_URL, { harGyldigOidcToken: false, niva: ''})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true}));

        const wrapper = mountWithStoreRouterAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.find('StepUp')).to.have.length(1);
            });
    });

    it('skal ikke hente registreringstatus om bruker ikke er innlogget', () => {
        const fetchStub = new FetchStub()
            .addResponse(AUTENTISERINGSINFO_URL, { harGyldigOidcToken: false, niva: ''})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true});

        stubFetch(fetchStub);

        mountWithStoreRouterAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(fetchStub.getCallcount(AUTENTISERINGSINFO_URL)).to.equal(1);
                expect(fetchStub.getCallcount('/startregistrering')).to.equal(0);
            });
    });
    it('skal ikke hente registreringstatus om bruker er innlogget på nivå 3', () => {
        const fetchStub = new FetchStub()
            .addResponse(AUTENTISERINGSINFO_URL, { harGyldigOidcToken: false, niva: 3})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true});

        stubFetch(fetchStub);

        mountWithStoreRouterAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(fetchStub.getCallcount(AUTENTISERINGSINFO_URL)).to.equal(1);
                expect(fetchStub.getCallcount('/startregistrering')).to.equal(0);
            });
    });
    it('skal ikke rendre <StepUp/> dersom bruker ikke har gyldig oidc-token og er på nivå 4', () => {
        stubFetch(new FetchStub()
            .addResponse(AUTENTISERINGSINFO_URL, { harGyldigOidcToken: false, niva: 4})
            .addResponse('/startregistrering', {underOppfolging: false, oppfyllerKrav: true}));

        const wrapper = mountWithStoreRouterAndIntl(<HentInitialData />);

        return promiseWithSetTimeout()
            .then(() => {
                wrapper.update();
                expect(wrapper.find('StepUp')).to.have.length(0);
            });
    });

});