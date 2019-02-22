import * as React from 'react';
import { hentBrukerFnr, hentVeilederEnhetId } from '../utils/utils';
import { FeilmeldingManglerEnhetId, FeilmeldingManglerFnr } from '../feilmeldinger';

class ManglerKontekst extends React.Component {
    render() {
        const harIkkeFnr = hentBrukerFnr() === undefined ;
        const harIkkeEnhetId = hentVeilederEnhetId() === undefined;

        return (
            <>
                {harIkkeFnr &&  <FeilmeldingManglerFnr/>}
                {harIkkeEnhetId &&  <FeilmeldingManglerEnhetId/>}
            </>
        );
    }
}

export default ManglerKontekst;
