/*tslint:disable*/
import {expect} from 'chai';
import {State as SvarState} from '../ducks/svar';
import {Stilling} from "../ducks/siste-stilling";
import {
    AndreForholdSvar,
    DinSituasjonSvar,
    HelseHinderSvar,
    SisteStillingSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from "../ducks/svar-utils";
import {mapAvgitteSvarForBackend} from "../ducks/registrerbruker-utils";
import { InjectedIntl } from 'react-intl';
import {TeksterForBesvarelse} from "./registrerbruker";

const dummyIntl = { messages:{} } as InjectedIntl;

describe('utils test', () => {
    it('test mapAvgitteSvarForBackend', () => {

        const stilling: Stilling = {
            styrk08: '6236',
            label: 'stilling :)',
            konseptId: 62352672,
        };

        const dummySvar: SvarState = {
            helseHinder: HelseHinderSvar.JA,
            utdanning: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER,
            utdanningBestatt: UtdanningBestattSvar.INGEN_SVAR,
            utdanningGodkjent: UtdanningGodkjentSvar.NEI,
            andreForhold: AndreForholdSvar.NEI,
            sisteStilling: SisteStillingSvar.HAR_HATT_JOBB,
            dinSituasjon: DinSituasjonSvar.ER_PERMITTERT,
        };
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
            enigIOppsummering: true,
            oppsummering: '',
            besvarelse: dummySvar,
            teksterForBesvarelse: expectedTekster,
        };
        const mappet = mapAvgitteSvarForBackend(dummySvar, stilling, dummyIntl);
        expect(mappet).to.deep.equal(expectData);
    });
});