import * as React from 'react';
import { Normaltekst, Systemtittel, Element, Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { VEIENTILARBEID_MED_DAGPENGER_URL, VEIENTILARBEID_URL } from '../../ducks/api';

const handinfoSvg = require('./handinfo.svg');
const avsjekkSvg = require('./avsjekk.svg');

function DuErNaRegistrert() {
    return (
        <div className="limit">
            <section className="du-er-na-registrert">
                <div className="du-er-na-registrert__topp">
                    <span className="du-er-na-registrert__avsjekk-ikon">
                        <img src={avsjekkSvg} alt="Avsjekk" className="illustrasjon" />
                    </span>
                    <Innholdstittel className="du-er-na-registrert__avsjekk-tittel">
                        <FormattedMessage id="duernaregistrert-innholdstittel" />
                    </Innholdstittel>
                </div>
                <div className="du-er-na-registrert__aksjonspanel">
                    <div className="du-er-na-registrert__handinfo-ikon">
                        <img src={handinfoSvg} alt="Hånd med info skilt" className="illustrasjon" />
                    </div>
                    <div className="du-er-na-registrert__tekster">
                        <Systemtittel className="blokk-xs">
                            <FormattedMessage id="duernaregistrert-systemtittel" />
                        </Systemtittel>
                        <Normaltekst className="blokk">
                            <FormattedMessage id="duernaregistrert-normaltekst" />
                        </Normaltekst>
                        <Element className="blokk-xxs">
                            <FormattedMessage id="duernaregistrert-element" />
                        </Element>
                        <div className="du-er-na-registrert__knapperad">
                            <a href={VEIENTILARBEID_URL} className="knapp knapp--standard">
                                <FormattedMessage id="knapp-ikke-na" />
                            </a>
                            <a href={VEIENTILARBEID_MED_DAGPENGER_URL} className="knapp knapp--hoved">
                                <FormattedMessage id="knapp-ja-vis-meg" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DuErNaRegistrert;
