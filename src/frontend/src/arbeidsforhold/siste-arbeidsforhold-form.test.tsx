import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mountWithStoreAndIntl } from '../test/test-utils';
import SisteArbeidsforholdForm from '../arbeidsforhold/siste-arbeidsforhold-form';
import KnappNeste from '../komponenter/knapp-neste';
import { create } from '../store';

enzyme.configure({adapter: new Adapter()});

describe('<SisteArbeidsforholdForm />', () => {
    it('skal rendre error dersom arbeidsgiver mangler', () => {
        const store = create();

        const submitted = false;
        const onSubmit = (() => { submitted = true; });

        const wrapper = mountWithStoreAndIntl(<SisteArbeidsforholdForm  onSubmit={onSubmit}/>, store);
        const knappNeste = wrapper.find(KnappNeste);
        knappNeste.simulate('click');

        const feiloppsummering = wrapper.find('.skjema__feilomrade--harFeil');
        expect(feiloppsummering.find({ href: '#arbeidsgiver'})).to.have.length(1);
        expect(submitted).to.equal(false);
    });
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
    it('skal submitte dersom alle påkrevde felt er utfylt', () => {
        const store = create();

        const submitted = {};
        const onSubmit = ((data) => { submitted = data; });

        const wrapper = mountWithStoreAndIntl(<SisteArbeidsforholdForm  onSubmit={onSubmit}/>, store);
        const knappNeste = wrapper.find(KnappNeste);

        const arbeidsgiver = wrapper.find('input').find('#arbeidsgiver');
        const stilling = wrapper.find('input').find('#stilling');

        arbeidsgiver.simulate('change', { target: {value: 'Arbeidsgiver AS' }});
        stilling.simulate('change', { target: {value: 'Butikkmedarbeider' }});

        knappNeste.simulate('click');

        expect(submitted).to.deep.equal({ arbeidsgiver: 'Arbeidsgiver AS', stilling: 'Butikkmedarbeider'});
    });
});