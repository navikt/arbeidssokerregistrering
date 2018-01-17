import * as React from 'react';
import * as sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { shallowWithIntl } from 'enzyme-react-intl';
import getStore from '../store';
import { Store } from 'react-redux';
import { AppState } from '../reducer';

export const store = getStore();

interface ElementWithStore {
    store: Store<AppState>;
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

export function stubFetchWithResponse(response: {}): Promise<{}> {
    return sinon.stub(global, 'fetch').callsFake(() =>
        Promise.resolve({status: 200, ok: true, json: () => (response)}));
}

export function stubFetchWithErrorResponse() {
    return sinon.stub(global, 'fetch').callsFake(() =>
        Promise.resolve({status: 500, text: () => Promise.resolve('Skal kaste feil')}));
}

export function promiseWithSetTimeout() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

export function makeHrefWritable() {
    return Object.defineProperty(document.location, 'href', {
        writable: true,
    });
}