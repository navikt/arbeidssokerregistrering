import * as React from "react";
import * as ReactDOM from "react-dom";
import "idempotent-babel-polyfill";
import "react-app-polyfill/ie11";
import Modal from "react-modal";
import * as Sentry from "@sentry/react";
import moment from "moment";
import "moment/locale/nb";
import { erIFSS } from "./utils/fss-utils";
import { erProduksjon } from "./utils/url-utils";
import App from "./app";
import AppFss from "./app-fss";
import "./index.less";

moment.locale("nb");

Modal.setAppElement("#root");

if (process.env.REACT_APP_MOCK) {
  console.log("==========================");
  console.log("======== MED MOCK ========");
  console.log("==========================");

  /* ************************************************************************************** */
  /* Hotjar script som bruke i herokuapp for brukertesting */
  /* Dataen er tilgjengelig under organisasjon navlab.no i NAV hotjar */
  const s = document.createElement("script");
  const code =
    "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n" +
    "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n" +
    "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n" +
    "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n" +
    "})(window,document,'script','dataLayer','GTM-T5HQ63');\n";
  s.async = true;
  s.appendChild(document.createTextNode(code));
  document.body.appendChild(s);
  /* ************************************************************************************** */

  require("./mocks/mocks");
}

if (erProduksjon()) {
  if (false) {
    Sentry.init({
      dsn: "https://52908dd3ce2a4fde8bd57bc1cd03651c@sentry.gc.nav.no/66",
      environment: erProduksjon() ? "production" : "test",
    });
  }
}

ReactDOM.render(erIFSS() ? <AppFss /> : <App />, document.getElementById("root") as HTMLElement);
