import { hentBrukerFnr, hentVeilederEnhetId } from "./fss-utils";
import RetryInterval from "./retry-interval";
import { ApplicationProps, EnhetDisplay, FnrDisplay } from "./decorator-domain";
import { lagAktivitetsplanUrl } from "./url-utils";

function createConfig(): ApplicationProps {
  return {
    appname: "Arbeidsrettet oppfølging",
    toggles: {
      visVeileder: true,
    },
    fnr: {
      display: FnrDisplay.SOKEFELT,
      initialValue: hentBrukerFnr(),
      ignoreWsEvents: true,
      onChange(value: string | null) {
        if (value !== null && hentBrukerFnr() !== value) {
          window.location.href = lagAktivitetsplanUrl(value);
        }
      },
    },
    enhet: {
      display: EnhetDisplay.ENHET,
      initialValue: hentVeilederEnhetId(),
      ignoreWsEvents: true,
    },
    useProxy: true,
  };
}

export const initToppmeny = (): void => {
  new RetryInterval((retryInterval: RetryInterval) => {
    const NAVSPA = (window as any).NAVSPA ?? {};
    if (NAVSPA.internarbeidsflatefs) {
      const element = document.getElementById("header");
      NAVSPA.internarbeidsflatefs(element, createConfig());
      retryInterval.stop();
    } else {
      retryInterval.decreaseRetry();
    }
  }).start();
};
