/*tslint:disable*/
import {expect} from 'chai';
import {getAlleSporsmalSomIkkeSkalBesvares, getTekstIdForSvar, SkjemaConfig} from "./skjema-utils";
import {SporsmalId, State as SvarState} from '../../ducks/svar';
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

        const svar = [
            {sporsmalId: 'dinSituasjon', svar: DinSituasjonSvar.USIKKER_JOBBSITUASJON},
            {sporsmalId: 'dinSituasjon', svar: DinSituasjonSvar.USIKKER_JOBBSITUASJON},
            {sporsmalId: 'sisteStilling', svar: SisteStillingSvar.HAR_IKKE_HATT_JOBB},
            {sporsmalId: 'utdanning', svar: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER},
            {sporsmalId: 'skalHoppesOver1', svar: UtdanningGodkjentSvar.VET_IKKE},
            {sporsmalId: 'skalIkkeHoppesOver1', svar: IngenSvar.INGEN_SVAR},
            {sporsmalId: 'skalHoppesOver2', svar: IngenSvar.INGEN_SVAR},
            {sporsmalId: 'skalHoppesOver3', svar: IngenSvar.INGEN_SVAR},
            {sporsmalId: 'skalIkkeHoppesOver2', svar: IngenSvar.INGEN_SVAR},
        ];

        const config: SkjemaConfig = new Map<Svar, string[]>([
            [DinSituasjonSvar.USIKKER_JOBBSITUASJON, ['skalHoppesOver1']],
            [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB, ['skalIkkeHoppesOver1']],
            [SisteStillingSvar.HAR_IKKE_HATT_JOBB, ['skalHoppesOver2', 'skalHoppesOver3']],
        ]);

        expect(getAlleSporsmalSomIkkeSkalBesvares(besvarteSporsmalIder as SporsmalId[], svar as SvarState, config)).to.deep.equal([
            'skalHoppesOver1',
            'skalHoppesOver2',
            'skalHoppesOver3',
        ]);
    });

    it('test getTekstIdForSvar', () => {
        expect(getTekstIdForSvar(SporsmalId.dinSituasjon, DinSituasjonSvar.ALDRI_HATT_JOBB)).to.equal('dinsituasjon-svar-aldri-hatt-jobb');
    });
});