import * as React from 'react';
import {expect} from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {shallowwithStoreAndIntl} from "../../../test/test-utils";
import {create} from "../../../store";
import {ActionTypes as FullforActionTypes, ErrorTypes} from '../../../ducks/registrerbruker';
import FullforFeilhandtering from './fullfor-feilhandtering';
import FeilmeldingBrukersStatusUgyldig from './feilmelding-brukers-status-ugyldig';
import FeilmeldingGenerell from '../../../komponenter/feilmelding-generell/feilmelding-generell';

enzyme.configure({adapter: new Adapter()});

describe('<FullforFeilhandtering />', () => {
    it('Skal sende bruker til spesiallaget feilside hvis feilen har en av typene til ErrorTypes', () => {
        const store = create();
        store.dispatch({
            type: FullforActionTypes.REG_BRUKER_STATUS_FEILET,
            data: {data: {type: ErrorTypes.BRUKER_KAN_IKKE_REAKTIVERES}}
        });

        const wrapper = shallowwithStoreAndIntl(<FullforFeilhandtering />, store);
        expect(wrapper.find(FeilmeldingBrukersStatusUgyldig)).to.be.have.length(1);
    });

    it('Skal sende bruker til generisk feilside hvis feilen ikke en av typene til ErrorTypes', () => {
        const store = create();
        store.dispatch({
            type: FullforActionTypes.REG_BRUKER_STATUS_FEILET,
        });

        const wrapper = shallowwithStoreAndIntl(<FullforFeilhandtering />, store);
        expect(wrapper.find(FeilmeldingGenerell)).to.be.have.length(1);
    });
});