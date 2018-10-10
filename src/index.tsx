import 'babel-polyfill';
import './polyfills/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

import './index.less';

if (process.env.REACT_APP_MOCK === 'true') {
    console.log('=========================='); /*tslint:disable-line:no-console*/
    console.log('======== MED MOCK ========'); /*tslint:disable-line:no-console*/
    console.log('=========================='); /*tslint:disable-line:no-console*/

    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://static.hotjar.com/c/hotjar-1045017.js?sv=6';
    document.body.appendChild(s);

    require('./mocks/mocks');
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
