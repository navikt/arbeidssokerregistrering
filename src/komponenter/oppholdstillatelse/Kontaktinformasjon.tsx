import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';

import { Undertittel, EtikettLiten } from 'nav-frontend-typografi';

import './kontaktinformasjon.less';

interface Props {
    telefonnummer: string | undefined;
    kilde: string;
}

class Kontaktinformasjon extends React.Component<Props> {
    render() {
        const { telefonnummer, kilde } = this.props;
        return (
            <Panel border className="kontaktinfo-kort">
                <Undertittel>{`Telefonnummer lagret hos ${kilde}`}</Undertittel>
                <Undertittel>{telefonnummer}</Undertittel>
                <EtikettLiten>{`kilde: ${kilde}`}</EtikettLiten>
            </Panel>
        )
    }
}

export default Kontaktinformasjon;
