
export const STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    PENDING: 'PENDING',
    OK: 'OK',
    RELOADING: 'RELOADING',
    ERROR: 'ERROR'
};

class FetchError extends Error {
    public response: Response;

    constructor(message: string, response: Response) {
        super(message);
        this.response = response;
    }
}

export function sjekkStatuskode(response: any) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
        return response;
    }
    if (response.status === 401) {
        window.location.href = 'feilsider/401.html';// eslint-disable-line no-undef
    }
    return Promise.reject(new FetchError(response.statusText, response));
}

export function toJson(response: any) {
    if (response.status !== 204) { // No content
        return response.json();
    }
    return response;
}

export function sendResultatTilDispatch(dispatch: any, action: any) {
    return (...data: any[]) => {
        if (data.length === 1) {
            return dispatch({ type: action, data: data[0] });
        }
        return dispatch({ type: action, data });
    };
}

export function handterFeil(dispatch: any, action: any) {
    return (error: any) => {
        if (error.response) {
            error.response.text().then((data: any) => {
                console.error(error, error.stack, data); // tslint:disable-line no-console
                dispatch({ type: action, data: { response: error.response, data } });
            });
        } else {
            console.error(error, error.stack); // tslint:disable-line no-console
            dispatch({ type: action, data: error.toString() });
        }
    };
}

export function fetchToJson<ResponseInterface>(url: string, config: RequestInit = {}): Promise<ResponseInterface> {
    return fetch(url, config)
        .then(sjekkStatuskode)
        .then(toJson);
}

export function doThenDispatch(fn: any, { OK, FEILET, PENDING }: any) {
    return (dispatch: any, getState?: any) => {
        if (PENDING) {
            dispatch({ type: PENDING });
        }
        return fn(dispatch, getState)
            .then(sendResultatTilDispatch(dispatch, OK))
            .catch(handterFeil(dispatch, FEILET));
    };
}
