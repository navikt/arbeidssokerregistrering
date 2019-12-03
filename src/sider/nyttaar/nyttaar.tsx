import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import utropstegnSvg from './utropstegn.svg';
import './nyttaar.less';

class NyttAar extends React.Component {
    render() {
        return (
            <div className="nyttaar">
                <div className="nyttaar__info">
                    <img
                        src={utropstegnSvg}
                        alt="Informasjon"
                        className="nyttaar__info--illustrasjon"
                    />
                    <Normaltekst className="nyttaar__info--tekst">
                        Du kan ikke registrere deg nå fordi vi oppdaterer tjenesten.<br/><br/>
                        Prøv igjen <strong>30. desember</strong> 2019. <br/><br/>
                        Vi beklager ulempene.
                    </Normaltekst>
                </div>
            </div>
        );
    }
}

export default NyttAar;