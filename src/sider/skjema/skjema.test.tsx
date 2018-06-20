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
import { SkjemaProps } from './skjema';

enzyme.configure({adapter: new Adapter()});

beforeEach(() => store.dispatch(setInitialState()));

describe('<Skjema />', () => {

    it('Skal vise advarsel dersom spørsmål ikke er besvart', () => {
        const gaaTilSporsmal = sinon.spy();

        const props = {
            ...dummyPropsTilSkjema,
            sporsmalErBesvart: (sporsmalId) => false,
            gaaTilSporsmal: gaaTilSporsmal,
            advarselElement: <div className="dummy-advarsel-element"/>
        };

        const wrapper = mountWithStoreAndIntl(<SkjemaMedChildren {...props} />);
        wrapper.find(KnappNeste).simulate('click');

        expect(gaaTilSporsmal).to.have.property('callCount', 0);
        expect(wrapper.find('.dummy-advarsel-element')).to.have.length(1);
    });

    it('Skal navigere til neste side', () => {
        const gaaTilSporsmal = sinon.spy();

        const props = {
            ...dummyPropsTilSkjema,
            sporsmalErBesvart: (sporsmalId) => true,
            gjeldendeSporsmal: 2,
            gaaTilSporsmal: gaaTilSporsmal,
        };

        const wrapper = enzyme.shallow((<SkjemaMedChildren {...props} />)).dive();
        wrapper.find(KnappNeste).simulate('click');
        expect(gaaTilSporsmal).to.have.property('callCount', 1);
        expect(gaaTilSporsmal.getCall(0).args[0]).to.be.equal(3);
    });


    it('Skal hoppe over gitte spørsmål', () => {
        const gaaTilSporsmal = sinon.spy();

        const svar = {
            helse: 2,
            utdanning: 1,
            situasjon: 3,
        };

        const config = {
            helse: {
                alternativId: 2,
                skip: ['oppsummering', 'test']
            },
            utdanning: {
                alternativId: 99,
                skip: ['test2'],
            }
        };

        const props = {
            ...dummyPropsTilSkjema,
            sporsmalErBesvart: (sporsmalId) => true,
            gaaTilSporsmal: gaaTilSporsmal,
            gjeldendeSporsmal: 2,
            svar: svar,
            config: config,
        };

        const wrapper = enzyme.shallow((
            <Skjema {...props}>
                <DummySporsmal sporsmalId="helse"/>
                <DummySporsmal sporsmalId="utdanning"/>
                <DummySporsmal sporsmalId="situasjon"/>
                <DummySporsmal sporsmalId="oppsummering"/>
                <DummySporsmal sporsmalId="test"/>
                <DummySporsmal sporsmalId="test2"/>
            </Skjema>
        )).dive();
        wrapper.find(KnappNeste).simulate('click');
        expect(gaaTilSporsmal).to.have.property('callCount', 1);
        expect(gaaTilSporsmal.getCall(0).args[0]).to.be.equal(5);

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

const dummyPropsTilSkjema: SkjemaProps = {
    gjeldendeSporsmal: 1,
    sporsmalErBesvart: (sporsmalId: string) => true,
    svar: {
        helse: 1,
        utdanning: 2,
        test: 3,
        test2: 4,
    },
    gaaTilbake: () => {},
    gaaTilNesteSide: (gjeldendeSporsmalId: string, alleSporsmalIder: string[]) => {},
    gaaTilSporsmal: (sporsmal: number) => {},
    fullforSkjema: () => {},
    advarselElement: null,
};