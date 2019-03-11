import { AKTIVITETSPLAN_URL } from './konstanter';
import { hentBrukerFnr, hentVeilederEnhetId } from './fss-utils';

export const lagAktivitetsplanUrl = () => {
    return `${AKTIVITETSPLAN_URL}/${hentBrukerFnr()}?enhet=${hentVeilederEnhetId()}`;
};

export const lagDetaljeVisningUrl = () => {
    return lagAktivitetsplanUrl() + '&visRegistreringDetaljer=true';
};
