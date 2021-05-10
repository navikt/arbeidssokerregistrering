import * as React from "react";
import { addLocaleData, IntlProvider as Provider } from "react-intl";
import * as nb from "react-intl/locale-data/nb";
import tekster from "./tekster/bundle";
import { hentQueryParameter } from "./utils/url-utils";

addLocaleData(nb);

interface TeksterTilMappingType {
  [propName: string]: string;
}
function mapTeksterTilNokler(teksterTilMapping: TeksterTilMappingType) {
  return Object.keys(teksterTilMapping)
    .map((key) => ({ key, value: `[${key}]` }))
    .reduce((previous: TeksterTilMappingType, current) => {
      previous[current.key] = current.value;
      return previous;
    }, {});
}

function skalViseTekstnokler(): boolean {
  const vistekster = hentQueryParameter(window.location, "vistekster");
  return !!vistekster;
}

class IntlProvider extends React.Component {
  render() {
    const { children, ...props } = this.props;
    const locale = "nb";

    const teksterEllerNokler = skalViseTekstnokler() ? mapTeksterTilNokler(tekster.nb) : tekster.nb;

    return (
      <Provider {...props} locale={locale} messages={teksterEllerNokler || []}>
        {children}
      </Provider>
    );
  }
}

export default IntlProvider;
