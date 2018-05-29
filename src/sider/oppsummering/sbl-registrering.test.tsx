import * as React from 'react';
import * as sinon from 'sinon';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SblRegistrering from './sbl-registrering';
import { environmentTestData } from '../../SetupTests';
import { SBLARBEID_OPPRETT_MIN_ID_URL, SBLARBEID_URL } from '../../ducks/api';
import {
    FetchStub,
    mountWithStoreAndIntl, promiseWithSetTimeout, stubFetch
} from '../../test/test-utils';
import { sendBrukerTilSblArbeid } from './utils';

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
        const wrapper = mountWithStoreAndIntl(<SblRegistrering />);
        expect(wrapper.find(PanelBlokk)).to.have.length(1);
    });
    it('skal ikke vise informasjon om window.innerWidth > 768px', () => {
        stubFetch(new FetchStub().addResponse(SBLARBEID_OPPRETT_MIN_ID_URL));

        window.innerWidth = 1000;

        const wrapper = mountWithStoreAndIntl(<SblRegistrering />);

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
            sendBrukerTilSblArbeid: sendBrukerTilSblArbeidSpy,
        };

        mountWithStoreAndIntl(<SblRegistrering config={config} />);

        return promiseWithSetTimeout().then(() => {
            expect(sendBrukerTilSblArbeidSpy.called).to.be.equal(true);
        });
    });
});