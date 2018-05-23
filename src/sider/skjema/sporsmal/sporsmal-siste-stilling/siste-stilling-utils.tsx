import { Stilling, tomStilling } from '../../../../ducks/siste-stilling';
import { Data } from '../../../../ducks/oversettelse-av-stilling-fra-aareg';

export function hentOversattStillingFraAAReg(
    data: Data
) {
    const koderFraPam = data.konseptMedStyrk08List;
    let stilling: Stilling = tomStilling;
    if (koderFraPam.length > 0) {
        stilling = {
            label: koderFraPam[0].label,
            styrk08: koderFraPam[0].styrk08[0],
            konseptId: koderFraPam[0].konseptId === undefined ? -1 : koderFraPam[0].konseptId!,
        };
    }
    return stilling;
}