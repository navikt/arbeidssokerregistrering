import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import Veilederpanel from 'nav-frontend-veilederpanel';

import { uniLogger } from '../../metrikker/uni-logger';

import veilederSvg from './veileder-mann.svg';
import './kontakt-meg-melding.less';

class OppgaveError extends React.Component {
    render() {
        uniLogger('registrering.oppholdstillatelse.kontaktmeg.error');

        return (
            <div className="blokk-m">
                <Veilederpanel
                    svg={<img src={veilederSvg} alt="veilder" className="veileder-illustrasjon" />}
                    type={"plakat"}
                    kompakt
                >
                    <Alertstripe type="feil">
                        <Undertittel>Noe gikk galt / We're having trouble</Undertittel>
                    </Alertstripe>
                    <p className="blokk-m">
                        <Normaltekst>Vi klarte ikke å ta imot henvendelsen din.</Normaltekst>
                        <Normaltekst>Vennligst forsøk igjen senere.</Normaltekst>
                        <Normaltekst>Opplever du dette flere ganger kan du ringe oss på <strong>55 55 33 33</strong>.</Normaltekst>
                    </p>
                    <p className="blokk-m">
                        <Normaltekst>We’re having trouble with your request right now.</Normaltekst>
                        <Normaltekst>Please try again later.</Normaltekst>
                        <Normaltekst>If you are still having problems, you can call us on <strong>55 55 33 33</strong>.</Normaltekst>
                    </p>
                </Veilederpanel>
            </div>
        )
    }
};

export default OppgaveError;

