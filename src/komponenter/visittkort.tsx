import * as React from 'react';
import NAVSPA from '../utils/NAVSPA';
import { hentBrukerFnr, hentVeilederEnhetId } from '../utils/fss-utils';

interface VisittkortSpaProps {
    enhet?: string;
    fnr: string;
    tilbakeTilFlate: string;
}

const VisittkortSpa: React.ComponentType<VisittkortSpaProps> =
    NAVSPA.importer<VisittkortSpaProps>('veilarbvisittkortfs');

const Visittkort: React.SFC = () => {
    const fnr = hentBrukerFnr();
    const enhetId = hentVeilederEnhetId();
    return <VisittkortSpa fnr={fnr ? fnr : ''} enhet={enhetId ? enhetId : ''} tilbakeTilFlate="veilarbpersonflatefs"/>;
};

export default Visittkort;
