import * as React from 'react';
import { hentBrukerFnr, hentVeilederEnhetId } from '../utils/utils';
import { FeilmeldingManglerEnhetId, FeilmeldingManglerFnr } from '../feilmeldinger';

class ManglerKontekst extends React.Component {
    render() {
        const harIkkeFnr = hentBrukerFnr() === null;
        const harIkkeEnhetId = hentVeilederEnhetId() === null;

        return (
            <>
                {harIkkeFnr &&  <FeilmeldingManglerFnr/>}
                {harIkkeEnhetId &&  <FeilmeldingManglerEnhetId/>}
            </>
        );
    }
}

export default ManglerKontekst;
