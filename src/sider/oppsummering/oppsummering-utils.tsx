import { SBLARBEID_URL } from '../../ducks/api';
import { DinSituasjonSvar, SisteStillingSvar, Svar } from '../../ducks/svar-utils';
import { svarSuffiksTilTekstId } from '../skjema/skjema-utils';
import { State as SvarState } from '../../ducks/svar';
import { Data as RegStatus } from '../../ducks/registreringstatus';

export function sendBrukerTilSblArbeid() {
    document.location.href = SBLARBEID_URL;
}

export function getTekstIdForOppsummering(sporsmalId: string, svar: Svar) {
    const sporsmalIderDerOppsummeringenSkalTasFraSporsmalstekstene = [
        'utdanning',
    ];
    const prefiks = sporsmalIderDerOppsummeringenSkalTasFraSporsmalstekstene.includes(sporsmalId)
        ? '' : 'oppsummering-';
    return `${prefiks}${sporsmalId.toLowerCase()}-svar-${svarSuffiksTilTekstId(svar)}`;
}

export function getTekstIdForArbeidSisteManeder(svarState: SvarState, regStatus: RegStatus): string {
    const infoFraAARegIndikererArbeidSisteManeder = regStatus.jobbetSeksAvTolvSisteManeder;
    const brukerEnigMedAAReg = brukersSvarSamsvarerMedInfoFraAAReg(
        brukersSvarIndikererArbeidSisteManeder(svarState),
        infoFraAARegIndikererArbeidSisteManeder
    );
    if (brukerEnigMedAAReg) {
        return '';
    }
    return !!infoFraAARegIndikererArbeidSisteManeder ?
        'oppsummering-arbeidserfaring-1' : 'oppsummering-arbeidserfaring-2';
}

function brukersSvarSamsvarerMedInfoFraAAReg(
    brukersvarIndikererArbeidSisteManeder: boolean | 'unknown',
    infoFraAARegIndikererArbeidSisteManeder: boolean | undefined
): boolean {
    // Tilfellene 'unknown' og 'undefined' forekommer bare dersom noen har tuklet med programmet, så vi ignorerer det.
    return (brukersvarIndikererArbeidSisteManeder === infoFraAARegIndikererArbeidSisteManeder);
}

function brukersSvarIndikererArbeidSisteManeder(svarState: SvarState): boolean | 'unknown' {
    const sisteStillingSvar  = svarState.sisteStilling;
    const dinSituasjonSvar = svarState.dinSituasjon;

    const svarSomIndikererArbeidSisteManeder: (DinSituasjonSvar | undefined)[] = [
        DinSituasjonSvar.MISTET_JOBBEN,
        DinSituasjonSvar.HAR_SAGT_OPP,
        DinSituasjonSvar.ER_PERMITTERT,
        DinSituasjonSvar.DELTIDSJOBB_VIL_MER,
        DinSituasjonSvar.VIL_BYTTE_JOBB,
        DinSituasjonSvar.VIL_FORTSETTE_I_JOBB,
    ];
    const svarSomIndikererIngenArbeidSisteManeder: (DinSituasjonSvar | undefined)[] = [
        DinSituasjonSvar.JOBB_OVER_2_AAR,
        DinSituasjonSvar.ALDRI_HATT_JOBB,
    ];

    // Folgende booleans er i praksis alltid det motsatte av hverandre, men lagde 2 stk fordi man i teorien kan endre
    // dinSituasjon til VET_IKKE og sisteStilling til INGEN_SVAR ved å bruke f.eks. reduxDevtools.
    const brukerSvarerAtDenHarJobbetSisteManeder = svarSomIndikererArbeidSisteManeder.includes(dinSituasjonSvar) ||
        (sisteStillingSvar === SisteStillingSvar.HAR_HATT_JOBB &&
            !svarSomIndikererIngenArbeidSisteManeder.includes(dinSituasjonSvar));

    const brukerSvarerAtDenIkkeHarJobbetSisteManeder =
        svarSomIndikererIngenArbeidSisteManeder.includes(dinSituasjonSvar) ||
        (sisteStillingSvar === SisteStillingSvar.HAR_IKKE_HATT_JOBB &&
            !svarSomIndikererArbeidSisteManeder.includes(dinSituasjonSvar));

    if (brukerSvarerAtDenHarJobbetSisteManeder) {
        return true;
    } else if (brukerSvarerAtDenIkkeHarJobbetSisteManeder) {
        return false;
    } else {
        return 'unknown';
    }
}