import {
    DU_ER_NA_REGISTRERT_PATH,
    FULLFOR_PATH,
    INFOSIDE_PATH,
    INNGANGSSPORSMAL_PATH,
    OPPSUMMERING_PATH,
    SKJEMA_PATH,
    SKJEMA_SYKEFRAVAER_PATH
} from '../../utils/konstanter';
import { SporsmalId, State as SvarState } from '../../ducks/svar';
import { RegistreringType } from '../../ducks/registreringstatus';
import { FremtidigSituasjonSvar, hentSvar } from '../../ducks/svar-utils';

const registreringConfig: string[] = [
    `${SKJEMA_PATH}/0`,
    `${SKJEMA_PATH}/1`,
    `${SKJEMA_PATH}/2`,
    `${SKJEMA_PATH}/3`,
    `${SKJEMA_PATH}/4`,
    `${SKJEMA_PATH}/5`,
    `${SKJEMA_PATH}/6`,
    OPPSUMMERING_PATH,
    FULLFOR_PATH,
    DU_ER_NA_REGISTRERT_PATH
];

const tilbakeTilSammeJobbConfig: string[] = [
    INNGANGSSPORSMAL_PATH,
    `${SKJEMA_SYKEFRAVAER_PATH}/1/0`,
    INFOSIDE_PATH,
    OPPSUMMERING_PATH,
    DU_ER_NA_REGISTRERT_PATH
];

const tilbakeTilSammeJobbNyStillingConfig: string[] = [
    INNGANGSSPORSMAL_PATH,
    `${SKJEMA_SYKEFRAVAER_PATH}/2/0`,
    INFOSIDE_PATH,
    OPPSUMMERING_PATH,
    DU_ER_NA_REGISTRERT_PATH
];

const trengerNyJobbConfig: string[] = [
    INNGANGSSPORSMAL_PATH,
    `${SKJEMA_SYKEFRAVAER_PATH}/3/0`,
    `${SKJEMA_SYKEFRAVAER_PATH}/3/1`,
    `${SKJEMA_SYKEFRAVAER_PATH}/3/2`,
    `${SKJEMA_SYKEFRAVAER_PATH}/3/3`,
    OPPSUMMERING_PATH,
    DU_ER_NA_REGISTRERT_PATH
];

const usikkerConfig: string[] = [
    INNGANGSSPORSMAL_PATH,
    `${SKJEMA_SYKEFRAVAER_PATH}/4/0`,
    `${SKJEMA_SYKEFRAVAER_PATH}/4/1`,
    `${SKJEMA_SYKEFRAVAER_PATH}/4/2`,
    `${SKJEMA_SYKEFRAVAER_PATH}/4/3`,
    OPPSUMMERING_PATH,
    DU_ER_NA_REGISTRERT_PATH
];

const ingenPasserConfig: string[] = [
    INNGANGSSPORSMAL_PATH,
    OPPSUMMERING_PATH,
    DU_ER_NA_REGISTRERT_PATH
];

export function finnRiktigConfig(pathname: string, svar: SvarState, registreringType?: RegistreringType):
    string[] | null {

    const fremtidigSituasjonSvar = hentSvar(svar, SporsmalId.fremtidigSituasjon);
    let config: string[] | undefined;

    if (!registreringType || registreringType === RegistreringType.ORDINAER_REGISTRERING) {
        config = registreringConfig;
    } else if (!fremtidigSituasjonSvar && pathname === INNGANGSSPORSMAL_PATH) {
        // Har ikke så mye å si hvilken config som blir brukt siden brukeren ikke har valgt et løp enda
        config = tilbakeTilSammeJobbConfig;
    }

    if (!config) {
        switch (fremtidigSituasjonSvar) {
            case FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER:
                config = tilbakeTilSammeJobbConfig;
                break;
            case FremtidigSituasjonSvar.NY_ARBEIDSGIVER:
                config = trengerNyJobbConfig;
                break;
            case FremtidigSituasjonSvar.USIKKER:
                config = usikkerConfig;
                break;
            case FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING:
                config = tilbakeTilSammeJobbNyStillingConfig;
                break;
            case FremtidigSituasjonSvar.INGEN_PASSER:
                config = ingenPasserConfig;
                break;
            default:
                config = [];
        }
    }

    if (config.includes(pathname)) {
        return config;
    } else {
        return null;
    }

}