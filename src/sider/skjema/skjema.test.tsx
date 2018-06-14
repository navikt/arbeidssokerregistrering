/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Skjema from './skjema';
import {
    mountWithIntl, mountWithStore, mountWithStoreAndIntl, shallowwithStoreAndIntl,
    store
} from '../../test/test-utils';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import {setInitialState} from "../../ducks/svar";
import NavAlertStripe from 'nav-frontend-alertstriper';

enzyme.configure({adapter: new Adapter()});

beforeEach(() => store.dispatch(setInitialState()));

describe('<Skjema />', () => {

    it('Skal vise advarsel dersom spørsmål ikke er besvart', () => {
        const gaaTilNesteSide = sinon.spy();

        const props = {
            ...dummyPropsTilSkjema,
            sporsmalErBesvart: (sporsmalId) => false,
            gaaTilNesteSide: gaaTilNesteSide,
            advarselElement: <div className="dummy-advarsel-element"/>
        };

        const wrapper = mountWithStoreAndIntl(<SkjemaMedChildren {...props} />);
        wrapper.find(KnappNeste).simulate('click');

        expect(gaaTilNesteSide).to.have.property('callCount', 0);
        expect(wrapper.find('.dummy-advarsel-element')).to.have.length(1);
    });

    it('Skal navigere til neste side', () => {
        const gaaTilNesteSide = sinon.spy();

        const props = {
            ...dummyPropsTilSkjema,
            sporsmalErBesvart: (sporsmalId) => true,
            gaaTilNesteSide: gaaTilNesteSide
        };

        const wrapper = enzyme.shallow((<SkjemaMedChildren {...props} />)).dive();
        wrapper.find(KnappNeste).simulate('click');
        expect(gaaTilNesteSide).to.have.property('callCount', 1);
    });
});

function SkjemaMedChildren(props) {
    return (
        <Skjema {...props}>
            <DummySporsmal sporsmalId="helse"/>
            <DummySporsmal sporsmalId="utdanning"/>
            <DummySporsmal sporsmalId="test"/>
            <DummySporsmal sporsmalId="test2"/>
        </Skjema>
    );
}

function DummySporsmal({sporsmalId: string}) {
    return (null);
}

const dummyPropsTilSkjema = {
    gjeldendeSporsmal: 1,
    sporsmalErBesvart: (sporsmalId: string) => true,
    avbrytSkjema: () => {},
    gaaTilbake: () => {},
    gaaTilNesteSide: (gjeldendeSporsmalId: string, alleSporsmalIder: string[]) => {}
};