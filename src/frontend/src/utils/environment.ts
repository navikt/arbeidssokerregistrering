const VEILARBOPPFOLGINGPROXY_URL = 'veilarboppfolgingproxy_url';

function getEnviromentVariable(variableName: string) {
    if (window.name === 'nodejs') {
        return variableName; // Kjører i test
    }

    const value = (window as {}).arbeidssokerregistrering[variableName];

    if (!value) {
        throw new Error(`Mangler: ${variableName}`);
    }

    return variableName;
}

export const VEILARBOPPFOLGINGPROXY_BASE_URL = getEnviromentVariable(VEILARBOPPFOLGINGPROXY_URL);