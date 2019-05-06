import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';

interface LastinnPaanyttProps {
    tidIgjen: string;
}

const LastinnPaaNytt = (props: LastinnPaanyttProps) => {
    return (
        <>
            <>
                <Innholdstittel className="blokk-xs timeoutbox-modal__beskrivelse" tag="h1">
                    <FormattedMessage id="timeoutbox.tittel" />
                </Innholdstittel>
                <Normaltekst className="blokk-s timeoutbox-modal__beskrivelse">
                    <FormattedMessage
                        id="timeoutbox.innhold.nedtelling"
                        values={{
                            tid: props.tidIgjen,
                        }}
                    />
                </Normaltekst>
            </>
            <Hovedknapp
                className="timeoutbox-modal__knapp"
                onClick={() => window.location.reload()}
            >
                <FormattedMessage id="timeoutbox.knapp.last_pa_nytt" />
            </Hovedknapp>
        </>
    );
};

export default LastinnPaaNytt;