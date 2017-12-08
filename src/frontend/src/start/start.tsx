import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';

function Start() {
    return (
        <article className="start">
            <section className="panel--stor start__innhold-wrapper">
                <section className="start-inner-body start__innhold">
                    <h1 className="typo-sidetittel blokk-xs start__tittel ">
                        <FormattedMessage id="overskrift-start"/>
                    </h1>
                    <p className="typo-normal">
                        <FormattedMessage id="beskrivelse-start"/>
                    </p>
                </section>
            </section>
            <footer className="start__footer">
                <Knapp type="standard" className="knapp">
                    <FormattedMessage id="knapp-avbryt"/>
                </Knapp>
                <Knapp type="hoved" className="knapp knapp--hoved">
                    <FormattedMessage id="knapp-neste"/>
                </Knapp>
            </footer>
        </article>
    );
}

export default Start;