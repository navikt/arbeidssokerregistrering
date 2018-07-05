import * as React from 'react';
import { Normaltekst, Systemtittel, Element, Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { VEIENTILARBEID_MED_DAGPENGER_URL, VEIENTILARBEID_URL } from '../../ducks/api';
import AvsjekkBilde from './avsjekk-bilde';

const handinfoSvg = require('./handinfo.svg');

class DuErNaRegistrert extends React.Component {

    componentDidMount() {
        let scrollHeight = 0;
        const header = document.querySelector('.siteheader');
        if (header) {
            scrollHeight = header.getBoundingClientRect().height;
        }
        window.scrollTo(0, scrollHeight);
    }

    render() {
        return (
            <section className="registrert limit">

                <div className="registrert__avsjekk">
                    <AvsjekkBilde/>
                    <Innholdstittel tag="h1" className="registrert__tittel">
                        <FormattedMessage id="duernaregistrert-innholdstittel"/>
                    </Innholdstittel>
                </div>

                <div className="registrert__aksjonspanel">
                    <div className="registrert__handinfo-ikon">
                        <img src={handinfoSvg} alt="Hånd med info skilt" className="illustrasjon"/>
                    </div>
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
                            <a href={VEIENTILARBEID_URL} className="knapp knapp--standard">
                                <FormattedMessage id="knapp-ikke-na"/>
                            </a>
                            <a href={VEIENTILARBEID_MED_DAGPENGER_URL} className="knapp knapp--hoved">
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
