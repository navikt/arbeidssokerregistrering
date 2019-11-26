import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import utropstegnSvg from '../fullfor/utropstegn.svg';

const melding = () => {
  return (
    <Veilederpanel
                type="plakat"
                svg={<img
                    src={ utropstegnSvg }
                    alt="Informasjon"
                    className="nav-veilederpanel__illustrasjon"
                />}
                kompakt={true}
            >
                <Normaltekst>
                    <FormattedMessage id="info-for-ikke-arbeidssoker-uten-oppfolging-innhold"/>
                </Normaltekst>
            </Veilederpanel>
  )
}

export default melding
