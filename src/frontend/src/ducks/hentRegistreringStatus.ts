export const HENT_REGISTRERING_STATUS = 'HENT_REGISTRERING_STATUS';

export function hentRegistreringStatus(fnr: string) {
    return {
        type: HENT_REGISTRERING_STATUS,
        data: {
            fnr,
        }
    };
}
