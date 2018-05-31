import { FULLFOR_PATH, SKJEMA_PATH, basename, OPPSUMMERING_PATH } from '../../utils/konstanter';

export const progressBarConfig: string[] = [
    `${SKJEMA_PATH}/0`,
    `${SKJEMA_PATH}/1`,
    `${SKJEMA_PATH}/2`,
    `${SKJEMA_PATH}/3`,
    `${SKJEMA_PATH}/4`,
    `${SKJEMA_PATH}/5`,
    OPPSUMMERING_PATH,
    FULLFOR_PATH,
].map(path => `${basename}${path}`);