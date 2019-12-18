import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { DP_SOK_URL } from '../../utils/konstanter'
import utropstegnSvg from './utropstegn.svg';
import './nyttaar.less';

class NyttAar extends React.Component {
    render() {
        return (
            <div className="nyttaar">
                <div className="nyttaar__info">
                    <img
                        src={ utropstegnSvg }
                        alt="Informasjon"
                        className="nyttaar__info--illustrasjon"
                    />
                    <Normaltekst className="nyttaar__info--tekst">
                        Du kan ikke registrere deg som arbeidssøker nå fordi vi oppdaterer tjenesten.<br/><br/>
                        Tjenesten åpnes igjen mandag 30. desember.<br/><br/>
                        Du kan fortsatt søke om <a href={DP_SOK_URL}>dagpenger</a>, selv om du ikke kan registrere deg som arbeidssøker.<br/><br/>
                        Vi beklager ulempene.
                    </Normaltekst>
                </div>
            </div>
        );
    }
}

export default NyttAar;