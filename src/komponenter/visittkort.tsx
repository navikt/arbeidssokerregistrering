import * as React from 'react';
import NAVSPA from '../utils/NAVSPA';
import { hentBrukerFnr, hentVeilederEnhetId } from '../utils/utils';

interface VisittkortSpaProps {
    enhet?: string;
    fnr: string;
}

const VisittkortSpa: React.ComponentType<VisittkortSpaProps> =
    NAVSPA.importer<VisittkortSpaProps>('veilarbvisittkortfs');

const Visittkort: React.SFC = () => {
    const fnr = hentBrukerFnr();
    const enhetId = hentVeilederEnhetId();
    return <VisittkortSpa fnr={fnr ? fnr : ''} enhet={enhetId ? enhetId : ''}/>;
};

export default Visittkort;
