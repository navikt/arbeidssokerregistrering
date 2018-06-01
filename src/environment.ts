export function getEndpointVariable() {
    return (window as any).arbeidssokerregistrering.FEATURE_ENDPOINT_URL; // tslint:disable-line no-any
}

export const FEATURE_BASE_URL = getEndpointVariable();