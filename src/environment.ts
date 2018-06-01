export function getEndpointVariable() {
    return (window as any).FEATURE_ENDPOINT_URL; // tslint:disable-line no-any
}

export const FEATURE_BASE_URL = getEndpointVariable();