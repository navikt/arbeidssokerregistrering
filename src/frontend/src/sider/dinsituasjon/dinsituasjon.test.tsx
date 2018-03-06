/*tslint:disable*/
import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from 'enzyme-react-intl';
import { DinSituasjon } from './dinsituasjon';
import KnappNeste from "../../komponenter/knapper/knapp-neste";
import {shallowwithIntl} from "../../test/test-utils";

enzyme.configure({ adapter: new Adapter()});

describe('<DinSituasjon />', () => {
    it('Skal navigere til neste side', () => {

        let pushedPath = '';
        const props = {
            history: {
                push: (path) => pushedPath = path
            }
        };

        const wrapper = shallowwithIntl(<DinSituasjon {...props} />);
        wrapper.find(KnappNeste).simulate('click');
        expect(pushedPath).to.equal('/skjema/1');
    });
});