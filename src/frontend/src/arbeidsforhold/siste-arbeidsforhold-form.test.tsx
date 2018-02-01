import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mountWithStoreAndIntl } from '../test/test-utils';
import SisteArbeidsforholdForm from '../arbeidsforhold/siste-arbeidsforhold-form';
import KnappNeste from '../komponenter/knapp-neste';
import { create } from '../store';
import { datePickerToISODate, isoDateToDatePicker } from '../komponenter/input/datovelger/utils';
import KnappAvbryt from '../skjema/knapp-avbryt';
import { lagreArbeidsforhold, selectSisteArbeidsforhold } from '../ducks/siste-arbeidsforhold';

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
    it('skal rendre error dersom fraDato mangler', () => {
        const store = create();

        const submitted = false;
        const onSubmit = (() => { submitted = true; });

        const wrapper = mountWithStoreAndIntl(<SisteArbeidsforholdForm  onSubmit={onSubmit}/>, store);
        const knappNeste = wrapper.find(KnappNeste);
        knappNeste.simulate('click');

        const feiloppsummering = wrapper.find('.skjema__feilomrade--harFeil');
        expect(feiloppsummering.find({ href: '#fraDato'})).to.have.length(1);
        expect(submitted).to.equal(false);
    });
    it('skal submitte alle felt', () => {
        const store = create();

        const submitted = {};
        const onSubmit = ((data) => { submitted = data; });

        const wrapper = mountWithStoreAndIntl(<SisteArbeidsforholdForm  onSubmit={onSubmit}/>, store);
        const knappNeste = wrapper.find(KnappNeste);

        const arbeidsgiver = wrapper.find('input').find('#arbeidsgiver');
        const stilling = wrapper.find('input').find('#stilling');
        const fraDato = wrapper.find('input').find('#fraDato');
        const tilDato = wrapper.find('input').find('#tilDato');

        arbeidsgiver.simulate('change', { target: {value: 'Arbeidsgiver AS' }});
        stilling.simulate('change', { target: {value: 'Butikkmedarbeider' }});

        const fraDatoVerdi = new Date(2018, 0, 1);
        const tilDatoVerdi = new Date(2018, 1, 1);

        fraDato.simulate('change', { target: {value: isoDateToDatePicker(fraDatoVerdi) }});
        tilDato.simulate('change', { target: {value: isoDateToDatePicker(tilDatoVerdi) }});

        knappNeste.simulate('click');

        expect(submitted).to.deep.equal({
            arbeidsgiver: 'Arbeidsgiver AS',
            stilling: 'Butikkmedarbeider',
            fraDato: datePickerToISODate(fraDatoVerdi),
            tilDato: datePickerToISODate(tilDatoVerdi)
        });
    });
    it('skal oppdatere store og navigere til avbryt ved klikk på avbryt', () => {
        const store = create();

        let historyPused = false;

        const history = {
            push: () => historyPused = true
        };

        const wrapper = mountWithStoreAndIntl(<SisteArbeidsforholdForm history={history} />, store);
        const knappAvbryt = wrapper.find(KnappAvbryt);

        const arbeidsgiver = wrapper.find('input').find('#arbeidsgiver');
        const stilling = wrapper.find('input').find('#stilling');
        const fraDato = wrapper.find('input').find('#fraDato');
        const tilDato = wrapper.find('input').find('#tilDato');

        arbeidsgiver.simulate('change', { target: {value: 'Arbeidsgiver AS' }});
        stilling.simulate('change', { target: {value: 'Butikkmedarbeider' }});

        const fraDatoVerdi = new Date(2018, 0, 1);
        const tilDatoVerdi = new Date(2018, 1, 1);

        fraDato.simulate('change', { target: {value: isoDateToDatePicker(fraDatoVerdi) }});
        tilDato.simulate('change', { target: {value: isoDateToDatePicker(tilDatoVerdi) }});

        knappAvbryt.simulate('click');

        const arbeidsforholdState = selectSisteArbeidsforhold(store.getState());

        expect(arbeidsforholdState.data.arbeidsgiver).to.equal('Arbeidsgiver AS');
        expect(arbeidsforholdState.data.stilling).to.equal('Butikkmedarbeider');
        expect(arbeidsforholdState.data.fra).to.equal('2018-01-01');
        expect(arbeidsforholdState.data.til).to.equal('2018-02-01');

        expect(historyPused).to.equal(true);
    });
    it('skal populere inputfelt med initial data', () => {
        const store = create();

        const initialData = {
            arbeidsgiver: 'Arbeidsgiver AS',
            stilling: 'Butikkmedarbeider',
            fra: '2018-01-01',
            til: '2018-02-01'
        };

        store.dispatch(lagreArbeidsforhold(initialData));

        const wrapper = mountWithStoreAndIntl(<SisteArbeidsforholdForm history={history} />, store);

        const arbeidsgiver = wrapper.find('input').find('#arbeidsgiver');
        const stilling = wrapper.find('input').find('#stilling');
        const fraDato = wrapper.find('input').find('#fraDato');
        const tilDato = wrapper.find('input').find('#tilDato');

        expect(arbeidsgiver.props().value).to.equal(initialData.arbeidsgiver);
        expect(stilling.props().value).to.equal(initialData.stilling);
        expect(fraDato.props().value).to.equal('01.01.2018');
        expect(tilDato.props().value).to.equal('01.02.2018');
    });
    it('skal ikke submitte dersom periode er ugyldig', () => {
        const store = create();
        const submitted = false;

        const wrapper = mountWithStoreAndIntl(
            <SisteArbeidsforholdForm
                onSubmit={() => submitted = true}
                history={history}
            />,
            store);

        const arbeidsgiver = wrapper.find('input').find('#arbeidsgiver');
        const stilling = wrapper.find('input').find('#stilling');
        const fraDato = wrapper.find('input').find('#fraDato');
        const tilDato = wrapper.find('input').find('#tilDato');

        arbeidsgiver.simulate('change', { target: {value: 'Arbeidsgiver AS' }});
        stilling.simulate('change', { target: {value: 'Butikkmedarbeider' }});

        const fraDatoVerdi = new Date(2018, 1, 1);
        const tilDatoVerdi = new Date(2018, 0, 1);

        fraDato.simulate('change', { target: {value: isoDateToDatePicker(fraDatoVerdi) }});
        tilDato.simulate('change', { target: {value: isoDateToDatePicker(tilDatoVerdi) }});

        const knappNeste = wrapper.find(KnappNeste);
        knappNeste.simulate('click');

        expect(submitted).to.equal(false);

    });
});