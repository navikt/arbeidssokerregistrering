import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { dispatchKrrStatus, mountWithStoreAndIntl, promiseWithSetTimeout } from '../../test/test-utils';
import SjekkKrrStatus from './sjekk-krr-status';
import ReservertKrr from './reservert-krr';

enzyme.configure({adapter: new Adapter()});

describe('<SjekkKrr/ >', () => {
    it('skal vise infomelding om bruker er reservert', () => {
        dispatchKrrStatus({reservertIKrr: true});
        const wrapper = mountWithStoreAndIntl(<SjekkKrrStatus><div className="Dummy"/></SjekkKrrStatus>);

        return promiseWithSetTimeout()
            .then( () => {
                expect(wrapper.find(ReservertKrr)).to.have.length(1);
                expect(wrapper.html()).not.to.have.string('Dummy');
            });
    });

    it('skal vise children om bruker ikke er reservert i krr', () => {
        dispatchKrrStatus({reservertIKrr: false});
        const wrapper = mountWithStoreAndIntl(<SjekkKrrStatus><div className="Dummy"/></SjekkKrrStatus>);

        return promiseWithSetTimeout()
            .then(() => {
                expect(wrapper.html()).to.have.string('Dummy');
                expect(wrapper.find(ReservertKrr)).to.have.length(0);
            });

    });
});
