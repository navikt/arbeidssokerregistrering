import { State as SvarState } from '../../../../../src/ducks/svar';
import { Stilling } from "../../../../../src/ducks/siste-stilling";
import {
    AndreForholdSvar,
    DinSituasjonSvar,
    HelseHinderSvar,
    SisteStillingSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from "../../../../../src/ducks/svar-utils";
import { mapAvgitteSvarForBackend, mapTilBesvarelse, mapTilSvarState } from "../../../../../src/ducks/registrerbruker-utils";
import { InjectedIntl } from 'react-intl';
import { OrdinaerBesvarelse, SykmeldtBesvarelse, TeksterForBesvarelse } from "../../../../../src/ducks/registrerbruker";
import { SporsmalId } from "../../../../../src/ducks/svar";
import { RegistreringType } from "../../../../../src/ducks/registreringstatus";
// @ts-ignore
import { BesvarelseType } from "../../../../src/ducks/registrerbruker-utils";

const svarState: SvarState = [
    { sporsmalId: SporsmalId.dinSituasjon, svar: DinSituasjonSvar.ER_PERMITTERT },
    { sporsmalId: SporsmalId.sisteStilling, svar: SisteStillingSvar.HAR_HATT_JOBB },
    { sporsmalId: SporsmalId.utdanning, svar: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER },
    { sporsmalId: SporsmalId.utdanningGodkjent, svar: UtdanningGodkjentSvar.NEI },
    { sporsmalId: SporsmalId.utdanningBestatt, svar: UtdanningBestattSvar.JA },
    { sporsmalId: SporsmalId.helseHinder, svar: HelseHinderSvar.NEI },
    { sporsmalId: SporsmalId.andreForhold, svar: AndreForholdSvar.NEI },
];

const besvarelse: BesvarelseType = {
    dinSituasjon: DinSituasjonSvar.ER_PERMITTERT,
    sisteStilling: SisteStillingSvar.HAR_HATT_JOBB,
    utdanning: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER,
    utdanningGodkjent: UtdanningGodkjentSvar.NEI,
    utdanningBestatt: UtdanningBestattSvar.JA,
    helseHinder: HelseHinderSvar.NEI,
    andreForhold: AndreForholdSvar.NEI,
};

describe('utils test', () => {
    it('test mapAvgitteSvarForBackend', () => {

        const stilling: Stilling = {
            styrk08: '6236',
            label: 'stilling :)',
            konseptId: 62352672,
        };

        const dummySvar: SvarState = [
            { sporsmalId: SporsmalId.helseHinder, svar: HelseHinderSvar.JA },
            { sporsmalId: SporsmalId.utdanning, svar: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER },
            { sporsmalId: SporsmalId.utdanningBestatt, svar: UtdanningBestattSvar.INGEN_SVAR },
            { sporsmalId: SporsmalId.utdanningGodkjent, svar: UtdanningGodkjentSvar.NEI },
            { sporsmalId: SporsmalId.andreForhold, svar: AndreForholdSvar.NEI },
            { sporsmalId: SporsmalId.sisteStilling, svar: SisteStillingSvar.HAR_HATT_JOBB },
            { sporsmalId: SporsmalId.dinSituasjon, svar: DinSituasjonSvar.ER_PERMITTERT },
        ];
        const messages = {
            'helsehinder-svar-ja': 'JA :)',
            'utdanning-svar-hoyere-utdanning-5-eller-mer': 'Mye utdanning',
            'utdanninggodkjent-svar-nei': 'Ikke godkjent utdanning',
            'andreforhold-svar-nei': 'ingen andre forhold',
            'sistestilling-svar-har-hatt-jobb': 'har hatt jobb',
            'dinsituasjon-svar-er-permittert': 'er permittert',

            'helsehinder-tittel': 'helsehinder-tittel',
            'utdanning-tittel': 'utdanning-tittel',
            'utdanningbestatt-tittel': 'utdanningbestatt-tittel',
            'utdanninggodkjent-tittel': 'utdanninggodkjent-tittel',
            'andreforhold-tittel': 'andreforhold-tittel',
            'sistestilling-tittel': 'sistestilling-tittel',
            'dinsituasjon-tittel': 'dinsituasjon-tittel',
        };

        let dummyIntl = {} as InjectedIntl;
        dummyIntl.messages = messages;

        const expectedTekster: TeksterForBesvarelse = [
            {
                sporsmalId: 'helseHinder',
                sporsmal: messages['helsehinder-tittel'],
                svar: messages['helsehinder-svar-ja'],
            }, {
                sporsmalId: 'utdanning',
                sporsmal: messages['utdanning-tittel'],
                svar: messages['utdanning-svar-hoyere-utdanning-5-eller-mer'],
            }, {
                sporsmalId: 'utdanningBestatt',
                sporsmal: messages['utdanningbestatt-tittel'],
                svar: 'Ikke aktuelt',
            }, {
                sporsmalId: 'utdanningGodkjent',
                sporsmal: messages['utdanninggodkjent-tittel'],
                svar: messages['utdanninggodkjent-svar-nei'],
            }, {
                sporsmalId: 'andreForhold',
                sporsmal: messages['andreforhold-tittel'],
                svar: messages['andreforhold-svar-nei'],
            }, {
                sporsmalId: 'sisteStilling',
                sporsmal: messages['sistestilling-tittel'],
                svar: stilling.label,
            }, {
                sporsmalId: 'dinSituasjon',
                sporsmal: messages['dinsituasjon-tittel'],
                svar: messages['dinsituasjon-svar-er-permittert'],
            },
        ];

        const expectData = {
            sisteStilling: stilling,
            besvarelse: mapTilBesvarelse(dummySvar),
            teksterForBesvarelse: expectedTekster,
        };
        const mappet = mapAvgitteSvarForBackend(dummySvar, stilling, dummyIntl, RegistreringType.ORDINAER_REGISTRERING);
        expect(mappet).to.deep.equal(expectData);
    });

    it('test mapTilBesvarelse', () => {
        expect(mapTilBesvarelse(svarState)).to.deep.equal(besvarelse);
    });

    it('test mapTilSvarState', () => {
        expect(mapTilSvarState(besvarelse)).to.deep.equal(svarState);
    });

});