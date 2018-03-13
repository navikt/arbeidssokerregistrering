import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mountWithStoreAndIntl } from '../../test/test-utils';
import SisteArbeidsforholdForm from './siste-arbeidsforhold-form';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import { create } from '../../store';
import { datePickerToISODate, isoDateToDatePicker } from '../../komponenter/input/datovelger/utils';
import KnappAvbryt from '../../komponenter/knapper/knapp-avbryt';
import { lagreArbeidsforhold, selectSisteArbeidsforhold } from '../../ducks/siste-arbeidsforhold-fra-aareg';

enzyme.configure({adapter: new Adapter()});

describe('<SisteArbeidsforholdForm />', () => {
    it('skal rendre error dersom stilling mangler', () => {
        const store = create();

        const submitted = false;
        const onSubmit = (() => { submitted = true; });

        const wrapper = mountWithStoreAndIntl(<SisteArbeidsforholdForm  onSubmit={onSubmit}/>, store);
        const knappNeste = wrapper.find(KnappNeste);
        knappNeste.simulate('click');

        const feiloppsummering = wrapper.find('.skjema__feilomrade--harFeil');
        expect(feiloppsummering.find({ href: '#stilling'})).to.have.length(1);
        expect(submitted).to.equal(false);
    });
});