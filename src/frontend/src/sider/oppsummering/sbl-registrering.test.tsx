import * as React from 'react';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SblRegistrering from './sbl-registrering';
import { environmentTestData } from '../../SetupTests';
import { SBLARBEID_URL } from '../../ducks/api';

enzyme.configure({ adapter: new Adapter()});

describe('<SblRegistrering />', () => {
    it('skal rendre komponent om window.innerWidth < 768px', () => {
        window.innerWidth = 700;
        const wrapper = enzyme.shallow(<SblRegistrering />);
        expect(wrapper.find(PanelBlokk)).to.have.length(1);
    });
    it('skal ikke rendre om window.innerWidth > 768px', () => {
        window.innerWidth = 1000;
        const wrapper = enzyme.shallow(<SblRegistrering />);
        expect(wrapper.find(PanelBlokk)).to.have.length(0);
    });
    it('skal sende bruker direkte til sbl om window.innerWidth > 768px', () => {
        window.innerWidth = 1000;
        Object.defineProperty(document.location, 'href', {
            writable: true,
        });
        enzyme.shallow(<SblRegistrering />);
        expect(document.location.href).to.equal(SBLARBEID_URL);
    });
});