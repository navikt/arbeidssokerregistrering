/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Skjema from './skjema';
import {
    finnAlternativSomGirSelvgaende,
    shallowwithStoreAndIntl,
    store
} from '../../test/test-utils';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import {endreSvarAction, setInitalState} from "../../ducks/svar";
import {configIkkeSelvgaende, configSpmPrSide} from "./skjema-utils";
import antallSporsmal from '../../sporsmal/alle-sporsmal';

enzyme.configure({adapter: new Adapter()});

beforeEach(() => store.dispatch(setInitalState()));

describe('<Skjema />', () => {

    /*
    * Navigering til neste side
    * */
    it('Neste skal ikke være disabled når spørsmål er besvart', () => {
        store.dispatch(endreSvarAction('1', '1'));
        const props = {
            match: {
                params: {
                    id: '1'
                }
            }
        };

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
        const knappNeste = wrapper.find(KnappNeste);
        expect(knappNeste.props().disabled).to.be.false;
    });

    it('Neste skal være disabled når spørsmål ikke er besvart', () => {
        const props = {
            match: {
                params: {
                    id: '1'
                }
            }
        };

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
        const knappNeste = wrapper.find(KnappNeste);
        expect(knappNeste.props().disabled).to.be.true;
    });

    it('Skal navigere til neste side', () => {
        const push = sinon.spy();
        const props = {
            match: {
                params: {
                    id: '1'
                }
            },
            history: {
                push
            },
            sporsmalErBesvart: (id) => true,
        };

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
        wrapper.find(KnappNeste).simulate('click');
        expect(push).to.have.property('callCount', 1);
    });
    

    it('Neste knapp på siste side skal være enablet når alle svarene er besvart', () => {
        const lastId = Object.keys(antallSporsmal).length.toString();
        const props = {
            match: {
                params: {
                    id: lastId
                }
            },
        };

        besvarAlleSporsmal(antallSporsmal.length);

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
        const knappNeste = wrapper.find(KnappNeste);
        expect(knappNeste.props().disabled).to.be.false;
    });

    it('Neste knapp på siste side skal være disablet når siste svaret er ikke er besvart', () => {
        const lastId = Object.keys(antallSporsmal).length.toString();
        const props = {
            match: {
                params: {
                    id: lastId
                }
            },
        };

        besvarAlleUnntattSisteSporsmal(antallSporsmal.length);

        const wrapper = shallowwithStoreAndIntl((<Skjema {...props} />));
        const knappNeste = wrapper.find(KnappNeste);
        expect(knappNeste.props().disabled).to.be.true;
    });

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

        expect(pushedPath).to.equal('/oppsummering');
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
});

const besvarAlleSporsmal = (antallSporsmal) => {
    for(let i = 1; i <= antallSporsmal; i++){
        store.dispatch(endreSvarAction(i.toString(), '1'));
    }
};
const besvarAlleUnntattSisteSporsmal = (antallSporsmal) => {
    besvarAlleSporsmal(antallSporsmal - 1)
};
