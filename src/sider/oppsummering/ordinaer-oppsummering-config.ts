import { DinSituasjonSvar } from '../../ducks/svar-utils';

interface OrdinaerOppsummeringConfig {
    svarSomIndikererArbeidSisteManeder: (DinSituasjonSvar | undefined) [];
    svarSomIndikererIngenArbeidSisteManeder: (DinSituasjonSvar | undefined) [];
}

const oppsummeringConfig: OrdinaerOppsummeringConfig = {
    svarSomIndikererArbeidSisteManeder: [
        DinSituasjonSvar.MISTET_JOBBEN,
        DinSituasjonSvar.HAR_SAGT_OPP,
        DinSituasjonSvar.ER_PERMITTERT,
        DinSituasjonSvar.DELTIDSJOBB_VIL_MER,
        DinSituasjonSvar.VIL_BYTTE_JOBB,
        DinSituasjonSvar.VIL_FORTSETTE_I_JOBB,
    ],
    svarSomIndikererIngenArbeidSisteManeder: [
        DinSituasjonSvar.JOBB_OVER_2_AAR,
        DinSituasjonSvar.ALDRI_HATT_JOBB,
    ],
};

export default oppsummeringConfig;