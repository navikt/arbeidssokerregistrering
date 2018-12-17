import * as React from 'react';
import * as classnames from 'classnames';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Normaltekst, Systemtittel, Element } from 'nav-frontend-typografi';
import {
    HEROKU_VEIENTILARBEID_MED_AAP_URL, HEROKU_VEIENTILARBEID_MED_DAGPENGER_URL,
    HEROKU_VEIENTILARBEID_URL,
    VEIENTILARBEID_MED_AAP_URL,
    VEIENTILARBEID_MED_DAGPENGER_URL, VEIENTILARBEID_URL,
} from '../../utils/konstanter';
import AvsjekkBilde from './avsjekk-bilde';
import { erIE } from '../../utils/ie-test';
import { frontendLogger } from '../../metrikker/metrics-utils';

import handinfoSvg from './clipboard.svg';
import './registrert.less';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { MatchProps } from '../../utils/utils';
import { RegistreringType } from '../../ducks/registreringstatus';

interface StateProps {
    state: AppState;
}

type AllProps = StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class DuErNaRegistrert extends React.Component<AllProps> {

    hentTekstId(erSykmeldt: boolean): (id: string) => string {
        return (id: string) => {
            return `duernaregistrert-${( erSykmeldt ? 'sykmeldt' : 'ordinaer')}-${id}`;
        };
    }

    render() {

        const registreringType = this.props.state.registreringStatus.data.registreringType;
        const erSykmeldt = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
        const brukHerokuUrl = !!process.env.REACT_APP_HEROKU_OVERGANG;
        const hentTekstId = this.hentTekstId(erSykmeldt);

        let veienTilArbeidUrl;
        let veienTilArbeidMedVisInfoUrl;

        if (brukHerokuUrl) {
            const brukerStatusQueryParam = 'brukerStatus=' + (erSykmeldt ? 'sykmeldt' : 'ordinaer');

            veienTilArbeidUrl = HEROKU_VEIENTILARBEID_URL + '?' + brukerStatusQueryParam;
            veienTilArbeidMedVisInfoUrl = (erSykmeldt ? HEROKU_VEIENTILARBEID_MED_AAP_URL
                : HEROKU_VEIENTILARBEID_MED_DAGPENGER_URL) + '&' + brukerStatusQueryParam;

        } else {
            veienTilArbeidUrl = VEIENTILARBEID_URL;
            veienTilArbeidMedVisInfoUrl = erSykmeldt ? VEIENTILARBEID_MED_AAP_URL
                : VEIENTILARBEID_MED_DAGPENGER_URL;
        }

        return (
            <section className={`registrert ${erIE() && 'erIE'}`}>

                <div
                    className={classnames('registrert__avsjekk', erSykmeldt ?
                        'registrert__avsjekk-sykmeldt' : null)}
                >
                    <AvsjekkBilde/>
                    <Systemtittel tag="h1" className="registrert__tittel">
                        <FormattedMessage id={hentTekstId('innholdstittel')}/>
                    </Systemtittel>
                </div>

                <div className="registrert__aksjonspanel">
                    <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon"/>
                    <div className="registrert__tekster">
                        <Systemtittel tag="h2" className="blokk-xs">
                            <FormattedMessage id={hentTekstId('systemtittel')}/>
                        </Systemtittel>
                        <Normaltekst className="blokk">
                            <FormattedMessage id={hentTekstId('normaltekst')}/>
                        </Normaltekst>
                        <Element className="blokk-s">
                            <FormattedMessage id={hentTekstId('element')}/>
                        </Element>
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
                                <FormattedMessage id="duernaregistrert-knapp-ja"/>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    state: state,
});

export default connect(mapStateToProps)(injectIntl(DuErNaRegistrert));