import { AKTIVITETSPLAN_URL } from './konstanter';
import { hentBrukerFnr, hentVeilederEnhetId } from './fss-utils';

export const lagAktivitetsplanUrl = (fnr?: string) => {
    return `${AKTIVITETSPLAN_URL}/${fnr ? fnr : hentBrukerFnr()}?enhet=${hentVeilederEnhetId()}`;
};

export const lagDetaljeVisningUrl = () => {
    return lagAktivitetsplanUrl() + '&visRegistreringDetaljer=true';
};
