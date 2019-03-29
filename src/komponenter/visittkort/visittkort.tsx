import * as React from 'react';
import NAVSPA from '../../utils/NAVSPA';
import { hentBrukerFnr, hentVeilederEnhetId } from '../../utils/fss-utils';
import './visittkort.less';

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
    return (
        <div className="visittkortfs-wrapper">
            <VisittkortSpa fnr={fnr ? fnr : ''} enhet={enhetId ? enhetId : ''} tilbakeTilFlate="veilarbpersonflatefs"/>
        </div>
    );
};

export default Visittkort;
