import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { FormattedMessage } from 'react-intl';

const utropstegnSvg = require('../fullfor/utropstegn.svg');

class InfoForIkkeArbeidssokerUtenOppfolging extends React.Component {

    render() {
        return (
            <Veilederpanel
                type="plakat"
                svg={<img
                    src={utropstegnSvg}
                    alt="Informasjon"
                    className="nav-veilederpanel__illustrasjon"
                />}
                kompakt={true}
            >
                <Normaltekst>
                    <FormattedMessage id="info-for-ikke-arbeidssoker-uten-oppfolging-innhold"/>
                </Normaltekst>
            </Veilederpanel>
        );
    }
}

export default InfoForIkkeArbeidssokerUtenOppfolging;