import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { frontendLogger } from '../../../metrikker/metrics-utils';
import {
    HEROKU_VEIENTILARBEID_MED_AAP_URL,
    HEROKU_VEIENTILARBEID_URL, VEIENTILARBEID_MED_AAP_URL, VEIENTILARBEID_URL, DP_SOK_URL
} from '../../../utils/konstanter';

import handinfoSvg from './clipboard.svg';
import './registrert-aksjonspanel.less';

interface RegistrertAksjonspanelProps {
    hentTekstId: (id: string) => string;
    erSykmeldt: boolean;
}

class RegistrertAksjonspanel extends React.Component<RegistrertAksjonspanelProps> {

    render() {

        const { hentTekstId, erSykmeldt } = this.props;
        let veienTilArbeidUrl;
        let veienTilArbeidMedVisInfoUrl;
        let knappetekstJa;
        const brukHerokuUrl = !!process.env.REACT_APP_HEROKU_OVERGANG;

        if (brukHerokuUrl) {
            const brukerStatusQueryParam = 'brukerStatus=' + (erSykmeldt ? 'sykmeldt' : 'ordinaer');

            veienTilArbeidUrl = HEROKU_VEIENTILARBEID_URL + '?' + brukerStatusQueryParam;
            veienTilArbeidMedVisInfoUrl = (erSykmeldt ? HEROKU_VEIENTILARBEID_MED_AAP_URL
                : DP_SOK_URL) + '&' + brukerStatusQueryParam;
                knappetekstJa = erSykmeldt ? 'duernaregistrert-knapp-les-mer' : 'duernaregistrert-knapp-sok-dagpenger';
        } else {
            veienTilArbeidUrl = VEIENTILARBEID_URL;
            veienTilArbeidMedVisInfoUrl = erSykmeldt ? VEIENTILARBEID_MED_AAP_URL
                : DP_SOK_URL;
            knappetekstJa = erSykmeldt ? 'duernaregistrert-knapp-les-mer' : 'duernaregistrert-knapp-sok-dagpenger';
        }

        return (
            <div className="registrert__aksjonspanel">
                <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon"/>
                <div className="registrert__tekster">
                    <Systemtittel tag="h2" className="blokk-xs">
                        <FormattedMessage id={hentTekstId('systemtittel')}/>
                    </Systemtittel>
                    <Normaltekst className="blokk">
                        <FormattedHTMLMessage id={hentTekstId('normaltekst')}/>
                    </Normaltekst>
                    <div className="registrert__knapperad">
                        <a
                            href={veienTilArbeidUrl}
                            className="registrert__lenke knapp knapp--standard"
                            onClick={() => {
                                frontendLogger('registrering.ikke.vis.dagpenger.info');
                            }}
                        >
                            <FormattedMessage id="duernaregistrert-knapp-ikke-na"/>
                        </a>
                        <a
                            href={veienTilArbeidMedVisInfoUrl}
                            className="registrert__lenke knapp knapp--hoved"
                            onClick={() => {
                                frontendLogger('registrering.vis.dagpenger.info');
                            }}
                        >
                            <FormattedMessage id={knappetekstJa}/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegistrertAksjonspanel;
