/*tslint:disable*/
import { expect } from 'chai';
import {getAlleSporsmalSomIkkeSkalBesvares, getTekstIdForSvar, SkjemaConfig} from "./skjema-utils";
import { State as SvarState } from '../../ducks/svar';
import {
    DinSituasjonSvar,
    IngenSvar,
    SisteStillingSvar,
    Svar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from "../../ducks/svar-utils";

describe('skjema-utils', () => {
    it('getAlleSporsmalSomIkkeSkalBesvares skal returnere riktig spørsmål', () => {

        const besvarteSporsmalIder = ['dinSituasjon', 'sisteStilling', 'utdanning'];
        const svar = {
            'dinSituasjon': DinSituasjonSvar.USIKKER_JOBBSITUASJON,
            'sisteStilling': SisteStillingSvar.HAR_IKKE_HATT_JOBB,
            'utdanning': UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER,
            'skalHoppesOver1': UtdanningGodkjentSvar.VET_IKKE,
            'skalIkkeHoppesOver1': IngenSvar.INGEN_SVAR,
            'skalHoppesOver2': IngenSvar.INGEN_SVAR,
            'skalHoppesOver3': IngenSvar.INGEN_SVAR,
            'skalIkkeHoppesOver2': IngenSvar.INGEN_SVAR,
        };

        const config: SkjemaConfig = new Map<Svar, string[]>([
            [DinSituasjonSvar.USIKKER_JOBBSITUASJON, ['skalHoppesOver1']],
            [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB, ['skalIkkeHoppesOver1']],
            [SisteStillingSvar.HAR_IKKE_HATT_JOBB, ['skalHoppesOver2', 'skalHoppesOver3']],
        ]);

        expect(getAlleSporsmalSomIkkeSkalBesvares(besvarteSporsmalIder, svar as SvarState, config)).to.deep.equal([
            'skalHoppesOver1',
            'skalHoppesOver2',
            'skalHoppesOver3',
        ]);
    });

    it('test getTekstIdForSvar', () => {
        expect(getTekstIdForSvar('dinSituasjon', DinSituasjonSvar.ALDRI_HATT_JOBB)).to.equal('dinsituasjon-svar-aldri-hatt-jobb');
    });
});