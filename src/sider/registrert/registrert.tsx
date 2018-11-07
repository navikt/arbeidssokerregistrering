import * as React from 'react';
import { Normaltekst, Systemtittel, Element } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { VEIENTILARBEID_MED_DAGPENGER_URL, VEIENTILARBEID_URL } from '../../ducks/api';
import AvsjekkBilde from './avsjekk-bilde';
import { erIE } from '../../utils/ie-test';
import { frontendLogger } from '../../metrikker/metrics-utils';

const handinfoSvg = require('./clipboard.svg');

class DuErNaRegistrert extends React.Component {

    render() {
        return (
            <section className={`registrert ${erIE() && 'erIE'}`}>

                <div className="registrert__avsjekk">
                    <AvsjekkBilde/>
                    <Systemtittel tag="h1" className="registrert__tittel">
                        <FormattedMessage id="duernaregistrert-innholdstittel"/>
                    </Systemtittel>
                </div>

                <div className="registrert__aksjonspanel">
                    <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon"/>
                    <div className="registrert__tekster">
                        <Systemtittel tag="h2" className="blokk-xs">
                            <FormattedMessage id="duernaregistrert-systemtittel"/>
                        </Systemtittel>
                        <Normaltekst className="blokk">
                            <FormattedMessage id="duernaregistrert-normaltekst"/>
                        </Normaltekst>
                        <Element className="blokk-xxs">
                            <FormattedMessage id="duernaregistrert-element"/>
                        </Element>
                        <div className="registrert__knapperad">
                            <a
                                href={VEIENTILARBEID_URL}
                                className="registrert__lenke knapp knapp--standard"
                                onClick={() => {
                                    frontendLogger('registrering.ikke.vis.dagpenger.info');
                                }}
                            >
                                <FormattedMessage id="knapp-ikke-na"/>
                            </a>
                            <a
                                href={VEIENTILARBEID_MED_DAGPENGER_URL}
                                className="registrert__lenke knapp knapp--hoved"
                                onClick={() => {
                                    frontendLogger('registrering.vis.dagpenger.info');
                                }}
                            >
                                <FormattedMessage id="knapp-ja-vis-meg"/>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default DuErNaRegistrert;
