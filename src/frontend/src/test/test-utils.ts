import * as React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';
import getStore from '../store';

export const store = getStore();

export function shallowwithStoreAndIntl(children: React.ReactNode) {
    return shallowWithIntl(React.cloneElement(children, {
        store
    }));
}