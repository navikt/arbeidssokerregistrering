import * as React from 'react';
import * as sinon from 'sinon';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SblRegistrering, { sendBrukerTilDittNav } from './sbl-registrering';
import { DITTNAV_URL, SBLARBEID_OPPRETT_MIN_ID_URL } from '../../ducks/api';
import {
    FetchStub,
    mountWithStoreRouterAndIntl, promiseWithSetTimeout, stubFetch
} from '../../test/test-utils';
import { sendBrukerTilSblArbeid, opprettSBLArbeidBruker } from '../oppsummering/oppsummering-utils';

enzyme.configure({ adapter: new Adapter()});

let sandbox;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});

afterEach(() => {
    if (fetch.restore) {
        fetch.restore();
    }
    sandbox.restore();
});

describe('<SblRegistrering />', () => {
    it('skal vise informasjon om window.innerWidth < 768px', () => {
        window.innerWidth = 700;
        const wrapper = mountWithStoreRouterAndIntl(<SblRegistrering />);
        expect(wrapper.find(PanelBlokk)).to.have.length(1);
    });
    it('skal ikke vise informasjon om window.innerWidth > 768px', () => {
        stubFetch(new FetchStub().addResponse(SBLARBEID_OPPRETT_MIN_ID_URL));

        window.innerWidth = 1000;

        const wrapper = mountWithStoreRouterAndIntl(<SblRegistrering />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(wrapper.find(PanelBlokk)).to.have.length(0);
            });
    });
    it('skal registrere bruker i sbl-arbeid og sende bruker dit om window.innerWidth > 768px', () => {
        stubFetch(new FetchStub().addResponse(SBLARBEID_OPPRETT_MIN_ID_URL));

        window.innerWidth = 1000;

        const sendBrukerTilSblArbeidSpy = sandbox.spy(sendBrukerTilSblArbeid);
        const config = {
            redirect: sendBrukerTilSblArbeidSpy
        };

        mountWithStoreRouterAndIntl(<SblRegistrering config={config} />);

        return promiseWithSetTimeout().then(() => {
            expect(sendBrukerTilSblArbeidSpy.called).to.be.equal(true);
        });
    });
    it('skal sende bruker til DittNav dersom bruker er IARBS uten oppfølging', () => {
        stubFetch(new FetchStub().addResponse(DITTNAV_URL));
        window.innerWidth = 500;

        const dittNavSpy = sandbox.spy(sendBrukerTilDittNav);
        const config = {
            redirect: dittNavSpy
        };

        mountWithStoreRouterAndIntl(<SblRegistrering enforceRedirect={true} config={config} />);

        return promiseWithSetTimeout().then(() => {
            expect(dittNavSpy.called).to.be.equal(true);
        });
    });
});