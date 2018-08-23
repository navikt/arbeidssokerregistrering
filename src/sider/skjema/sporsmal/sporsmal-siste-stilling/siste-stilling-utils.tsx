import { annenStilling, Stilling } from '../../../../ducks/siste-stilling';
import { Data } from '../../../../ducks/oversettelse-av-stilling-fra-aareg';
import { DinSituasjonSvar } from '../../../../ducks/svar-utils';

export function hentOversattStillingFraAAReg(
    data: Data
): Stilling {
    const koderFraPam = data.konseptMedStyrk08List;
    let stilling: Stilling = annenStilling;
    if (koderFraPam.length > 0) {
        stilling = {
            label: koderFraPam[0].label,
            styrk08: koderFraPam[0].styrk08[0],
            konseptId: koderFraPam[0].konseptId === undefined ? -1 : koderFraPam[0].konseptId!,
        };
    }
    return stilling;
}

export function skalSkjuleSvaralternativer(dinSituasjon: DinSituasjonSvar | undefined) {
    const situasjonerDerViAlleredeVetAtBrukerenHarHattJobb: (DinSituasjonSvar | undefined)[] = [
        DinSituasjonSvar.MISTET_JOBBEN,
        DinSituasjonSvar.HAR_SAGT_OPP,
        DinSituasjonSvar.ER_PERMITTERT,
        DinSituasjonSvar.DELTIDSJOBB_VIL_MER,
        DinSituasjonSvar.VIL_BYTTE_JOBB,
        DinSituasjonSvar.ALDRI_HATT_JOBB,
        DinSituasjonSvar.VIL_FORTSETTE_I_JOBB,
    ];
    return situasjonerDerViAlleredeVetAtBrukerenHarHattJobb.includes(dinSituasjon);
}