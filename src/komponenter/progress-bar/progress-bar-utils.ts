import {
    FULLFOR_PATH,
    SKJEMA_PATH,
    OPPSUMMERING_PATH,
    DU_ER_NA_REGISTRERT_PATH,
    SKJEMA_SYKEFRAVAER_PATH, INNGANGSSPORSMAL_PATH, INFOSIDE_PATH
} from '../../utils/konstanter';

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
    OPPSUMMERING_PATH
];

const trengerNyJobbConfig: string[] = [
    INNGANGSSPORSMAL_PATH,
    `${SKJEMA_SYKEFRAVAER_PATH}/2/0`,
    `${SKJEMA_SYKEFRAVAER_PATH}/2/1`,
    `${SKJEMA_SYKEFRAVAER_PATH}/2/2`,
    `${SKJEMA_SYKEFRAVAER_PATH}/2/4`,
    OPPSUMMERING_PATH
];

const usikkerConfig: string[] = [
    INNGANGSSPORSMAL_PATH,
    `${SKJEMA_SYKEFRAVAER_PATH}/3/0`,
    `${SKJEMA_SYKEFRAVAER_PATH}/3/1`,
    `${SKJEMA_SYKEFRAVAER_PATH}/3/2`,
    `${SKJEMA_SYKEFRAVAER_PATH}/3/4`,
    OPPSUMMERING_PATH
];

const ingenPasserConfig: string[] = [
    INNGANGSSPORSMAL_PATH,
    OPPSUMMERING_PATH
];

export function finnRiktigConfig(pathName: string): string[] {

    if (registreringConfig.includes(pathName)) {
        return registreringConfig;
    }

    if (tilbakeTilSammeJobbConfig.includes(pathName)) {
        return tilbakeTilSammeJobbConfig;
    }

    if (trengerNyJobbConfig.includes(pathName)) {
        return trengerNyJobbConfig;
    }

    if (usikkerConfig.includes(pathName)) {
        return usikkerConfig;
    }

    if (ingenPasserConfig.includes(pathName)) {
        return ingenPasserConfig;
    }

    return [];
}