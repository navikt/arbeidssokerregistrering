import 'babel-polyfill';
import './polyfills/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

import './index.less';

console.log('process.env', process.env); // tslint:disable-line

if (process.env.REACT_APP_MOCK === 'true') {
    console.log('=========================='); /*tslint:disable-line:no-console*/
    console.log('======== MED MOCK ========'); /*tslint:disable-line:no-console*/
    console.log('=========================='); /*tslint:disable-line:no-console*/
    require('./mocks/mocks');
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
