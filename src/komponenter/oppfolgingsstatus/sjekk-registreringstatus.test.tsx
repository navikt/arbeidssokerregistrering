/*tslint:disable:variable-name*/
import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SjekkRegistreringstatus, { veienTilArbeid } from './sjekk-registreringstatus';
import {
    dispatchRegistreringstatus,
    resetAndMakeHrefWritable,
    promiseWithSetTimeout, shallowWithStore, mountWithStore
} from '../../test/test-utils';
import { environmentTestData } from '../../SetupTests';
import { VEIENTILARBEID_URL } from '../../ducks/api';
import SblRegistrering from '../../sider/oppsummering/sbl-registrering';
import { create } from '../../store';

enzyme.configure({adapter: new Adapter()});

describe('<SjekkRegistreringstatus />', () => {
    it('skal sende bruker til sbl om den ikke oppfyller krav og ikke er under oppfølging', () => {
        const store = create();
        resetAndMakeHrefWritable();
        dispatchRegistreringstatus({underOppfolging: false, oppfyllerKrav: false}, store);

        const wrapper = shallowWithStore(<SjekkRegistreringstatus />, store);

        expect(wrapper.find(SblRegistrering)).to.have.length(1);

    });

    it('skal sende bruker til veien til arbeid om den er under oppfølging', () => {
        resetAndMakeHrefWritable();
        const store = create();

        dispatchRegistreringstatus({underOppfolging: true, oppfyllerKrav: false}, store);

        shallowWithStore(<SjekkRegistreringstatus />, store);

        return promiseWithSetTimeout()
            .then(() => expect(document.location.href).to.equal(VEIENTILARBEID_URL));
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