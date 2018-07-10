import {
    DUERNAREGISTRERT_PATH,
    FULLFOR_PATH,
    OPPSUMMERING_PATH, 
    SKJEMA_PATH,
    START_PATH
} from '../../utils/konstanter';

export const paths = [
    START_PATH,
    SKJEMA_PATH,
    OPPSUMMERING_PATH,
    FULLFOR_PATH,
    DUERNAREGISTRERT_PATH
];

export function skalAnimereForover(currentPathname: string, nextPathname: string): boolean {
    const currentTrimmedPath = trimPath(currentPathname);
    const nextTrimmedPath = trimPath(nextPathname);

    if (currentTrimmedPath === SKJEMA_PATH && nextTrimmedPath === SKJEMA_PATH) {
        return nesteSporsmalIdErStorreEnnNavaerende(currentPathname, nextPathname);
    } else {
        return paths.indexOf(currentTrimmedPath) < paths.indexOf(nextTrimmedPath);
    }
}

export function nesteSporsmalIdErStorreEnnNavaerende(currentPathname: string, nextPathname: string): boolean {
    return getIdFromPath(currentPathname) < getIdFromPath(nextPathname);
}

export function trimPath(path: string): string {
    if (path.startsWith(SKJEMA_PATH)) {
        return SKJEMA_PATH;
    } else {
        return path;
    }
}

export function getIdFromPath(path: string): number {
    return Number(path.split('/')[2]);
}