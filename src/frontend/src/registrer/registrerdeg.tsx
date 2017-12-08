import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';

function RegistrerDeg() {
    return (
        <article className="registrerdeg">
            <section className="panel--stor registrerdeg__innhold-wrapper">
                <section className="registrerdeg__innhold">
                    <h1 className="typo-innholdstittel blokk-xs registrerdeg__tittel">
                        <FormattedMessage id="overskrift-registrerdeg"/>
                    </h1>
                    <p className="typo-normal blokk-xs">
                        <FormattedMessage id="beskrivelse-registrerdeg"/>
                    </p>
                    <ul className="typo-normal blokk-xs">
                        <li><FormattedMessage id="liste-dufarhjelp"/></li>
                        <li><FormattedMessage id="liste-dukansoke"/></li>
                        <li><FormattedMessage id="liste-arbeidsgiverefinner"/></li>
                        <li><FormattedMessage id="liste-dukanabonnere"/></li>
                    </ul>
                    <p className="typo-normal registrerdeg-tips"><FormattedMessage id="tips-fullforregistrering"/></p>
                </section>
            </section>
            <footer className="registrerdeg__footer">
                <Knapp type="hoved" className="knapp knapp--hoved">
                    <FormattedMessage id="knapp-registrerdeg"/>
                </Knapp>
            </footer>
        </article>
    );
}

export default RegistrerDeg;