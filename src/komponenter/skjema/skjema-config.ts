import { SporsmalId } from '../../ducks/svar';
import {
    DinSituasjonSvar,
    UtdanningSvar
} from '../../ducks/svar-utils';

export const hoppOverSisteStillingSporsmal = [SporsmalId.sisteStilling];
export const hoppOverAlleUtdanningSporsmalene = [
    SporsmalId.utdanning,
    SporsmalId.utdanningBestatt,
    SporsmalId.utdanningGodkjent
];

export const hoppOverUtdanningBestattOgGodkjentSporsmalene = [
    SporsmalId.utdanningBestatt,
    SporsmalId.utdanningGodkjent
];

export const spmSomIkkeSkalBesvaresConfig = [
    {
        id: SporsmalId.dinSituasjon,
        svar: DinSituasjonSvar.ALDRI_HATT_JOBB,
        spmHoppOver: hoppOverSisteStillingSporsmal
    },
    {
        id: SporsmalId.dinSituasjon,
        svar: DinSituasjonSvar.VIL_FORTSETTE_I_JOBB,
        spmHoppOver: hoppOverAlleUtdanningSporsmalene
    },
    {
        id: SporsmalId.utdanning,
        svar: UtdanningSvar.INGEN_UTDANNING,
        spmHoppOver: hoppOverUtdanningBestattOgGodkjentSporsmalene
    }
];