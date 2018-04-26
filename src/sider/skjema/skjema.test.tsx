/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Skjema from './skjema';
import {
    mountWithIntl, shallowwithStoreAndIntl,
    store
} from '../../test/test-utils';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import {setInitialState} from "../../ducks/svar";

enzyme.configure({adapter: new Adapter()});

beforeEach(() => store.dispatch(setInitialState()));

describe('<Skjema />', () => {

    /*
    * Navigering til neste side
    * */
    it('Neste skal ikke være disabled når spørsmål er besvart', () => {
        const props = {
            ...dummyPropsTilSkjema,
            sporsmalErBesvart: (sporsmalId) => true
        };

        const wrapper = enzyme.shallow((<SkjemaMedChildren {...props} />)).dive();
        const knappNeste = wrapper.find(KnappNeste);
        expect(knappNeste.props().disabled).to.be.false;
    });

    it('Neste skal være disabled når spørsmål ikke er besvart', () => {
        const props = {
            ...dummyPropsTilSkjema,
            sporsmalErBesvart: (sporsmalId) => false
        };

        const wrapper = enzyme.shallow((<SkjemaMedChildren {...props} />)).dive();
        const knappNeste = wrapper.find(KnappNeste);
        expect(knappNeste.props().disabled).to.be.true;
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


    /*
    TODO Dette er egentlig en test av SkjemaContainer::settGjeldendeSporsmalOgResetHvisNaN.
    it('Skal navigere til første side (skjema/1), dersom id ikke finnes (f.eks skjema/finnesIkke)', () => {
        const push = sinon.spy();
        const props = {
            match: {
                params: {
                    id: 'finnesIkke'
                }
            },
            history: {
                push
            },
        };

        shallowwithStoreAndIntl((<Skjema {...props} />));
        expect(push).to.have.property('callCount', 1);
    });
    */

    /*
    TODO Dette er egentlig en test av SkjemaContainer::gaaTilNesteSide.
    it('skal navigere til side 1 dersom forrige spm. ikke er besvart', () => {
        const pushedPath = '';
        const props = {
            match: {
                params: {
                    id: '2'
                }
            },
            history: {
            push: (path) => pushedPath = path
            },
        };

        shallowwithStoreAndIntl((<Skjema {...props} />));
        expect(pushedPath.includes('/1')).to.equal(true);
    });
    
    it('skal navigere til oppsummering ved "korrekt" svar på siste side', () => {
        const pushedPath = '';
        const spmId = antallSporsmal.length;
        const props = {
            match: {
                params: {
                    id: spmId
                }
            },
            history: {
                push: (path) => pushedPath = path
            },
            sporsmalErBesvart: (id) => true
        };

        // Forrige spm må være besvart
        store.dispatch(endreSvarAction(`${parseInt(spmId, 10) - 1}`, '1'));
        store.dispatch(endreSvarAction(spmId.toString(), finnAlternativSomGirSelvgaende(spmId)));

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));

        wrapper.find(KnappNeste).simulate('click');

        expect(pushedPath).to.equal('/sistearbforhold');
    });

    it('skal sende bruker til sbl med en gang dersom svar er "feil"', () => {
        let pushedPath = '';
        const props = {
            match: {
                params: {
                    id: '1'
                }
            },
            history: {
                push: (path) => pushedPath = path
            },
            sporsmalErBesvart: (id) => true
        };

        store.dispatch(endreSvarAction('1', configIkkeSelvgaende[1][0]));

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));

        wrapper.find(KnappNeste).simulate('click');

        expect(pushedPath).to.equal('/sblregistrering');

    });
    */
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