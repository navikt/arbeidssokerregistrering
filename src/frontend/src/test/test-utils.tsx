import * as React from 'react';
import * as sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { shallowWithIntl } from 'enzyme-react-intl';
import getStore from '../store';
import { Provider, Store } from 'react-redux';
import { AppState } from '../reducer';
import { Data as RegStatusData, ActionTypes as RegStatusActionTypes } from '../ducks/registreringstatus';
import IntlProvider from '../Intl-provider';
import { configIkkeSelvgaende, erIkkeSelvgaende } from '../sider/skjema/skjema-utils';

export const store = getStore();

interface ElementWithStore {
    store: Store<AppState>;
}

export function shallowwithIntl(children: React.ReactElement<ElementWithStore>) {
    return shallowWithIntl(React.cloneElement(children)).dive();
}

export function shallowwithStoreAndIntl(children: React.ReactElement<ElementWithStore>) {
    return shallowWithIntl(React.cloneElement(children, {
        store
    })).dive().dive();
}

export function shallowwithStore(children: React.ReactElement<ElementWithStore>) {
    return shallow(React.cloneElement(children, {
        store
    })).dive();
}

export function mountWithStore(children: React.ReactElement<ElementWithStore>) {
    return mount(React.cloneElement(children, {
        store
    }));
}

export function mountWithStoreAndIntl(children: React.ReactElement<ElementWithStore>, withStore?: Store<AppState>) {
    return mount(
        <Provider store={withStore || store}>
            <IntlProvider >
                {children}
            </IntlProvider>
        </Provider>
    );
}

export function mountWithIntl(children: React.ReactElement<ElementWithStore>) {
    return mount(
        <IntlProvider >
            {children}
        </IntlProvider>
    );
}

export function stubFetch(fetchStub: FetchStub): Promise<{}> {
    return sinon.stub(global, 'fetch').callsFake((url: string) => getPromiseResponse(url, fetchStub));
}

function getPromiseResponse(url: string, fetchStub: FetchStub) {
    const response = fetchStub.getResponse(url);
    const status = response.status;
    const errorResponse = Promise.resolve({status, text: () => Promise.resolve('Skal kaste feil')});
    const okResponse = Promise.resolve({status, ok: true, json: () => (response.response)});

    return status === 200 ? okResponse : errorResponse;
}

export function promiseWithSetTimeout() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

export function resetAndMakeHrefWritable() {
    return Object.defineProperty(document.location, 'href', {
        writable: true,
        value: ''
    });
}

export function dispatchRegistreringstatus(data: RegStatusData) {
    return store.dispatch({type: RegStatusActionTypes.HENT_REG_STATUS_OK, data});
}

export function withResponse(response: {}) {
    return new FetchStub().addResponse('_', response);
}

export function withError(status: number) {
    return new FetchStub().addErrorResponse('_', status);
}

export class FetchStub {
    urlMap: { [url: string]: {response?: {}, status: number}};
    callCount: { [url: string]: number };
    constructor() {
        this.urlMap = {};
        this.callCount = {};
    }
    addResponse(url: string, response: {}) {
        this.urlMap[url] = {response, status: 200};
        this.callCount[url] = 0;
        return this;
    }
    addErrorResponse(url: string, status: number) {
        if  (status < 400) {
            throw new Error('Status should be >= 400');
        }
        this.urlMap[url] = { status };
        this.callCount[url] = 0;
        return this;
    }

    getResponse(url: string) {
        const keys = Object.keys(this.urlMap);
        const length = keys.length;
        const responseKey = length === 1 ? keys[0] : keys.find(s => url.includes(s));
        if (responseKey) {
            this.callCount[responseKey] += 1;
        }
        return (responseKey && this.urlMap[responseKey]) || ({ response: {}, status: 200});
    }

    getCallcount(url: string) {
        const keys = Object.keys(this.callCount);
        const length = keys.length;
        const responseKey = length === 1 ? keys[0] : keys.find(s => url.includes(s));
        return (responseKey && this.callCount[responseKey]) || 0;
    }
}

export function finnAlternativSomGirSelvgaende(spmId: string): string {
    const svarSomGirIkkeSelvgaende = configIkkeSelvgaende[spmId];

    for (let i = 1; i <= svarSomGirIkkeSelvgaende.length + 2; i++ ) {
        if (!erIkkeSelvgaende(i.toString(), svarSomGirIkkeSelvgaende)) {
            return i.toString();
        }
    }
    return '';
}