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

    /* ************************************************************************************** */
    /* Hotjar script som bruke i herokuapp for brukertesting */
    /* Dataen er tilgjengelig under organisasjon navlab.no i NAV hotjar */
    const s = document.createElement('script');
    const code = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n" +
        "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n" +
        "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n" +
        "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n" +
        "})(window,document,'script','dataLayer','GTM-T5HQ63');\n";
    s.async = true;
    s.appendChild(document.createTextNode(code));
    document.body.appendChild(s);
    /* ************************************************************************************** */

    require('./mocks/mocks');
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
