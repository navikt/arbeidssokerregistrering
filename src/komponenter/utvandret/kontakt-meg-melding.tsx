import Panel from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';

interface Props {
    handleKontakMegClicked: () => void;
}

const KontaktMegMelding = ({handleKontakMegClicked}: Props) => {
    return (
        <Panel border>
            <Systemtittel className="avbryt-modal__beskrivelse blokk-m">
                En veileder må hjelpe deg slik at du blir registrert
            </Systemtittel>
            <Normaltekst className="blokk-s">
                Du står registrert som utvandret i våre systemer.<br />
                Dette gjør at du ikke kan registrere deg som arbeidssøker på nett.
            </Normaltekst>
            <Normaltekst className="blokk-m">
                Kontakt oss, så hjelper vi deg videre.
            </Normaltekst>
            <div className="blokk-s">
                <Hovedknapp className="avbryt-modal__knapp blokk-s" id="confirmKnapp" onClick={handleKontakMegClicked}>
                    Ta kontakt / Contact us
                </Hovedknapp>
            </div>
            <Normaltekst className="blokk-s">
                You're listed as emigrated in our systems.<br />
                This means that you cannot register as a jobseeker online.
            </Normaltekst>
            <Normaltekst className="blokk-m">
                Please contact us for help with this.
            </Normaltekst>
        </Panel>
    );
}

export default KontaktMegMelding;