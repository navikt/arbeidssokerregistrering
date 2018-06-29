import {
    AndreForholdSvar,
    DinSituasjonSvar, HelseHinderSvar,
    SisteStillingSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from '../ducks/svar-utils';

const svarMock = {
    'din-situasjon': DinSituasjonSvar.ER_PERMITTERT,
    'siste-stilling': SisteStillingSvar.HAR_HATT_JOBB,
    'utdanning': UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER,
    'utdanninggodkjent': UtdanningGodkjentSvar.NEI,
    'utdanningbestatt': UtdanningBestattSvar.JA,
    'helsehinder': HelseHinderSvar.NEI,
    'andreforhold': AndreForholdSvar.NEI,
};

export default svarMock;