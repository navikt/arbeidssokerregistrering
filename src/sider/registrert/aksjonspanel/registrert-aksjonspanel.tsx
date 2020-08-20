import * as React from 'react';
import { withTranslation, WithTranslation, Trans, TransProps } from 'react-i18next';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { uniLogger } from '../../../metrikker/uni-logger';
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

class RegistrertAksjonspanel extends React.Component<RegistrertAksjonspanelProps & WithTranslation & TransProps> {

    render() {

        const { hentTekstId, erSykmeldt, t } = this.props;
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

        const DagpengerEngelsk = () => {
            return (
                <a
                    href={'https://www.nav.no/soknader/en/person/arbeid/dagpenger'}
                    className='registrert__lenke knapp knapp--standard'
                    onClick={() => {
                        uniLogger('registrering.vis.dagpenger.info.engelsk');
                    }}
                >
                    <span>Apply for unemployment benefit</span>
                </a>
            )
        }

        return (
            <div className="registrert__aksjonspanel">
                <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon" />
                <div className="registrert__tekster">
                    <Systemtittel tag="h2" className="blokk-xs">
                        {t(hentTekstId('systemtittel'))}
                    </Systemtittel>
                    <Normaltekst className="blokk">
                        <Trans i18nKey={hentTekstId('normaltekst')} />
                    </Normaltekst>
                    <div className="registrert__knapperad">
                        {knappetekstJa === 'duernaregistrert-knapp-sok-dagpenger' && <DagpengerEngelsk />}
                        <a
                            href={veienTilArbeidMedVisInfoUrl}
                            className="registrert__lenke knapp knapp--hoved blokk-m"
                            onClick={() => {
                                uniLogger('registrering.vis.dagpenger.info');
                            }}
                        >
                            {t(knappetekstJa)}
                        </a>
                        <a
                            href={veienTilArbeidUrl}
                            className="lenke typo-element"
                            onClick={() => {
                                uniLogger('registrering.ikke.vis.dagpenger.info');
                            }}
                        >
                            {t('duernaregistrert-knapp-ikke-na')}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(RegistrertAksjonspanel);
