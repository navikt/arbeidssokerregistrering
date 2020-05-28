import * as React from 'react';
import Panel from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import '../oppholdstillatelse/kontakt-meg-melding.less';
import { getHeaders, MED_CREDENTIALS } from '../../ducks/api';
import { uniLogger } from '../../metrikker/uni-logger';
import OppgaveOpprettet from './oppgave-opprettet';

const KontaktMeg = () => {

    interface Oppgave {
        id: number;
        tildeltEnhetsnr: string;
        oppgaveType: string;
    }

    const [oppgave, setOppgave] = React.useState<Oppgave>({
        id: -1,
        tildeltEnhetsnr: '',
        oppgaveType: ''
    });

    const opprettOppgave = async (url) => {
        const response: Response = await fetch(url, {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
            method: 'post',
            body: JSON.stringify({ oppgaveType: 'UTVANDRET' })
        });

        if (response.status === 200) {
            const data = await response.json();
            setOppgave({ id: data.id, tildeltEnhetsnr: data.tildeltEnhetsnr, oppgaveType: data.oppgaveType });
        }
    };

    const handleKontakMegClicked = () => {
        uniLogger('registrering.utvandret.kontaktmeg');
        opprettOppgave('/veilarbregistrering/api/oppgave');
    };

    if (oppgave.id === -1) {
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
    } else {
        return <OppgaveOpprettet />;
    }
}

export default KontaktMeg;
