/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Skjema from './skjema';
import {
    mountWithStoreRouterAndIntl,
    store
} from '../../test/test-utils';
import LenkeNeste from '../knapper/lenke-neste';
import {setInitialState} from "../../ducks/svar";
import { SkjemaProps } from './skjema';
import {DinSituasjonSvar, HelseHinderSvar, Svar, UtdanningSvar} from "../../ducks/svar-utils";
import {SkjemaProps} from './skjema';
import {SkjemaConfig} from "./skjema-utils";

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

        const wrapper = mountWithStoreRouterAndIntl(<SkjemaMedChildren {...props} />);
        wrapper.find(LenkeNeste).simulate('click');

        expect(gaaTilSporsmal).to.have.property('callCount', 0);
        expect(wrapper.find('.dummy-advarsel-element')).to.have.length(1);
    });

    it('Neste-lenke skal ha riktig href', () => {
        const props: SkjemaProps = {
            ...dummyPropsTilSkjema,
            sporsmalErBesvart: (sporsmalId) => true,
            gjeldendeSporsmal: 2,
            hrefTilSporsmal: (n: number) => `skjema/${n}`,
        };
        const wrapper = mountWithStoreRouterAndIntl((<SkjemaMedChildren {...props} />));
        expect(wrapper.find(LenkeNeste).find({href: 'skjema/3'})).to.not.have.length(0);
    });

    it('Skal hoppe over gitte spørsmål, både når man viser neste spørsmål og i staten.', () => {
        const settStateForUbesvartSporsmal = sinon.spy();

        const svar = {
            helse: HelseHinderSvar.NEI,
            utdanning: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER,
            situasjon: DinSituasjonSvar.ER_PERMITTERT,
        };

        const config: SkjemaConfig = new Map<Svar, string[]>([
            [HelseHinderSvar.NEI, ['oppsummering', 'test']],
            [UtdanningSvar.INGEN_UTDANNING, ['test2']],
        ]);

        const props: SkjemaProps = {
            ...dummyPropsTilSkjema,
            sporsmalErBesvart: (sporsmalId) => true,
            settStateForUbesvartSporsmal: settStateForUbesvartSporsmal,
            gjeldendeSporsmal: 2,
            hrefTilSporsmal: (n: number) => `skjema/${n}`,
            svar: svar,
            config: config,
        };

        const wrapper = mountWithStoreRouterAndIntl((
            <Skjema {...props}>
                <DummySporsmal sporsmalId="helse"/>
                <DummySporsmal sporsmalId="utdanning"/>
                <DummySporsmal sporsmalId="situasjon"/>
                <DummySporsmal sporsmalId="oppsummering"/>
                <DummySporsmal sporsmalId="test"/>
                <DummySporsmal sporsmalId="test2"/>
            </Skjema>
        ));

        expect(wrapper.find(LenkeNeste).find({href: 'skjema/5'})).to.not.have.length(0);
        wrapper.find('a.nestelenke').simulate('click');
        expect(settStateForUbesvartSporsmal).to.have.property('callCount', 2);
        expect(settStateForUbesvartSporsmal.getCall(0).args[0]).to.be.equal('oppsummering');
        expect(settStateForUbesvartSporsmal.getCall(1).args[0]).to.be.equal('test');
    });

    it('Skal ikke hoppe over spørsmål hvis det ikke er konfigurert', () => {
        const settStateForUbesvartSporsmal = sinon.spy();

        const props = {
            ...dummyPropsTilSkjema,
            settStateForUbesvartSporsmal: settStateForUbesvartSporsmal,
        };

        const wrapper = enzyme.shallow((<SkjemaMedChildren {...props} />)).dive();
        expect(wrapper.find(LenkeNeste)).to.not.have.length(0);
        wrapper.find(LenkeNeste).simulate('click');
        expect(settStateForUbesvartSporsmal).to.have.property('callCount', 0);
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
    hrefTilSporsmal: (hei: number) => 'test',
    hrefTilFullfor: '/fullfor',
    advarselElement: null,
    settStateForUbesvartSporsmal: (sporsmalId) => {},
    onNesteClick: (sporsmalId) => {},
};
