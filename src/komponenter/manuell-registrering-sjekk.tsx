import * as React from 'react';
import { erIFSS, hentBrukerFnr } from '../utils/utils';
import ManglerKontekst from '../sider/mangler-kontekst';

class ManuellRegistreringSjekk extends React.Component {

    manglerKontekst = (): boolean => {
        const harIkkeFnr = hentBrukerFnr() === null;
        return erIFSS() && harIkkeFnr;
    }

    render() {

        if (this.manglerKontekst()) {
            return <ManglerKontekst/>;
        }

        return this.props.children;
    }
}

export default ManuellRegistreringSjekk;
