import * as React from 'react';
import { hentBrukerFnr, hentVeilederEnhetId } from '../utils/utils';

class ManglerKontekst extends React.Component {
    render() {
        const harIkkeFnr = hentBrukerFnr() === null;
        const harIkkeEnhetId = hentVeilederEnhetId() === null;

        return (
            <>
                {harIkkeFnr &&  <h3>Du har ingen bruker i kontekst</h3>}
                {harIkkeEnhetId &&  <h3>Du har ikke enhet i kontekst</h3>}
            </>
        );
    }
}

export default ManglerKontekst;
