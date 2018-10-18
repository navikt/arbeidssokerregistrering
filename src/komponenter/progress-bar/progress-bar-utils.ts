import {
    FULLFOR_PATH,
    SKJEMA_PATH,
    OPPSUMMERING_PATH,
    DUERNAREGISTRERT_PATH,
    SKJEMA_SYKEFRAVAER_PATH, INNGANGSSPORSMAL
} from '../../utils/konstanter';

const etterSporsmalConfig: string[] = [
    OPPSUMMERING_PATH,
    FULLFOR_PATH,
    DUERNAREGISTRERT_PATH
];

const registreringConfig: string[] = [
    `${SKJEMA_PATH}/0`,
    `${SKJEMA_PATH}/1`,
    `${SKJEMA_PATH}/2`,
    `${SKJEMA_PATH}/3`,
    `${SKJEMA_PATH}/4`,
    `${SKJEMA_PATH}/5`,
    `${SKJEMA_PATH}/6`,
    ...etterSporsmalConfig
];

const nyArbeidsgiverConfig: string[] = lagConfigForSykefravaerLop(1, 5);

const sammeArbeidsgiverConfig: string[] = lagConfigForSykefravaerLop(2, 5);

const usikkerConfig: string[] = lagConfigForSykefravaerLop(3, 5);

const ingenPasserConfig: string[] = lagConfigForSykefravaerLop(4, 5);

function lagConfigForSykefravaerLop(lop: number, sporsmal: number): string[] {
    const config: string[] = [];

    config.push(INNGANGSSPORSMAL);

    for (let i = 0; i <= sporsmal; i++) {
        config.push(`${SKJEMA_SYKEFRAVAER_PATH}/${lop}/${i}`);
    }

    config.push(...etterSporsmalConfig);

    return config;
}

export function finnRiktigConfig(pathName: string): string[] {

    if (registreringConfig.includes(pathName)) {
        return registreringConfig;
    }

    if (nyArbeidsgiverConfig.includes(pathName)) {
        return nyArbeidsgiverConfig;
    }

    if (sammeArbeidsgiverConfig.includes(pathName)) {
        return sammeArbeidsgiverConfig;
    }

    if (usikkerConfig.includes(pathName)) {
        return usikkerConfig;
    }

    if (ingenPasserConfig.includes(pathName)) {
        return ingenPasserConfig;
    }

    return [];
}