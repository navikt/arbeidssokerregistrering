const VEILARBOPPFOLGINGPROXY_URL = 'veilarboppfolgingproxy_url';

function getEnviromentVariable(variableName: string) {
    const value = (window as {}).arbeidssokerregistrering[variableName];

    if (!value) {
        throw new Error(`Mangler: ${variableName}`);
    }

    return value;
}

export const VEILARBOPPFOLGINGPROXY_BASE_URL = getEnviromentVariable(VEILARBOPPFOLGINGPROXY_URL);