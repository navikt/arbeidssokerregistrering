import * as React from 'react';
import {FormattedMessage, injectIntl, InjectedIntlProps} from 'react-intl';
import {Knapp} from 'nav-frontend-knapper';

interface Props {
    tittelId: string;
    beskrivelseId: string;
    knappId: string;
    className?: string;
}

function RegistrerDeg({tittelId, beskrivelseId, knappId, className, intl}: Props & InjectedIntlProps) {
    return (
        <article className={className}>
            <section className="panel--stor">
                <section>
                    <h1 className="typo-innholdstittel"><FormattedMessage id={tittelId}/></h1>
                    <p className="typo-normal">
                        <FormattedMessage id={beskrivelseId}/>
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
                    <FormattedMessage id={knappId}/>
                </Knapp>
            </footer>
        </article>
    );
}

export default injectIntl(RegistrerDeg);