/*tslint:disable:variable-name*/
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SjekkRegistreringstatus from './sjekk-registreringstatus';
import {
    dispatchRegistreringstatus,
    promiseWithSetTimeout, shallowWithStore, mountWithStore
} from '../../test/test-utils';
import SblRegistrering from '../../sider/oppsummering/sbl-registrering';
import { create } from '../../store';
import { sendBrukerTilVeientilarbeid } from './utils';

enzyme.configure({adapter: new Adapter()});

let sandbox;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});
afterEach(() => {
    sandbox.restore();
});

describe('<SjekkRegistreringstatus />', () => {
    it('skal sende bruker til sbl om den ikke oppfyller krav og ikke er under oppfølging', () => {
        const store = create();
        dispatchRegistreringstatus({underOppfolging: false, oppfyllerKrav: false}, store);

        const wrapper = shallowWithStore(<SjekkRegistreringstatus />, store);

        expect(wrapper.find(SblRegistrering)).to.have.length(1);

    });

    it('skal sende bruker til veien til arbeid om den er under oppfølging', () => {
        const store = create();

        const sendBrukerTilVeientilarbeidSpy = sandbox.spy(sendBrukerTilVeientilarbeid);
        const config = {
            sendBrukerTilVeientilarbeid: sendBrukerTilVeientilarbeidSpy,
        };

        dispatchRegistreringstatus({underOppfolging: true, oppfyllerKrav: false}, store);

        mountWithStore(<SjekkRegistreringstatus config={config}/>, store);

        expect(sendBrukerTilVeientilarbeidSpy.called).to.be.equal(true);
    });
    it('Skal rendre innhold dersom bruker oppfyller krav og ikke er under oppfølging', () => {
        const store = create();

        dispatchRegistreringstatus({underOppfolging: false, oppfyllerKrav: true}, store);

        const component = (
            <SjekkRegistreringstatus >
                <div className="Dummy"/>
            </SjekkRegistreringstatus>
        );

        const wrapper = mountWithStore(component, store);

        return promiseWithSetTimeout()
            .then(() => {
                expect(wrapper.html()).to.have.string('Dummy');
            });

    });
});