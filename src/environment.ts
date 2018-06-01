export function getEndpointVariable() {
    const variabler = (window as any).arbeidssokerregistrering; // tslint:disable-line no-any
    return (variabler) ? variabler.FEATURE_ENDPOINT_URL : 'no-url';
}

export const FEATURE_BASE_URL = getEndpointVariable();