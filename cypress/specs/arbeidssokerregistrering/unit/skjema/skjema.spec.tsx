//@ts-nocheck
import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Skjema from '../../../../../src/komponenter/skjema/skjema';
import {
    mountWithStoreRouterAndIntl,
    store
} from '../../../../../src/test/test-utils';
import { setInitialState, SporsmalId } from "../../../../../src/ducks/svar";
import { defaultConfigForSporsmalsflyt } from "../../../../../src/komponenter/skjema/skjema-utils";
import {
    DinSituasjonSvar,
    Svar,
    UtdanningSvar
} from "../../../../../src/ducks/svar-utils";
import { OPPSUMMERING_PATH, SKJEMA_PATH } from "../../../../../src/utils/konstanter";
import SporsmalDinSituasjon from "../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-din-situasjon";
import SisteStilling from "../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-siste-stilling/siste-stilling";
import Utdanningsporsmal from "../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-utdanning";
import UtdanningGodkjentSporsmal from "../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-utdanning-godkjent";
import UtdanningBestattSporsmal from "../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-utdanning-bestatt";
import HelseHinder from "../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-helse-hinder";
import AndreForhold from "../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-andre-forhold";
import { RouteComponentProps } from "react-router-dom";
import { MatchProps } from "../../../../../src/utils/utils";
import { AppState } from "../../../../../src/reducer";
import { getStore } from "../../../../../src/store";
import { Store } from "redux";
import AvbrytModal from "../../../../../src/komponenter/avbryt-modal/avbryt-modal";

enzyme.configure({ adapter: new Adapter() });

beforeEach(() => store.dispatch(setInitialState()));

describe('<Skjema />', () => {

    it('Skal vise advarsel dersom spørsmål ikke er besvart', () => {

        const wrapper = mountSkjema(defaultConfigForSporsmalsflyt, "0", undefined);

        wrapper.find("a.nestelenke").simulate('click');
        expect(wrapper.find('div.spm-advarsel')).to.have.length(1);
    });


    it('Neste-lenke skal ha riktig href', () => {

        const wrapper = mountSkjema(defaultConfigForSporsmalsflyt, "0", undefined);

        expect(wrapper.find("a.nestelenke").find({ href: SKJEMA_PATH + '/1' })).to.have.length(1);

    });

    it('Avbryt-knapp skal vise dialog', () => {

        const wrapper = mountSkjema(defaultConfigForSporsmalsflyt, "0", undefined);

        expect(wrapper.find("a.lenke-avbryt")).to.have.length(1);
        wrapper.find("a.lenke-avbryt").simulate('click');

        expect(wrapper.find(AvbrytModal)).to.have.length(1);

    });

    it('Skal hoppe over gitte spørsmål, både når man viser neste spørsmål og i staten.', () => {

        const store: Store<AppState> = getStore();
        store.getState().svar = [{ sporsmalId: SporsmalId.dinSituasjon, svar: DinSituasjonSvar.ALDRI_HATT_JOBB }];

        const wrapper = mountSkjema(defaultConfigForSporsmalsflyt, "0", store);

        wrapper.find("a.nestelenke").simulate('click');
        expect(wrapper.find("a.nestelenke").find({ href: SKJEMA_PATH + '/2' })).to.have.length(1);

    });


    it('Skal ikke hoppe over spørsmål hvis det ikke er konfigurert', () => {

        const store: Store<AppState> = getStore();
        store.getState().svar = [{ sporsmalId: SporsmalId.utdanning, svar: UtdanningSvar.INGEN_UTDANNING }];

        const config = new Map<Svar, string[]>([]);
        const wrapper = mountSkjema(config, "0", store);

        wrapper.find("a.nestelenke").simulate('click');
        expect(wrapper.find("a.nestelenke").find({ href: SKJEMA_PATH + '/1' })).to.have.length(1);

    });

});

const mountSkjema = (config, startId: string, store: Store<AppState> | undefined) => {

    const sporsmalProps = {
        endreSvar: (sporsmalId, svar) => { },
        hentAvgittSvar: (sporsmalId: SporsmalId) => undefined,
    };

    const cfg = config ? config : defaultConfigForSporsmalsflyt;
    const id = startId ? startId : "0";

    return mountWithStoreRouterAndIntl(
        <Skjema
            config={cfg}
            baseUrl={SKJEMA_PATH}
            endUrl={OPPSUMMERING_PATH}
            {... { match: { params: { id: id } } } as RouteComponentProps<MatchProps>}
        >
            <SporsmalDinSituasjon sporsmalId={SporsmalId.dinSituasjon} {...sporsmalProps} />
            <SisteStilling sporsmalId={SporsmalId.sisteStilling} {...sporsmalProps} />
            <Utdanningsporsmal sporsmalId={SporsmalId.utdanning} {...sporsmalProps} />
            <UtdanningGodkjentSporsmal sporsmalId={SporsmalId.utdanningGodkjent} {...sporsmalProps} />
            <UtdanningBestattSporsmal sporsmalId={SporsmalId.utdanningBestatt} {...sporsmalProps} />
            <HelseHinder sporsmalId={SporsmalId.helseHinder} {...sporsmalProps} />
            <AndreForhold sporsmalId={SporsmalId.andreForhold} {...sporsmalProps} />
        </Skjema>
        , store);

};
