import '../test-setup';
import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SblRegistrering, { sblUrl } from './sbl-registrering';

enzyme.configure({ adapter: new Adapter()});

describe('<SblRegistrering />', () => {
    it('skal rendre komponent om window.innerWidth < 768px', () => {
        window.innerWidth = 700;
        const wrapper = enzyme.shallow(<SblRegistrering />);
        expect(wrapper.find('.overskrift-sbl-registrering')).to.have.length(1);
    });
    it('skal ikke rendre om window.innerWidth > 768px', () => {
        window.innerWidth = 1000;
        const wrapper = enzyme.shallow(<SblRegistrering />);
        expect(wrapper.find('.overskrift-sbl-registrering')).to.have.length(0);
    });
    it('skal sende bruker direkte til sbl om window.innerWidth > 768px', () => {
        window.innerWidth = 1000;
        Object.defineProperty(document.location, 'href', {
            writable: true,
        });
        enzyme.shallow(<SblRegistrering />);
        expect(document.location.href).to.equal(sblUrl);
    });
});