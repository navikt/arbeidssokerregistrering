/*tslint:disable*/
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {
    mountWithStoreRouterAndIntl, promiseWithSetTimeout,
} from '../../test/test-utils';
import {
    Svar,
} from "../../ducks/svar-utils";
import {create} from "../../store";
import SkjemaSykefravaerUsikker from '../../sider/skjema-sykefravaer/skjema-sykefravaer-usikker';

enzyme.configure({adapter: new Adapter()});

const dummyProps = {
    endreSvar: (sporsmalId: string, svar: Svar) => {},
    resetSvar: (sporsmalId: string) => {},
};


// beforeEach(() => store.dispatch(setInitialState()));

describe('<Skjema />', () => {

    it('Hvis bruker wip.....',
        () => {
            const store = create();
            const push = sinon.spy();
            const props = {
                history: {
                    push
                },
                match: { params: { id: 0 }}
            };

            const wrapper = mountWithStoreRouterAndIntl(<SkjemaSykefravaerUsikker {...props} />, store);
            

            wrapper.find(`.inputPanel__field`).at(0).simulate('change'); // klikk på "utdanning INGEN_SVAR"


            // console.log('wrapper.debug()', wrapper.debug())


            return promiseWithSetTimeout()
                .then(() => {
                    console.log('wrapper.debug()', store.getState())
                    // expect(store.getState().sisteStilling.data.stilling).to.deep.equal(ingenYrkesbakgrunn);
                });

        });


});

