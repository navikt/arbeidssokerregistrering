import * as React from 'react';
import NAVSPA from '../utils/NAVSPA';
import { erIFSS, hentBrukerFnr, hentVeilederEnhetId } from '../utils/utils';

interface VisittkortSpaProps {
    enhet?: string;
    fnr: string;
}

const VisittkortSpa: React.ComponentType<VisittkortSpaProps> =
    NAVSPA.importer<VisittkortSpaProps>('veilarbvisittkortfs');

const Visitkort: React.SFC = () => {
    const fnr = hentBrukerFnr();
    const enhetId = hentVeilederEnhetId();
    return erIFSS() ? <VisittkortSpa fnr={fnr ? fnr : ''} enhet={enhetId ? enhetId : ''}/> : null;
};

export default Visitkort;
