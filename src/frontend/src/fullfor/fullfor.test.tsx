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
import {Checkbox} from "nav-frontend-skjema";

enzyme.configure({ adapter: new Adapter()});

describe('<Fullfor />', () => {
    it('Skal ha fullfor knapp som er inaktiv', () => {
        const props = {};

        const wrapper = enzyme.shallow((<Fullfor {...props} />)).dive();
        const knappFullfor = wrapper.find(KnappFullfor);
        expect(knappFullfor.props().disabled).to.be.true;
    });
    it('Skal ha fullfor knapp til riktig url', () => {
        const push = sinon.spy();
        const props = {
            history: {
                push
            }
        };

        const wrapper = enzyme.shallow((<Fullfor {...props} />)).dive();
        const knappFullfor = wrapper.find(KnappFullfor);
        knappFullfor.simulate('click');
        expect(push.firstCall.args[0]).to.be.equal(`${REGVELLYKKET_PATH}`);
    });
    it('Skal sette markert til true når sjekkboks markeres', () => {
        const props = {};

        const wrapper = enzyme.shallow((<Fullfor {...props} />));
        const sjekkboks = wrapper.dive().find(Checkbox).dive();
        const input = sjekkboks.find('input[type="checkbox"]');
        input.simulate('change');

        expect(wrapper.state().markert).to.be.true;
    });
});