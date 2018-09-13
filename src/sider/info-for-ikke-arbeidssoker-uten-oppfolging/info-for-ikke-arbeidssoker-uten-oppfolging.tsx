import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

const utropstegnSvg = require('../fullfor/utropstegn.svg');

class InfoForIkkeArbeidssokerUtenOppfolging extends React.Component {

    render() {
        return (
            <div className="info-for-ikke-arbeidssoker-uten-oppfolging">
                <img
                    src={utropstegnSvg}
                    alt="Informasjon"
                    className="info-for-ikke-arbeidssoker-uten-oppfolging__illustrasjon"
                />

                <Normaltekst>
                    <FormattedMessage id="info-for-ikke-arbeidssoker-uten-oppfolging-innhold"/>
                </Normaltekst>
            </div>

        );
    }
}

export default InfoForIkkeArbeidssokerUtenOppfolging;