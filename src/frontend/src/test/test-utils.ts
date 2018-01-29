import * as React from 'react';
import * as sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { shallowWithIntl, mountWithIntl } from 'enzyme-react-intl';
import getStore from '../store';
import { Store } from 'react-redux';
import { AppState } from '../reducer';
import { Data as RegStatusData, ActionTypes as RegStatusActionTypes } from '../ducks/registreringstatus';
import { Data as KrrData, ActionTypes as KrrActionTypes } from '../ducks/krr';

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

export function mountWithStoreAndIntl(children: React.ReactElement<ElementWithStore>) {
    return mountWithIntl(React.cloneElement(children, {
        store
    }));
}

export function mountWithIntl(children: React.ReactElement<ElementWithStore>, paramStore?: ElementWithStore) {
    return mountWithIntl(React.cloneElement(children, paramStore));
}

export function stubFetch(fetchStub: FetchStub): Promise<{}> {
    return sinon.stub(global, 'fetch').callsFake((url: string) => getPromiseResponse(url, fetchStub));
}

function getPromiseResponse(url: string, fetchStub: FetchStub) {
    const status = fetchStub.getResponse(url).status;
    const errorResponse = Promise.resolve({status, text: () => Promise.resolve('Skal kaste feil')});
    const okResponse = Promise.resolve({status, ok: true, json: () => (fetchStub.getResponse(url).response)});

    return status === 200 ? okResponse : errorResponse;
}

export function promiseWithSetTimeout() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

export function makeHrefWritable() {
    return Object.defineProperty(document.location, 'href', {
        writable: true,
    });
}

export function dispatchRegistreringstatus(data: RegStatusData) {
    return store.dispatch({type: RegStatusActionTypes.HENT_REG_STATUS_OK, data});
}

export function dispatchKrrStatus(data: KrrData) {
    return store.dispatch({type: KrrActionTypes.HENT_KRR_STATUS_OK, data});
}

export function withResponse(response: {}) {
    return new FetchStub().addResponse('_', response);
}

export function withError(status: number) {
    return new FetchStub().addErrorResponse('_', status);
}

export class FetchStub {
    urlMap: { [url: string]: {response?: {}, status: number}};
    constructor() {
        this.urlMap = {};
    }
    addResponse(url: string, response: {}) {
        this.urlMap[url] = {response, status: 200};
        return this;
    }
    addErrorResponse(url: string, status: number) {
        if  (status < 400) {
            throw new Error('Status should be >= 400');
        }
        this.urlMap[url] = { status };
        return this;
    }

    getResponse(url: string) {
        const keys = Object.keys(this.urlMap);
        const length = keys.length;
        const responseKey = length === 1 ? keys[0] : keys.find(s => url.includes(s));
        const response = (responseKey && this.urlMap[responseKey]) || ({ response: {}, status: 200});
        return response;
    }
}