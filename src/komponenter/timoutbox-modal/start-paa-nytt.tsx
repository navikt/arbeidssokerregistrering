import * as React from 'react';
import HovedKnapp from 'nav-frontend-knapper/lib/hovedknapp';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

const StartPaaNytt = () => {
    return (
        <>
            <Systemtittel className="blokk-xs timeoutbox-modal__beskrivelse">
                Sesjonen din har utløpt
            </Systemtittel>
            <Normaltekst className="blokk-s timeoutbox-modal__beskrivelse">
                Du må logge inn på ny for å fortsette.
            </Normaltekst>
            <HovedKnapp
                className="timeoutbox-modal__knapp"
                onClick={
                    () => {
                        window.location.reload();
                    }
                }
            >
                Logg inn
            </HovedKnapp>
        </>
    );
};

export default StartPaaNytt;