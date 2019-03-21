/*tslint:disable*/
import * as React from 'react';
import {expect} from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {ForventetSvarHvisIngenUtdanning, mountWithStoreRouterAndIntl, promiseWithSetTimeout,} from '../../test/test-utils';
import {create} from "../../store";
import SkjemaSykefravaerUsikker from '../../sider/skjema-sykefravaer/skjema-sykefravaer-usikker';
import {usikkerSporsmaleneConfig} from "./skjema-sykefravaer-sporsmalene";
import {SporsmalId} from "../../ducks/svar";

enzyme.configure({adapter: new Adapter()});

describe('<Skjema />', () => {

    it('Hvis svaret er Ingen utdanning skal oppfolgings sporsmalene Utdanning godkjent i Norge og Utdanning bestått være satt til INGEN_SVAR',
        () => {
            const store = create();

            const StartIndexForUtdanningSporsmal =
                usikkerSporsmaleneConfig({ dummy: 'dummy' }, 'dummy')
                    .findIndex((data) => data.id === SporsmalId.utdanning);
            const props = {
                history: {
                    push: () => {} // dummy
                },
                match: { params: { id: StartIndexForUtdanningSporsmal}}
            };

            const wrapper = mountWithStoreRouterAndIntl(<SkjemaSykefravaerUsikker {...props} />, store);

            // Klikk på "Ingen utdanning" på spørsmålet om Hæyeste fullført utdanning
            wrapper.find(`.inputPanel__field`).at(0).simulate('change');

            // Forventet svar
            return promiseWithSetTimeout()
                .then(() => {
                    expect(store.getState().svar).to.deep.members(ForventetSvarHvisIngenUtdanning);
                });
        });
});

