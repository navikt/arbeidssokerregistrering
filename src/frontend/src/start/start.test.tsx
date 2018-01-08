/*tslint:disable*/
import '../test/test-setup';
import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Start from './start';
import KnappNeste from "../komponenter/knapp-neste";
import {shallowwithStoreAndIntl} from "../test/test-utils";

enzyme.configure({ adapter: new Adapter()});

describe('<Start />', () => {
    it('Skal navigere til neste side', () => {

        const push = sinon.spy();
        const props = {
            history: {
                push
            }
        };

        const wrapper = shallowwithStoreAndIntl((<Start {...props} />)).dive();
        wrapper.find(KnappNeste).simulate('click');
        expect(push).to.have.property('callCount', 1);
    });
});