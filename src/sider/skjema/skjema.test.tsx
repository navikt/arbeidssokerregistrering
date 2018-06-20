/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Skjema from './skjema';
import {
    mountWithStoreAndIntl,
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


    it('Skal hoppe over gitte spørsmål, både når man viser neste spørsmål og i staten.', () => {
        const gaaTilSporsmal = sinon.spy();
        const hoppOverSporsmal = sinon.spy();

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
            hoppOverSporsmal: hoppOverSporsmal,
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
        expect(hoppOverSporsmal).to.have.property('callCount', 2);
        expect(hoppOverSporsmal.getCall(0).args[0]).to.be.equal('oppsummering');
        expect(hoppOverSporsmal.getCall(1).args[0]).to.be.equal('test');
    });

    it('Skal ikke hoppe over spørsmål hvis det ikke er konfigurert', () => {
        const hoppOverSporsmal = sinon.spy();

        const props = {
            ...dummyPropsTilSkjema,
            hoppOverSporsmal: hoppOverSporsmal,
        };

        const wrapper = enzyme.shallow((<SkjemaMedChildren {...props} />)).dive();
        wrapper.find(KnappNeste).simulate('click');
        expect(hoppOverSporsmal).to.have.property('callCount', 0);
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
    gaaTilSporsmal: (sporsmal: number) => {},
    fullforSkjema: () => {},
    advarselElement: null,
    hoppOverSporsmal: (sporsmalId) => {},
};