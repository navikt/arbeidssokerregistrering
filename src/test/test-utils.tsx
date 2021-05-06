import * as React from "react";
import * as sinon from "sinon";
import { mount, shallow } from "enzyme";
import { shallowWithIntl as shIntl } from "./intl-enzyme-test-helper.js";

import { getStore } from "../store";
import { Provider, Store } from "react-redux";
import { AppState } from "../reducer";
import { Data as RegStatusData, ActionTypes as RegStatusActionTypes } from "../ducks/registreringstatus";
import { Data as FeatureStatusData, ActionTypes as FeatureStatusActionTypes } from "../ducks/feature-toggles";
import IntlProvider from "../Intl-provider";
import { MemoryRouter } from "react-router-dom";
import * as H from "history";
import { ActionTypes as SisteStillingActionTypes, annenStilling } from "../ducks/siste-stilling";
import { ActionTypes as SvarActionTypes, SporsmalId } from "../ducks/svar";
import {
  AndreForholdSvar,
  FremtidigSituasjonSvar,
  IngenSvar,
  Svar,
  TilbakeIArbeidSvar,
  UtdanningBestattSvar,
  UtdanningGodkjentSvar,
  UtdanningSvar,
} from "../ducks/svar-utils";

export const store = getStore();

interface ElementWithStore {
  store: Store<AppState>;
}

export function shallowwithIntl(children: React.ReactElement<ElementWithStore>) {
  return shIntl(React.cloneElement(children)).dive();
}

export function shallowwithStoreAndIntl(children: React.ReactElement<ElementWithStore>, withStore?: Store<AppState>) {
  return shIntl(
    React.cloneElement(children, {
      store: withStore || store,
    })
  )
    .dive()
    .dive();
}

export function shallowWithStore(children: React.ReactElement<ElementWithStore>, withStore?: Store<AppState>) {
  return shallow(
    React.cloneElement(children, {
      store: withStore || store,
    })
  ).dive();
}

export function mountWithStore(children: React.ReactElement<ElementWithStore>, withStore?: Store<AppState>) {
  return mount(
    React.cloneElement(children, {
      store: withStore || store,
    })
  );
}

export function mountWithStoreRouterAndIntl(
  children: React.ReactElement<ElementWithStore>,
  withStore?: Store<AppState>,
  initialEntries?: H.LocationDescriptor[]
) {
  return mount(
    <Provider store={withStore || store}>
      <MemoryRouter initialEntries={initialEntries}>
        <IntlProvider>{children}</IntlProvider>
      </MemoryRouter>
    </Provider>
  );
}

export function mountWithIntl(children: React.ReactElement<ElementWithStore>) {
  return mount(<IntlProvider>{children}</IntlProvider>);
}

export function stubFetch(fetchStub: FetchStub): FetchStub {
  sinon.stub(window, "fetch").callsFake((url: string): any => getPromiseResponse(url, fetchStub));
  return fetchStub;
}

function getPromiseResponse(url: string, fetchStub: FetchStub) {
  const response = fetchStub.getResponse(url);
  const status = response.status;
  const errorResponse = Promise.resolve({ status, text: () => Promise.resolve("Skal kaste feil") });
  const okResponse = Promise.resolve({ status, ok: true, json: () => response.response });

  return status === 200 ? okResponse : errorResponse;
}

export function promiseWithSetTimeout(timeout?: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout || 0));
}

export function resetAndMakeHrefWritable() {
  return Object.defineProperty(document.location, "href", {
    writable: true,
    value: "",
  });
}

export function dispatchRegistreringstatus(data: RegStatusData, s: Store<AppState>) {
  return s.dispatch({ type: RegStatusActionTypes.HENT_REG_STATUS_OK, data });
}

export function dispatchFeaturestatus(data: FeatureStatusData, s: Store<AppState>) {
  return s.dispatch({ type: FeatureStatusActionTypes.FEATURE_TOGGLES_OK, data });
}

export class FetchStub {
  urlMap: { [url: string]: { response?: any; status: number } };
  callCount: { [url: string]: number };
  constructor() {
    this.urlMap = {};
    this.callCount = {};
  }
  addResponse(url: string, response: any) {
    this.urlMap[url] = { response, status: 200 };
    this.callCount[url] = 0;
    return this;
  }
  addErrorResponse(url: string, status: number, response?: any) {
    if (status < 400) {
      throw new Error("Status should be >= 400");
    }
    this.urlMap[url] = { status, response };
    this.callCount[url] = 0;
    return this;
  }

  getResponse(url: string) {
    const keys = Object.keys(this.urlMap);
    const length = keys.length;
    const responseKey = length === 1 ? keys[0] : keys.find((s) => url.includes(s));
    if (responseKey) {
      this.callCount[responseKey] += 1;
    }
    return (responseKey && this.urlMap[responseKey]) || { response: {}, status: 200 };
  }

  getCallcount(url: string) {
    const keys = Object.keys(this.callCount);
    const length = keys.length;
    const responseKey = length === 1 ? keys[0] : keys.find((s) => url.includes(s));
    return (responseKey && this.callCount[responseKey]) || 0;
  }
}

export function withResponse(response: unknown) {
  return new FetchStub().addResponse("_", response);
}

export function withError(status: number) {
  return new FetchStub().addErrorResponse("_", status);
}

export function dispatchAlleSporsmal(appStore: Store<AppState>) {
  appStore.dispatch({
    type: SisteStillingActionTypes.ENDRE_SISTE_STILLING,
    data: { stilling: annenStilling },
  });

  [
    SporsmalId.dinSituasjon,
    SporsmalId.sisteStilling,
    SporsmalId.utdanning,
    SporsmalId.utdanningGodkjent,
    SporsmalId.utdanningBestatt,
    SporsmalId.helseHinder,
    SporsmalId.andreForhold,
  ].forEach((sporsmalId) =>
    appStore.dispatch({
      type: SvarActionTypes.AVGI_SVAR,
      data: {
        sporsmalId,
        svar: IngenSvar.INGEN_SVAR,
      },
    })
  );
}

export function dispatchNoenSporsmal(appStore: Store<AppState>) {
  appStore.dispatch({
    type: SisteStillingActionTypes.ENDRE_SISTE_STILLING,
    data: { stilling: annenStilling },
  });

  [
    SporsmalId.utdanning,
    SporsmalId.utdanningGodkjent,
    SporsmalId.utdanningBestatt,
    SporsmalId.helseHinder,
    SporsmalId.andreForhold,
  ].forEach((sporsmalId) =>
    appStore.dispatch({
      type: SvarActionTypes.AVGI_SVAR,
      data: {
        sporsmalId,
        svar: IngenSvar.INGEN_SVAR,
      },
    })
  );
}

export const ForventetSvarHvisIngenUtdanning = [
  {
    sporsmalId: SporsmalId.utdanning,
    svar: UtdanningSvar.INGEN_UTDANNING,
  },
  {
    sporsmalId: SporsmalId.utdanningGodkjent,
    svar: UtdanningGodkjentSvar.INGEN_SVAR,
  },
  {
    sporsmalId: SporsmalId.utdanningBestatt,
    svar: UtdanningBestattSvar.INGEN_SVAR,
  },
];

export function dispatchSykmeldtUsikkerIngenUtdanningAndreforholdSporsmal(appStore: Store<AppState>) {
  const sporsmalene: {
    sporsmalId: SporsmalId;
    svar: Svar;
  }[] = [];

  sporsmalene
    .concat([
      {
        sporsmalId: SporsmalId.fremtidigSituasjon,
        svar: FremtidigSituasjonSvar.USIKKER,
      },
    ])
    .concat(ForventetSvarHvisIngenUtdanning)
    .concat([
      {
        sporsmalId: SporsmalId.andreForhold,
        svar: AndreForholdSvar.JA,
      },
    ])
    .forEach((obj) =>
      appStore.dispatch({
        type: SvarActionTypes.AVGI_SVAR,
        data: {
          sporsmalId: obj.sporsmalId,
          svar: obj.svar,
        },
      })
    );
}

export function dispatchSykmeldtJegSkaltilbakeTilJobbenJegHarFullStilling(appStore: Store<AppState>) {
  const sporsmalene: {
    sporsmalId: SporsmalId;
    svar: Svar;
  }[] = [];

  sporsmalene
    .concat([
      {
        sporsmalId: SporsmalId.fremtidigSituasjon,
        svar: FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER,
      },
    ])
    .concat([
      {
        sporsmalId: SporsmalId.tilbakeIArbeid,
        svar: TilbakeIArbeidSvar.JA_FULL_STILLING,
      },
    ])
    .forEach((obj) =>
      appStore.dispatch({
        type: SvarActionTypes.AVGI_SVAR,
        data: {
          sporsmalId: obj.sporsmalId,
          svar: obj.svar,
        },
      })
    );
}
