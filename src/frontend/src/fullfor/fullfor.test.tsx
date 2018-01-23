/*tslint:disable*/
import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from 'enzyme-react-intl';
import Fullfor from './fullfor';
import KnappFullfor from '../skjema/knapp-fullfor';
import {REGVELLYKKET_PATH} from "../utils/konstanter";

enzyme.configure({ adapter: new Adapter()});

describe('<Fullfor />', () => {
    it('Skal ha fullfor knapp', () => {

        const push = sinon.spy();
        const props = {
            history: {
                push
            }
        };

        const wrapper = enzyme.shallow((<Fullfor {...props} />)).dive();
        wrapper.find(KnappFullfor).simulate('click');
        expect(push.firstCall.args[0]).to.be.equal(`${REGVELLYKKET_PATH}`);
    });
});