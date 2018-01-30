/*tslint:disable:variable-name*/
import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SjekkRegistreringstatus, { veienTilArbeid } from './sjekk-registreringstatus';
import {
    dispatchRegistreringstatus,
    resetAndMakeHrefWritable, mountWithStore,
    mountWithStoreAndIntl,
    promiseWithSetTimeout,
    zeroTimeoutPromise
} from '../test/test-utils';
import { environmentTestData } from '../SetupTests';
import { SBLARBEID_URL, VEIENTILARBEID_URL } from '../ducks/api';

enzyme.configure({adapter: new Adapter()});

describe('<SjekkRegistreringstatus />', () => {
    it('skal sende bruker til sbl om den ikke oppfyller krav og ikke er under oppfølging', () => {
        resetAndMakeHrefWritable();

        dispatchRegistreringstatus({underOppfolging: false, oppfyllerKrav: false});

        mountWithStoreAndIntl(<SjekkRegistreringstatus />);

        return promiseWithSetTimeout()
            .then(() => expect(document.location.href).to.equal(SBLARBEID_URL));

    });

    it('skal sende bruker til veien til arbeid om den er under oppfølging', () => {
        resetAndMakeHrefWritable();

        dispatchRegistreringstatus({underOppfolging: true, oppfyllerKrav: false});

        mountWithStoreAndIntl(<SjekkRegistreringstatus />);

        return promiseWithSetTimeout()
            .then(() => expect(document.location.href).to.equal(VEIENTILARBEID_URL));
    });
    it('Skal rendre innhold dersom bruker oppfyller krav og ikke er under oppfølging', () => {
        dispatchRegistreringstatus({underOppfolging: false, oppfyllerKrav: true});

        const wrapper = mountWithStore(
            <SjekkRegistreringstatus >
                <div className="Dummy"/>
            </SjekkRegistreringstatus>);

        return promiseWithSetTimeout()
            .then(() => expect(wrapper.html()).to.have.string('Dummy'));

    });
});