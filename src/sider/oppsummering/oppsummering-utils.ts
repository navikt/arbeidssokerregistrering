import { SBLARBEID_URL } from '../../ducks/api';
import { DinSituasjonSvar, SisteStillingSvar, Svar } from '../../ducks/svar-utils';
import { svarSuffiksTilTekstId } from '../skjema/skjema-utils';
import { State as SvarState } from '../../ducks/svar';
import { Data as RegStatus } from '../../ducks/registreringstatus';
import oppsummeringConfig from './oppsummering-config';

const {svarSomIndikererArbeidSisteManeder, svarSomIndikererIngenArbeidSisteManeder} = oppsummeringConfig;

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
    if (brukersSvarSamsvarerMedInfoFraAAReg(svarState, infoFraAARegIndikererArbeidSisteManeder)) {
        return '';
    }
    return !!infoFraAARegIndikererArbeidSisteManeder ?
        'oppsummering-arbeidserfaring-1' : 'oppsummering-arbeidserfaring-2';
}

export function brukersSvarSamsvarerMedInfoFraAAReg(
    svarState: SvarState,
    infoFraAARegIndikererArbeidSisteManeder: boolean | undefined
): boolean {
    // Tilfellene 'unknown' og 'undefined' forekommer bare dersom noen har tuklet med programmet, så vi ignorerer det.
    return (brukersSvarIndikererArbeidSisteManeder(svarState) === infoFraAARegIndikererArbeidSisteManeder);
}

function brukersSvarIndikererArbeidSisteManeder(svarState: SvarState): boolean | 'unknown' {
    const sisteStillingSvar  = svarState.sisteStilling;
    const dinSituasjonSvar = svarState.dinSituasjon;

    if (brukerSvarerAtDenHarJobbetSisteManeder(dinSituasjonSvar, sisteStillingSvar)) {
        return true;
    } else if (brukerSvarerAtDenIkkeHarJobbetSisteManeder(dinSituasjonSvar, sisteStillingSvar)) {
        return false;
    } else {
        return 'unknown';
    }
}

function brukerSvarerAtDenHarJobbetSisteManeder(
    dinSituasjonSvar: DinSituasjonSvar | undefined,
    sisteStillingSvar: SisteStillingSvar | undefined
) {
    return svarSomIndikererArbeidSisteManeder.includes(dinSituasjonSvar) ||
        (sisteStillingSvar === SisteStillingSvar.HAR_HATT_JOBB &&
            !svarSomIndikererIngenArbeidSisteManeder.includes(dinSituasjonSvar));
}

function brukerSvarerAtDenIkkeHarJobbetSisteManeder(
    dinSituasjonSvar: DinSituasjonSvar | undefined,
    sisteStillingSvar: SisteStillingSvar | undefined
) {
    return svarSomIndikererIngenArbeidSisteManeder.includes(dinSituasjonSvar) ||
        (sisteStillingSvar === SisteStillingSvar.HAR_IKKE_HATT_JOBB &&
            !svarSomIndikererArbeidSisteManeder.includes(dinSituasjonSvar));
}