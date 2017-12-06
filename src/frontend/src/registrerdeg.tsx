import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {Knapp} from 'nav-frontend-knapper';


function RegistrerDeg() {
    return (
        <article className="registrerdeg">
            <section className="panel--stor">
                <section>
                    <h1 className="typo-innholdstittel"><FormattedMessage id="overskrift-registrerdeg"/></h1>
                    <p className="typo-normal">
                        <FormattedMessage id="beskrivelse-registrerdeg"/>
                    </p>
                    <ul className="typo-normal">
                        <li><FormattedMessage id="liste-dufarhjelp"/></li>
                        <li><FormattedMessage id="liste-dukansoke"/></li>
                        <li><FormattedMessage id="liste-arbeidsgiverefinner"/></li>
                        <li><FormattedMessage id="liste-dukanabonnere"/></li>
                    </ul>
                    <p className="typo-normal"><FormattedMessage id="tips-fullforregistrering"/></p>
                </section>
            </section>
            <footer>
                <Knapp type="hoved" className="knapp knapp--hoved">
                    <FormattedMessage id="knapp-registrerdeg"/>
                </Knapp>
            </footer>
        </article>
    );
}

export default RegistrerDeg;