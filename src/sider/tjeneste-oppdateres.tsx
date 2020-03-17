import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import utropstegnSvg from './fullfor/utropstegn.svg';
import './tjeneste-oppdateres.less';

class TjenesteOppdateres extends React.Component {
    render() {
        return (
            <div className="tjeneste-oppdateres">
                <div className="tjeneste-oppdateres__info">
                    <img
                        src={utropstegnSvg}
                        alt="Informasjon"
                        className="tjeneste-oppdateres__info--illustrasjon"
                    />
                    <Normaltekst className="tjeneste-oppdateres__info--tekst">
                        Registrering er utilgjengelig grunnet teknisk vedlikehold. Vi ber deg prøve igjen om en time.
                    </Normaltekst>
                </div>
            </div>
        );
    }
}

export default TjenesteOppdateres;