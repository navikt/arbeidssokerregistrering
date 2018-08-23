import {
    AndreForholdSvar,
    DinSituasjonSvar, HelseHinderSvar,
    SisteStillingSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from '../ducks/svar-utils';

const svarMock = {
    'dinSituasjon': DinSituasjonSvar.ER_PERMITTERT,
    'sisteStilling': SisteStillingSvar.HAR_HATT_JOBB,
    'utdanning': UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER,
    'utdanningGodkjent': UtdanningGodkjentSvar.NEI,
    'utdanningBestatt': UtdanningBestattSvar.JA,
    'helseHinder': HelseHinderSvar.NEI,
    'andreForhold': AndreForholdSvar.NEI,
};

export default svarMock;